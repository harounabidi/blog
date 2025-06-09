import { css, Style } from "hono/css"
import { html } from "hono/html"

interface UnsupportedBrowserPageProps {
  message: string
  browserInfo: {
    browser: string
    version: number
    minor: number
  }
}

export default function UnsupportedBrowserPage(
  props: UnsupportedBrowserPageProps
) {
  const { message, browserInfo } = props
  return (
    <>
      {html`<!DOCTYPE html>`}
      <html lang='en'>
        <head>
          <meta charset='utf-8' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <title>Browser Not Supported - Haroun Abidi's Blog</title>
          <meta
            name='description'
            content='Your browser is not supported. Please upgrade to a modern browser.'
          />
          <meta name='robots' content='noindex, nofollow' />
          <link
            rel='icon'
            href='/favicon/favicon.ico'
            type='image/x-icon'
            sizes='48x48'
          />
          <Style>
            {css`
              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }

              body {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI",
                  Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
              }

              .container {
                max-width: 600px;
                padding: 40px;
                text-align: center;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 15px;
                backdrop-filter: blur(10px);
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
              }

              .icon {
                font-size: 64px;
                margin-bottom: 20px;
              }

              h1 {
                font-size: 28px;
                margin: 0 0 20px 0;
                font-weight: 600;
              }

              .message {
                font-size: 16px;
                line-height: 1.6;
                margin-bottom: 30px;
              }

              .message a {
                color: #ffffff;
                text-decoration: underline;
                font-weight: 600;
              }

              .message a:hover {
                color: #f0f0f0;
              }

              .footer {
                font-size: 14px;
                opacity: 0.8;
                border-top: 1px solid rgba(255, 255, 255, 0.2);
                padding-top: 20px;
                margin-top: 20px;
              }

              .footer p {
                margin: 0;
              }

              .browser-info {
                background: rgba(255, 255, 255, 0.05);
                padding: 15px;
                border-radius: 8px;
                margin: 20px 0;
                font-size: 14px;
              }

              .continue-btn {
                margin-top: 20px;
                background: rgba(255, 255, 255, 0.2);
                border: 1px solid rgba(255, 255, 255, 0.3);
                color: white;
                padding: 10px 20px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 14px;
                text-decoration: none;
                display: inline-block;
                transition: background 0.2s;
              }

              .continue-btn:hover {
                background: rgba(255, 255, 255, 0.3);
              }

              @media (max-width: 480px) {
                .container {
                  padding: 30px 20px;
                }

                h1 {
                  font-size: 24px;
                }

                .icon {
                  font-size: 48px;
                }
              }
            `}
          </Style>
        </head>
        <body>
          <div class='container'>
            <div class='icon'>⚠️</div>
            <h1>Browser Not Supported</h1>
            <div
              class='message'
              dangerouslySetInnerHTML={{ __html: message }}></div>

            <div class='browser-info'>
              <strong>Detected Browser:</strong>{" "}
              {browserInfo.browser === "safari"
                ? `${browserInfo.browser} ${browserInfo.version}.${browserInfo.minor}`
                : `${browserInfo.browser} ${browserInfo.version}`}
            </div>

            <div class='footer'>
              <p>
                This website requires modern browser features for optimal
                security and performance.
              </p>
              <a href='/?force=1' class='continue-btn'>
                Continue Anyway (Not Recommended)
              </a>
            </div>
          </div>
        </body>
      </html>
    </>
  )
}
