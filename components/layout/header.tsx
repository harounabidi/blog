import { Category } from "@/types/category"
import ThemeSwitcher from "../ui/theme-switcher"
import Categories from "../categories"
import { Context } from "hono"
import { Env } from "@/types/env"

export default function Header({
  c,
  categories,
}: {
  c: Context<{
    Bindings: Env
  }>
  categories: Category[]
}) {
  function shouldShowCategories(): boolean {
    const pathname = c.req.path
    if (pathname === "/bio" || pathname === "/about") {
      return false
    }
    return (
      pathname === "/" ||
      (pathname.split("/").length === 2 &&
        pathname !== "/" &&
        !pathname.includes("."))
    )
  }
  return (
    <header class='w-full sticky z-20 top-0 max-w-3xl mx-auto'>
      <nav class='flex items-center h-16 bg-background justify-between border-b data-[scrolled=true]:bg-clip-padding data-[scrolled=true]:backdrop-blur-sm data-[scrolled=true]:backdrop-filter data-[scrolled=true]:bg-linear-to-b data-[scrolled=true]:from-background data-[scrolled=true]:to-background/80'>
        {!shouldShowCategories() ? (
          <a
            href='/'
            id='home-link'
            aria-label='Home'
            class='px-4 md:px-9 py-5 font-bold'>
            Home
          </a>
        ) : (
          <Categories categories={categories} path={c.req.path} />
        )}

        <div class='flex items-center pl-3 pr-4 md:pr-9 gap-2'>
          <ThemeSwitcher />
        </div>
      </nav>
    </header>
  )
}
