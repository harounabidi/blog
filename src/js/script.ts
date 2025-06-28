import { ThemeManager } from "./theme-manager.js"
import { ScrollHeaderManager } from "./scroll-header-manager.js"
import { SubscribeToNewsletter } from "./subscribe-newsletter.js"
import { CategoriesScrollManager } from "./categories-scroll-manager.js"
import Image from "./image.js"

window.addEventListener("DOMContentLoaded", () => {
  const themeManager = new ThemeManager()
  const scrollHeaderManager = new ScrollHeaderManager()
  const subscribeToNewsletter = new SubscribeToNewsletter()
  const categoriesScrollManager = new CategoriesScrollManager()

  themeManager.init()
  scrollHeaderManager.init()
  subscribeToNewsletter.init()
  categoriesScrollManager.init()

  Image()
})
