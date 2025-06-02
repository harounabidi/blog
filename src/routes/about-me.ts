import { category } from "@/schemas/drizzle"
import { Router } from "@/server/app"
import { drizzle } from "drizzle-orm/d1"
import AboutMePage from "../pages/about-me"

const router = Router()

router.get("/about-me", async (c) => {
  const db = drizzle(c.env.DB)
  const categories = await db.select().from(category).orderBy(category.name)

  return c.html(
    AboutMePage({
      categories,
    })
  )
})

export default router
