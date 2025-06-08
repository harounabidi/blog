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
        <h1 class='text-2xl font-bold'>About the Blog</h1>
        <p>
          Welcome to my blog! Here, I share my thoughts on various topics,
          including technology, programming, and personal development. My goal
          is to provide valuable insights and foster a community of like-minded
          individuals.
        </p>

        <h2 class='text-xl font-semibold'>Why I Started This Blog</h2>
        <p>
          I started this blog to document my learning journey and share my
          experiences with others. Writing helps me clarify my thoughts and
          connect with people who share similar interests.
        </p>

        <h2 class='text-xl font-semibold'>What You Can Expect</h2>

        <p>
          You can expect a mix of technical articles, tutorials, and personal
          reflections. I aim to cover topics that are both informative and
          engaging, providing practical tips and insights that you can apply in
          your own life.
        </p>
      </section>
    </Layout>
  )
}
