import { Article } from "@/types/article"
import Layout from "./layout"
import { parseMarkdown } from "@/utils/parse-md"
import ArticleCover from "@/components/article-cover"
import { Context } from "hono"
import { Env } from "@/types/env"
import { Category } from "@/types/category"

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
      image={article.cover || "/og"}>
      <section
        dir={article.language === "ar" ? "rtl" : "ltr"}
        id='article'
        class='max-w-[45rem] mx-auto px-4'>
        <h1>{article.title}</h1>
        <p class='text-sm text-foreground-muted'>
          {new Date(article.createdAt).toLocaleDateString(
            article.language === "ar" ? "ar-DZ" : "en-UK",
            {
              year: "numeric",
              month: "short",
              day: "numeric",
            }
          )}{" "}
          •{" "}
          {article.language === "ar"
            ? article.readingTime === 1
              ? "دقيقة قراءة"
              : article.readingTime === 2
              ? "دقيقتان قراءة"
              : article.readingTime > 10
              ? `${article.readingTime} دقيقة قراءة`
              : `${article.readingTime} دقائق قراءة`
            : `${article.readingTime} mins read`}
        </p>
        {article.cover && <ArticleCover cover={article.cover} />}
        <p class='text-[#707070] bg-[#f2f2f255] dark:bg-[#2626267a] dark:text-[#8F8F8F] rounded-sm p-4'>
          {article.summary}
        </p>
        <article>
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
