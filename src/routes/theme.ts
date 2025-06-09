import { Router } from "@/server/app"
import { setCookie } from "hono/cookie"

const router = Router()

router.post("/api/theme", async (c) => {
  const { theme } = await c.req.json()

  console.log(c.req.header("User-Agent"))

  if (theme !== "dark" && theme !== "light") {
    return c.json({ error: "Invalid theme" }, 400)
  }

  // Determine if we're in production (check for common production indicators)
  const isProduction =
    c.env.NODE_ENV === "production" ||
    c.req.header("host")?.includes("harounabidi.com") ||
    c.req.url.startsWith("https://")

  // Set cookie for 1 year
  setCookie(c, "theme", theme, {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    httpOnly: false, // Allow JavaScript access for client-side theme switching
    secure: isProduction, // Only send over HTTPS in production
    sameSite: "Lax",
    path: "/",
  })

  return c.json({ success: true, theme })
})

export default router
