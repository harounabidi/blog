import { Category } from "@/types/category"
import ArrowLeft from "../icons/arrow-left"
import ThemeSwitcher from "../ui/theme-switcher"
import Categories from "../categories"
// import Search from "../icons/search"
// import RSS from "../icons/rss"

export default function Header({ categories }: { categories: Category[] }) {
  return (
    <header class='w-full sticky z-20 top-0 max-w-3xl mx-auto'>
      <nav class='flex items-center h-16 bg-clip-padding backdrop-blur-sm backdrop-filte bg-linear-to-b from-background to-background/80 justify-between border-b'>
        <a href='/' id='home-link' aria-label='Home' class='px-4 md:px-9 py-5'>
          <ArrowLeft class='w-5 h-5' />
        </a>
        <Categories categories={categories} />
        <div class='flex items-center pl-3 pr-4 md:pr-9 gap-5'>
          {/* <button popovertarget='search-popover' class='cursor-pointer'>
            <Search class='w-5 h-5' />
          </button> */}
          <ThemeSwitcher />
          {/* <a
            href='/rss.xml'
            aria-label='RSS Feed'
            target='_blank'
            rel='noopener noreferrer'>
            <RSS class='w-5 h-5' aria-label='RSS Feed' />
          </a> */}
        </div>
      </nav>
      {/* <div
        popover='manual'
        id='search-popover'
        class='mx-auto w-full bg-transparent h-full'>
        <form
          action=''
          class='flex py-6 mx-auto max-w-3xl justify-center from-45% h-full bg-gradient-to-b max-h-96 from-background to-background/0 px-4 items-start gap-2 border-b'>
          <input
            type='search'
            autofocus
            placeholder='Search...'
            class='border rounded-sm px-3 h-12 w-full bg-background text-foreground max-w-md outline-none focus:ring-1 focus:ring-foreground transition-colors duration-200'
          />
          <button
            popovertarget='search-popover'
            popovertargetaction='hide'
            aria-label='Close search'
            type='button'
            class='p-2 rounded-sm h-12 w-12 flex items-center justify-center cursor-pointer'>
            <Close class='w-5 h-5 text-foreground' />
          </button>
        </form>
      </div> */}
    </header>
  )
}
