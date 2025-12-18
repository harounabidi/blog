import { ThemeManager } from "./theme-manager.js"
import { ScrollHeaderManager } from "./scroll-header-manager.js"
import { SubscribeToNewsletter } from "./subscribe-newsletter.js"
import { CategoriesScrollManager } from "./categories-scroll-manager.js"
import Image from "./image.js"

// Wait for both DOM and stylesheets to be ready
const initializeApp = async () => {
  // Ensure all stylesheets are loaded
  await Promise.all(
    Array.from(document.styleSheets).map((sheet) => {
      if (sheet.href) {
        return new Promise<void>((resolve) => {
          // If already loaded, resolve immediately
          try {
            sheet.cssRules // Test if accessible
            resolve()
          } catch {
            // Wait for load event
            const link = document.querySelector(`link[href="${sheet.href}"]`)
            if (link) {
              link.addEventListener("load", () => resolve(), { once: true })
            } else {
              resolve()
            }
          }
        })
      }
      return Promise.resolve()
    })
  )

  const themeManager = new ThemeManager()
  const scrollHeaderManager = new ScrollHeaderManager()
  const subscribeToNewsletter = new SubscribeToNewsletter()
  const categoriesScrollManager = new CategoriesScrollManager()

  themeManager.init()
  scrollHeaderManager.init()
  subscribeToNewsletter.init()
  categoriesScrollManager.init()

  Image()
}

if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", initializeApp)
} else {
  initializeApp()
}
