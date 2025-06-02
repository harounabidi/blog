import { Router } from "@/server/app"
import { drizzle } from "drizzle-orm/d1"
import { subscriber } from "@/schemas/drizzle"
import { eq } from "drizzle-orm"
import { mail } from "@/utils/mail"
import helloNewSubscriber from "@/templates/hello"

const router = Router()

router.post("/subscribe", async (c) => {
  const db = drizzle(c.env.DB)
  const formData = await c.req.formData()
  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase()

  if (!email) {
    return c.json({ error: "Email is required" }, 400)
  }

  const existingSubscriber = await db
    .select()
    .from(subscriber)
    .where(eq(subscriber.email, email))

  if (existingSubscriber.length > 0) {
    return c.json({ error: "Email already subscribed" }, 400)
  }

  const newSubscriber = {
    id: crypto.randomUUID(),
    email,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }

  const result = await db.insert(subscriber).values(newSubscriber).returning()

  if (result.length === 0) {
    return c.json({ error: "Failed to subscribe" }, 500)
  }

  await mail({
    url: c.env.ZEPTOMAIL_API_URL,
    token: c.env.ZEPTOMAIL_TOKEN,
    from: "Haroun Abidi",
    email,
    subject: "Welcome to the Blog — Let’s Stay in Touch! 👋",
    body: helloNewSubscriber({ url: "https://blog.harounabidi.com", email }),
    name: email,
  })

  return c.json({ message: "Subscription successful" })
})

export default router
