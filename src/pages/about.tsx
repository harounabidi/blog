import Layout from "./layout"
import { Context } from "hono"
import { Env } from "@/types/env"

export default function About(
  c: Context<{
    Bindings: Env
  }>
) {
  return (
    <Layout c={c}>
      <section class='max-w-[45rem] space-y-4 my-2 mx-auto px-4'>
        <h1 class='text-3xl mt-4 font-bold'>About This Blog</h1>
        <p>
          Hey! I’m Haroun, and I’m really glad you found your way here. This
          blog is my little corner of the internet—a place where I share not
          just code and tech, but the real stories, lessons, and experiments
          behind building things online.
        </p>
        <p>
          I run several ecommerce stores and build open source tools, mostly
          using Hono and Cloudflare Workers. I’m always tinkering, learning, and
          trying to make the web a bit more useful (and a lot more fun).
        </p>
        <h2 class='text-xl font-semibold'>Why I Started This Blog?</h2>
        <p>
          I started this blog as a way to document the ups and downs of my
          journey—both the wins and the bugs that kept me up at night. Writing
          helps me make sense of what I’m learning, and it’s a great way to
          connect with others who are on a similar path. If you’ve ever felt
          stuck, curious, or just excited about building something new, you’ll
          fit right in here.
        </p>
        <h2 class='text-xl font-semibold'>What You’ll Find Here?</h2>
        <p>
          Expect a mix of hands-on technical guides, honest reflections, and
          behind-the-scenes looks at running real online businesses. I love
          sharing practical tips, open source projects, and the occasional story
          about what worked (and what didn’t) as we grow our stores and tools.
        </p>
        <p>
          I believe in keeping things simple, learning out loud, and helping
          others avoid the mistakes I’ve made. Whether you’re a developer,
          entrepreneur, or just someone who loves the web, I hope you’ll find
          something here that sparks an idea or helps you move forward.
        </p>
        <h2 class='text-xl font-semibold'>Let’s Connect</h2>
        <p>
          I’d love to hear from you! If you have questions, want to share your
          own story, or just want to say hi, feel free to reach out or leave a
          comment. Thanks for stopping by and being part of this journey.
        </p>
      </section>
    </Layout>
  )
}
