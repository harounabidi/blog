import type { JSX } from "hono/jsx"

async function getBase64Image(url: string): Promise<string> {
  try {
    const response = await fetch(url)

    const contentType = response.headers.get("content-type") || "image/jpeg"
    const arrayBuffer = await response.arrayBuffer()
    const base64 = arrayBufferToBase64(arrayBuffer)
    const dataUri = `data:${contentType};base64,${base64}`

    return dataUri
  } catch (err) {
    console.error("Error fetching image:", err)
    return ""
  }
}

function arrayBufferToBase64(buffer: ArrayBuffer) {
  let binary = ""
  const bytes = new Uint8Array(buffer)
  const len = bytes.byteLength

  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }

  return btoa(binary)
}

export default async function OG(props: JSX.HTMLAttributes) {
  const imageUrl =
    "https://res.cloudinary.com/dlez32qbe/image/upload/f_auto,q_auto,a_hflip/v1/blog/nihu6djfe5pdtvze9ryg"
  const base64Image = await getBase64Image(imageUrl)

  const avatarUrl =
    "https://res.cloudinary.com/dlez32qbe/image/upload/v1748861071/blog/uklqfhmy5xds1rltfqnl"
  const base64Avatar = await getBase64Image(avatarUrl)
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1200'
      height='630'
      viewBox='0 0 1200 630'>
      <rect width='100%' height='100%' fill='#1a1a1a' />
      <text
        x='50px'
        y='480px'
        font-family='-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", "Helvetica, Arial, sans-serif", "Apple Color Emoji", "Segoe UI Emoji"'
        font-size='60'
        font-weight='800'
        text-anchor='start'
        fill='#fff'>
        Build. Learn. Share.
      </text>

      <circle
        cx='80'
        cy='557'
        r='25'
        fill='none'
        stroke='#333'
        stroke-width='3'
      />
      <clipPath id='circleClip'>
        <circle cx='80' cy='557' r='23' />
      </clipPath>
      <image
        // href='https://res.cloudinary.com/dlez32qbe/image/upload/v1748861071/blog/uklqfhmy5xds1rltfqnl'
        href={base64Avatar}
        x='57'
        y='540'
        width='46'
        height='46'
        clip-path='url(#circleClip)'
      />

      <text
        x='120px'
        y='560px'
        font-family='-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", "Helvetica, Arial, sans-serif", "Apple Color Emoji", "Segoe UI Emoji"'
        font-size='20'
        font-weight='400'
        text-anchor='start'
        fill='#fff'>
        Haroun Abidi - Developer, Designer, Creator
      </text>

      <image
        anchor='end'
        // href='https://res.cloudinary.com/dlez32qbe/image/upload/f_auto,q_auto,a_hflip/v1/blog/nihu6djfe5pdtvze9ryg'
        href={base64Image}
        x='700px'
        y='50px'
        width='600px'
        height='600px'
      />
    </svg>
  )
}
