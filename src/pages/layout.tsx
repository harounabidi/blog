import Footer from "@/components/layout/footer"
import Header from "@/components/layout/header"
// import googleAnalytics from "@/utils/google-an"
import { html } from "hono/html"
import { FC } from "hono/jsx"

const Layout: FC = (props) => {
  return (
    <>
      {html`<!DOCTYPE html>`}
      <html lang='en' class='dark'>
        <head>
          <meta charSet='utf-8' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <title>{props.title || "Haroun Abidi"}</title>
          <meta
            name='description'
            content={
              props.description ||
              "Short tutorials for developers. Next.js, React, CSS, Animation, and more!"
            }
          />
          <meta
            name='keywords'
            content={
              props.keywords || "Next.js, React, CSS, Animation, and more!"
            }
          />
          <link
            rel='canonical'
            href={props.canonical || "https://blog.harounabidi.com"}
          />

          {/* <meta
            name='theme-color'
            media='(prefers-color-scheme: dark)'
            content='#1a1a1a'
          />

          <meta
            name='theme-color'
            media='(prefers-color-scheme: light)'
            content='#ffffff'
          /> */}

          <link
            rel='alternate'
            type='application/rss+xml'
            title='Haroun Abidi&#39;s Blog RSS Feed'
            href='/rss.xml'
          />
          <link
            rel='icon'
            type='image/x-icon'
            href='https://hono.dev/favicon.ico'
            sizes='16x16'
          />

          <meta name='application-name' content="Haroun Abidi's Blog" />
          <meta name='author' content='Haroun Abidi' />
          <meta name='creator' content='Haroun Abidi' />
          <meta name='publisher' content='Haroun Abidi' />

          <meta name='robots' content='index, follow' />

          {props.publishedAt && (
            <meta
              property='article:published_time'
              content={new Date(props.publishedAt).toISOString()}
            />
          )}

          {props.updatedAt && (
            <meta
              property='article:modified_time'
              content={new Date(props.updatedAt).toISOString()}
            />
          )}

          {/* <meta property="og:type" content="article"/> */}

          <meta property='og:type' content='website' />
          <meta property='og:site_name' content="Haroun Abidi's Blog" />
          <meta property='og:title' content={props.title || "Haroun Abidi"} />
          <meta
            property='og:description'
            content={
              props.description ||
              "Short tutorials for developers. Next.js, React, CSS, Animation, and more!"
            }
          />
          <meta
            property='og:url'
            content={props.canonical || "https://blog.harounabidi.com"}
          />
          <meta property='og:image' content={props.image || "/og.svg"} />
          <meta
            property='og:image:secure_url'
            content={props.image || "/og.svg"}
          />
          <meta property='og:image:width' content='1200' />
          <meta property='og:image:height' content='630' />
          <meta property='og:image:alt' content="Haroun Abidi's Blog" />

          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:site' content='@harounabidi_' />
          <meta name='twitter:creator' content='@harounabidi_' />
          <meta name='twitter:title' content={props.title || "Haroun Abidi"} />
          <meta
            name='twitter:description'
            content={
              props.description ||
              "Short tutorials for developers. Next.js, React, CSS, Animation, and more!"
            }
          />
          <meta name='twitter:image' content={props.image || "/og.svg"} />

          <meta name='twitter:image:alt' content="Haroun Abidi's Blog" />

          <link href='/css/index.css' rel='stylesheet'></link>

          <link href='/css/vs-light.css' rel='preload' as='style'></link>
          <link href='/css/vs-dark.css' rel='preload' as='style'></link>

          <script src='/script.js' type='module'></script>

          <link
            rel='icon'
            href='/favicon/favicon.ico'
            type='image/x-icon'
            sizes='48x48'
          />
          <link
            rel='apple-touch-icon'
            href='/favicon/apple-touch-icon.png'
            type='image/png'
            sizes='180x180'
          />
          <link
            rel='icon'
            href='/favicon/favicon-32x32.png'
            type='image/png'
            sizes='32x32'
          />

          <link
            rel='icon'
            href='/favicon/favicon-16x16.png'
            type='image/png'
            sizes='16x16'
          />

          <link
            rel='icon'
            href='/favicon/android-chrome-192x192.png'
            type='image/png'
            sizes='192x192'
          />

          <link
            rel='icon'
            href='/favicon/android-chrome-512x512.png'
            type='image/png'
            sizes='512x512'
          />

          <link
            rel='manifest'
            href='/manifest.webmanifest'
            crossorigin='use-credentials'
          />

          {/* {googleAnalytics()} */}
          <meta
            name='google-site-verification'
            content='iN1xdeEkFGJeD8N4lTv0IO_QTqe2nAuikOZyEckBpho'
          />

          <meta name='yandex-verification' content='cad7294f23991efc' />
        </head>
        <body>
          <Header categories={props.categories} />
          <main class='w-full h-full min-h-[60vh] mb-16'>{props.children}</main>
          <Footer categories={props.categories} />
        </body>
      </html>
    </>
  )
}

export default Layout
