import { Env } from "@/types/env"
import { Context, Next } from "hono"
import { getCookie, setCookie } from "hono/cookie"

export async function middleware(c: Context<{ Bindings: Env }>, next: Next) {
  const theme = getCookie(c, "theme")
  if (!theme) {
    setCookie(c, "theme", "light", {
      maxAge: 60 * 60 * 24 * 365,
      httpOnly: false, // Allow JavaScript access for client-side theme switching
      secure: c.env.NODE_ENV === "production",
      sameSite: "Lax",
    })
  }

  await next()
}
