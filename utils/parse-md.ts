import { Marked } from "marked"
import { markedHighlight } from "marked-highlight"
import sanitizeHtml from "sanitize-html"
import { highlight } from "sugar-high"

const marked = new Marked(
  markedHighlight({
    emptyLangClass: "language-",
    langPrefix: "language-",
    highlight(code) {
      return highlight(code)
    },
  })
)

marked.use({
  renderer: {
    image(token) {
      const { href, text } = token

      const createVariant = (width: number) =>
        `${href.replace(
          /\/cdn\//,
          `/cdn/c_scale,w_${width}/f_auto/`
        )} ${width}w`

      const blurredUrl = href.replace(
        /(\/cdn\/)/,
        "$1c_scale,w_20/e_blur:80/f_webp/"
      )

      const srcSet = [
        createVariant(1200),
        createVariant(800),
        createVariant(600),
        createVariant(400),
        createVariant(200),
      ].join(", ")

      const sizes = "(max-width: 600px) 100vw, (max-width: 1200px) 80vw, 1200px"

      return `
      <div 
        class="image" 
        style="background-image: url('${blurredUrl}');"
        data-loaded="false"
      >
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
        >
      </div>`
    },

    blockquote(token) {
      const text = this.parser.parse(token.tokens!)
      const match = text.match(/\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/i)

      if (match) {
        const type = match[1].toLowerCase()
        let content = text.replace(
          /\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/i,
          ""
        )
        content = content.replace(/<p><br>/gi, "<p>")
        return `<blockquote class="${type}">${content}</blockquote>\n`
      }

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

  return sanitizeHtml(
    marked.parse(content, { async: false }),
    sanitizeHtmlOptions
  )
}
