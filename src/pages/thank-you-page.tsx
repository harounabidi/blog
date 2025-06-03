import { Category } from "@/types/category"
import Layout from "./layout"

export default function ThankYouPage({
  categories,
}: {
  categories: Category[]
}) {
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
        <p>
          News will be sent to your inbox soon. Please check your email to
          confirm your subscription and start receiving updates. If you don't
          see the confirmation email, please check your spam folder.
        </p>
        {/* Success! I just sent you a welcome email, which includes the “Josh
        Starter Pack”, a collection of my most popular content. 😄 */}
      </section>
    </Layout>
  )
}
