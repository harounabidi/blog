export default function ArticleCover({ cover }: { cover: string }) {
  return (
    <div
      className='relative image rounded-sm overflow-clip bg-cover bg-no-repeat w-full h-64 lg:h-96 mb-6'
      style={{
        backgroundImage: `url("${cover.replace(
          /(\/cdn\/)/,
          "$1c_scale,h_50,w_50/e_blur:800/f_webp/"
        )}")`,
      }}>
      <img
        src={cover}
        alt='Article Cover'
        className='w-full object-cover opacity-0 h-full'
        loading='eager'
        decoding='async'
        width={800}
        height={450}
      />
    </div>
  )
}
