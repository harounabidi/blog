import { Post } from "@/types/post"

export default function PostList({ posts }: { posts: Post[] }) {
  if (!posts || posts.length === 0) {
    return (
      <section class='max-w-[45rem] my-8 mx-auto px-4'>
        <p class='text-lg text-foreground-muted'>Nothing to see here 🧐.</p>
      </section>
    )
  }
  return (
    <section class='max-w-[45rem] my-2 mx-auto px-4 divide-y'>
      {posts.map((post) => (
        <a
          href={`/${post.categorySlug}/${post.slug}`}
          key={post.id}
          class='flex justify-between py-6 gap-2 lg:gap-8'>
          <div>
            <h2 class='text-lg line-clamp-2 font-extrabold'>{post.title}</h2>
            <p class='text-sm my-2 text-foreground-muted'>
              {new Date(post.createdAt).toLocaleDateString("en-UK", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}{" "}
              • 📖 {post.readingTime} min read
            </p>
            <p class='mt-1 text-foreground-muted line-clamp-3'>
              {post.summary}
            </p>
          </div>
          {post.cover && (
            <div class='relative hidden md:flex overflow-clip w-24 h-24 lg:w-32 lg:h-32 flex-shrink-0'>
              <img
                src={post.cover}
                alt={post.title}
                class='w-full h-full object-cover rounded-lg'
                loading='eager'
              />
            </div>
          )}
        </a>
      ))}
    </section>
  )
}
