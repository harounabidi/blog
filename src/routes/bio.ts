import { category } from "@/schemas/drizzle"
import { Router } from "@/server/app"
import { drizzle } from "drizzle-orm/d1"
import Bio from "../pages/bio"

const router = Router()

router.get("/bio", async (c) => {
  const db = drizzle(c.env.DB)
  const categories = await db.select().from(category).orderBy(category.name)

  return c.html(
    Bio({
      categories,
    })
  )
})

export default router
