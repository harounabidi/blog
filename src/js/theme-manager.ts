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
    this.setCookie("theme", newTheme)

    const metaThemeColor = document.querySelector("meta[name='theme-color']")
    const body = document.body
    body.style.backgroundColor = newTheme === "dark" ? "#1a1a1a" : "#ffffff"

    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        "content",
        newTheme === "dark" ? "#1a1a1a" : "#ffffff"
      )
    } else {
      const meta = document.createElement("meta")
      meta.name = "theme-color"
      meta.content = newTheme === "dark" ? "#1a1a1a" : "#ffffff"
      document.head.appendChild(meta)
    }
  }

  public init(): void {
    const { html } = this.elements
    if (!html) return

    const isDarkMode = html.classList.contains("dark")
    this.updateIconsVisibility(isDarkMode)

    // Setup theme toggle listener
    this.elements.themeToggle?.addEventListener("click", async () => {
      await this.toggleTheme()
    })
  }
}
