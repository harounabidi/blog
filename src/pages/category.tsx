import { Category } from "@/types/category"
import type { Article } from "../../types/article"
import Layout from "./layout"
import Articles from "@/components/articles"
import { Context } from "hono"
import { Env } from "@/types/env"

export default function Category({
  c,
  category,
  articles,
}: {
  c: Context<{
    Bindings: Env
  }>
  category: { id: string; name: string; slug: string }
  articles: Article[]
}) {
  return (
    <Layout c={c} title={category.name}>
      <div class='max-w-[45rem] mx-auto px-4'>
        <h1 class='text-xl font-bold'>{category.name}</h1>
      </div>
      <Articles articles={articles} />
    </Layout>
  )
}
