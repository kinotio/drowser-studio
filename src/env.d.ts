declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string

      // Clerk
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string
      NEXT_PUBLIC_CLERK_BASE_URL: string
      NEXT_PUBLIC_CLERK_REDIRECT_BASE: string
      NEXT_PUBLIC_BASE_URL: string
      CLERK_SECRET_KEY: string
      CLERK_WEBHOOK_SECRET: string

      // Crypto
      CRYPTO_PASSPHRASE: string
    }
  }
}

export {}
