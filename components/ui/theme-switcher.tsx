import Moon from "../icons/moon"
import Sun from "../icons/sun"

export default function ThemeSwitcher() {
  return (
    <button
      type='button'
      id='theme-toggle'
      class='cursor-pointer grid [grid-template-areas:"stack"] rounded-full py-5'
      aria-label='Toggle dark mode'
      aria-pressed='false'
      title='Toggle dark mode'>
      <Moon
        class='w-5 h-5 [grid-area:stack] invisible'
        id='theme-toggle-moon'
      />
      <Sun class='w-5 h-5 [grid-area:stack]' id='theme-toggle-sun' />
    </button>
  )
}
