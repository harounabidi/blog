import { Router } from "../../server/app"
import { drizzle } from "drizzle-orm/d1"
import { category, article } from "@/schemas/drizzle"
import { eq } from "drizzle-orm"
import HomePage from "../pages"

const router = Router()

router.get("/", async (c) => {
  const db = drizzle(c.env.DB)

  // Join articles with categories to get category slug for each article
  const articles = await db
    .select({
      id: article.id,
      title: article.title,
      cover: article.cover,
      slug: article.slug,
      content: article.content,
      summary: article.summary,
      readingTime: article.readingTime,
      status: article.status,
      publishedAt: article.publishedAt,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
      categoryId: article.categoryId,
      categorySlug: category.slug,
    })
    .from(article)
    .innerJoin(category, eq(article.categoryId, category.id))
    .orderBy(article.createdAt)

  // return the markup from kv
  // const cachedHomePage = await c.env.KV.get("home")
  // if (cachedHomePage) {
  //   return c.html(cachedHomePage)
  // }

  // If not cached, return the generated page
  const pageContent = await HomePage({
    c,
    articles,
  })
  const htmlContent = pageContent.toString()
  // await c.env.KV.put("home", htmlContent, {
  //   expirationTtl: 60 * 60 * 24, // Cache for 1 day
  // })

  return c.html(htmlContent)
})

export default router
