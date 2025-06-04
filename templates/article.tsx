import At from "@/components/icons/at"
import GitHub from "@/components/icons/github"
import Linkedin from "@/components/icons/linkedin"
import { Article } from "@/types/article"
import { css, Style } from "hono/css"
import { html } from "hono/html"

export default function Article({
  url,
  email,
  article,
}: {
  url: string
  email: string
  article: Article
}) {
  return (
    <>
      {html`<!DOCTYPE html>`}
      <html lang='en'>
        <head>
          <meta charset='UTF-8' />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0'
          />
          <title>${article.title}</title>
          <link rel='icon' type='image/x-icon' href={`${url}/favicon.ico`} />
          <Style>
            {css`
              :root {
                --bg-color: hsl(0, 0%, 100%);
                --fg-color: hsl(0, 0%, 20%);
                --fg-muted: hsl(0, 0%, 46%);
                --border-color: hsl(0, 0%, 90%);
              }
              @media (prefers-color-scheme: dark) {
                :root {
                  --bg-color: hsl(0, 0%, 10%);
                  --fg-color: hsl(0, 0%, 90%);
                  --fg-muted: hsl(0, 0%, 70%);
                  --border-color: hsl(0, 0%, 30%);
                }
              }
              * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
              }
              body,
              table,
              td,
              a {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
                  "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji",
                  "Segoe UI Emoji";
                color: var(--fg-color);
                background-color: var(--bg-color);
              }
            `}
          </Style>
        </head>

        <body>
          <table
            role='presentation'
            width='100%'
            cellpadding='0'
            cellspacing='0'
            style='max-width: 600px; margin: 0 auto; border-radius: 2px; overflow: hidden;'>
            <tr>
              <td style='padding: 40px 20px; '>
                <h1 style='margin-bottom: 30px; font-size: 16px; font-weight: 500;'>
                  Hi there 👋
                </h1>
                <p style='margin-bottom: 30px; font-size: 16px;'>
                  You've successfully subscribed to my main blog 🎉
                </p>
                <p style='margin-bottom: 30px; font-size: 16px;'>
                  You can expect curated content about new ways to think about
                  development, content that relates to code tutorials, tips for
                  performance optimization, and exploration of the most crucial
                  technologies in modern development space. ✨
                </p>
                <p style='margin-bottom: 30px; font-size: 16px;'>
                  From React, Next.js and TypeScript best practices to modern
                  CSS and Tailwind, DevOps workflows and architecture patterns,
                  I’ll be delivering value in the name of practical advice that
                  can help you level up your coding skills.
                </p>
                <h2 style='margin-bottom: 20px; font-size: 20px; font-weight: 700;'>
                  Most recent articles 📝
                </h2>
              </td>
            </tr>

            <tr>
              <td style='padding: 20px; font-size: 12px; color: var(--fg-muted); border-top: 1px solid var(--border-color);'>
                <p style='font-size: small; max-width: 360px; margin: 0 auto; line-height: 1.5; text-align: center;'>
                  You are receiving this email because you subscribed to my{" "}
                  <a
                    href={`${url}`}
                    target='_blank'
                    style='color: var(--fg-muted); text-decoration: underline; font-weight: 600;'>
                    blog
                  </a>
                  . If you didn't subscribe, you can safely ignore this email.
                  you can also{" "}
                  <a
                    href={`${url}/unsubscribe/${email}`}
                    target='_blank'
                    style='color: var(--fg-muted); text-decoration: underline; font-weight: 600;'>
                    Unsubscribe
                  </a>{" "}
                  from this list.
                </p>
              </td>
            </tr>

            <tr>
              <td style='padding: 20px; text-align: center; border-top: 1px solid var(--border-color);'>
                <a
                  href='mailto:contact@harounabidi.com'
                  target='_blank'
                  style='color: var(--fg-muted); text-decoration: none; padding-inline: 5px;'>
                  <At width={20} height={20} />
                </a>
                <a
                  href='https://github.com/harounabidi'
                  target='_blank'
                  style='color: var(--fg-muted); text-decoration: none; padding-inline: 5px;'>
                  <GitHub width={20} height={20} />
                </a>
                <a
                  href='https://linkedin.com/in/harounabidi'
                  target='_blank'
                  style='color: var(--fg-muted); text-decoration: none; padding-inline: 5px;'>
                  <Linkedin width={20} height={20} />
                </a>
              </td>
            </tr>
          </table>
        </body>
      </html>
    </>
  )
}
