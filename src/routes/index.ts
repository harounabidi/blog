import { Router } from "../../server/app"
import { drizzle } from "drizzle-orm/d1"
import { category, post } from "@/schemas/drizzle"
import { eq } from "drizzle-orm"
import HomePage from "../pages"

const router = Router()

router.get("/", async (c) => {
  const db = drizzle(c.env.DB)

  // Join posts with categories to get category slug for each post
  const posts = await db
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

  // return the markup from kv
  const cachedHomePage = await c.env.KV.get("home")
  if (cachedHomePage) {
    return c.html(cachedHomePage)
  }

  // If not cached, return the generated page
  const pageContent = await HomePage({ posts, categories })
  const htmlContent = pageContent.toString()
  await c.env.KV.put("home", htmlContent, {
    expirationTtl: 60 * 60 * 24, // Cache for 1 day
  })

  return c.html(htmlContent)
})

export default router
