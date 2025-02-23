/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    CRYPTO_PASSPHRASE: process.env.CRYPTO_PASSPHRASE,
    AI_BASE_URL: process.env.AI_BASE_URL,
    AI_TOKEN: process.env.AI_TOKEN
  }
}

export default nextConfig
