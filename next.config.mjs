/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    CRYPTO_PASSPHRASE: process.env.CRYPTO_PASSPHRASE
  }
}

export default nextConfig
