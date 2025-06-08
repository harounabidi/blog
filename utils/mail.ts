export async function mail({
  url,
  token,
  from,
  email,
  subject,
  body,
}: {
  url: string
  token: string
  from: string
  email: string
  subject: string
  body: string
}): Promise<{ success: boolean; error?: string }> {
  try {
    // Validate required parameters
    if (!url || !token || !from || !email || !subject) {
      return {
        success: false,
        error:
          "Missing required parameters: url, token, from, email, or subject",
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: "Invalid email format",
      }
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        from: { address: from, name: "Haroun Abidi" },
        to: [{ email_address: { address: email } }],
        subject: subject,
        htmlbody: body,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error")
      return {
        success: false,
        error: errorText || "Failed to send email",
      }
    }

    return { success: true }
  } catch (error) {
    // Handle network errors, JSON parsing errors, etc.
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred"
    return {
      success: false,
      error: `Network or parsing error: ${errorMessage}`,
    }
  }
}

export async function batch({
  url,
  token,
  from,
  emails,
  subject,
  body,
}: {
  url: string
  token: string
  from: string
  emails: string[]
  subject: string
  body: string
}): Promise<{ success: boolean; error?: string }> {
  try {
    // Validate required parameters
    if (!url || !token || !from || !emails || !subject) {
      return {
        success: false,
        error:
          "Missing required parameters: url, token, from, emails, or subject",
      }
    }

    // Validate email format for each email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    for (const email of emails) {
      if (!emailRegex.test(email)) {
        return {
          success: false,
          error: `Invalid email format: ${email}`,
        }
      }
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        from: { address: from, name: "Haroun Abidi" },
        to: emails.map((email) => ({ email_address: { address: email } })),
        subject: subject,
        htmlbody: body,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error")
      return {
        success: false,
        error: errorText || "Failed to send batch email",
      }
    }

    return { success: true }
  } catch (error) {
    // Handle network errors, JSON parsing errors, etc.
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred"
    return {
      success: false,
      error: `Network or parsing error: ${errorMessage}`,
    }
  }
}
