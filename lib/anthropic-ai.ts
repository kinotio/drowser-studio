import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({ apiKey: '' })
const model = 'claude-3.5-sonnet'

export { anthropic, model }
