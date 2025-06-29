import { Router } from "@/server/app"
import Bio from "../pages/bio"

const router = Router()

router.get("/bio", async (c) => {
  return c.html(Bio(c))
})

export default router
