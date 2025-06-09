import { ThemeManager } from "./theme-manager.js"
import { ScrollHeaderManager } from "./scroll-header-manager.js"
import { SubscribeToNewsletter } from "./subscribe-newsletter.js"
import { CategoriesScrollManager } from "./categories-scroll-manager.js"
import { CategoryActiveManager } from "./category-active-manager.js"

// Initialize all managers when DOM is ready
window.addEventListener("DOMContentLoaded", () => {
  const themeManager = new ThemeManager()
  const scrollHeaderManager = new ScrollHeaderManager()
  const subscribeToNewsletter = new SubscribeToNewsletter()
  // const categoryActiveManager = new CategoryActiveManager()
  const categoriesScrollManager = new CategoriesScrollManager()

  themeManager.init()
  scrollHeaderManager.init()
  subscribeToNewsletter.init()
  categoriesScrollManager.init()
  // categoryActiveManager.init()
})
