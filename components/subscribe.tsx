import ArrowRight from "./icons/arrow-right"
import Loader from "./icons/loader"
import Plane from "./icons/plane"

export default function Subscribe() {
  return (
    <div class='my-4 w-full max-w-sm'>
      <h2 class='font-semibold text-lg text-start mb-2 lg:mb-4'>
        Want to stay updated with the latest articles?
      </h2>
      <p class='mb-5'>Join my newsletter</p>
      <form id='subscribe-form' class='flex items-center gap-2'>
        <input
          type='email'
          name='email'
          id='subscribe-email'
          placeholder='Your email'
          required
          class='flex-1 border border-foreground rounded-md px-3 lg:w-10 lg:h-10  h-11 outline-none focus:ring-1 focus:ring-foreground transition-colors duration-200'
        />
        <button
          type='submit'
          aria-label='Subscribe'
          id='subscribe-submit'
          class="grid cursor-pointer [grid-template-areas:'stack'] h-11 w-11 lg:w-10 lg:h-10 items-center justify-center bg-foreground text-background rounded-md p-2 hover:bg-foreground/90 transition-colors duration-200 relative">
          <Plane
            id='subscribe-plane'
            class='w-5 h-5 [grid-area:stack] m-auto'
          />
          <Loader
            id='subscribe-loader'
            class='w-4 h-4 [grid-area:stack] m-auto invisible'
          />
        </button>
      </form>
    </div>
  )
}
