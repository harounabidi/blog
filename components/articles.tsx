import { Article } from "@/types/article"

export default function Articles({ articles }: { articles: Article[] }) {
  if (!articles || articles.length === 0) {
    return (
      <section class='max-w-[45rem] my-8 mx-auto px-4'>
        <p class='text-lg text-foreground-muted'>Nothing to see here 🧐.</p>
      </section>
    )
  }
  return (
    <section class='max-w-[45rem] my-2 mx-auto px-4 divide-y'>
      {articles.map((article) => (
        <a
          href={`/${article.categorySlug}/${article.slug}`}
          key={article.id}
          class='flex justify-between py-6 gap-2 lg:gap-8'>
          <div>
            <h2 class='text-lg line-clamp-2 font-extrabold'>{article.title}</h2>
            <p class='text-sm my-2 text-foreground-muted'>
              {new Date(article.createdAt).toLocaleDateString("en-UK", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}{" "}
              • 📖 {article.readingTime} min read
            </p>
            <p class='mt-1 text-foreground-muted line-clamp-3'>
              {article.summary}
            </p>
          </div>
          {article.cover && (
            <div class='relative hidden md:flex overflow-clip w-24 h-24 lg:w-32 lg:h-32 flex-shrink-0'>
              <img
                src={article.cover}
                alt={article.title}
                class='w-full h-full object-cover rounded-sm'
                loading='eager'
              />
            </div>
          )}
        </a>
      ))}
    </section>
  )
}
