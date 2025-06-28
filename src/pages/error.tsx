import { html } from "hono/html"
import { Context } from "hono"
import { Env } from "@/types/env"
import { getCookie } from "hono/cookie"

type Theme = "dark" | "light"

export default function Error(c: Context<{ Bindings: Env }>) {
  const theme = getCookie(c, "theme") as Theme

  return (
    <>
      {html`<!DOCTYPE html>`}
      <html lang='en' class={theme === "dark" ? "dark" : ""}>
        <head>
          <meta charSet='utf-8' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <title>Error</title>
          <link
            rel='icon'
            type='image/x-icon'
            href='/favicon.ico'
            sizes='16x16'
          />
          <link href='/css/index.css' rel='stylesheet'></link>
        </head>
        <body class='bg-background text-foreground'>
          <main class='max-w-[45rem] h-svh grid place-items-center my-4 mx-auto px-4'>
            <div class='flex flex-col items-center text-center'>
              <h1 class='text-3xl font-bold mb-4'>Something went wrong 😢</h1>
              <p class='text-lg text-foreground-muted'>
                An unexpected error has occurred.
              </p>
              <a
                href='/'
                class='bg-foreground text-background px-3 py-1.5 rounded-sm text-sm font-semibold flex w-fit mt-4'>
                Go Home
              </a>
            </div>
          </main>
        </body>
      </html>
    </>
  )
}
