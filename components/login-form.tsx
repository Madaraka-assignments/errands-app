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
import { useState } from "react"
import { useForm } from "react-hook-form"
import { loginSchema, LoginSchema } from "@/form-schemas/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { EyeIcon, EyeOffIcon, Loader } from "lucide-react"
import Link from "next/link"
import { useLogin } from "@/hooks/auth"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

    const [showPassword, setShowPassword] = useState(false)
      const {
      register,
      handleSubmit,
      formState: { errors },
      setError,
    } = useForm<LoginSchema>({
      resolver: zodResolver(loginSchema),
    })

    const { mutate:loginRequest, isPending } = useLogin()
      const onSubmit = (data: LoginSchema) => {
        loginRequest({
          email: data.email,
          password: data.password,
        }, {
          onError: (error: any) => {
            if (error.response?.data?.errors) {
              Object.entries(error.response.data.errors).forEach(([field, message]) => {
                setError(field as keyof LoginSchema, {
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
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="jane@doe.com"
                  {...register("email")}
                />
                {errors.email && 
                      <FieldDescription className="text-red-500">
                        {errors.email.message}
                      </FieldDescription>
                 }
              </Field>
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
                <Button 
                disabled={isPending}
                type="submit">
                  {isPending ? 
                  <Loader className="w-5 h-5 animate-spin" />
                   : 'Login'}
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <Link href="/signup">Sign up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
