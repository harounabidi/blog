// Currently unused - commented out in main script
export class HeaderNavigationManager {
  private homeLink: HTMLElement | null = null
  private categories: HTMLElement | null = null

  constructor() {
    this.homeLink = document.getElementById("home-link")
    this.categories = document.getElementById("categories")
  }

  private isHomePage(): boolean {
    const pathname = window.location.pathname
    // Home page or category pages (e.g., /javascript, /css, etc.)
    return (
      pathname === "/" ||
      (pathname.split("/").length === 2 &&
        pathname !== "/" &&
        !pathname.includes("."))
    )
  }

  private updateHeaderVisibility(): void {
    if (!this.homeLink || !this.categories) return

    const isHome = this.isHomePage()

    if (isHome) {
      // On home page or category pages: hide home-link, show categories
      this.homeLink.classList.add("hidden")
      this.categories.classList.remove("hidden")
    } else {
      // On article pages: show home-link, hide categories
      this.homeLink.classList.remove("hidden")
      this.categories.classList.add("hidden")
    }
  }

  public init(): void {
    this.updateHeaderVisibility()

    // Listen for navigation changes (if using SPA navigation)
    window.addEventListener("popstate", () => {
      this.updateHeaderVisibility()
    })
  }
}
