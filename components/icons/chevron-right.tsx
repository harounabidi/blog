import type { JSX } from "hono/jsx"

export default function ChevronRight(props: JSX.HTMLAttributes) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' {...props}>
      <path
        fill='currentColor'
        d='m13.172 12l-4.95-4.95l1.414-1.413L16 12l-6.364 6.364l-1.414-1.415z'
      />
    </svg>
  )
}
