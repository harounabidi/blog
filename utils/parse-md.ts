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
        class="opacity-0" 
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
      >
        ${imgTag}
      </div>`
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
