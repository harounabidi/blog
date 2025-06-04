import { Category } from "@/types/category"
import type { Article } from "../../types/article"
import Layout from "./layout"
import Articles from "@/components/articles"

export default function Category({
  category,
  categories,
  articles,
  currentPath,
}: {
  category: { id: string; name: string; slug: string }
  categories: Category[]
  articles: Article[]
  currentPath?: string
}) {
  return (
    <Layout categories={categories} currentPath={currentPath}>
      <div class='max-w-[45rem] mx-auto px-4'>
        <h1 class='text-xl font-bold'>{category.name}</h1>
      </div>
      <Articles articles={articles} />
    </Layout>
  )
}
