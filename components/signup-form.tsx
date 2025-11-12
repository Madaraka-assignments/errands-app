"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { registerSchema, RegisterSchema } from "@/form-schemas/auth"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { EyeIcon, EyeOffIcon, Loader } from "lucide-react"
import Link from "next/link"
import { useRegister } from "@/hooks/auth"

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  })

  const { mutate:registerRequest, isPending } = useRegister()

  const onSubmit = (data: RegisterSchema) => {
    registerRequest({
      first_name: data.first_name,
      last_name: data.last_name,
      phone_number: data.phone_number,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    }, {
      onError: (error: any) => {
        if (error.response?.data?.errors) {
          Object.entries(error.response.data.errors).forEach(([field, message]) => {
            setError(field as keyof RegisterSchema, {
              message: message as string,
            })
          })
        }
      }
    })
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="first_name">First Name</FieldLabel>
                <Input id="first_name"
                 type="text"
                 {...register("first_name")}
                 placeholder="John"  />
                 {errors.first_name && 
                      <FieldDescription className="text-red-500">
                        {errors.first_name.message}
                      </FieldDescription>
                 }
              </Field>
               <Field>
                <FieldLabel htmlFor="last_name">Last Name</FieldLabel>
                <Input id="last_name"
                 type="text"
                 {...register("last_name")}
                 placeholder="John"  />
                 {errors.last_name && 
                      <FieldDescription className="text-red-500">
                        {errors.last_name.message}
                      </FieldDescription>
                 }
              </Field>
                <Field>
                <FieldLabel htmlFor="phone_number">Phone Number</FieldLabel>
                 <div className="w-full flex flex-row items-center gap-0 shadow-sm rounded-sm border">
              <div className="bg-gray-100 p-2 rounded-l-sm text-gray-400">
                    <p className="text-sm">+254</p>
                </div>
              <Input
                id="phone_number"
                 type="tel" 
                  inputMode="numeric"
                  placeholder="712345678" 
                  pattern="\d*"
                {...register("phone_number")}
                className='flex-1 border-none bg-transparent shadow-none w-full'
              />
              </div>
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="jon@doe.com"
                  {...register("email")}

                />
                {errors.email && 
                      <FieldDescription className="text-red-500">
                        {errors.email.message}
                      </FieldDescription>
                 }
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <div className="w-full flex flex-row items-center gap-2 shadow-sm rounded-sm border">
                  <Input 
                  placeholder='********'
                  id="password" 
                  type={showPassword ? "text" : "password"}  
                  {...register("password")}
                  className='flex-1 border-none bg-transparent shadow-none items-center justify-center flex' />
                  <Button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  size='icon' variant="ghost" className='flex items-center justify-center'>
                      {showPassword ? <EyeOffIcon className='w-5 h-5' /> : <EyeIcon className='w-5 h-5' />}
                  </Button>
                  </div>
                    {errors.password && 
                      <FieldDescription className="text-red-500">
                        {errors.password.message}
                      </FieldDescription>
                 }
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                     <div className="w-full flex flex-row items-center gap-2 shadow-sm rounded-sm border">
                  <Input 
                  placeholder='********'
                  id="confirmPassword" 
                  type={showConfirmPassword ? "text" : "password"}  
                  {...register("confirmPassword")}
                  className='flex-1 border-none bg-transparent shadow-none items-center justify-center flex' />
                  <Button 
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  size='icon' variant="ghost" className='flex items-center justify-center'>
                      {showConfirmPassword ? <EyeOffIcon className='w-5 h-5' /> : <EyeIcon className='w-5 h-5' />}
                  </Button>
                  </div>
                  {errors.confirmPassword && 
                      <FieldDescription className="text-red-500">
                        {errors.confirmPassword.message}
                      </FieldDescription>
                 }
                  </Field>
                </Field>
              </Field>
              <Field>
                <Button 
                  disabled={isPending}
                type="submit">
                  {isPending ? 
                  <Loader className="w-5 h-5 animate-spin" />
                   : 'Create Account'}
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <Link href="/login">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
