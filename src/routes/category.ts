import { Router } from "../../server/app"
import { drizzle } from "drizzle-orm/d1"
import { category, post } from "@/schemas/drizzle"
import { eq } from "drizzle-orm"
import CategoryPage from "../pages/category"
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

  // Get all published posts in this category
  const posts = await db
    .select({
      id: post.id,
      title: post.title,
      slug: post.slug,
      content: post.content,
      summary: post.summary,
      cover: post.cover,
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
    .where(eq(category.slug, slug))
    .orderBy(post.publishedAt)

  return c.html(
    CategoryPage({
      category: categories[0],
      posts: posts,
      categories: allCategories,
    })
  )
})

export default router
