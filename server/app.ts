import { Hono } from "hono"
import { Env } from "../types/env"
// import { csrf } from "hono/csrf"
import NotFound from "../src/pages/404"
import { logger } from "hono/logger"
import OG from "@/components/og"
import { drizzle } from "drizzle-orm/d1"
import { category, article } from "@/schemas/drizzle"
import { eq } from "drizzle-orm"
import { middleware } from "./middleware"
import Error from "@/src/pages/error"

export function Router() {
  return new Hono<{ Bindings: Env }>({
    strict: false,
  })
}

export default function App() {
  const app = Router()

  // Security headers middleware
  // app.use(
  //   "*",
  //   secureHeaders({
  //     contentSecurityPolicy: {
  //       defaultSrc: ["'self'"],
  //       styleSrc: ["'self'", "'unsafe-inline'"],
  //       scriptSrc: ["'self'"],
  //       imgSrc: ["'self'", "data:", "https:"],
  //       connectSrc: ["'self'"],
  //       fontSrc: ["'self'"],
  //       objectSrc: ["'none'"],
  //       mediaSrc: ["'self'"],
  //       frameSrc: ["'none'"],
  //     },
  //     crossOriginEmbedderPolicy: false, // Disable for Cloudflare Pages
  //   })
  // )

  // Enable CSRF protection for state-changing operations
  // app.use("/article/*", csrf())

  app.use("*", logger())
  app.use("*", middleware)

  app.get("/robots.txt", (c) => {
    return c.text("User-agent: *\nDisallow: /api/", 200, {
      "Content-Type": "text/plain",
    })
  })

  app.get("/manifest.webmanifest", (c) => {
    // const theme = getCookie(c, "theme")
    return c.json(
      {
        name: "Haroun Abidi's Blog",
        short_name: "Haroun Abidi",
        description: "A blog about web development, programming, and more.",
        start_url: "/",
        display: "standalone",
        // background_color:
        //   theme === "dark" ? "hsl(0, 0%, 10%)" : "hsl(0, 0%, 100%)",
        // theme_color: theme === "dark" ? "hsl(0, 0%, 10%)" : "hsl(0, 0%, 100%)",
        icons: [
          {
            src: "/favicon/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/favicon/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/favicon/favicon-32x32.png",
            sizes: "32x32",
            type: "image/png",
          },
          {
            src: "/favicon/favicon-16x16.png",
            sizes: "16x16",
            type: "image/png",
          },
        ],
      },
      200,
      { "Content-Type": "application/manifest+json" }
    )
  })

  app.get("/sitemap.xml", async (c) => {
    const db = drizzle(c.env.DB)
    const articles = await db
      .select({
        slug: article.slug,
        categorySlug: category.slug,
      })
      .from(article)
      .innerJoin(category, eq(article.categoryId, category.id))
      .orderBy(article.createdAt)

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://harounabidi.com/</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>https://harounabidi.com/bio</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.5</priority>
      </url>
      <url>
        <loc>https://harounabidi.com/about</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.5</priority>
      </url>
      <url>
        <loc>https://harounabidi.com/contact</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.5</priority>
      </url>
      ${articles
        .map(
          (article) => `<url>
        <loc>https://harounabidi.com/${article.categorySlug}/${
            article.slug
          }</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.5</priority>
      </url>`
        )
        .join("")}
    </urlset>`

    return c.text(sitemap, 200, {
      "Content-Type": "application/xml",
    })
  })

  app.get("/og.svg", (c) => {
    return c.html(OG({}), 200, {
      "Content-Type": "image/svg+xml",
    })
  })

  app.get("/cdn/*", async (c) => {
    const path = c.req.path.replace("/cdn/", "")
    const targetUrl = `${c.env.CLOUDINARY_URL}/${path}`

    const response = await fetch(targetUrl)

    if (!response.ok) {
      return c.redirect(
        "https://placehold.co/600x400?text=Image+Not+Found&font=source-sans-pro",
        302
      )
    }

    return new Response(response.body, {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("Content-Type") || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    })
  })

  app.notFound((c) => {
    return c.html(NotFound(c), 404)
  })

  app.onError((err, c) => {
    return c.html(Error(c), 500)
  })

  return app
}
