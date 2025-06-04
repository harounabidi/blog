type Theme = "dark" | "light"

interface ThemeElements {
  themeToggle: HTMLElement | null
  sunIcon: HTMLElement | null
  moonIcon: HTMLElement | null
  html: HTMLHtmlElement | null
}

class ThemeManager {
  private elements: ThemeElements
  private readonly storageKey = "theme"

  constructor() {
    this.elements = this.getElements()
  }

  private getElements(): ThemeElements {
    return {
      themeToggle: document.getElementById("theme-toggle"),
      sunIcon: document.getElementById("theme-toggle-sun"),
      moonIcon: document.getElementById("theme-toggle-moon"),
      html: document.querySelector("html"),
    }
  }

  private getSavedTheme(): Theme {
    const saved = localStorage.getItem(this.storageKey) as Theme
    return saved === "dark" ? "dark" : "light"
  }

  private saveTheme(theme: Theme): void {
    localStorage.setItem(this.storageKey, theme)
  }

  private updateIconsVisibility(isDarkMode: boolean): void {
    const { sunIcon, moonIcon } = this.elements

    if (isDarkMode) {
      sunIcon?.classList.add("invisible")
      moonIcon?.classList.remove("invisible")
    } else {
      sunIcon?.classList.remove("invisible")
      moonIcon?.classList.add("invisible")
    }
  }

  private updateThemeLinks(isDarkMode: boolean): void {
    // Remove existing theme stylesheets
    const existingDarkLink = document.querySelector(
      'link[href*="vs-dark"][rel="stylesheet"]'
    )
    const existingLightLink = document.querySelector(
      'link[href*="vs-light"][rel="stylesheet"]'
    )

    existingDarkLink?.remove()
    existingLightLink?.remove()

    // Load the appropriate theme CSS
    const themeFile = isDarkMode ? "/css/vs-dark.css" : "/css/vs-light.css"
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = themeFile
    document.head.appendChild(link)
  }

  // add theme to header
  private addThemeToHeader(theme: Theme): void {
    const { html } = this.elements
    if (!html) return
    html.classList.add(theme)
    html.classList.remove(theme === "dark" ? "light" : "dark")
  }

  private applyTheme(theme: Theme): void {
    const { html } = this.elements
    if (!html) return

    const isDarkMode = theme === "dark"
    html.classList.toggle("dark", isDarkMode)
    this.updateIconsVisibility(isDarkMode)
    this.updateThemeLinks(isDarkMode)
    this.addThemeToHeader(theme)
  }

  private toggleTheme(): void {
    const { html } = this.elements
    if (!html) return

    const isDarkMode = html.classList.toggle("dark")
    const newTheme: Theme = isDarkMode ? "dark" : "light"

    this.saveTheme(newTheme)
    this.updateIconsVisibility(isDarkMode)
    this.updateThemeLinks(isDarkMode)
  }

  public init(): void {
    // Apply saved theme on page load
    const savedTheme = this.getSavedTheme()
    this.applyTheme(savedTheme)

    // Load initial theme CSS immediately
    this.updateThemeLinks(savedTheme === "dark")

    // Setup theme toggle listener
    this.elements.themeToggle?.addEventListener("click", () => {
      this.toggleTheme()
    })
  }
}

class ScrollHeaderManager {
  private lastScrollY: number = window.scrollY
  private readonly threshold: number = 50
  private header: HTMLElement | null = null

  constructor() {
    this.header = document.querySelector("header")
  }

  private isBlogPostPage(): boolean {
    const pathname = window.location.pathname
    // Check if the path matches the pattern /category-slug/post-slug
    // This means exactly 2 segments after the root, and not ending with a slash
    const segments = pathname.split("/").filter((segment) => segment.length > 0)
    return segments.length === 2 && !pathname.endsWith("/")
  }

  private updateHeaderVisibility(): void {
    if (!this.header) return

    // Only apply scroll-based hiding on blog post pages
    if (!this.isBlogPostPage()) {
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

class SubscribeToNewsletter {
  private form: HTMLFormElement | null =
    document.querySelector("#subscribe-form")
  private loader: SVGAElement | null =
    document.querySelector("#subscribe-loader")
  private button: SVGAElement | null =
    document.querySelector("#subscribe-plane")

  constructor() {
    this.init()
  }

  public init(): void {
    this.form?.addEventListener("submit", (event) => {
      event.preventDefault()
      this.handleSubmit()
    })
  }

  private async handleSubmit() {
    const formData = new FormData(this.form!)

    this.loader?.classList.add("visible")
    this.loader?.classList.remove("invisible")
    this.button?.classList.add("invisible")

    await fetch("/subscribe", {
      method: "POST",
      body: formData,
    }).then(() => (window.location.href = "/thank-you"))

    this.button?.classList.remove("invisible")
    this.loader?.classList.add("invisible")
    this.loader?.classList.remove("visible")
  }
}

class HeaderNavigationManager {
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
      // On post pages: show home-link, hide categories
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

class CategoriesScrollManager {
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

class CategoryActiveManager {
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

    // If on a post page, extract category from the first segment
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

window.addEventListener("DOMContentLoaded", () => {
  const themeManager = new ThemeManager()
  const scrollHeaderManager = new ScrollHeaderManager()
  const subscribeToNewsletter = new SubscribeToNewsletter()
  const headerNavigationManager = new HeaderNavigationManager()
  const categoriesScrollManager = new CategoriesScrollManager()
  const categoryActiveManager = new CategoryActiveManager()

  themeManager.init()
  scrollHeaderManager.init()
  subscribeToNewsletter.init()
  headerNavigationManager.init()
  categoriesScrollManager.init()
  categoryActiveManager.init()
})
