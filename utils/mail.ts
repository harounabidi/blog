export async function mail({
  url,
  token,
  from,
  email,
  subject,
  body,
  name,
}: {
  url: string
  token: string
  from: string
  email: string
  subject: string
  body: string
  name: string
}) {
  await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      from: { address: from },
      to: [{ email_address: { address: email, name: name } }],
      subject: subject,
      htmlbody: body,
    }),
  })
}
