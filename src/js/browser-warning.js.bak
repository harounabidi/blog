// Browser version detection with improved accuracy
function getBrowserInfo() {
  const ua = navigator.userAgent
  let browser = "unknown"
  let version = 0
  let minor = 0

  // Edge detection (modern Chromium-based Edge)
  const edgeMatch = ua.match(/Edg\/([0-9]+)/)
  if (edgeMatch) {
    browser = "edge"
    version = parseInt(edgeMatch[1])
    return { browser, version, minor }
  }

  // Chrome detection (includes other Chromium-based browsers, but excludes Edge and Opera)
  const chromeMatch = ua.match(/Chrome\/([0-9]+)/)
  if (chromeMatch && !ua.includes("Edg/") && !ua.includes("OPR/")) {
    browser = "chrome"
    version = parseInt(chromeMatch[1])
    return { browser, version, minor }
  }

  // Firefox detection
  const firefoxMatch = ua.match(/Firefox\/([0-9]+)/)
  if (firefoxMatch) {
    browser = "firefox"
    version = parseInt(firefoxMatch[1])
    return { browser, version, minor }
  }

  // Safari detection (WebKit without Chrome/Edge)
  const safariMatch = ua.match(/Version\/([0-9]+)\.([0-9]+)/)
  if (
    safariMatch &&
    ua.includes("Safari") &&
    !ua.includes("Chrome") &&
    !ua.includes("Edg/")
  ) {
    browser = "safari"
    version = parseInt(safariMatch[1])
    minor = parseInt(safariMatch[2])
    return { browser, version, minor }
  }

  return { browser, version, minor }
}

function checkBrowserSupport() {
  const { browser, version, minor } = getBrowserInfo()
  const minVersions = {
    chrome: 111, // March 2023
    edge: 111, // March 2023 (follows Chrome versioning)
    safari: 16.4, // March 2023 (needs to check minor version)
    firefox: 128, // July 2024
  }

  // Check if browser is supported and meets minimum version
  if (browser === "unknown") {
    return ["unknown-browser"]
  }

  const minVersion = minVersions[browser]
  if (!minVersion) {
    return ["unsupported-browser"]
  }

  // Special handling for Safari which uses major.minor versioning
  if (browser === "safari") {
    const currentVersion = version + minor / 10
    if (currentVersion < minVersion) {
      return ["outdated-version"]
    }
  } else {
    // For Chrome, Edge, Firefox - simple integer comparison
    if (version < minVersion) {
      return ["outdated-version"]
    }
  }

  return [] // Browser is supported
}

function showBrowserWarning(message, blockContent = false) {
  const warning = document.getElementById("browser-warning")
  const messageEl = document.getElementById("warning-message")
  const mainContent = document.getElementById("main-content")

  if (warning && messageEl) {
    messageEl.innerHTML = message
    warning.style.display = "block"

    if (blockContent) {
      // Hide main content and show only the warning
      if (mainContent) {
        mainContent.style.display = "none"
      }
      document.body.classList.add("browser-blocked")
      warning.classList.add("browser-blocked")
    } else {
      document.body.classList.add("has-browser-warning")
    }
  }
}

function blockWebsiteAccess(message) {
  // Create a full-screen blocking overlay
  const existingOverlay = document.getElementById("browser-block-overlay")
  if (existingOverlay) {
    existingOverlay.remove()
  }

  const overlay = document.createElement("div")
  overlay.id = "browser-block-overlay"
  overlay.innerHTML = `
    <div class="block-container">
      <div class="block-icon">⚠️</div>
      <h1>Browser Not Supported</h1>
      <div class="block-message">${message}</div>
      <div class="block-footer">
        <p>This website requires modern browser features for optimal security and performance.</p>
        <button onclick="closeBrowserWarning()" style="margin-top: 20px; background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3); color: white; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-size: 14px;">Dismiss Warning (Not Recommended)</button>
      </div>
    </div>
  `

  // Apply styles directly to avoid CSS loading issues
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  `

  const style = document.createElement("style")
  style.textContent = `
    .block-container {
      max-width: 600px;
      padding: 40px;
      text-align: center;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 15px;
      backdrop-filter: blur(10px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    }
    .block-icon {
      font-size: 64px;
      margin-bottom: 20px;
    }
    .block-container h1 {
      font-size: 28px;
      margin: 0 0 20px 0;
      font-weight: 600;
    }
    .block-message {
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 30px;
    }
    .block-message a {
      color: #ffffff;
      text-decoration: underline;
      font-weight: 600;
    }
    .block-message a:hover {
      color: #f0f0f0;
    }
    .block-footer {
      font-size: 14px;
      opacity: 0.8;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      padding-top: 20px;
      margin-top: 20px;
    }
    .block-footer p {
      margin: 0;
    }
  `

  document.head.appendChild(style)
  document.body.appendChild(overlay)

  // Hide the original page content
  const mainContent = document.getElementById("main-content")
  if (mainContent) {
    mainContent.style.display = "none"
  }

  // Hide the header and footer
  const header = document.querySelector("header")
  const footer = document.querySelector("footer")
  if (header) header.style.display = "none"
  if (footer) footer.style.display = "none"
}

function closeBrowserWarning() {
  const warning = document.getElementById("browser-warning")
  const overlay = document.getElementById("browser-block-overlay")

  if (warning) {
    warning.style.display = "none"
    document.body.classList.remove("has-browser-warning", "browser-blocked")
  }

  if (overlay) {
    overlay.remove()
    // Restore main content
    const mainContent = document.getElementById("main-content")
    if (mainContent) {
      mainContent.style.display = ""
    }
    // Restore header and footer
    const header = document.querySelector("header")
    const footer = document.querySelector("footer")
    if (header) header.style.display = ""
    if (footer) footer.style.display = ""
  }

  // Store that user dismissed the warning
  try {
    localStorage.setItem("browser-warning-dismissed", Date.now())
  } catch (e) {}
}

// Check if warning was already dismissed (within last 30 days)
function wasWarningDismissed() {
  try {
    const dismissed = localStorage.getItem("browser-warning-dismissed")
    if (dismissed) {
      const dismissedTime = parseInt(dismissed)
      const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000
      return dismissedTime > thirtyDaysAgo
    }
  } catch (e) {}
  return false
}

// Run browser check when script loads
;(function () {
  if (!wasWarningDismissed()) {
    const unsupported = checkBrowserSupport()

    if (unsupported.length > 0) {
      const { browser, version, minor } = getBrowserInfo()
      let message = ""

      if (unsupported.includes("unknown-browser")) {
        message =
          "Your browser is not recognized and may not be compatible with this website. For the best experience, please use a modern browser such as "
      } else if (unsupported.includes("unsupported-browser")) {
        message =
          "Your browser is not supported by this website. Please switch to a supported browser such as "
      } else if (unsupported.includes("outdated-version")) {
        const browserNames = {
          chrome: "Chrome",
          edge: "Edge",
          firefox: "Firefox",
          safari: "Safari",
        }
        const minVersions = {
          chrome: "111",
          edge: "111",
          firefox: "128",
          safari: "16.4",
        }

        const currentVersionDisplay =
          browser === "safari" ? version + "." + minor : version.toString()

        message =
          "Your " +
          (browserNames[browser] || browser) +
          " version (" +
          currentVersionDisplay +
          ") is outdated and not supported. Please update to " +
          browserNames[browser] +
          " " +
          minVersions[browser] +
          " or later, or switch to a supported browser such as "
      }

      message +=
        '<a href="https://www.google.com/chrome/" target="_blank" rel="noopener">Chrome 111+</a>, ' +
        '<a href="https://www.microsoft.com/edge/" target="_blank" rel="noopener">Edge 111+</a>, ' +
        '<a href="https://www.mozilla.org/firefox/" target="_blank" rel="noopener">Firefox 128+</a>, or ' +
        '<a href="https://www.apple.com/safari/" target="_blank" rel="noopener">Safari 16.4+</a>.'

      // Block website access completely for unsupported browsers
      blockWebsiteAccess(message)
    }
  }
})()

// Make closeBrowserWarning globally available for onclick handler
window.closeBrowserWarning = closeBrowserWarning
