import { Article } from "@/types/article"
import Layout from "./layout"
import { parseMarkdown } from "@/utils/parse-md"
import ArticleCover from "@/components/article-cover"
import { Category } from "@/types/category"

export default function Article({
  article,
  categories,
  category,
}: {
  article: Article
  categories: Category[]
  category: Category
}) {
  const content = parseMarkdown(article.content)

  return (
    <Layout
      title={article.title}
      description={article.summary}
      categories={categories}
      canonical={`https://blog.harounabidi.com/${category.slug}/${article.slug}`}
      publishedAt={article.createdAt}
      updatedAt={article.updatedAt}
      image={article.cover || "/og.svg"}>
      <section class='max-w-[45rem] mx-auto px-4'>
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
