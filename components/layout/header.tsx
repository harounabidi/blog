import { Category } from "@/types/category"
import ThemeSwitcher from "../ui/theme-switcher"
import Categories from "../categories"
import { Context } from "hono"
import { Env } from "@/types/env"
import ChevronLeft from "../icons/chevron-left"
import ChevronRight from "../icons/chevron-right"

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
      <nav class='flex items-center h-16 bg-clip-padding backdrop-blur-sm backdrop-filte bg-linear-to-b from-background to-background/80 justify-between border-b'>
        {!shouldShowCategories() ? (
          <a
            href='/'
            id='home-link'
            aria-label='Home'
            class='px-4 md:px-9 py-5 font-bold'>
            Home
            {/* <img
              src='/images/logo.png'
              alt='logo'
              class='w-7 h-7 object-cover'
            /> */}
          </a>
        ) : (
          <Categories categories={categories} path={c.req.path} />
        )}

        <div class='flex items-center pl-3 pr-4 md:pr-9 gap-2'>
          {/* <ChevronRight class='w-5 h-5' /> */}
          <ThemeSwitcher />
        </div>
      </nav>
    </header>
  )
}
