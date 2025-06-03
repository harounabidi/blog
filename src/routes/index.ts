import { Router } from "../../server/app"
import { drizzle } from "drizzle-orm/d1"
import { category, post } from "@/schemas/drizzle"
import { eq } from "drizzle-orm"
import HomePage from "../pages/home"
import helloNewSubscriber from "@/templates/hello"
import { encryptWithPassword } from "@/utils/hash"

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
  // const cachedHomePage = await c.env.KV.get("home")
  // if (cachedHomePage) {
  //   return c.html(cachedHomePage)
  // }

  // // If not cached, return the generated page
  // const pageContent = await HomePage({ posts, categories })
  // const htmlContent = pageContent.toString()
  // await c.env.KV.put("home", htmlContent)

  const encryptedEmail = await encryptWithPassword(
    "harooonabidi@gmail.com",
    c.env.ENCRYPTION_KEY
  )
  return c.html(
    helloNewSubscriber({
      url: "https://blog.harounabidi.com",
      email: encryptedEmail,
      posts,
    })
  )
})

export default router
