import { category } from "@/schemas/drizzle"
import { Router } from "@/server/app"
import { drizzle } from "drizzle-orm/d1"
import AboutBlogPage from "../pages/about-blog"

const router = Router()

router.get("/about-blog", async (c) => {
  const db = drizzle(c.env.DB)
  const categories = await db.select().from(category).orderBy(category.name)

  return c.html(
    AboutBlogPage({
      categories,
    })
  )
})

export default router
