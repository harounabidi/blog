import { Router } from "@/server/app"
import ThankYouPage from "../pages/thank-you-page"
import { drizzle } from "drizzle-orm/d1"
import { category } from "@/schemas/drizzle"

const router = Router()

router.get("/thank-you", async (c) => {
  const db = drizzle(c.env.DB)
  const categories = await db.select().from(category).orderBy(category.name)

  return c.html(
    ThankYouPage({
      categories,
    })
  )
})

export default router
