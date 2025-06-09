import { Theme, ThemeElements } from "./types.js"

export class ThemeManager {
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
    // Try to get from cookie first, fallback to localStorage for migration
    const cookieValue = this.getCookie(this.storageKey)
    if (cookieValue) {
      return cookieValue === "dark" ? "dark" : "light"
    }

    // Fallback to localStorage for existing users
    const saved = localStorage.getItem(this.storageKey) as Theme
    if (saved) {
      // Migrate to cookie and remove from localStorage
      this.setCookie(this.storageKey, saved)
      localStorage.removeItem(this.storageKey)
      return saved === "dark" ? "dark" : "light"
    }

    return "light"
  }

  private async saveTheme(theme: Theme): Promise<void> {
    // Save to cookie via both client-side and server-side
    this.setCookie(this.storageKey, theme)

    // Also update server-side cookie via API for consistency
    try {
      await fetch("/api/theme", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ theme }),
      })
    } catch (error) {
      console.warn("Failed to update theme on server:", error)
    }
  }

  private getCookie(name: string): string | null {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) {
      return parts.pop()?.split(";").shift() || null
    }
    return null
  }

  private setCookie(name: string, value: string): void {
    // Set cookie for 1 year with SameSite=Lax for security
    const expires = new Date()
    expires.setFullYear(expires.getFullYear() + 1)
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`
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
    html.classList.toggle("dark", theme === "dark")
    html.classList.toggle("light", theme === "light")
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

  private async toggleTheme(): Promise<void> {
    const { html } = this.elements
    if (!html) return

    const isDarkMode = html.classList.toggle("dark")
    const newTheme: Theme = isDarkMode ? "dark" : "light"

    await this.saveTheme(newTheme)
    this.updateIconsVisibility(isDarkMode)
    this.updateThemeLinks(isDarkMode)
  }

  public init(): void {
    // The server has already set the correct theme class, we just need to:
    // 1. Update icon visibility based on current state
    // 2. Load the appropriate theme CSS
    // 3. Set up the toggle listener

    const { html } = this.elements
    if (!html) return

    const isDarkMode = html.classList.contains("dark")
    this.updateIconsVisibility(isDarkMode)
    this.updateThemeLinks(isDarkMode)

    // Setup theme toggle listener
    this.elements.themeToggle?.addEventListener("click", async () => {
      await this.toggleTheme()
    })
  }
}
