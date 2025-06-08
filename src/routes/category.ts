import { Router } from "../../server/app"
import { drizzle } from "drizzle-orm/d1"
import { category, article } from "@/schemas/drizzle"
import { eq } from "drizzle-orm"
import Category from "../pages/category"
import authenticateApiKey from "@/utils/authenticate"

const router = Router()

router.post("/category", authenticateApiKey, async (c) => {
  const db = drizzle(c.env.DB)
  const formData = await c.req.formData()
  const now = Date.now()

  const name = String(formData.get("name") || "").trim()
  const slug = String(formData.get("slug") || "")
    .trim()
    .toLowerCase()

  if (!name || !slug) {
    return c.json({ error: "Name and slug are required" }, 400)
  }

  const existingCategory = await db
    .select()
    .from(category)
    .where(eq(category.slug, slug))

  if (existingCategory.length > 0) {
    return c.json({ error: "Category with this slug already exists" }, 400)
  }

  const newCategory = {
    id: crypto.randomUUID(),
    name,
    slug,
    createdAt: now,
    updatedAt: now,
  }

  const result = await db.insert(category).values(newCategory).returning()

  return c.json(result[0])
})

router.get("/categories", async (c) => {
  const db = drizzle(c.env.DB)
  const categories = await db.select().from(category).orderBy(category.name)

  return c.json(categories)
})

router.get("/:slug", async (c) => {
  const db = drizzle(c.env.DB)
  const slug = c.req.param("slug")

  const allCategories = await db.select().from(category).orderBy(category.name)

  // Get the category by slug
  const categories = await db
    .select()
    .from(category)
    .where(eq(category.slug, slug))

  if (!categories[0]) {
    return c.notFound()
  }

  // Get all published articles in this category
  const articles = await db
    .select({
      id: article.id,
      title: article.title,
      slug: article.slug,
      content: article.content,
      summary: article.summary,
      cover: article.cover,
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
    .where(eq(category.slug, slug))
    .orderBy(article.publishedAt)

  return c.html(
    Category({
      c,
      articles,
      category: categories[0],
    })
  )
})

export default router
