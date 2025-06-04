export type Article = {
  id: string
  title: string
  cover: string
  slug: string
  content: string
  summary: string
  readingTime: number
  status: string
  publishedAt: number
  createdAt: number
  updatedAt: number
  categoryId: string
  categorySlug?: string
}
