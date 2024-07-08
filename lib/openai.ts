import OpenAi from 'openai'

const openai = new OpenAi({ apiKey: '' })
const model = 'gpt-3.5'

export { openai, model }
