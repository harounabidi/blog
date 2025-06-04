export default function FAQ({
  faqs,
}: {
  faqs: { question: string; answer: string }[]
}) {
  return (
    <div className='w-full space-y-2'>
      <h2
        style={{ fontSize: "1.5rem", marginTop: "0", marginBottom: "2rem" }}
        className='text-xl font-bold mb-4'>
        FAQs 🤔
      </h2>
      {faqs?.map((faq, index) => (
        <details className='group' key={index}>
          <summary className='rounded-t-sm cursor-pointer py-2 [&::marker]:content-["+"] [&::marker]:mx-2'>
            {faq.question}
          </summary>
          <p className='p-2 rounded-b-sm transition-discrete'>{faq.answer}</p>
        </details>
      ))}
    </div>
  )
}
