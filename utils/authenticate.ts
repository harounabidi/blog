export default async function authenticateApiKey(c: any, next: any) {
  const apiKey =
    c.req.header("x-api-key") ||
    c.req.header("authorization")?.replace("Bearer ", "")

  if (!apiKey) {
    return c.json({ error: "API key required" }, 401)
  }

  if (apiKey !== c.env.API_KEY) {
    return c.json({ error: "Invalid API key" }, 403)
  }

  await next()
}
