import { Context } from "hono"
import { getCookie } from "hono/cookie"
import { html } from "hono/html"

export type Theme = "dark" | "light"

export function getThemeFromRequest(c: Context): Theme {
  const theme = getCookie(c, "theme")
  if (theme === "dark" || theme === "light") {
    return theme
  }
  return "light"
}

export function getThemeClass(theme: Theme): string {
  return theme
}

export function getThemeStyleLinks(theme: Theme) {
  const isDark = theme === "dark"
  const themeFile = isDark ? "/css/vs-dark.css" : "/css/vs-light.css"
  return html`<link href="${themeFile}" rel="stylesheet" />`
}

export function getThemeScript() {
  return html`
    <script>
      ;(function () {
        function getCookie(name) {
          const value = "; " + document.cookie
          const parts = value.split("; " + name + "=")
          if (parts.length === 2) return parts.pop().split(";").shift()
          return null
        }

        let theme = getCookie("theme")

        // If no theme cookie is set, use system preference as fallback
        if (!theme) {
          theme =
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
              ? "dark"
              : "light"
          // Set the cookie for future visits
          document.cookie =
            "theme=" +
            theme +
            "; max-age=" +
            60 * 60 * 24 * 365 +
            "; path=/; SameSite=Lax"
        }

        document.documentElement.classList.toggle("dark", theme === "dark")
      })()
    </script>
  `
}
