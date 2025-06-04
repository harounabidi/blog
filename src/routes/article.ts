import { Router } from "../../server/app"
import { drizzle } from "drizzle-orm/d1"
import { category, post } from "@/schemas/drizzle"
import { eq, and } from "drizzle-orm"
import Article from "../pages/article"
import authenticateApiKey from "@/utils/authenticate"

const router = Router()

router.get("/:categorySlug/:postSlug", async (c) => {
  const db = drizzle(c.env.DB)
  const categorySlug = c.req.param("categorySlug")
  const postSlug = c.req.param("postSlug")

  // First, find the category by slug
  const categories = await db
    .select()
    .from(category)
    .where(eq(category.slug, categorySlug))

  if (!categories[0]) {
    return c.notFound()
  }

  // Then find the post by slug and ensure it belongs to the category
  const posts = await db
    .select()
    .from(post)
    .where(and(eq(post.slug, postSlug), eq(post.categoryId, categories[0].id)))

  if (!posts[0]) {
    return c.notFound()
  }

  // Get all categories for navigation
  const allCategories = await db.select().from(category).orderBy(category.name)

  return c.html(
    Article({
      post: posts[0],
      categories: allCategories,
      category: categories[0],
    })
  )
})

router.post("/post", authenticateApiKey, async (c) => {
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

    const existingPosts = await db
      .select()
      .from(post)
      .where(eq(post.slug, slug))
    if (existingPosts.length > 0) {
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

    const newPost = {
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

    const result = await db.insert(post).values(newPost).returning()

    if (result.length === 0) {
      return c.json({ error: "Failed to create post" }, 500)
    }

    await c.env.KV.delete("home") // Invalidate cache for home page

    return c.json({
      message: "Post created successfully",
      post: {
        id: result[0].id,
        title: result[0].title,
        slug: result[0].slug,
        status: result[0].status,
        createdAt: result[0].createdAt,
      },
    })
  } catch (error) {
    console.error("Error creating post:", error)
    return c.json({ error: "Internal server error" }, 500)
  }
})

export default router
