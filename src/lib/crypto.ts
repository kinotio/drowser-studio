import CryptoJS from 'crypto-js'

const passphrase = process.env.CRYPTO_PASSPHRASE

export const encrypt = (text: string) => {
  if (!passphrase) throw new Error('Encryption passphrase is not configured')

  const iv = CryptoJS.lib.WordArray.random(16)
  const encrypted = CryptoJS.AES.encrypt(text, passphrase, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  const result = iv.concat(encrypted.ciphertext)

  return result.toString(CryptoJS.enc.Base64)
}

export const decrypt = (ciphertext: string) => {
  if (!passphrase) throw new Error('Encryption passphrase is not configured')

  if (!ciphertext) throw new Error('Input ciphertext is required')

  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase)
    const originalText = bytes.toString(CryptoJS.enc.Utf8)

    if (!originalText) throw new Error('Decryption failed')

    return originalText
  } catch (error) {
    throw new Error('Failed to decrypt data: ' + (error as Error).message)
  }
}
