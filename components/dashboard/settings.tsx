'use client'

import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { BoltIcon } from 'lucide-react'
import { toast } from 'sonner'

import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

import { useStore } from '@/hooks/use-store'
import { useConfigStore } from '@/hooks/use-config-store'

import { encrypt, decrypt } from '@/lib/crypto'

const FormSchema = z.object({
  provider: z.string({
    required_error: 'You need to select a api key provider type.'
  }),
  model: z.string({
    required_error: 'You need to specify a model'
  }),
  apiKey: z.string({ required_error: 'You need to enter the api key provided by the provider' })
})

const providerOpts = [
  {
    label: 'OpenAI',
    value: 'openai'
  },
  {
    label: 'Anthropic',
    value: 'anthropic'
  }
]

const modelOpts = [
  {
    label: 'GPT-4o',
    value: 'gpt-4o'
  },
  {
    label: 'GPT-3.5',
    value: 'gpt-3.5'
  },
  {
    label: 'Claude-3.5-Sonnet',
    value: 'claude-3.5-sonnet'
  },
  {
    label: 'Claude-3-Opus',
    value: 'claude-3-opus'
  }
]

const Settings = () => {
  const config = useStore(useConfigStore, (state) => state.config)
  const setConfig = useConfigStore((state) => state.setConfig)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })

  const [provider, setProvider] = useState<string>('')
  const [model, setModel] = useState<string>('')
  const [encryptedKey, setEncryptedKey] = useState<string>('')
  const [apiKey, setApiKey] = useState<string>('')

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const { provider: dataProvider, model: dataModel, apiKey: dataApiKey } = data
    const dataEncryptedKey = encrypt(dataApiKey)
    const config = { provider: dataProvider, model: dataModel, encrypted_key: dataEncryptedKey }

    setConfig(config)

    toast('Config has been saved', {
      description: new Date().toDateString(),
      action: {
        label: 'Undo',
        onClick: () => setConfig({ provider, model, encrypted_key: encryptedKey })
      }
    })
  }

  useEffect(() => {
    if (config !== undefined) {
      const { provider, model, encrypted_key } = config
      const decryptedKey = decrypt(encrypted_key)

      setProvider(provider)
      setModel(model)
      setEncryptedKey(encrypted_key)

      setApiKey(decryptedKey)
    }
  }, [config])

  return (
    <Sheet>
      <SheetTrigger>
        <span className='flex gap-3'>
          <BoltIcon className='h-4 w-4' />
          Settings
        </span>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className='pb-4'>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>
            Make changes to your settings here. Click save when you re done.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form className='space-y-6 w-full'>
            <FormField
              control={form.control}
              name='provider'
              render={({ field }) => (
                <FormItem className='space-y-3'>
                  <FormLabel>Provider</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={provider}
                      className='flex flex-col space-y-1'
                    >
                      {providerOpts.map((opt) => (
                        <FormItem key={opt.value} className='flex items-center space-x-3 space-y-0'>
                          <FormControl>
                            <RadioGroupItem value={opt.value} />
                          </FormControl>
                          <FormLabel className='font-normal'>{opt.label}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='model'
              render={({ field }) => (
                <FormItem className='space-y-3'>
                  <FormLabel>Model</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={model}
                      className='flex flex-col space-y-1'
                    >
                      {modelOpts.map((opt) => (
                        <FormItem key={opt.value} className='flex items-center space-x-3 space-y-0'>
                          <FormControl>
                            <RadioGroupItem value={opt.value} />
                          </FormControl>
                          <FormLabel className='font-normal'>{opt.label}</FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='apiKey'
              render={({ field }) => (
                <FormItem className='space-y-3'>
                  <FormLabel>Key</FormLabel>
                  <FormControl>
                    <Input
                      id='apiKey'
                      type='text'
                      placeholder='Your api key'
                      onChange={field.onChange}
                      defaultValue={apiKey}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <SheetFooter className='pt-4'>
          <SheetClose asChild>
            <Button type='submit' onClick={form.handleSubmit(onSubmit)}>
              Save changes
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export { Settings }
