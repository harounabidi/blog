import At from "@/components/icons/at"
import GitHub from "@/components/icons/github"
import Linkedin from "@/components/icons/linkedin"
import { Article } from "@/types/article"
import { html } from "hono/html"

export default function helloNewSubscriber({
  url,
  email,
  articles,
}: {
  url: string
  email: string
  articles: Article[]
}) {
  return (
    <>
      {html`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">`}
      <html
        lang='en'
        dir='ltr'
        xmlns='http://www.w3.org/1999/xhtml'
        xmlns:v='urn:schemas-microsoft-com:vml'
        xmlns:o='urn:schemas-microsoft-com:office:office'>
        <Head url={url} />
        <Body url={url} email={email} articles={articles} />
      </html>
    </>
  )
}

function Head({ url }: { url: string }) {
  return (
    <head>
      <meta http-equiv='Content-Type' content='text/html; charset=utf-8' />
      <meta http-equiv='X-UA-Compatible' content='IE=edge' />
      <meta charset='utf-8' />
      <meta http-equiv='X-UA-Compatible' content='IE=edge' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />

      <meta
        name='format-detection'
        content='telephone=no, date=no, address=no, email=no, url=no'
      />
      <meta name='x-apple-disable-message-reformatting' />
      <meta name='color-scheme' content='light dark' />
      <meta name='supported-color-schemes' content='light dark' />
      <title>Welcome to my Newsletter</title>
      <link rel='icon' type='image/x-icon' href={`${url}/favicon.ico`} />
      {html`<!--[if mso]>
        <noscript>
          <xml>
            <o:OfficeDocumentSettings>
              <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
          </xml>
        </noscript>
      <![endif]-->`}
      {style()}
    </head>
  )
}

function style() {
  return html`
    <style type="text/css">
      #outlook a { padding: 0; }
      body {
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
        min-width: 100% !important;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        background-color: #f4f4f4;
        color: #1a1a1a;
        font-family: Arial, sans-serif;
      }

      table, td {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
        border-collapse: collapse !important;
      }

      .ReadMsgBody { width: 100%; }
      .ExternalClass { width: 100%; }
      .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; }

      /* Prevent WebKit and Windows mobile changing default text sizes */
      div[style*="margin: 16px 0;"] { margin: 0 !important; }

      /* Force table cells to have a sensible line-height */
      table td { border-collapse: collapse; }

      /* Remove spacing around Outlook 07, 10 tables */
      table { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }

      /* Styling for links */
      a {
        color: #1a1a1a;
        text-decoration: underline;
        outline: none;
      }

      /* Social links base styling */
      .social-link {
        color: #1a1a1a !important;
        text-decoration: none !important;
      }
      .social-link svg {
        fill: currentColor;
      }

      /* Yahoo Mail responsive fix */
      @media screen and (max-width: 525px) {
        .wrapper { width: 100% !important; max-width: 100% !important; }
        .responsive-table { width: 100% !important; }
        .padding { padding: 10px 5% 15px 5% !important; }
        .section-padding { padding: 0 15px 50px 15px !important; }
      }

      /* Apple Mail dark mode support */
      :root {
        color-scheme: light dark;
        supported-color-schemes: light dark;
      }

      @media (prefers-color-scheme: dark) {
        .dark-mode-bg { background-color: #1a1a1a !important; }
        .dark-mode-text { color: #edeeef !important; }
        .dark-mode-muted { color: #b3b3b3 !important; }
        .dark-mode-border { background-color: #333333 !important; border-color: #333333 !important; }

        /* Social links styling for dark mode */
        .social-link {
          color: #edeeef !important;
        }
        .social-link svg {
          fill: #edeeef !important;
          color: #edeeef !important;
        }
        .social-link path {
          fill: #edeeef !important;
        }

        /* Ensure links are visible in dark mode */
        a {
          color: #edeeef !important;
        }
      }

      /* Outlook specific styles */
      ${outlookConditionalStyles}
    </style>
  `
}

const outlookConditionalStyles = html`<!--[if mso]>
  table { border-collapse: collapse; } .fallback-font { font-family: Arial,
  sans-serif !important; }
<![endif]--> `

function Body({
  url,
  email,
  articles,
}: {
  url: string
  email: string
  articles: Article[]
}) {
  return (
    <body
      class='body dark-mode-bg'
      style='margin: 0; padding: 0; width: 100%; background-color: #ffffff;'
      bgcolor='#ffffff'>
      {/* Outer table for full width background */}
      <table
        role='presentation'
        border={0}
        cellpadding={0}
        cellspacing={0}
        width='100%'
        style='background-color: #ffffff;'
        bgcolor='#ffffff'
        class='dark-mode-bg'>
        <tr>
          <td align='center' style='padding: 10px 0;'>
            {/* Inner table for content */}
            <table
              role='presentation'
              border={0}
              cellpadding={0}
              cellspacing={0}
              width='600'
              style='max-width: 600px; background-color: #ffffff;'
              bgcolor='#ffffff'
              class='responsive-table dark-mode-bg'>
              <tr>
                <td
                  align='left'
                  style='padding: 40px 30px; font-family: Arial, sans-serif; line-height: 1.6;'
                  class='section-padding'>
                  <div
                    role='article'
                    aria-roledescription='email'
                    aria-label='Welcome email'
                    lang='en'
                    dir='ltr'>
                    <h1
                      style='margin: 0 0 30px 0; font-size: 24px; font-weight: 600; color: #1a1a1a; font-family: Arial, sans-serif;'
                      class='dark-mode-text fallback-font'>
                      Hi there 👋
                    </h1>

                    <p
                      style='margin: 0 0 20px 0; font-size: 16px; color: #1a1a1a; font-family: Arial, sans-serif; line-height: 1.6;'
                      class='dark-mode-text fallback-font'>
                      You've successfully subscribed to my main blog
                    </p>

                    <p
                      style='margin: 0 0 20px 0; font-size: 16px; color: #1a1a1a; font-family: Arial, sans-serif; line-height: 1.6;'
                      class='dark-mode-text fallback-font'>
                      You can expect curated content about new ways to think
                      about development, content that relates to code tutorials,
                      tips for performance optimization, and exploration of the
                      most crucial technologies in modern development space. ✨
                    </p>

                    <p
                      style='margin: 0 0 30px 0; font-size: 16px; color: #1a1a1a; font-family: Arial, sans-serif; line-height: 1.6;'
                      class='dark-mode-text fallback-font'>
                      From React, Next.js and TypeScript best practices to
                      modern CSS and Tailwind, DevOps workflows and architecture
                      patterns, I'll be delivering value in the name of
                      practical advice that can help you level up your coding
                      skills.
                    </p>

                    <h2
                      style='margin: 30px 0 20px 0; font-size: 20px; font-weight: 700; color: #1a1a1a; font-family: Arial, sans-serif;'
                      class='dark-mode-text fallback-font'>
                      Most recent articles
                    </h2>

                    <Articles articles={articles} url={url} />

                    <table
                      role='presentation'
                      border={0}
                      cellpadding={0}
                      cellspacing={0}
                      width='100%'
                      style='margin: 30px 0;'>
                      <tr>
                        <td>
                          <hr
                            style='border: none; border-top: 1px solid #e6e6e6; margin: 0;'
                            class='dark-mode-border'
                          />
                        </td>
                      </tr>
                    </table>

                    <Footer email={email} url={url} />

                    <table
                      role='presentation'
                      border={0}
                      cellpadding={0}
                      cellspacing={0}
                      width='100%'
                      style='margin: 30px 0;'>
                      <tr>
                        <td>
                          <hr
                            style='border: none; border-top: 1px solid #e6e6e6; margin: 0;'
                            class='dark-mode-border'
                          />
                        </td>
                      </tr>
                    </table>

                    <table
                      role='presentation'
                      border={0}
                      cellpadding={0}
                      cellspacing={0}
                      width='100%'
                      style='margin: 10px 0;'>
                      <tr>
                        <td height='5'>&nbsp;</td>
                      </tr>
                    </table>

                    {/* <SocialLinks /> */}
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  )
}

function Articles({ articles, url }: { articles: Article[]; url: string }) {
  return (
    <>
      {articles.map((article) => (
        <table
          role='presentation'
          border={0}
          cellpadding={0}
          cellspacing={0}
          width='100%'
          style='margin: 20px 0;'
          key={article.id}>
          <tr>
            <td>
              <a
                dir={article.language === "ar" ? "rtl" : "ltr"}
                href={`${url}/${article.categorySlug}/${article.slug}`}
                target='_blank'
                style='text-decoration: none; color: inherit; display: block;'>
                <h3
                  style='margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #1a1a1a; font-family: Arial, sans-serif; line-height: 1.4;'
                  class='dark-mode-text fallback-font'>
                  {article.title}
                </h3>
                <p
                  class='date dark-mode-muted'
                  style='margin: 0 0 8px 0; font-size: 14px; color: #757575; font-family: Arial, sans-serif;'>
                  {new Date(article.createdAt).toLocaleDateString(
                    article.language === "ar" ? "ar-DZ" : "en-UK",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }
                  )}{" "}
                  •{" "}
                  {article.language === "ar"
                    ? article.readingTime === 1
                      ? "دقيقة قراءة"
                      : article.readingTime === 2
                      ? "دقيقتان قراءة"
                      : article.readingTime > 10
                      ? `${article.readingTime} دقيقة قراءة`
                      : `${article.readingTime} دقائق قراءة`
                    : `${article.readingTime} mins read`}
                </p>
                <p
                  class='summary dark-mode-muted'
                  style='margin: 0; font-size: 16px; color: #757575; font-family: Arial, sans-serif; line-height: 1.5;'>
                  {article.summary}
                </p>
              </a>
            </td>
          </tr>
        </table>
      ))}
    </>
  )
}

function Footer({ email, url }: { email: string; url: string }) {
  return (
    <table
      role='presentation'
      border={0}
      cellpadding={0}
      cellspacing={0}
      width='100%'
      style='margin: 20px 0;'>
      <tr>
        <td align='center'>
          <p
            class='footer dark-mode-muted'
            style='font-size: 14px; max-width: 400px; margin: 0; line-height: 1.5; text-align: center; color: #757575; font-family: Arial, sans-serif;'>
            You are receiving this email because you subscribed to my{" "}
            <a
              class='blog-link dark-mode-text'
              href={`${url}`}
              target='_blank'
              style='color: #1a1a1a; text-decoration: underline; font-weight: 600;'>
              blog
            </a>
            . If you didn't subscribe, you can safely ignore this email. You can
            also{" "}
            <a
              class='unsubscribe-link dark-mode-text'
              href={`${url}/unsubscribe/${email}`}
              target='_blank'
              style='color: #1a1a1a; text-decoration: underline; font-weight: 600;'>
              unsubscribe
            </a>{" "}
            from this list.
          </p>
        </td>
      </tr>
    </table>
  )
}

function SocialLinks() {
  return (
    <table
      role='presentation'
      border={0}
      cellpadding={0}
      cellspacing={0}
      width='100%'
      style='margin: 10px 0;'>
      <tr>
        <td align='center' style='padding: 10px 0;'>
          <table role='presentation' border={0} cellpadding={0} cellspacing={0}>
            <tr>
              <td style='padding: 0 10px;'>
                <a
                  class='social-link dark-mode-text'
                  href='mailto:contact@harounabidi.com'
                  target='_blank'
                  style='text-decoration: none; display: inline-block; color: #1a1a1a;'>
                  <At
                    width={20}
                    height={20}
                    role='img'
                    style='fill: currentColor; color: inherit;'
                  />
                </a>
              </td>
              <td style='padding: 0 10px;'>
                <a
                  class='social-link dark-mode-text'
                  href='https://github.com/harounabidi'
                  target='_blank'
                  style='text-decoration: none; display: inline-block; color: #1a1a1a;'>
                  <GitHub
                    width={20}
                    height={20}
                    role='img'
                    style='fill: currentColor; color: inherit;'
                  />
                </a>
              </td>
              <td style='padding: 0 10px;'>
                <a
                  class='social-link dark-mode-text'
                  href='https://linkedin.com/in/harounabidi'
                  target='_blank'
                  style='text-decoration: none; display: inline-block; color: #1a1a1a;'>
                  <Linkedin
                    width={20}
                    height={20}
                    role='img'
                    style='fill: currentColor; color: inherit;'
                  />
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  )
}
