import { Category } from "@/types/category"

export default function Categories({ categories }: { categories: Category[] }) {
  return (
    <div id='categories' className='z-10 overflow-x-hidden'>
      <ul className='no-scrollbar mask-l-from-95% mask-r-from-90% flex items-center gap-6 py-5 overflow-x-auto whitespace-nowrap px-4 md:px-10'>
        <li>
          <a
            data-text='All'
            style={{
              textDecoration: "none",
              color: "var(--color-foreground-muted)",
              fontSize: "0.875rem",
              lineHeight: "calc(1.5 / 0.875)",
            }}
            href='/'
            class=''>
            All
          </a>
        </li>
        {categories?.map((category, index) => (
          <li key={index}>
            <a
              data-text={category.name}
              style={{
                textDecoration: "none",
                color: "var(--color-foreground-muted)",
                fontSize: "0.875rem",
                lineHeight: "calc(1.5 / 0.875)",
              }}
              href={`/${category.slug}`}
              class=''>
              {category.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
