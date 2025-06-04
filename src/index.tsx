import App from "../server/app"
import article from "./routes/article"
import category from "./routes/category"
import subscribe from "./routes/subscribe"
import about from "./routes/about"
import bio from "./routes/bio"
import contact from "./routes/contact"
import thankYou from "./routes/thank-you"
import rss from "./routes/rss"
import index from "./routes"
import { serveStatic } from "hono/cloudflare-pages"

const app = App()

const routes = [
  index,
  bio,
  about,
  contact,
  thankYou,
  subscribe,
  rss,
  article,
  category,
]

routes.forEach((route) => {
  app.route("/", route)
})

app.use("/*", serveStatic())

export default app
