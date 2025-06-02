import { JSX } from "hono/jsx"

export default function Plane(props: JSX.HTMLAttributes) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' {...props}>
      <path
        fill='currentColor'
        d='M3 13h6v-2H3V1.846a.5.5 0 0 1 .741-.439l18.462 10.155a.5.5 0 0 1 0 .876L3.741 22.592A.5.5 0 0 1 3 22.154z'
      />
    </svg>
  )
}
