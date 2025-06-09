export class CategoriesScrollManager {
  private categoriesContainer: HTMLElement | null = null
  private readonly storageKey = "categories-scroll-position"

  constructor() {
    this.categoriesContainer = document.querySelector("#categories ul")
  }

  private saveScrollPosition(): void {
    if (!this.categoriesContainer) return

    const scrollLeft = this.categoriesContainer.scrollLeft
    localStorage.setItem(this.storageKey, scrollLeft.toString())
  }

  private restoreScrollPosition(): void {
    if (!this.categoriesContainer) return

    const savedPosition = localStorage.getItem(this.storageKey)
    if (savedPosition) {
      // Use requestAnimationFrame to ensure the element is fully rendered
      requestAnimationFrame(() => {
        this.categoriesContainer!.scrollLeft = parseInt(savedPosition, 10)
      })
    }
  }

  private setupScrollListener(): void {
    if (!this.categoriesContainer) return

    // Throttle the scroll event to avoid too many localStorage writes
    let scrollTimeout: number | null = null

    this.categoriesContainer.addEventListener("scroll", () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }

      scrollTimeout = window.setTimeout(() => {
        this.saveScrollPosition()
      }, 100)
    })
  }

  private setupLinkListeners(): void {
    if (!this.categoriesContainer) return

    // Save scroll position when clicking category links
    const categoryLinks = this.categoriesContainer.querySelectorAll("a")
    categoryLinks.forEach((link) => {
      link.addEventListener("click", () => {
        this.saveScrollPosition()
      })
    })
  }

  public init(): void {
    if (!this.categoriesContainer) return

    this.restoreScrollPosition()
    this.setupScrollListener()
    this.setupLinkListeners()
  }
}
