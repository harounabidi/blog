import { Article } from "@/types/article"

export default function Articles({ articles }: { articles: Article[] }) {
  if (!articles || articles.length === 0) {
    return (
      <div class='w-full mt-6'>
        <p class='lg:text-lg text-foreground-muted'>Nothing to see here.</p>
      </div>
    )
  }

  return (
    <div class='w-full divide-y'>
      {articles.map((article) => (
        <a
          dir={article.language === "ar" ? "rtl" : "ltr"}
          href={`/${article.categorySlug}/${article.slug}`}
          key={article.id}
          class='flex justify-between py-6 gap-2 lg:gap-8'>
          <div>
            <h2 class='text-lg line-clamp-2 font-extrabold'>{article.title}</h2>
            <p class='text-sm my-2 text-foreground-muted'>
              {new Date(article.createdAt).toLocaleDateString(
                article.language === "ar" ? "ar-DZ" : "en-UK",
                {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }
              )}{" "}
              •{" "}
              {article.language === "ar"
                ? article.readingTime === 1
                  ? "دقيقة قراءة"
                  : article.readingTime === 2
                  ? "دقيقتان قراءة"
                  : article.readingTime > 10
                  ? `${article.readingTime} دقيقة قراءة`
                  : `${article.readingTime} دقائق قراءة`
                : `${article.readingTime} mins read`}
            </p>
            <p class='mt-1 text-foreground-muted line-clamp-3'>
              {article.summary}
            </p>
          </div>
          {/* {article.cover && (
            <div
              class='relative hidden image md:flex overflow-clip bg-cover bg-no-repeat rounded-sm w-24 h-24 lg:w-32 lg:h-32 flex-shrink-0'
              style={{
                backgroundImage: `url("${article.cover.replace(
                  /(\/cdn\/)/,
                  "$1c_scale,h_80,w_80/e_blur:800/f_webp/"
                )}")`,
              }}>
              <img
                src={article.cover}
                alt={article.title}
                class='w-full h-full object-cover opacity-0'
                loading='eager'
              />
            </div>
          )} */}
        </a>
      ))}
    </div>
  )
}
