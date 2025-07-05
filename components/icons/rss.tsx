import { JSX } from "hono/jsx"

export default function RSS(props: JSX.HTMLAttributes) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' {...props}>
      <circle cx={5} cy={19} r={2} fill='currentColor'></circle>
      <g
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2.5}>
        <path d='M4 11c2.39 0 4.68 0.95 6.36 2.64c1.69 1.68 2.64 3.97 2.64 6.36'></path>
        <path d='M4 4c4.24 0 8.31 1.69 11.31 4.69c3 3 4.69 7.07 4.69 11.31'></path>
      </g>
    </svg>
  )
}
