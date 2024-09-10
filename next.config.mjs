/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    CRYPTO_PASSPHRASE: process.env.CRYPTO_PASSPHRASE,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY
  }
}

export default nextConfig
