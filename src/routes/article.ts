import { Router } from "../../server/app"
import { drizzle } from "drizzle-orm/d1"
import { category, article, subscriber } from "@/schemas/drizzle"
import { eq, and } from "drizzle-orm"
import Article from "../pages/article"
import authenticateApiKey from "@/utils/authenticate"
import { processBatchEmails } from "@/utils/batch-email"
import EmailArticle from "@/templates/article"

const router = Router()

router.get("/:categorySlug/:articleSlug", async (c) => {
  const db = drizzle(c.env.DB)
  const categorySlug = c.req.param("categorySlug")
  const articleSlug = c.req.param("articleSlug")

  const categories = await db
    .select()
    .from(category)
    .where(eq(category.slug, categorySlug))

  if (!categories[0]) {
    return c.notFound()
  }

  // Then find the article by slug and ensure it belongs to the category
  const articles = await db
    .select()
    .from(article)
    .where(
      and(
        eq(article.slug, articleSlug),
        eq(article.categoryId, categories[0].id)
      )
    )

  if (!articles[0]) {
    return c.notFound()
  }

  return c.html(
    Article({
      c,
      article: articles[0],
      category: categories[0],
    })
  )
})

router.post("/article", authenticateApiKey, async (c) => {
  try {
    c.res.headers.set("X-Content-Type-Options", "nosniff")
    c.res.headers.set("X-Frame-Options", "DENY")
    c.res.headers.set("X-XSS-Protection", "1; mode=block")

    const db = drizzle(c.env.DB)
    const formData = await c.req.formData()
    const now = Date.now()

    const content = String(formData.get("content") || "")

    const slug = String(formData.get("slug") || "")
      .trim()
      .toLowerCase()

    const existingArticles = await db
      .select()
      .from(article)
      .where(eq(article.slug, slug))
    if (existingArticles.length > 0) {
      return c.json({ error: "Slug must be unique" }, 400)
    }

    const categoryId = String(formData.get("category_id") || "").trim()
    const categoryExists = await db
      .select()
      .from(category)
      .where(eq(category.id, categoryId))
    if (categoryExists.length === 0) {
      return c.json({ error: "Invalid category ID" }, 400)
    }

    const newArticle = {
      id: crypto.randomUUID(),
      title: String(formData.get("title") || "").trim(),
      language: String(formData.get("language") || "").trim(),
      content: content,
      slug: slug,
      summary: String(formData.get("summary") || "").trim(),
      cover: String(formData.get("cover") || "").trim(),
      readingTime: parseInt(String(formData.get("reading_time") || "0"), 10),
      status: "draft",
      publishedAt: now,
      createdAt: now,
      updatedAt: now,
      categoryId: categoryId,
    }

    const result = await db.insert(article).values(newArticle).returning()

    if (result.length === 0) {
      return c.json({ error: "Failed to create article" }, 500)
    }

    // get only emails of all subscribers
    // After article creation, optionally send email notifications
    const shouldNotify = formData.get("notify_subscribers") === "true"

    if (shouldNotify) {
      // We'll use the async endpoint for better reliability
      // Send a request to our own notification endpoint
      try {
        // Construct URL for the notification endpoint
        const url = new URL(c.req.url)
        const notifyUrl = `${url.protocol}//${url.host}/article/notify`

        const notifyResponse = await fetch(notifyUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY":
              c.req.header("x-api-key") ||
              c.req.header("authorization")?.replace("Bearer ", "") ||
              "",
          },
          body: JSON.stringify({
            articleId: result[0].id,
          }),
        })

        if (!notifyResponse.ok) {
          console.error(
            "Failed to trigger notification process:",
            await notifyResponse.text()
          )
        } else {
          console.log("Notification process triggered successfully")
        }
      } catch (error) {
        console.error("Error triggering notification process:", error)
      }
    }

    await c.env.KV.delete("home") // Invalidate cache for home page

    return c.json({
      message: "Article created successfully",
      article: {
        id: result[0].id,
        title: result[0].title,
        slug: result[0].slug,
        status: result[0].status,
        createdAt: result[0].createdAt,
      },
    })
  } catch (error) {
    console.error("Error creating article:", error)
    return c.json({ error: "Internal server error" }, 500)
  }
})

router.post("/article/notify", authenticateApiKey, async (c) => {
  try {
    const db = drizzle(c.env.DB)
    const body = await c.req.json()

    // Validate required parameters
    if (!body.articleId) {
      return c.json({ error: "Article ID is required" }, 400)
    }

    // Get article details
    const articles = await db
      .select()
      .from(article)
      .where(eq(article.id, body.articleId))

    if (articles.length === 0) {
      return c.json({ error: "Article not found" }, 404)
    }

    const articleData = articles[0]

    // Get category info
    const categories = await db
      .select()
      .from(category)
      .where(eq(category.id, articleData.categoryId))

    if (categories.length === 0) {
      return c.json({ error: "Category not found" }, 404)
    }

    // Combine article with category for template
    const articleWithCategory = {
      ...articleData,
      categorySlug: categories[0].slug,
    }

    // Get subscribers
    const subscribers = await db
      .select({ email: subscriber.email })
      .from(subscriber)

    // Start processing in the background - this allows the endpoint to return quickly
    // while processing continues
    c.executionCtx.waitUntil(
      (async () => {
        if (subscribers.length === 0) {
          console.log("No subscribers to notify")
          return
        }

        try {
          // Process all subscribers using our batch processing utility
          const results = await processBatchEmails({
            items: subscribers,
            batchSize: 10,
            delayBetweenBatches: 2000,
            encryptionKey: c.env.ENCRYPTION_KEY,
            mailConfig: {
              url: c.env.ZEPTOMAIL_API_URL,
              token: c.env.ZEPTOMAIL_TOKEN,
              from: c.env.ZEPTOMAIL_FROM,
              subject: `New Article: ${articleData.title}`,
            },
            processItem: async (subscriber, encryptedEmail) => {
              // Create personalized email body
              const emailBody = EmailArticle({
                url: "https://harounabidi.com",
                email: encryptedEmail,
                article: articleWithCategory,
              })

              // Convert JSX to HTML string
              try {
                return emailBody.toString()
              } catch (error) {
                // Fallback to a simpler template if rendering fails
                return `
                <html>
                  <body>
                    <h1>New Article: ${articleWithCategory.title}</h1>
                    <p>${articleWithCategory.summary}</p>
                    <p>Read the full article: 
                      <a href="https://harounabidi.com/${categories[0].slug}/${articleWithCategory.slug}">
                        ${articleWithCategory.title}
                      </a>
                    </p>
                    <hr>
                    <p>
                      <a href="https://harounabidi.com/unsubscribe/${encryptedEmail}">
                        Unsubscribe
                      </a>
                    </p>
                  </body>
                </html>
              `
              }
            },
          })

          console.log(
            `Completed sending notifications for article ${articleData.id}:`
          )
          console.log(
            `Total: ${results.total}, Successful: ${results.successful}, Failed: ${results.failed}`
          )

          if (results.errors.length > 0) {
            console.error(
              `Errors (${results.errors.length}):`,
              results.errors.slice(0, 5)
            )
          }
        } catch (error) {
          console.error("Error in background email processing:", error)
        }
      })()
    )

    return c.json({
      message: "Email notification processing started",
      subscriberCount: subscribers.length,
    })
  } catch (error) {
    console.error("Error in notification endpoint:", error)
    return c.json({ error: "Internal server error" }, 500)
  }
})

router.post("/article/:id/notify", authenticateApiKey, async (c) => {
  try {
    const db = drizzle(c.env.DB)
    const articleId = c.req.param("id")

    if (!articleId) {
      return c.json({ error: "Article ID is required" }, 400)
    }

    // Get article details
    const articles = await db
      .select()
      .from(article)
      .where(eq(article.id, articleId))

    if (articles.length === 0) {
      return c.json({ error: "Article not found" }, 404)
    }

    // Trigger the notification process using the async endpoint
    try {
      const url = new URL(c.req.url)
      const notifyUrl = `${url.protocol}//${url.host}/article/notify`

      const notifyResponse = await fetch(notifyUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": c.req.header("X-API-KEY") || "",
        },
        body: JSON.stringify({
          articleId: articleId,
        }),
      })

      if (!notifyResponse.ok) {
        const errorText = await notifyResponse.text()
        return c.json(
          { error: `Failed to trigger notification: ${errorText}` },
          500
        )
      }

      const result = (await notifyResponse.json()) as {
        subscriberCount: number
      }
      return c.json({
        message: "Notification process triggered successfully",
        subscriberCount: result.subscriberCount,
      })
    } catch (error) {
      console.error("Error triggering notification process:", error)
      return c.json({ error: "Failed to trigger notification process" }, 500)
    }
  } catch (error) {
    console.error("Error in manual notification endpoint:", error)
    return c.json({ error: "Internal server error" }, 500)
  }
})

export default router
