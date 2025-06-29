import { Router } from "@/server/app"
import ThankYou from "../pages/thank-you"

const router = Router()

router.get("/thank-you", async (c) => {
  return c.html(
    ThankYou({
      c,
    })
  )
})

export default router
