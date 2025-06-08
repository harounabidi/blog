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
      <div class='max-w-[45rem] mx-auto px-4'>
        <h1 class='text-xl font-bold'>All articles</h1>
      </div>
      <Articles articles={articles} />
    </Layout>
  )
}
