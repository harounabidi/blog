export interface Env {
  ZEPTOMAIL_API_URL: string
  ZEPTOMAIL_TOKEN: string
  ZEPTOMAIL_FROM: string
  API_KEY: string
  NODE_ENV: string
  ENCRYPTION_KEY: string
  DB: D1Database
  ASSETS: {
    fetch: (request: Request) => Promise<Response>
  }
  KV: KVNamespace
}
