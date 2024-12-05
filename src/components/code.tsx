import SyntaxHighlighter from 'react-syntax-highlighter'
import { tomorrowNightBright } from 'react-syntax-highlighter/dist/esm/styles/hljs'

import { BorderBeam } from '@/components/ui/border-beam'

export const Code = () => {
  const code = `
import { driver } from "https://deno.land/x/drowser@${'v0.1.5'}/mod.ts";
      
driver({ browser: "chrome" })
    .then(({ service }) => {
        service.cases = [
            {
                name: "Verify Title",
                fn: async ({ builder, assert }) => {
                    const title = await builder.getTitle();
                    assert.assertEquals(title, "Drowser");
                },
            },
        ];
    }).catch((error) => console.log(error));
    `

  return (
    <section className='py-16'>
      <div className='container mx-auto px-4'>
        <div className='grid md:grid-cols-2 gap-8 items-center'>
          <div className='space-y-4'>
            <h2 className='text-3xl font-bold tracking-tight '>
              Introduction to Browser Automation with Drowser
            </h2>
            <p className='text-lg'>
              {`This example demonstrates how to use the drowser library in Deno to perform automated
              browser testing with ease. By leveraging the power of Selenium WebDriver, you can
              write simple scripts to verify your application's behavior directly in the browser.`}
            </p>
            <p className='text-lg'>
              In this example, a browser is launched, and a test case is defined to check if a page
              element meets the expected value. This approach is great for performing quick
              validations and creating a dependable testing workflow for your web applications.
            </p>
          </div>

          <div className='mx-auto max-w-4xl h-full relative p-4 bg-black rounded-lg mt-4 border border-secondary'>
            <SyntaxHighlighter language='typescript' style={tomorrowNightBright}>
              {code}
            </SyntaxHighlighter>
            <BorderBeam colorFrom='#A07CFE' colorTo='#FE8FB5' />
          </div>
        </div>
      </div>
    </section>
  )
}
