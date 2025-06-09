#!/usr/bin/env bun
import { spawn } from "bun"
import { readdirSync } from "fs"
import { join } from "path"

const stylesDir = "styles"
const outputDir = "dist/css"
const isProduction = process.env.NODE_ENV === "production"
const isWatch = process.argv.includes("--watch")

// Get all CSS files from styles directory
const cssFiles = readdirSync(stylesDir)
  .filter((file) => file.endsWith(".css"))
  .map((file) => ({
    input: join(stylesDir, file),
    output: join(outputDir, file),
  }))

console.log(`Building ${cssFiles.length} CSS files...`)

// Build each CSS file
const processes = cssFiles.map(({ input, output }) => {
  const args = ["postcss", input, "-o", output]

  if (!isProduction) {
    args.push("--map")
  }

  if (isWatch) {
    args.push("--watch")
  }

  console.log(`Processing: ${input} → ${output}`)
  return spawn(args, {
    stdio: "inherit",
    env: { ...process.env, NODE_ENV: process.env.NODE_ENV || "development" },
  })
})

// If watching, keep processes alive
if (isWatch) {
  console.log("Watching for changes...")
  // Keep the script running
  await Promise.all(processes.map((p) => p.exited))
} else {
  // Wait for all processes to complete
  const results = await Promise.all(processes.map((p) => p.exited))
  const hasErrors = results.some((code) => code !== 0)

  if (hasErrors) {
    console.error("Some CSS files failed to build")
    process.exit(1)
  } else {
    console.log("All CSS files built successfully!")
  }
}
