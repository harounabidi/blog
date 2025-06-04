import { Router } from "../../server/app"
import { drizzle } from "drizzle-orm/d1"
import { category, article } from "@/schemas/drizzle"
import { eq, and } from "drizzle-orm"
import Article from "../pages/article"
import authenticateApiKey from "@/utils/authenticate"

const router = Router()

router.get("/:categorySlug/:articleSlug", async (c) => {
  const db = drizzle(c.env.DB)
  const categorySlug = c.req.param("categorySlug")
  const articleSlug = c.req.param("articleSlug")

  const categories = await db
    .select()
    .from(category)
    .where(eq(category.slug, categorySlug))

  if (!categories[0]) {
    return c.notFound()
  }

  // Then find the article by slug and ensure it belongs to the category
  const articles = await db
    .select()
    .from(article)
    .where(
      and(
        eq(article.slug, articleSlug),
        eq(article.categoryId, categories[0].id)
      )
    )

  if (!articles[0]) {
    return c.notFound()
  }

  // Get all categories for navigation
  const allCategories = await db.select().from(category).orderBy(category.name)

  return c.html(
    Article({
      article: articles[0],
      categories: allCategories,
      category: categories[0],
    })
  )
})

router.post("/article", authenticateApiKey, async (c) => {
  try {
    c.res.headers.set("X-Content-Type-Options", "nosniff")
    c.res.headers.set("X-Frame-Options", "DENY")
    c.res.headers.set("X-XSS-Protection", "1; mode=block")

    const db = drizzle(c.env.DB)
    const formData = await c.req.formData()
    const now = Date.now()

    const content = String(formData.get("content") || "")

    const slug = String(formData.get("slug") || "")
      .trim()
      .toLowerCase()

    const existingArticles = await db
      .select()
      .from(article)
      .where(eq(article.slug, slug))
    if (existingArticles.length > 0) {
      return c.json({ error: "Slug must be unique" }, 400)
    }

    const categoryId = String(formData.get("category_id") || "").trim()
    const categoryExists = await db
      .select()
      .from(category)
      .where(eq(category.id, categoryId))
    if (categoryExists.length === 0) {
      return c.json({ error: "Invalid category ID" }, 400)
    }

    const newArticle = {
      id: crypto.randomUUID(),
      title: String(formData.get("title") || "").trim(),
      content: content,
      slug: slug,
      summary: String(formData.get("summary") || "").trim(),
      cover: String(formData.get("cover") || "").trim(),
      readingTime: parseInt(String(formData.get("reading_time") || "0"), 10),
      status: "draft",
      publishedAt: now,
      createdAt: now,
      updatedAt: now,
      categoryId: categoryId,
    }

    const result = await db.insert(article).values(newArticle).returning()

    if (result.length === 0) {
      return c.json({ error: "Failed to create article" }, 500)
    }

    await c.env.KV.delete("home") // Invalidate cache for home page

    return c.json({
      message: "Article created successfully",
      article: {
        id: result[0].id,
        title: result[0].title,
        slug: result[0].slug,
        status: result[0].status,
        createdAt: result[0].createdAt,
      },
    })
  } catch (error) {
    console.error("Error creating article:", error)
    return c.json({ error: "Internal server error" }, 500)
  }
})

export default router
