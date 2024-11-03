import { icons } from 'lucide-react'

import { Icon } from '@/components/ui/icon'

import { DATA } from '@/data'

export const Features = () => {
  return (
    <section id='studio' className='w-full py-12 md:py-24 lg:py-32 flex justify-center'>
      <div className='container px-4 md:px-6'>
        <div className='gap-6 lg:gap-12'>
          <div className='space-y-4'>
            <div className='space-y-2 flex justify-center flex-col items-center'>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center'>
                Introducing Drowser Studio
              </h2>
              <p className='max-w-[800px] text-center text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
                Our Studio allows you to easily visualize reports, offering clear and interactive
                insights into your data. Simplify complex information with an intuitive interface
                designed for impactful presentations.
              </p>
            </div>
            <div className='grid grid-cols-4 gap-4'>
              {DATA.features.studio.map((feature) => (
                <div key={feature.title} className='rounded-lg border bg-background p-4 shadow-sm'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary'>
                    <Icon
                      name={feature.icon as keyof typeof icons}
                      size={20}
                      className='text-primary-foreground'
                    />
                  </div>
                  <h3 className='mt-4 text-lg font-semibold'>{feature.title}</h3>
                  <p className='text-sm text-muted-foreground'>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
