import { html } from "hono/html"

export default function googleAnalytics() {
  return html`
    <script
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-ZM85HNP5JN"></script>
    <script>
      window.dataLayer = window.dataLayer || []
      function gtag() {
        dataLayer.push(arguments)
      }
      gtag("js", new Date())
      gtag("config", "G-ZM85HNP5JN")
    </script>
  `
}
