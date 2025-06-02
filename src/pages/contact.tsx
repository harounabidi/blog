import { Category } from "@/types/category"
import Layout from "./layout"

export default function ContactPage({
  categories,
}: {
  categories: Category[]
}) {
  return (
    <Layout categories={categories}>
      <section class='max-w-[45rem] space-y-4 my-2 mx-auto px-4'>
        <h1 class='text-2xl font-bold'>Contact Me</h1>
      </section>
    </Layout>
  )
}
