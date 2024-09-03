'use client'

import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { LineChart } from '@/components/ui/metrics/line-chart'
import { BarChart } from '@/components/ui/metrics/bar-chart'

import { useStore } from '@/hooks/use-store'
import { useConfigStore } from '@/hooks/use-config-store'

import { encrypt, decrypt } from '@/lib/crypto'

type AIProviderKey = keyof typeof AI_MODELS
type AIModel = {
  key: string
  label: string
  value: string
}

const AI_PROVIDERS = [
  { key: 'openai', label: 'OpenAI', value: 'openai' },
  { key: 'anthropic', label: 'Anthropic', value: 'anthropic' },
  { key: 'cohere', label: 'Cohere', value: 'cohere' },
  { key: 'google', label: 'Google', value: 'google' }
]

export const AI_MODELS = {
  openai: [
    { key: 'gpt-4', label: 'GPT-4', value: 'gpt-4' },
    { key: 'gpt-3.5', label: 'GPT-3.5', value: 'gpt-3.5' },
    { key: 'davinci', label: 'Davinci', value: 'davinci' },
    { key: 'curie', label: 'Curie', value: 'curie' }
  ],
  anthropic: [
    { key: 'claude-2', label: 'Claude 2', value: 'claude-2' },
    { key: 'claude-1', label: 'Claude 1', value: 'claude-1' }
  ],
  cohere: [
    { key: 'command-r', label: 'Command-R', value: 'command-r' },
    { key: 'command-x', label: 'Command-X', value: 'command-x' },
    { key: 'generate', label: 'Generate', value: 'generate' }
  ],
  google: [
    { key: 'palm-2', label: 'PaLM 2', value: 'palm-2' },
    { key: 'palm-1', label: 'PaLM 1', value: 'palm-1' },
    { key: 'bert', label: 'BERT', value: 'bert' },
    { key: 't5', label: 'T5', value: 't5' }
  ]
}

const FormSchema = z.object({
  model: z.string({
    required_error: 'You need to specify a model'
  }),
  provider: z.string({
    required_error: 'You need to select a api key provider type.'
  }),
  apiToken: z.string({
    required_error: 'You need to enter the api token provided by the provider'
  }),
  temperature: z.string(),
  maxTokens: z.string()
})

const Page = () => {
  const [selectedProvider, setSelectedProvider] = useState<AIProviderKey | ''>('')
  const [availableModels, setAvailableModels] = useState<AIModel[]>([])

  const handleProviderChange = (value: string) => {
    const providerKey = value as AIProviderKey
    setSelectedProvider(providerKey)
    setAvailableModels(providerKey ? AI_MODELS[providerKey] : [])
  }

  return (
    <div className='flex flex-col gap-6 mt-[50px] mb-[100px]'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        <Card>
          <CardHeader>
            <CardTitle>AI Model</CardTitle>
            <CardDescription>Select the AI model to use for your application.</CardDescription>
          </CardHeader>
          <CardContent>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder='Select AI Model' />
              </SelectTrigger>
              <SelectContent>
                {availableModels.map((model) => (
                  <SelectItem key={model.key} value={model.value}>
                    {model.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>AI Provider</CardTitle>
            <CardDescription>Choose the provider for your AI services.</CardDescription>
          </CardHeader>
          <CardContent>
            <Select onValueChange={handleProviderChange}>
              <SelectTrigger>
                <SelectValue placeholder='Select AI Provider' />
              </SelectTrigger>
              <SelectContent>
                {AI_PROVIDERS.map((provider) => (
                  <SelectItem key={provider.key} value={provider.value}>
                    {provider.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>API Token</CardTitle>
            <CardDescription>Enter your API token for the selected provider.</CardDescription>
          </CardHeader>
          <CardContent>
            <Input type='text' placeholder='Enter API Token' />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Additional Settings</CardTitle>
            <CardDescription>Configure any additional AI-related settings.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor='temperature'>Temperature</Label>
                <Slider id='temperature' min={0} max={1} step={0.1} defaultValue={[0.5]} />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='max-tokens'>Max Tokens</Label>
                <Input id='max-tokens' type='number' defaultValue={1024} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Usage Metrics</CardTitle>
            <CardDescription>
              View charts and graphs showing your AI usage over time.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
              <Card>
                <CardHeader>
                  <CardTitle>Total Queries</CardTitle>
                </CardHeader>
                <CardContent>{/* <LineChart className='aspect-[4/3]' /> */}</CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Successful Responses</CardTitle>
                </CardHeader>
                <CardContent>{/* <BarChart className='aspect-[4/3]' /> */}</CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Error Rate</CardTitle>
                </CardHeader>
                <CardContent>{/* <LineChart className='aspect-[4/3]' /> */}</CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Page
