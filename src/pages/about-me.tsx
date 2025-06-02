import { Category } from "@/types/category"
import Layout from "./layout"

export default function AboutMePage({
  categories,
}: {
  categories: Category[]
}) {
  return (
    <Layout
      categories={categories}
      description='About Haroun Abidi'
      keywords=''>
      <section class='max-w-[45rem] space-y-4 my-2 mx-auto px-4'>
        <h1 class='text-2xl font-bold'>About Me</h1>
        <p>
          Hello! I'm a passionate software developer with a love for creating
          innovative solutions. I enjoy exploring new technologies and sharing
          my knowledge through writing.
        </p>
      </section>
    </Layout>
  )
}
