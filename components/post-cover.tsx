export default function PostCover({ cover }: { cover: string }) {
  return (
    <div className='relative overflow-clip w-full h-64 lg:h-96 mb-6'>
      <img
        src={cover}
        alt='Post Cover'
        className='w-full object-cover h-full rounded-lg'
        loading='eager'
        decoding='async'
        width={800}
        height={450}
      />
    </div>
  )
}
