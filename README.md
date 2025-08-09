# Cloudflare Blog

A modern blog platform built with Cloudflare, Hono, Drizzle ORM, Bun, and React/TypeScript.

## Features

- Markdown articles with code highlighting
- Responsive images with Cloudflare CDN
- Custom callout blocks (Note, Tip, Important, Warning, Caution)
- Newsletter subscription
- SEO-friendly meta tags
- Custom fonts and themes
- Modular component structure

## Tech Stack

- **Cloudflare**: Hosting and CDN
- **Hono**: Web framework
- **Drizzle ORM**: Database migrations and queries
- **Bun**: Fast JavaScript runtime
- **React/TypeScript**: UI components
- **PrismJS**: Syntax highlighting
- **Marked**: Markdown parsing

## Getting Started

1. **Install dependencies**
   ```sh
   bun install
   ```
2. **Run the development server**
   ```sh
   bun run dev
   ```
3. **Build for production**
   ```sh
   bun run build
   ```

## Folder Structure

- `components/` - React UI components
- `drizzle/` - Database migrations
- `fonts/` - Custom font files
- `schemas/` - Drizzle ORM schemas
- `scripts/` - Build and utility scripts
- `server/` - Server-side logic
- `src/` - Main app source code
- `styles/` - CSS styles
- `templates/` - Page templates
- `types/` - TypeScript types
- `utils/` - Utility functions

## Markdown Callouts

Use blockquotes with callout markers:

```
> [!NOTE]
> This is a note.
> [!TIP]
> This is a tip.
> [!IMPORTANT]
> Important info.
> [!WARNING]
> Warning message.
> [!CAUTION]
> Caution message.
```

## License

MIT
