import { Router } from "../../server/app"
import { drizzle } from "drizzle-orm/d1"
import { category, article } from "@/schemas/drizzle"
import { eq, desc } from "drizzle-orm"
import { parseMarkdown } from "@/utils/parse-md"

const router = Router()

router.get("/rss.xml", async (c) => {
  const db = drizzle(c.env.DB)

  // Get all published articles with their categories
  const articles = await db
    .select({
      id: article.id,
      title: article.title,
      slug: article.slug,
      content: article.content,
      summary: article.summary,
      publishedAt: article.publishedAt,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
      categorySlug: category.slug,
      categoryName: category.name,
    })
    .from(article)
    .innerJoin(category, eq(article.categoryId, category.id))
    .orderBy(desc(article.publishedAt))
    .limit(50) // Limit to last 50 articles

  const baseUrl = "https://blog.harounabidi.com"
  const lastBuildDate = new Date().toUTCString()
  const mostRecentArticle = articles[0] // Get the most recent (first in DESC ordered array)
  const lastPubDate = mostRecentArticle
    ? new Date(
        mostRecentArticle.publishedAt || mostRecentArticle.createdAt
      ).toUTCString()
    : lastBuildDate

  // Generate RSS XML
  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
      <channel>
        <title>Haroun Abidi's Blog</title>
        <description>Short tutorials for developers. Next.js, React, CSS, Animation, and more!</description>
        <link>${baseUrl}</link>
        <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
        <language>en-us</language>
        <lastBuildDate>${lastBuildDate}</lastBuildDate>
        <pubDate>${lastPubDate}</pubDate>
        <ttl>1440</ttl>
        <managingEditor>haroun@harounabidi.com (Haroun Abidi)</managingEditor>
        <webMaster>haroun@harounabidi.com (Haroun Abidi)</webMaster>
        <copyright>Copyright © ${new Date().getFullYear()} Haroun Abidi</copyright>
        <category>Technology</category>
        <category>Programming</category>
        <category>Web Development</category>
        <image>
          <url>${baseUrl}/favicon/favicon-32x32.png</url>
          <title>Haroun Abidi's Blog</title>
          <link>${baseUrl}</link>
        </image>
          ${articles
            .map((article) => {
              const articleUrl = `${baseUrl}/${article.categorySlug}/${article.slug}`
              const pubDate = new Date(
                article.publishedAt || article.createdAt
              ).toUTCString()
              const escapeXml = (str: string) =>
                str
                  .replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/>/g, "&gt;")
                  .replace(/"/g, "&quot;")
                  .replace(/'/g, "&#39;")
              return `<item>
              <title>${escapeXml(article.title)}</title>
              <description>${escapeXml(article.summary)}</description>
              <link>${articleUrl}</link>
              <guid isPermaLink="true">${articleUrl}</guid>
              <pubDate>${pubDate}</pubDate>
              <category>${escapeXml(article.categoryName)}</category>
              <content:encoded>
                <![CDATA[${parseMarkdown(article.content).replace(/\n/g, "")}]]>
              </content:encoded>
            </item>`
            })
            .join("\n")}
      </channel>
    </rss>`

  return c.text(rssXml, 200, {
    "Content-Type": "application/xml",
    "Cache-Control": "public, max-age=3600",
  })
})
export default router
