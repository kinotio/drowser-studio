/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    CRYPTO_PASSPHRASE: process.env.CRYPTO_PASSPHRASE,
    POCKETBASE_URL: process.env.POCKETBASE_URL
  }
}

export default nextConfig
