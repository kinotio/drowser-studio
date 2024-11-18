import Pocketbase from 'pocketbase'

export const pocketbase = new Pocketbase(process.env.POCKETBASE_URL).autoCancellation(false)
