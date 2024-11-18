declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string
      NEXT_PUBLIC_CLERK_BASE_URL: string
      NEXT_PUBLIC_CLERK_REDIRECT_BASE: string
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string

      CLERK_SECRET_KEY: string
      CLERK_WEBHOOK_SECRET: string
      CRYPTO_PASSPHRASE: string
      POCKETBASE_URL: string
      STRIPE_SECRET_KEY: string
      STRIPE_WEBHOOK_SECRET: string
    }
  }
}

export {}
