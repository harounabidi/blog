import { Category } from "@/types/category"
import Layout from "./layout"

export default function Bio({ categories }: { categories: Category[] }) {
  return (
    <Layout
      categories={categories}
      description='About Haroun Abidi'
      keywords='Haroun Abidi, software developer, about me'>
      <section class='max-w-[45rem] space-y-4 my-2 mx-auto px-4'>
        <h1 class='text-2xl font-bold'>About Me</h1>
        <p>
          Hey, I’m Haroun — a full-stack developer passionate about building
          practical, modern web and mobile applications that actually solve
          problems.
        </p>
        <h2 class='text-xl font-bold'>What I Do</h2>
        <p>
          I work mainly with Next.js, React Native, and Supabase, building
          everything from restaurant apps and e-commerce platforms to digital
          product stores. I enjoy turning ideas into polished user experiences,
          and I’ve learned to focus not just on code, but on clarity, usability,
          and performance.
        </p>
        <p>You’ll find me diving deep into:</p>
        <ul>
          <li>
            ⚙️ Full-stack app development with Next.js + Supabase or Honojs +
            Cloudflare Workers
          </li>
          <li>📱 Mobile-first experiences using React Native</li>
          <li>🛒 Scalable e-commerce and digital product platforms</li>
          <li>🌍 Clean, multilingual user interfaces</li>
          <li>
            🧠 Real-world problem solving in tech — and making things make sense
          </li>
        </ul>
        <h2 class='text-xl font-bold'>Why This Blog</h2>
        <p>
          I created this blog to share the things I’ve built, the challenges
          I’ve faced, and the lessons I’ve picked up along the way. From
          practical code tips to thoughts on product design and architecture,
          it’s all here — real insights from someone who builds and iterates
          every day.
        </p>
        <p>
          Whether you're a fellow dev, a product builder, or someone curious
          about creating efficient tech solutions, I hope you’ll find something
          here that helps you move forward.
        </p>
      </section>
    </Layout>
  )
}
