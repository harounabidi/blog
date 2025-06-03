export default async function ResubscribePage() {
  return (
    <html lang='en'>
      <head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>Resubscribe to Newsletter</title>
        <link rel='icon' type='image/x-icon' href='/favicon.ico' />
        <link rel='stylesheet' href='/css/index.css' />
      </head>
      <body>
        <main class='max-w-[45rem] space-y-4 my-8 mx-auto px-4'>
          <h1 class='text-lg font-semibold'>Haroun Abidi</h1>
          <p>Welcome Back!</p>
          <a
            href='/'
            class='bg-foreground text-sm cursor-pointer font-semibold text-background px-3 py-2 rounded-sm hover:bg-foreground-muted transition-colors duration-200'>
            Go back to the homepage
          </a>
        </main>
      </body>
    </html>
  )
}
