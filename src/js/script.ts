import { ThemeManager } from "./theme-manager.js"
import { ScrollHeaderManager } from "./scroll-header-manager.js"
import { SubscribeToNewsletter } from "./subscribe-newsletter.js"
import { CategoriesScrollManager } from "./categories-scroll-manager.js"
import Image from "./image.js"

const initializeApp = async () => {
  await Promise.all(
    Array.from(document.styleSheets).map((sheet) => {
      if (sheet.href) {
        return new Promise<void>((resolve) => {
          try {
            sheet.cssRules
            resolve()
          } catch {
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

  const nav = document.querySelector("nav")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      nav?.setAttribute("data-scrolled", "true")
    } else {
      nav?.removeAttribute("data-scrolled")
    }
  })

  Image()
}

if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", initializeApp)
} else {
  initializeApp()
}
