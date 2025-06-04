import { Category } from "@/types/category"
import Layout from "./layout"
import Plane from "@/components/icons/plane"
import Loader from "@/components/icons/loader"
// import FAQ from "@/components/fasq"

// const faqs = [
//   {
//     question: "How can I contact you?",
//     answer:
//       "You can reach me through the contact form on this page or via email at contact@example.com",
//   },
//   {
//     question: "What services do you offer?",
//     answer:
//       "I specialize in full-stack development, mobile app development, and e-commerce solutions.",
//   },
//   {
//     question: "Do you take freelance projects?",
//     answer:
//       "Yes, I am open to freelance opportunities. Please contact me with details about your project.",
//   },
//   {
//     question: "Can I hire you for consulting?",
//     answer:
//       "Absolutely! I offer consulting services for startups and businesses looking to improve their tech stack or product design.",
//   },
// ]
export default function Contact({ categories }: { categories: Category[] }) {
  return (
    <Layout categories={categories}>
      <section class='max-w-[45rem] mt-6 gap-4 lg:gap-6 flex items-center justify-center flex-col lg:flex-row space-y-4 my-2 mx-auto px-4'>
        <div class='w-full max-w-sm'>
          <h1
            // style={{ fontSize: "1.5rem", marginTop: "0", marginBottom: "2rem" }}
            class='text-xl mb-4 font-bold'>
            Contact Me
          </h1>
          <form>
            <label htmlFor='name' class='block mb-2'>
              Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              required
              class='w-full border border-foreground outline-none focus:ring-1 ring-foreground rounded-sm p-2 mb-4'
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
              class='w-full border border-foreground outline-none focus:ring-1 ring-foreground rounded-sm p-2 mb-4'
              placeholder='Your email...'
            />
            <label htmlFor='message' class='block mb-2'>
              Message
            </label>
            <textarea
              id='message'
              name='message'
              required
              class='w-full border border-foreground outline-none focus:ring-1 ring-foreground rounded-sm mb-4 min-h-30 p-2'
              rows={4}
              placeholder='Your message...'
            />
            <button
              type='submit'
              aria-label='Subscribe'
              id='subscribe-submit'
              class="grid cursor-pointer w-full [grid-template-areas:'stack'] h-11 items-center justify-center bg-foreground text-background rounded-sm p-2 hover:bg-foreground/90 transition-colors duration-200 relative">
              <span
                id='contact-icon'
                class='[grid-area:stack] flex items-center gap-4 m-auto'>
                Send message
              </span>
              <Loader
                id='contact-loader'
                class='w-4 h-4 [grid-area:stack] m-auto invisible'
              />
            </button>
          </form>
        </div>
        {/* <FAQ faqs={faqs} /> */}
      </section>
    </Layout>
  )
}
