import { Category } from "@/types/category"
import At from "../icons/at"
import GitHub from "../icons/github"
import Linkedin from "../icons/linkedin"
import Subscribe from "../subscribe"
import RSS from "../icons/rss"

export default function Footer({ categories }: { categories: Category[] }) {
  return (
    <footer class='flex border-t py-4 gap-4 flex-col mt-auto max-w-[45rem] mx-auto items-center justify-between px-4 w-full'>
      <div class='flex border-b pb-3 flex-col sm:flex-row w-full sm:items-start items-center justify-between sm:gap-16'>
        <Subscribe />
        <div class='flex w-full py-5 gap-4'>
          <div class='flex gap-2 flex-col w-full items-start justify-start'>
            <p class='mb-4 font-bold capitalize'>Categories</p>
            {categories.map((category) => (
              <a
                href={`/${category.slug}`}
                key={category.id}
                class='text-sm hover:underline'>
                {category.name}
              </a>
            ))}
          </div>
          <div class='flex gap-2 flex-col w-full items-end justify-start'>
            <p class='mb-4 font-bold capitalize'>General</p>
            <a href='/about-blog' class='text-sm hover:underline'>
              About this blog
            </a>
            <a href='/about-me' class='text-sm hover:underline'>
              About Haroun
            </a>
            <a href='/contact' class='text-sm hover:underline'>
              Contact
            </a>
          </div>
        </div>
      </div>

      <div class='flex flex-col py-4 w-full items-center justify-between sm:flex-row-reverse gap-6'>
        <div class='flex w-full items-center gap-4 justify-center sm:justify-end'>
          <a
            href='mailto:contact@harounabidi.com'
            aria-label='Email'
            target='_blank'
            rel='noopener noreferrer'>
            <At class='w-5 h-5' />
          </a>
          <a
            href='https://github.com/harounabidi'
            aria-label='GitHub'
            target='_blank'
            rel='noopener noreferrer'>
            <GitHub class='w-5.5 h-5.5' />
          </a>
          <a
            href='https://www.linkedin.com/in/harounabidi/'
            aria-label='LinkedIn'
            target='_blank'
            rel='noopener noreferrer'>
            <Linkedin class='w-5.5 h-5.5' />
          </a>
          <a
            href='/rss.xml'
            aria-label='RSS Feed'
            target='_blank'
            rel='noopener noreferrer'>
            <RSS class='w-5 h-5' aria-label='RSS Feed' />
          </a>
        </div>
        <p class='text-foreground-muted sm:w-full sm:text-start text-sm font-light'>
          © {new Date().getFullYear()} Haroun Abidi.
        </p>
      </div>
    </footer>
  )
}
