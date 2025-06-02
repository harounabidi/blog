import App from "../server/app"
import post from "./routes/post"
import category from "./routes/category"
import subscribe from "./routes/subscribe"
import aboutBlog from "./routes/about-blog"
import aboutMe from "./routes/about-me"
import contact from "./routes/contact"
import rss from "./routes/rss"

import index from "./routes"
import { serveStatic } from "hono/cloudflare-pages"

const app = App()

const routes = [
  index,
  aboutMe,
  aboutBlog,
  contact,
  rss,
  post,
  category,
  subscribe,
]

routes.forEach((route) => {
  app.route("/", route)
})

app.use("/*", serveStatic())

export default app
