import { Article } from "@/types/article"
import Layout from "./layout"
import { Category } from "@/types/category"
import Articles from "@/components/articles"

export default async function HomePage({
  articles,
  categories,
}: {
  articles: Article[]
  categories: Category[]
}) {
  return (
    <Layout categories={categories}>
      <div class='max-w-[45rem] mx-auto px-4'>
        <h1 class='text-xl font-bold'>All articles</h1>
      </div>
      <Articles articles={articles} />
    </Layout>
  )
}
