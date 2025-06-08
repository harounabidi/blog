import { Category } from "@/types/category"
import Layout from "./layout"

export default function ThankYou({ categories }: { categories: Category[] }) {
  return (
    <Layout
      categories={categories}
      title='Thank You'
      description='Thank you for subscribing to my newsletter! Your support means a lot to me.'>
      <section class='max-w-[45rem] space-y-4 my-2 mx-auto px-4'>
        <h1 class='text-2xl font-bold'>Thank You 🙏</h1>
        <p>
          Thank you for subscribing to my newsletter! Your support means a lot
          to me.
        </p>
        <p>I just sent you a welcome email with my latest article. Enjoy!</p>
      </section>
    </Layout>
  )
}
