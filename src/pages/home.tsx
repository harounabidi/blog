import { Post } from "@/types/post"
import Layout from "./layout"
import { Category } from "@/types/category"
import PostList from "@/components/post-list"

export default async function HomePage({
  posts,
  categories,
}: {
  posts: Post[]
  categories: Category[]
}) {
  return (
    <Layout categories={categories}>
      <div class='max-w-[45rem] mx-auto px-4'>
        <h1 class='text-xl font-bold'>All posts</h1>
      </div>
      <PostList posts={posts} />
    </Layout>
  )
}
