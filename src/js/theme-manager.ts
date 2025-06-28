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

  private setCookie(name: string, value: string, days: number = 365): void {
    const expires = new Date()
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`
  }

  private async toggleTheme(): Promise<void> {
    const { html } = this.elements
    if (!html) return

    const isDarkMode = html.classList.toggle("dark")
    const newTheme: Theme = isDarkMode ? "dark" : "light"

    this.updateIconsVisibility(isDarkMode)
    this.updateThemeLinks(isDarkMode)

    // Update the theme cookie
    this.setCookie("theme", newTheme)
  }

  public init(): void {
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
