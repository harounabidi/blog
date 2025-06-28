import { Article } from "@/types/article"
import Layout from "./layout"
import Articles from "@/components/articles"
import { Context } from "hono"
import { Env } from "@/types/env"

export default function Home({
  c,
  articles,
}: {
  c: Context<{
    Bindings: Env
  }>
  articles: Article[]
}) {
  return (
    <Layout c={c}>
      <section class='max-w-[45rem] my-2 mx-auto px-4'>
        <h1 class='text-3xl font-bold mt-4'>All articles</h1>
        <Articles articles={articles} />
      </section>
    </Layout>
  )
}
