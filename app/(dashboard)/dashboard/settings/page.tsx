'use client'

import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { SettingsIcon } from 'lucide-react'

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
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'

import { encrypt, decrypt } from '@/lib/crypto'

import { saveSettings } from '@/app/(dashboard)/actions'

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
    { key: 'claude-3', label: 'Claude 3', value: 'claude-3' },
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
    required_error: 'You need to specify a model.'
  }),
  provider: z.string({
    required_error: 'You need to select a provider.'
  }),
  apiToken: z.string({
    required_error: 'You need to enter the api token provided by the provider.'
  }),
  temperature: z.number().optional(),
  maxTokens: z.string().optional()
})

export type FormSchemaType = z.infer<typeof FormSchema>

const Page = () => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema)
  })

  const [_, setSelectedProvider] = useState<AIProviderKey | ''>('')
  const [availableModels, setAvailableModels] = useState<AIModel[]>([])

  const [provider, setProvider] = useState<string>('')
  const [model, setModel] = useState<string>('')
  const [encryptedKey, setEncryptedKey] = useState<string>('')
  const [apiToken, setApiToken] = useState<string>('')
  const [temperature, setTemperature] = useState<number>(0.5)
  const [maxTokens, setMaxTokens] = useState<string>('1024')

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const {
      provider: dataProvider,
      model: dataModel,
      apiToken: dataApiToken,
      temperature: dataTemperature,
      maxTokens: dataMaxTokens
    } = data

    const dataEncryptedKey = encrypt(dataApiToken)

    const config = {
      provider: dataProvider,
      model: dataModel,
      encrypted_key: dataEncryptedKey,
      temperature: dataTemperature ?? temperature,
      maxTokens: dataMaxTokens ?? maxTokens
    }

    toast.promise(saveSettings(config), {
      loading: 'Saving configurations',
      success: (data) => (data?.error ? data.error : 'Saved configurations')
    })
  }

  const onContinueDelete = () => {
    alert('deleted')
  }

  useEffect(() => {
    const providerKey = form.watch().provider as AIProviderKey
    setSelectedProvider(providerKey)
    setAvailableModels(providerKey ? AI_MODELS[providerKey] : [])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch().provider])

  return (
    <div className='container mx-auto flex flex-col gap-6 mb-[100px] mt-6'>
      <Form {...form}>
        <form className='flex flex-col gap-6' onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex justify-between items-center'>
            <Badge variant='secondary' className='flex gap-2'>
              <SettingsIcon size={20} />
              <span className='text-2xl font-bold'>Settings</span>
            </Badge>

            <div className='flex justify-end gap-2'>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button type='button' variant='destructive'>
                    Delete Config
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your configuration
                      and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onContinueDelete}>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Button type='submit'>Apply Changes</Button>
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
            <Card>
              <CardHeader>
                <CardTitle>AI Model</CardTitle>
                <CardDescription>Select the AI model to use for your application.</CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name='model'
                  render={({ field }) => (
                    <FormItem className='space-y-3'>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={model}>
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
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>AI Provider</CardTitle>
                <CardDescription>Choose the provider for your AI services.</CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name='provider'
                  render={({ field }) => (
                    <FormItem className='space-y-3'>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={provider}>
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
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>API Token</CardTitle>
                <CardDescription>Enter your API token for the selected provider.</CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name='apiToken'
                  render={({ field }) => (
                    <FormItem className='space-y-3'>
                      <FormControl>
                        <Input
                          id='apiToken'
                          type='text'
                          placeholder='Enter API Token'
                          onChange={field.onChange}
                          defaultValue={apiToken}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                    <FormField
                      control={form.control}
                      name='temperature'
                      render={({ field }) => (
                        <FormItem className='space-y-3'>
                          <FormControl>
                            <Slider
                              onChange={field.onChange}
                              id='temperature'
                              min={0}
                              max={1}
                              step={0.1}
                              defaultValue={[temperature]}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='grid gap-2'>
                    <Label htmlFor='max-tokens'>Max Tokens</Label>
                    <FormField
                      control={form.control}
                      name='maxTokens'
                      render={({ field }) => (
                        <FormItem className='space-y-3'>
                          <FormControl>
                            <Input
                              onChange={field.onChange}
                              id='max-tokens'
                              type='text'
                              defaultValue={maxTokens}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>

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
