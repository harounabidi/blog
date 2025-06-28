import type { JSX } from "hono/jsx"

export default function ChevronLeft(props: JSX.HTMLAttributes) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' {...props}>
      <path
        fill='currentColor'
        d='m10.828 12l4.95 4.95l-1.414 1.415L8 12l6.364-6.364l1.414 1.414z'
      />
    </svg>
  )
}
