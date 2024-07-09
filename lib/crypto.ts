import CryptoJS from 'crypto-js'

const passphrase = process.env.CRYPTO_PASSPHRASE

const encrypt = (text: string) => {
  return CryptoJS.AES.encrypt(text, passphrase).toString()
}

const decrypt = (ciphertext: string) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase)
  const originalText = bytes.toString(CryptoJS.enc.Utf8)

  return originalText
}

export { encrypt, decrypt }
