import Pocketbase from 'pocketbase'

export const pocketbase = new Pocketbase(process.env.NEXT_PUBLIC_POCKETBASE_URL)
