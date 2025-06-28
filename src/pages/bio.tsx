import { Context } from "hono"
import { Env } from "@/types/env"
import Layout from "./layout"

export default function Bio(
  c: Context<{
    Bindings: Env
  }>
) {
  return (
    <Layout
      c={c}
      description='About Haroun Abidi'
      keywords='Haroun Abidi, software developer, about me'>
      <section class='max-w-[45rem] space-y-4 my-2 mx-auto px-4'>
        <div
          class='my-6 image rounded-full ring-2 w-28 ring-foreground-muted h-28 relative overflow-clip bg-cover bg-no-repeat'
          style={{
            backgroundImage: `url("${"/cdn/a_hflip/blog/P6250325_copy_2_l145s6".replace(
              /(\/cdn\/)/,
              "$1c_scale,h_50,w_50/e_blur:800/f_webp/"
            )}")`,
          }}>
          <img
            loading='eager'
            src='/cdn/a_hflip/blog/P6250325_copy_2_l145s6'
            alt='Haroun Abidi'
            class='w-full h-full opacity-0 object-cover absolute top-0 left-0'
          />
        </div>
        <h1 class='text-3xl font-bold'>Hey there! 👋</h1>
        <p>
          I'm Haroun, a software engineer from Algeria 🇩🇿. I build high-impact
          ecommerce platforms, dashboards, and backend systems that connect
          directly to real-world business needs — especially in emerging
          markets.
        </p>
        <p>
          I’ve co-founded and built multiple ecommerce platforms from scratch,
          handling both the frontend and backend architecture. These projects
          served tens of thousands of users, supported marketing at scale, and
          became the foundation of my engineering thesis on scalable distributed
          systems.
        </p>
        <p>I work across the stack with a toolkit that includes:</p>
        <ul>
          <li>
            ❋{" "}
            <span class='font-semibold underline'>
              Custom ecommerce platforms
            </span>{" "}
            optimized for conversion and scale
          </li>
          <li>
            ❋ <span class='font-semibold underline'>Hono.js</span> and{" "}
            <span class='font-semibold underline'>Cloudflare Workers</span> for
            high-performance backend solutions
          </li>
          <li>
            ❋ <span class='font-semibold underline'>Next.js</span> and{" "}
            <span class='font-semibold underline'>React Native</span> to deliver
            fluid user experiences
          </li>
          <li>
            ❋{" "}
            <span class='font-semibold underline'>
              Kafka, Spark, Hive, and Go-based Microservices
            </span>{" "}
            for big data pipelines and scalable architectures
          </li>
          <li>
            ❋ <span class='font-semibold underline'>Supabase & PostgreSQL</span>{" "}
            for structured, scalable storage
          </li>
          <li>
            ❋{" "}
            <span class='font-semibold underline'>Multilingual interfaces</span>{" "}
            that respect cultural and regional diversity
          </li>
        </ul>
        <h2 class='text-xl font-bold'>What Drives Me</h2>
        <p>
          I love building tools that serve people — not just code for code’s
          sake. Whether it's helping a small brand grow through a reliable
          online store, or writing backend systems that process real-time
          traffic spikes from viral campaigns, I’m motivated by impact.
        </p>
        <p>
          My engineering philosophy is simple: build lean, test fast, and stay
          close to the real problem.
        </p>
        <h2 class='text-xl font-bold'>Why I Write</h2>
        <p>
          This blog is my public lab notebook. I document what I learn — the
          wins, the mistakes, the hard lessons — because I believe in learning
          out loud and growing together.
        </p>
        <p>
          If you're into ecommerce dev, edge functions, distributed systems, or
          just want an honest take on building things from scratch — welcome.
          I'm glad you're here.
        </p>
      </section>
    </Layout>
  )
}
