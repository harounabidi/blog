export default function ArticleCover({ cover }: { cover: string }) {
  // Create responsive image variants
  const createVariant = (width: number) => {
    return `${cover.replace(
      /\/cdn\//,
      `/cdn/c_scale,w_${width}/f_auto/`
    )} ${width}w`
  }

  // Generate blurred placeholder
  const blurredUrl = cover.replace(
    /(\/cdn\/)/,
    "$1c_scale,w_20/e_blur:80/f_webp/"
  )

  // Create srcset with multiple resolution variants
  const srcSet = [
    createVariant(1200),
    createVariant(800),
    createVariant(600),
    createVariant(400),
    createVariant(200),
  ].join(", ")

  // Set appropriate sizes attribute
  const sizes = "(max-width: 600px) 100vw, (max-width: 1200px) 80vw, 1200px"

  return (
    <div
      className='image'
      style={{
        backgroundImage: `url('${blurredUrl}')`,
      }}>
      <img
        src={cover}
        alt='Article Cover'
        class='opacity-0 transition-opacity duration-300'
        srcSet={srcSet}
        sizes={sizes}
        loading='eager'
        decoding='async'
        width={1200}
        height={630}
      />
    </div>
  )
}
