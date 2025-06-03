import { Category } from "@/types/category"
import Layout from "./layout"
import Plane from "@/components/icons/plane"
import Loader from "@/components/icons/loader"

export default function ContactPage({
  categories,
}: {
  categories: Category[]
}) {
  return (
    <Layout categories={categories}>
      <section class='max-w-[45rem] space-y-4 my-2 mx-auto px-4'>
        <h1 class='text-2xl font-bold'>Contact Me</h1>
        <form>
          <label htmlFor='name' class='block mb-2'>
            Name
          </label>
          <input
            type='text'
            id='name'
            name='name'
            required
            class='w-full border rounded-sm p-2 mb-4'
            placeholder='Your name...'
          />
          <label htmlFor='email' class='block mb-2'>
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            required
            class='w-full border rounded-sm p-2 mb-4'
            placeholder='Your email...'
          />
          <label htmlFor='message' class='block mb-2'>
            Message
          </label>
          <textarea
            id='message'
            name='message'
            required
            class='w-full border rounded-sm mb-4 min-h-40 p-2'
            rows={4}
            placeholder='Your message...'
          />
          <button
            type='submit'
            aria-label='Subscribe'
            id='subscribe-submit'
            class="grid cursor-pointer [grid-template-areas:'stack'] h-11 items-center justify-center bg-foreground text-background rounded-sm p-2 hover:bg-foreground/90 transition-colors duration-200 relative">
            <div
              id='contact-icon'
              class='[grid-area:stack] flex items-center gap-4 m-auto'>
              <p>Send message</p>
              <Plane class='w-5 h-5 ' />
            </div>
            <Loader
              id='contact-loader'
              class='w-4 h-4 [grid-area:stack] m-auto invisible'
            />
          </button>
        </form>
      </section>
    </Layout>
  )
}
