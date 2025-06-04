import { Post } from "@/types/post"
import Layout from "./layout"
import { parseMarkdown } from "@/utils/parse-md"
import PostCover from "@/components/post-cover"
import { Category } from "@/types/category"

export default function Article({
  post,
  categories,
  category,
}: {
  post: Post
  categories: Category[]
  category: Category
}) {
  const content = parseMarkdown(post.content)

  return (
    <Layout
      title={post.title}
      description={post.summary}
      categories={categories}
      canonical={`https://blog.harounabidi.com/${category.slug}/${post.slug}`}
      publishedAt={post.createdAt}
      updatedAt={post.updatedAt}
      image={post.cover || "/og.svg"}>
      <section class='max-w-[45rem] mx-auto px-4'>
        <h1>{post.title}</h1>
        <article>
          <p class='text-sm text-foreground-muted'>
            {new Date(post.createdAt).toLocaleDateString("en-UK", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}{" "}
            • 📖 {post.readingTime} min read
          </p>

          {post.cover && <PostCover cover={post.cover} />}

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
