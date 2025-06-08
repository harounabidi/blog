import { Router } from "@/server/app"
import About from "../pages/about"

const router = Router()

router.get("/about", async (c) => {
  return c.html(About(c))
})

export default router
