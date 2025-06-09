// Server-side browser detection utility
export interface BrowserInfo {
  browser: string
  version: number
  minor: number
}

export interface BrowserSupport {
  isSupported: boolean
  issues: string[]
  browserInfo: BrowserInfo
  message?: string
}

const MIN_VERSIONS = {
  chrome: 111, // March 2023
  edge: 111, // March 2023 (follows Chrome versioning)
  safari: 16.4, // March 2023 (needs to check minor version)
  firefox: 128, // July 2024
}

const BROWSER_NAMES = {
  chrome: "Chrome",
  edge: "Edge",
  firefox: "Firefox",
  safari: "Safari",
}

export function getBrowserInfo(userAgent: string): BrowserInfo {
  let browser = "unknown"
  let version = 0
  let minor = 0

  // Edge detection (modern Chromium-based Edge)
  const edgeMatch = userAgent.match(/Edg\/([0-9]+)/)
  if (edgeMatch) {
    browser = "edge"
    version = parseInt(edgeMatch[1])
    return { browser, version, minor }
  }

  // Chrome detection (includes other Chromium-based browsers, but excludes Edge and Opera)
  const chromeMatch = userAgent.match(/Chrome\/([0-9]+)/)
  if (
    chromeMatch &&
    !userAgent.includes("Edg/") &&
    !userAgent.includes("OPR/")
  ) {
    browser = "chrome"
    version = parseInt(chromeMatch[1])
    return { browser, version, minor }
  }

  // Firefox detection
  const firefoxMatch = userAgent.match(/Firefox\/([0-9]+)/)
  if (firefoxMatch) {
    browser = "firefox"
    version = parseInt(firefoxMatch[1])
    return { browser, version, minor }
  }

  // Safari detection (WebKit without Chrome/Edge)
  const safariMatch = userAgent.match(/Version\/([0-9]+)\.([0-9]+)/)
  if (
    safariMatch &&
    userAgent.includes("Safari") &&
    !userAgent.includes("Chrome") &&
    !userAgent.includes("Edg/")
  ) {
    browser = "safari"
    version = parseInt(safariMatch[1])
    minor = parseInt(safariMatch[2])
    return { browser, version, minor }
  }

  return { browser, version, minor }
}

export function checkBrowserSupport(userAgent: string): BrowserSupport {
  const browserInfo = getBrowserInfo(userAgent)
  const { browser, version, minor } = browserInfo
  const issues: string[] = []

  // Check if browser is supported and meets minimum version
  if (browser === "unknown") {
    issues.push("unknown-browser")
  } else {
    const minVersion = MIN_VERSIONS[browser as keyof typeof MIN_VERSIONS]
    if (!minVersion) {
      issues.push("unsupported-browser")
    } else {
      // Special handling for Safari which uses major.minor versioning
      if (browser === "safari") {
        const currentVersion = version + minor / 10
        if (currentVersion < minVersion) {
          issues.push("outdated-version")
        }
      } else {
        // For Chrome, Edge, Firefox - simple integer comparison
        if (version < minVersion) {
          issues.push("outdated-version")
        }
      }
    }
  }

  const isSupported = issues.length === 0
  let message = ""

  if (!isSupported) {
    if (issues.includes("unknown-browser")) {
      message =
        "Your browser is not recognized and may not be compatible with this website. For the best experience, please use a modern browser such as "
    } else if (issues.includes("unsupported-browser")) {
      message =
        "Your browser is not supported by this website. Please switch to a supported browser such as "
    } else if (issues.includes("outdated-version")) {
      const currentVersionDisplay =
        browser === "safari" ? `${version}.${minor}` : version.toString()

      message = `Your ${
        BROWSER_NAMES[browser as keyof typeof BROWSER_NAMES] || browser
      } version (${currentVersionDisplay}) is outdated and not supported. Please update to ${
        BROWSER_NAMES[browser as keyof typeof BROWSER_NAMES]
      } ${
        MIN_VERSIONS[browser as keyof typeof MIN_VERSIONS]
      } or later, or switch to a supported browser such as `
    }

    message +=
      '<a href="https://www.google.com/chrome/" target="_blank" rel="noopener">Chrome 111+</a>, ' +
      '<a href="https://www.microsoft.com/edge/" target="_blank" rel="noopener">Edge 111+</a>, ' +
      '<a href="https://www.mozilla.org/firefox/" target="_blank" rel="noopener">Firefox 128+</a>, or ' +
      '<a href="https://www.apple.com/safari/" target="_blank" rel="noopener">Safari 16.4+</a>.'
  }

  return {
    isSupported,
    issues,
    browserInfo,
    message: message || undefined,
  }
}

export function shouldBlockBrowser(browserSupport: BrowserSupport): boolean {
  // Block browsers that are completely unsupported or severely outdated
  return (
    browserSupport.issues.includes("unknown-browser") ||
    browserSupport.issues.includes("unsupported-browser") ||
    browserSupport.issues.includes("outdated-version")
  )
}
