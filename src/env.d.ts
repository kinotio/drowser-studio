declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string
      NEXT_PUBLIC_CLERK_BASE_URL: string
      NEXT_PUBLIC_CLERK_REDIRECT_BASE: string
      NEXT_PUBLIC_POCKETBASE_URL: string

      CLERK_SECRET_KEY: string
      WEBHOOK_SECRET: string
      CRYPTO_PASSPHRASE: string
    }
  }
}

export {}
