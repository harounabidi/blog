import { JSX } from "hono/jsx"

export default function Linkedin(props: JSX.HTMLAttributes) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' {...props}>
      <title>LinkedIn</title>
      <circle cx={4} cy={4} r={2} fill='currentColor'></circle>
      <g
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={3}>
        <path d='M4 10v10'></path>
        <path d='M10 10v10'></path>
        <path d='M10 15c0 -2.76 2.24 -5 5 -5c2.76 0 5 2.24 5 5v5'></path>
      </g>
    </svg>
  )
}
