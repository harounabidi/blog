import { JSX } from "hono/jsx"

export default function At(props: JSX.HTMLAttributes) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' {...props}>
      <title>Email</title>
      <path
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2.5}
        d='M16 12c0 2.21 -1.79 4 -4 4c-2.21 0 -4 -1.79 -4 -4c0 -2.21 1.79 -4 4 -4c2.21 0 4 1.79 4 4v1.5c0 1.38 1.12 2.5 2.5 2.5c1.38 0 2.5 -1.12 2.5 -2.5v-1.5c0 -4.97 -4.03 -9 -9 -9c-4.97 0 -9 4.03 -9 9c0 4.97 4.03 9 9 9h4'></path>
    </svg>
  )
}
