import { mail } from "./mail"
import { encryptWithPassword } from "./hash"

export async function processBatchEmails<T>({
  items,
  batchSize = 10,
  delayBetweenBatches = 2000,
  encryptionKey,
  mailConfig,
  processItem,
}: {
  items: T[]
  batchSize?: number
  delayBetweenBatches?: number
  encryptionKey: string
  mailConfig: {
    url: string
    token: string
    from: string
    subject: string
  }
  processItem: (item: T, encryptedValue: string) => Promise<string>
}): Promise<{
  total: number
  successful: number
  failed: number
  errors: Array<{ item: T; error: string }>
}> {
  if (items.length === 0) {
    return { total: 0, successful: 0, failed: 0, errors: [] }
  }

  let successful = 0
  let failed = 0
  const errors: Array<{ item: T; error: string }> = []

  // Process subscribers in batches
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize)

    // Process each item in parallel
    const emailPromises = batch.map(async (item) => {
      try {
        // For email items that need encryption (e.g., subscriber emails)
        let encryptedValue = ""
        if (typeof item === "string") {
          encryptedValue = await encryptWithPassword(item, encryptionKey)
        } else if (
          typeof item === "object" &&
          item !== null &&
          "email" in item
        ) {
          // Handle item objects that contain an email property
          const email = String(item.email)
          encryptedValue = await encryptWithPassword(email, encryptionKey)
        }

        // Process the item to get the email body
        const htmlBody = await processItem(item, encryptedValue)

        // Send email
        const email =
          typeof item === "string"
            ? item
            : typeof item === "object" && item !== null && "email" in item
            ? String(item.email)
            : ""

        if (!email) {
          throw new Error("No email address found in item")
        }

        console.log(mailConfig.token)

        const result = await mail({
          url: mailConfig.url,
          token: mailConfig.token,
          from: mailConfig.from,
          email,
          subject: mailConfig.subject,
          body: htmlBody,
        })

        if (result.success) {
          return { success: true, item }
        } else {
          return {
            success: false,
            item,
            error: result.error || "Unknown error sending email",
          }
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error)
        return {
          success: false,
          item,
          error: `Error processing email: ${errorMessage}`,
        }
      }
    })

    // Wait for all emails in this batch to complete
    const results = await Promise.all(emailPromises)

    // Count results
    successful += results.filter((r) => r.success).length
    const failedResults = results.filter((r) => !r.success)
    failed += failedResults.length

    // Record errors
    failedResults.forEach((result) => {
      if ("error" in result) {
        errors.push({
          item: result.item,
          error: result.error || "Unknown error",
        })
      }
    })

    // Add delay between batches to avoid rate limiting
    if (i + batchSize < items.length) {
      await new Promise((resolve) => setTimeout(resolve, delayBetweenBatches))
    }
  }

  return {
    total: items.length,
    successful,
    failed,
    errors,
  }
}
