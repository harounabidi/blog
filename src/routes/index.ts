import { Router } from "../../server/app"
import { drizzle } from "drizzle-orm/d1"
import { category, post } from "@/schemas/drizzle"
import { eq } from "drizzle-orm"
import HomePage from "../pages/home"

const router = Router()

router.get("/", async (c) => {
  const db = drizzle(c.env.DB)

  // Join posts with categories to get category slug for each post
  const postsWithCategories = await db
    .select({
      id: post.id,
      title: post.title,
      cover: post.cover,
      slug: post.slug,
      content: post.content,
      summary: post.summary,
      readingTime: post.readingTime,
      status: post.status,
      publishedAt: post.publishedAt,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      categoryId: post.categoryId,
      categorySlug: category.slug,
    })
    .from(post)
    .innerJoin(category, eq(post.categoryId, category.id))
    .orderBy(post.createdAt)

  const categories = await db.select().from(category).orderBy(category.name)

  return c.html(HomePage({ posts: postsWithCategories, categories }))
})

export default router
