/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    CRYPTO_PASSPHRASE: process.env.CRYPTO_PASSPHRASE,
    POCKETBASE_URL: process.env.POCKETBASE_URL,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY
  }
}

export default nextConfig
