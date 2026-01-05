export default {
  plugins: {
    autoprefixer: {},
    "@tailwindcss/postcss": {},
    cssnano: {
      preset: [
        "default",
        {
          svgo: false,
        },
      ],
    },
  },
}
