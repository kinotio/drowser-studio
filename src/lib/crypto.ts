import CryptoJS from 'crypto-js'

const passphrase = process.env.NEXT_PUBLIC_CRYPTO_PASSPHRASE

export const encrypt = (text: string) => {
  return CryptoJS.AES.encrypt(text, passphrase).toString()
}

export const decrypt = (ciphertext: string) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase)
  const originalText = bytes.toString(CryptoJS.enc.Utf8)
  return originalText
}
