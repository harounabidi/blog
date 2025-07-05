import At from "@/components/icons/at"
import GitHub from "@/components/icons/github"
import Linkedin from "@/components/icons/linkedin"
import { Article } from "@/types/article"
import { html } from "hono/html"

export default function EmailArticle({
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
      {html`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">`}
      <html
        lang='en'
        dir='ltr'
        xmlns='http://www.w3.org/1999/xhtml'
        xmlns:v='urn:schemas-microsoft-com:vml'
        xmlns:o='urn:schemas-microsoft-com:office:office'>
        <Head url={url} article={article} />
        <Body url={url} email={email} article={article} />
      </html>
    </>
  )
}

function Head({ url, article }: { url: string; article: Article }) {
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
      <title>New Article: {article.title}</title>
      <link rel='icon' type='image/x-icon' href={`${url}/favicon.ico`} />

      {/* <link rel='preconnect' href='https://fonts.googleapis.com' />
      <link
        rel='preconnect'
        href='https://fonts.gstatic.com'
        crossorigin='anonymous'
      />
      <link
        href='https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;700&display=swap'
        rel='stylesheet'
      /> */}

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
        .dark-mode-border { border-color: #333333 !important; }

        /* Button styling for dark mode */
        .cta-button { background-color: #edeeef !important; }
        .cta-button a { color: #1a1a1a !important; }

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
  article,
}: {
  url: string
  email: string
  article: Article
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
                    aria-label='New article notification'
                    lang='en'
                    dir='ltr'>
                    <h1
                      style='margin: 0 0 30px 0; font-size: 24px; font-weight: 600; color: #1a1a1a; font-family: Arial, sans-serif;'
                      class='dark-mode-text fallback-font'>
                      New Article Published 📝
                    </h1>

                    <p
                      style='margin: 0 0 20px 0; font-size: 16px; color: #1a1a1a; font-family: Arial, sans-serif; line-height: 1.6;'
                      class='dark-mode-text fallback-font'>
                      I've just published a new article that I think you'll find
                      interesting!
                    </p>

                    <SingleArticle article={article} url={url} />

                    <p
                      style='margin: 30px 0 20px 0; font-size: 16px; color: #1a1a1a; font-family: Arial, sans-serif; line-height: 1.6;'
                      class='dark-mode-text fallback-font'>
                      I hope you find this article valuable. If you have any
                      questions or thoughts, feel free to reach out!
                    </p>

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

function SingleArticle({ article, url }: { article: Article; url: string }) {
  return (
    <table
      role='presentation'
      border={0}
      cellpadding={0}
      cellspacing={0}
      width='100%'
      style='margin: 20px 0; padding: 20px;'
      class='dark-mode-border'>
      <tr>
        <td>
          <a
            dir={article.language === "ar" ? "rtl" : "ltr"}
            href={`${url}/${article.categorySlug}/${article.slug}`}
            target='_blank'
            style='text-decoration: none; color: inherit; display: block;'>
            <h2
              style='margin: 0 0 12px 0; font-size: 20px; font-weight: 700; color: #1a1a1a; font-family: Arial, sans-serif; line-height: 1.4;'
              class='dark-mode-text fallback-font'>
              {article.title}
            </h2>
            <p
              class='date dark-mode-muted'
              style='margin: 0 0 12px 0; font-size: 14px; color: #757575; font-family: Arial, sans-serif;'>
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
              class='summary dark-mode-text'
              style='margin: 0 0 15px 0; font-size: 16px; color: #1a1a1a; font-family: Arial, sans-serif; line-height: 1.5;'>
              {article.summary}
            </p>
            <table
              role='presentation'
              border={0}
              cellpadding={0}
              cellspacing={0}
              style='margin: 15px 0 0 0;'>
              <tr>
                <td>
                  {/* Outlook-safe button */}
                  {html`<!--[if mso]>
                    <v:roundrect
                      xmlns:v="urn:schemas-microsoft-com:vml"
                      xmlns:w="urn:schemas-microsoft-com:office:word"
                      href="${url}/${article.categorySlug}/${article.slug}"
                      style="height:44px;v-text-anchor:middle;width:140px;"
                      arcsize="14%"
                      stroke="f"
                      fillcolor="#1a1a1a">
                      <w:anchorlock />
                      <center
                        style="color:#ffffff;font-family:Arial,sans-serif;font-size:16px;font-weight:600;">
                        Read Article →
                      </center>
                    </v:roundrect>
                  <![endif]-->`}
                  {/* Standard button for other clients */}
                  <table
                    role='presentation'
                    border={0}
                    cellpadding={0}
                    cellspacing={0}
                    style='background-color: #1a1a1a; border-radius: 6px; display: inline-block;'
                    bgcolor='#1a1a1a'
                    class='cta-button'>
                    {html`<!--[if !mso]><!-->`}
                    <tr>
                      <td style='padding: 8px 18px; font-family: Arial, sans-serif; font-size: 16px; font-weight: 600; text-align: center; border-radius: 6px;'>
                        <a
                          href={`${url}/${article.categorySlug}/${article.slug}`}
                          target='_blank'
                          style='color: #ffffff; text-decoration: none; display: block;'>
                          {article.language === "ar"
                            ? "اقرأ المقالة ←"
                            : "Read Article →"}
                        </a>
                      </td>
                    </tr>
                    {html`<!--<![endif]-->`}
                  </table>
                </td>
              </tr>
            </table>
          </a>
        </td>
      </tr>
    </table>
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
            </a>{" "}
            and I've published a new article. You can{" "}
            <a
              class='unsubscribe-link dark-mode-text'
              href={`${url}/unsubscribe/${email}`}
              target='_blank'
              style='color: #1a1a1a; text-decoration: underline; font-weight: 600;'>
              unsubscribe
            </a>{" "}
            from future notifications.
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
