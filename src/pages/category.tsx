import { Category } from "@/types/category"
import type { Post } from "../../types/post"
import Layout from "./layout"
import PostList from "@/components/post-list"

export default function Category({
  category,
  categories,
  posts,
  currentPath,
}: {
  category: { id: string; name: string; slug: string }
  categories: Category[]
  posts: Post[]
  currentPath?: string
}) {
  return (
    <Layout categories={categories} currentPath={currentPath}>
      <div class='max-w-[45rem] mx-auto px-4'>
        <h1 class='text-xl font-bold'>{category.name}</h1>
      </div>
      <PostList posts={posts} />
    </Layout>
  )
}
