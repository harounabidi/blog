export async function encryptWithPassword(
  text: string,
  password: string
): Promise<string> {
  const encoder = new TextEncoder()
  const passwordData = encoder.encode(password)

  // Generate a random salt
  const salt = crypto.getRandomValues(new Uint8Array(16))

  // Derive key from password using PBKDF2
  const baseKey = await crypto.subtle.importKey(
    "raw",
    passwordData,
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  )

  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    baseKey,
    {
      name: "AES-GCM",
      length: 256,
    },
    false,
    ["encrypt"]
  )

  // Generate IV
  const iv = crypto.getRandomValues(new Uint8Array(12))

  const encrypted = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    encoder.encode(text)
  )

  // Combine salt, IV, and encrypted data
  const encryptedArray = new Uint8Array(encrypted)
  const combined = new Uint8Array(
    salt.length + iv.length + encryptedArray.length
  )
  combined.set(salt)
  combined.set(iv, salt.length)
  combined.set(encryptedArray, salt.length + iv.length)

  return Array.from(combined)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

export async function decryptWithPassword(
  encryptedHex: string,
  password: string
): Promise<string> {
  const encoder = new TextEncoder()
  const passwordData = encoder.encode(password)

  // Convert hex string back to Uint8Array
  const combined = new Uint8Array(
    encryptedHex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))
  )

  // Extract salt (first 16 bytes), IV (next 12 bytes), and encrypted data
  const salt = combined.slice(0, 16)
  const iv = combined.slice(16, 28)
  const encryptedData = combined.slice(28)

  // Derive key from password using the same salt
  const baseKey = await crypto.subtle.importKey(
    "raw",
    passwordData,
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  )

  const key = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    baseKey,
    {
      name: "AES-GCM",
      length: 256,
    },
    false,
    ["decrypt"]
  )

  const decrypted = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    encryptedData
  )

  const decoder = new TextDecoder()
  return decoder.decode(decrypted)
}
