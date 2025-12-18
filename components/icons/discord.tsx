import { JSX } from "hono/jsx"

export default function Discord(props: JSX.HTMLAttributes) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' {...props}>
      <g fill='currentColor'>
        <circle cx={9} cy={12} r={1.5}></circle>
        <circle cx={15} cy={12} r={1.5}></circle>
      </g>
      <g
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}>
        <path d='M12 6h2l1 -2c0 0 2.5 0.5 4 1.5c3.53 2.35 3 9.5 3 10.5c-1.33 2.17 -5.5 3.5 -5.5 3.5l-1 -2M12 6h-2l-0.97 -2c0 0 -2.5 0.5 -4 1.5c-3.53 2.35 -3 9.5 -3 10.5c1.33 2.17 5.5 3.5 5.5 3.5l1 -2'></path>
        <path d='M5.5 16c5 2.5 8 2.5 13 0'></path>
      </g>
    </svg>
  )
}
