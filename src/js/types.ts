// Shared types used across modules
export type Theme = "dark" | "light"

export interface ThemeElements {
  themeToggle: HTMLElement | null
  sunIcon: HTMLElement | null
  moonIcon: HTMLElement | null
  html: HTMLHtmlElement | null
}
