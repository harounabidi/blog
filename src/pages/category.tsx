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
      <section class='max-w-180 my-2 mx-auto px-4'>
        <h1 class='lg:text-3xl text-2xl font-bold mt-4'>{category.name}</h1>
        <Articles articles={articles} />
      </section>
    </Layout>
  )
}
