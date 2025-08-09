import { Marked } from "marked"
import { markedHighlight } from "marked-highlight"
import sanitizeHtml from "sanitize-html"
import Prism from "prismjs"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-tsx"
import "prismjs/components/prism-css"
import "prismjs/components/prism-json"
import "prismjs/components/prism-bash"
import "prismjs/components/prism-markdown"

const marked = new Marked(
  markedHighlight({
    emptyLangClass: "language-",
    langPrefix: "language-",
    highlight(code, lang) {
      if (lang && Prism.languages[lang]) {
        return Prism.highlight(code, Prism.languages[lang], lang)
      }
      return code
    },
  })
)

marked.use({
  renderer: {
    image(token) {
      const { href, text } = token
      // Create responsive image variants
      const createVariant = (width: number) => {
        return `${href.replace(
          /\/cdn\//,
          `/cdn/c_scale,w_${width}/f_auto/`
        )} ${width}w`
      }

      // Generate blurred placeholder
      const blurredUrl = href.replace(
        /(\/cdn\/)/,
        "$1c_scale,w_20/e_blur:80/f_webp/"
      )

      // Create srcset with multiple resolution variants
      const srcSet = [
        createVariant(1200),
        createVariant(800),
        createVariant(600),
        createVariant(400),
        createVariant(200),
      ].join(", ")

      // Set appropriate sizes attribute
      const sizes = "(max-width: 600px) 100vw, (max-width: 1200px) 80vw, 1200px"

      const imgTag = `
      <img 
        src="${href}" 
        class="opacity-0 transition-opacity duration-300" 
        width="1200" 
        height="630" 
        srcset="${srcSet}"
        sizes="${sizes}"
        loading="lazy"
        alt="${text}" 
        title="${text}"
        >`

      return `
      <div 
        class="image" 
        style="background-image: url('${blurredUrl}');"
        data-loaded="false"
      >
        ${imgTag}
      </div>`
    },
    blockquote(token) {
      const text = this.parser.parse(token.tokens!)

      // Check for callout patterns - handle both single line and multi-line cases
      const calloutRegex = /\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/i
      const match = text.match(calloutRegex)

      if (match) {
        const calloutType = match[1].toLowerCase()
        // Remove the callout marker from the content
        let content = text.replace(
          /\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/i,
          ""
        )
        // Remove any <br> tags that appear at the beginning of <p> tags
        content = content.replace(/<p><br>/gi, "<p>")
        return `<blockquote class="${calloutType}">${content}</blockquote>\n`
      }

      // Default blockquote rendering
      return `<blockquote>\n${text}</blockquote>\n`
    },
  },
})

const sanitizeHtmlOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat([
    "img",
    "h1",
    "h2",
    "span",
    "code",
    "pre",
    "div",
    "input",
    "label",
    "ul",
    "li",
  ]),
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    div: ["class", "style"],
    code: ["class", "style"],
    pre: ["class", "style"],
    span: ["class", "style"],
    input: ["type", "id", "name", "class", "checked"],
    label: ["for", "class", "style"],
    ul: ["class", "style"],
    li: ["class", "style"],
    blockquote: ["class", "style"],
  },
}

export function parseMarkdown(markdown: string): string {
  const content = markdown.replace(/\r\n/g, "\n")

  const sanitizedContent = sanitizeHtml(
    marked.parse(content, { async: false }),
    sanitizeHtmlOptions
  )
  return sanitizedContent
}
