import { Router } from "../../server/app"
import { drizzle } from "drizzle-orm/d1"
import { category, post } from "@/schemas/drizzle"
import { eq, desc } from "drizzle-orm"
import { parseMarkdown } from "@/utils/parse-md"

const router = Router()

router.get("/rss.xml", async (c) => {
  const db = drizzle(c.env.DB)

  // Get all published posts with their categories
  const postsWithCategories = await db
    .select({
      id: post.id,
      title: post.title,
      slug: post.slug,
      content: post.content,
      summary: post.summary,
      publishedAt: post.publishedAt,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      categorySlug: category.slug,
      categoryName: category.name,
    })
    .from(post)
    .innerJoin(category, eq(post.categoryId, category.id))
    // .where(eq(post.status, "published"))
    .orderBy(desc(post.publishedAt))
    .limit(50) // Limit to last 50 posts

  const baseUrl = "https://blog.harounabidi.com"
  const lastBuildDate = new Date().toUTCString()
  const mostRecentPost = postsWithCategories[0] // Get the most recent (first in DESC ordered array)
  const lastPubDate = mostRecentPost
    ? new Date(
        mostRecentPost.publishedAt || mostRecentPost.createdAt
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
      <url>${baseUrl}/favicon.ico</url>
      <title>Haroun Abidi's Blog</title>
      <link>${baseUrl}</link>
    </image>
${postsWithCategories
  .map((post) => {
    const postUrl = `${baseUrl}/${post.categorySlug}/${post.slug}`
    const pubDate = new Date(post.publishedAt || post.createdAt).toUTCString()

    // Escape XML special characters
    const escapeXml = (str: string) =>
      str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;")

    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <description>${escapeXml(post.summary)}</description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <category>${escapeXml(post.categoryName)}</category>
      <content:encoded><![CDATA[${parseMarkdown(post.content).replace(
        /\n/g,
        "\n  "
      )}]]></content:encoded>
    </item>`
  })
  .join("\n")}
  </channel>
</rss>`

  // Set appropriate headers for RSS
  c.header("Content-Type", "application/rss+xml; charset=utf-8")
  c.header("Cache-Control", "public, max-age=3600") // Cache for 1 hour

  return c.text(rssXml)
})
export default router
