import { Router } from "@/server/app"
import { drizzle } from "drizzle-orm/d1"
import { category, post, subscriber } from "@/schemas/drizzle"
import { eq } from "drizzle-orm"
import { mail } from "@/utils/mail"
import { encryptWithPassword, decryptWithPassword } from "@/utils/hash"
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
    .limit(5)

  // Encrypt email for unsubscribe link
  const encryptedEmail = await encryptWithPassword(email, c.env.ENCRYPTION_KEY)

  const body = helloNewSubscriber({
    url: "https://blog.harounabidi.com",
    email: encryptedEmail,
    posts,
  })

  // Get plain HTML string directly from the component
  const renderedComponent = await c.html(body)
  const htmlString = await renderedComponent.text()

  const response = await mail({
    url: c.env.ZEPTOMAIL_API_URL,
    token: c.env.ZEPTOMAIL_TOKEN,
    from: c.env.ZEPTOMAIL_FROM,
    email,
    subject: "Welcome to the Blog — Let’s Stay in Touch! 👋",
    body: htmlString,
    name: email,
  })

  if (!response.success) {
    return c.json({ error: response.error }, 500)
  }

  return c.json({ message: "Subscription successful" })
})

router.get("/unsubscribe/:email", async (c) => {
  const db = drizzle(c.env.DB)
  const encryptedEmail = c.req.param("email")

  if (!encryptedEmail) {
    return c.json({ error: "Email is required" }, 400)
  }

  let email: string
  try {
    // Decrypt the email parameter
    email = await decryptWithPassword(encryptedEmail, c.env.ENCRYPTION_KEY)
  } catch (error) {
    return c.json({ error: "Invalid email parameter" }, 400)
  }

  console.log(email)

  const existingSubscriber = await db
    .select()
    .from(subscriber)
    .where(eq(subscriber.email, email))

  if (existingSubscriber.length === 0) {
    return c.json({ error: "Email not found" }, 404)
  }

  await db.delete(subscriber).where(eq(subscriber.email, email))

  return c.json({ message: "Unsubscribed successfully" })
})

export default router
