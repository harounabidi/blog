import { JSX } from "hono/jsx"

export default function Image(props: JSX.HTMLAttributes) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox={`0 0 ${props.width || 1200} ${props.height || 630}`}
      {...props}>
      <rect width='100%' height='100%' fill='#e1e1e1' />
      <text
        x='50%'
        y='50%'
        font-family='-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", "Helvetica, Arial, sans-serif", "Apple Color Emoji", "Segoe UI Emoji"'
        font-size='50'
        font-weight='600'
        text-anchor='center'
        fill='#1a1a1a'>
        {props.title || "Image not found"}
      </text>
    </svg>
  )
}
