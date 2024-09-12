'use client'

import { useState } from 'react'
import { AlertCircle, EyeIcon, EyeOffIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import { login, register } from '@/app/(auth)/actions'

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' })
})

const registerSchema = loginSchema
  .extend({
    name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
    username: z.string().min(3, { message: 'Username must be at least 3 characters long' }),
    confirmPassword: z.string().min(8, { message: 'Confirm Password is required' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  })

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>

const Page = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true)

  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false)
  const [confirmPasswordVisibility, setconfirmPasswordVisibility] = useState<boolean>(false)

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<RegisterFormData>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema)
  })

  const onSubmit = async (form: LoginFormData | RegisterFormData) => {
    try {
      if (isLogin) {
        toast.promise(register(form as RegisterFormData), {
          loading: 'Login'
        })
      } else {
        toast.promise(register(form as RegisterFormData), {
          loading: 'Registering',
          success: (data) => (data.error ? data.error : ''),
          style: {
            background: 'red',
            color: 'white'
          },
          className: 'class'
        })
      }
    } finally {
      reset()
    }
  }

  return (
    <div>
      <section className='w-full h-full py-12 md:py-24 lg:py-32 xl:py-48'>
        <div className='container px-4 md:px-6'>
          <div className='flex justify-center items-center'>
            <Card className='w-full max-w-md'>
              <CardHeader>
                <CardTitle>{isLogin ? 'Login' : 'Register'}</CardTitle>
                <CardDescription>
                  {isLogin ? 'Enter your credentials to login' : 'Create a new account'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                  {!isLogin && (
                    <>
                      <div className='space-y-2'>
                        <Label htmlFor='name'>Name</Label>
                        <Input
                          id='name'
                          placeholder='Enter your name'
                          {...formRegister('name')}
                          aria-invalid={errors.name ? 'true' : 'false'}
                        />
                        {errors.name && (
                          <p className='text-red-500 text-sm flex items-center mt-1'>
                            <AlertCircle className='w-4 h-4 mr-2' />
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                      <div className='space-y-2'>
                        <Label htmlFor='username'>Username</Label>
                        <Input
                          id='username'
                          placeholder='Choose a username'
                          {...formRegister('username')}
                          aria-invalid={errors.username ? 'true' : 'false'}
                        />
                        {errors.username && (
                          <p className='text-red-500 text-sm flex items-center mt-1'>
                            <AlertCircle className='w-4 h-4 mr-2' />
                            {errors.username.message}
                          </p>
                        )}
                      </div>
                    </>
                  )}
                  <div className='space-y-2'>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                      id='email'
                      type='email'
                      placeholder='Enter your email'
                      {...formRegister('email')}
                      aria-invalid={errors.email ? 'true' : 'false'}
                    />
                    {errors.email && (
                      <p className='text-red-500 text-sm flex items-center mt-1'>
                        <AlertCircle className='w-4 h-4 mr-2' />
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='password'>Password</Label>
                    <div className='relative'>
                      <Input
                        id='password'
                        type={passwordVisibility ? 'text' : 'password'}
                        placeholder='Enter your password'
                        {...formRegister('password')}
                        aria-invalid={errors.password ? 'true' : 'false'}
                        autoComplete='password'
                      />
                      <Button
                        variant='ghost'
                        size='icon'
                        type='button'
                        className='absolute top-1/2 right-3 -translate-y-1/2 h-7 w-7 hover:bg-transparent'
                        onClick={() => setPasswordVisibility(!passwordVisibility)}
                      >
                        {passwordVisibility ? (
                          <EyeOffIcon className='h-4 w-4' />
                        ) : (
                          <EyeIcon className='h-4 w-4' />
                        )}
                        <span className='sr-only'>Toggle password visibility</span>
                      </Button>
                    </div>

                    {errors.password && (
                      <p className='text-red-500 text-sm flex items-center mt-1'>
                        <AlertCircle className='w-4 h-4 mr-2' />
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                  {!isLogin && (
                    <div className='space-y-2'>
                      <Label htmlFor='name'>Confirm Password</Label>
                      <div className='relative'>
                        <Input
                          id='confirmPassword'
                          type={confirmPasswordVisibility ? 'text' : 'password'}
                          placeholder='Enter your confirm password'
                          {...formRegister('confirmPassword')}
                          aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                          autoComplete='confirmPassword'
                        />
                        <Button
                          variant='ghost'
                          size='icon'
                          type='button'
                          className='absolute top-1/2 right-3 -translate-y-1/2 h-7 w-7 hover:bg-transparent'
                          onClick={() => setconfirmPasswordVisibility(!confirmPasswordVisibility)}
                        >
                          {confirmPasswordVisibility ? (
                            <EyeOffIcon className='h-4 w-4' />
                          ) : (
                            <EyeIcon className='h-4 w-4' />
                          )}
                          <span className='sr-only'>Toggle confirm password visibility</span>
                        </Button>
                      </div>

                      {errors.confirmPassword && (
                        <p className='text-red-500 text-sm flex items-center mt-1'>
                          <AlertCircle className='w-4 h-4 mr-2' />
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                  )}
                  <div className='flex items-center space-x-2'>
                    <Switch
                      id='login-register'
                      checked={!isLogin}
                      onCheckedChange={() => {
                        setIsLogin(!isLogin)
                        reset()
                      }}
                    />
                    <Label htmlFor='login-register'>
                      {isLogin ? 'Switch to Register' : 'Switch to Login'}
                    </Label>
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button className='w-full' onClick={handleSubmit(onSubmit)}>
                  {isLogin ? 'Login' : 'Register'}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Page
