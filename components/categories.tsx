import { Category } from "@/types/category"

export default function Categories({
  categories,
  path,
}: {
  categories: Category[]
  path: string
}) {
  return (
    <div id='categories' className='z-10 overflow-x-hidden'>
      <ul className='no-scrollbar mask-l-from-95% mask-r-from-90% flex items-center gap-6 py-5 overflow-x-auto whitespace-nowrap px-4 md:px-10'>
        <li>
          <a
            data-text='All'
            href='/'
            class={`text-sm relative before:content-[attr(data-text)] before:font-bold before:h-0 before:invisible before:overflow-hidden before:block before:select-none before:pointer-events-none ${
              path === "/"
                ? "text-foreground font-bold"
                : "text-foreground-muted"
            }`}>
            All
          </a>
        </li>
        {categories?.map((category, index) => (
          <li key={index}>
            <a
              data-text={category.name}
              href={`/${category.slug}`}
              class={`text-sm relative before:content-[attr(data-text)] before:font-bold before:h-0 before:invisible before:overflow-hidden before:block before:select-none before:pointer-events-none ${
                path.includes(category.slug)
                  ? "text-foreground font-bold"
                  : "text-foreground-muted"
              }`}>
              {category.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
