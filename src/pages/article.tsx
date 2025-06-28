import { Article } from "@/types/article"
import Layout from "./layout"
import { parseMarkdown } from "@/utils/parse-md"
import ArticleCover from "@/components/article-cover"
import { Context } from "hono"
import { Env } from "@/types/env"
import { Category } from "@/types/category"
import { css } from "hono/css"

export default function Article({
  c,
  article,
  category,
}: {
  c: Context<{
    Bindings: Env
  }>
  article: Article
  category: Category
}) {
  const content = parseMarkdown(article.content)

  return (
    <Layout
      c={c}
      title={article.title}
      description={article.summary}
      canonical={`https://harounabidi.com/${category.slug}/${article.slug}`}
      publishedAt={article.createdAt}
      updatedAt={article.updatedAt}
      image={article.cover || "/og.svg"}>
      <section id='article' class='max-w-[45rem] mx-auto px-4'>
        <h1>{article.title}</h1>
        <article>
          <p class='text-sm text-foreground-muted'>
            {new Date(article.createdAt).toLocaleDateString("en-UK", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}{" "}
            • 📖 {article.readingTime} min read
          </p>

          {article.cover && <ArticleCover cover={article.cover} />}

          <div
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
        </article>
      </section>
    </Layout>
  )
}
