export async function mail({
  url,
  token,
  from,
  email,
  subject,
  body,
  name,
}: {
  url: string
  token: string
  from: string
  email: string
  subject: string
  body: string
  name: string
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
        from: { address: from },
        to: [{ email_address: { address: email, name: name } }],
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
