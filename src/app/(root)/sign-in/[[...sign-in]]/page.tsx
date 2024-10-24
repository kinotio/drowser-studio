import { SignIn } from '@clerk/nextjs'

const Page = () => {
  return (
    <div className='w-full py-28 flex justify-center items-center'>
      <SignIn />
    </div>
  )
}

export default Page
