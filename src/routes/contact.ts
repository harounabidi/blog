import { category } from "@/schemas/drizzle"
import { Router } from "@/server/app"
import { drizzle } from "drizzle-orm/d1"
import Contact from "../pages/contact"

const router = Router()

router.get("/contact", async (c) => {
  const db = drizzle(c.env.DB)
  const categories = await db.select().from(category).orderBy(category.name)

  return c.html(
    Contact({
      categories,
    })
  )
})

export default router
