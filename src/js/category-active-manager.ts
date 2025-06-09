export class CategoryActiveManager {
  private categoriesContainer: HTMLElement | null = null

  constructor() {
    this.categoriesContainer = document.querySelector("#categories ul")
    this.addStyles()
  }

  private addStyles(): void {
    const styleId = "category-active-styles"

    // Check if styles are already added
    if (document.getElementById(styleId)) {
      return
    }

    const style = document.createElement("style")
    style.id = styleId

    document.head.appendChild(style)
  }

  private getCurrentCategory(): string {
    const pathname = window.location.pathname

    // If on homepage, return 'all'
    if (pathname === "/") {
      return "all"
    }

    // Extract category from path (e.g., /javascript, /css)
    const segments = pathname.split("/").filter((segment) => segment.length > 0)
    if (segments.length === 1) {
      return segments[0]
    }

    // If on a article page, extract category from the first segment
    if (segments.length === 2) {
      return segments[0]
    }

    return ""
  }

  private updateActiveState(): void {
    if (!this.categoriesContainer) return

    const currentCategory = this.getCurrentCategory()
    const categoryLinks = this.categoriesContainer.querySelectorAll("a")

    categoryLinks.forEach((link) => {
      const href = link.getAttribute("href")
      const isActive =
        (currentCategory === "all" && href === "/") ||
        (currentCategory !== "all" && href === `/${currentCategory}`)

      if (isActive) {
        link.classList.add("category-active")
        link.classList.remove("category-inactive")
      } else {
        link.classList.add("category-inactive")
        link.classList.remove("category-active")
      }
    })
  }

  public init(): void {
    if (!this.categoriesContainer) return

    this.updateActiveState()
    this.setupCategoryLinkListeners()

    // Update active state on navigation changes
    window.addEventListener("popstate", () => {
      this.updateActiveState()
    })
  }

  private setupCategoryLinkListeners(): void {
    if (!this.categoriesContainer) return

    const categoryLinks = this.categoriesContainer.querySelectorAll("a")
    categoryLinks.forEach((link) => {
      link.addEventListener("click", () => {
        // Small delay to allow navigation to complete before updating state
        setTimeout(() => {
          this.updateActiveState()
        }, 10)
      })
    })
  }
}
