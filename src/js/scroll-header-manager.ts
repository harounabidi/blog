export class ScrollHeaderManager {
  private lastScrollY: number = window.scrollY
  private readonly threshold: number = 50
  private header: HTMLElement | null = null

  constructor() {
    this.header = document.querySelector("header")
  }

  private isBlogArticlePage(): boolean {
    const pathname = window.location.pathname
    // Check if the path matches the pattern /category-slug/article-slug
    // This means exactly 2 segments after the root, and not ending with a slash
    const segments = pathname.split("/").filter((segment) => segment.length > 0)
    return segments.length === 2 && !pathname.endsWith("/")
  }

  private updateHeaderVisibility(): void {
    if (!this.header) return

    // Only apply scroll-based hiding on blog article pages
    if (!this.isBlogArticlePage()) {
      this.showHeader()
      return
    }

    const currentScrollY = window.scrollY
    const isScrollingDown = currentScrollY > this.lastScrollY
    const isPastThreshold = currentScrollY > this.threshold

    if (isScrollingDown && isPastThreshold) {
      this.hideHeader()
    } else {
      this.showHeader()
    }

    this.lastScrollY = currentScrollY
  }

  private hideHeader(): void {
    this.header?.classList.add("header-hidden")
    this.header?.classList.remove("header-visible")
  }

  private showHeader(): void {
    this.header?.classList.add("header-visible")
    this.header?.classList.remove("header-hidden")
  }

  public init(): void {
    window.addEventListener("scroll", () => {
      this.updateHeaderVisibility()
    })

    // Listen for navigation changes to update behavior
    window.addEventListener("popstate", () => {
      // Reset scroll position tracking on navigation
      this.lastScrollY = window.scrollY
      this.updateHeaderVisibility()
    })
  }
}
