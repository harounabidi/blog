import { JSX } from "hono/jsx"

export default function Moon(props: JSX.HTMLAttributes) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' {...props}>
      <path
        fill='currentColor'
        stroke='currentColor'
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='2'
        d='M12 3c-4.97 0 -9 4.03 -9 9c0 4.97 4.03 9 9 9c3.53 0 6.59 -2.04 8.06 -5c0 0 -6.06 1.5 -9.06 -3c-3 -4.5 1 -10 1 -10Z'
      />
    </svg>
  )
}
