"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Controller, useForm } from "react-hook-form"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { createTaskSchema, CreateTaskSchema } from "@/form-schemas/tasks"
import { useCreateTask } from "@/hooks/auth"
import { Textarea } from "./ui/textarea"
import { Loader } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export function TaskForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
    const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<CreateTaskSchema>({
    resolver: zodResolver(createTaskSchema),
  })

  const { mutate:taskRequest, isPending } = useCreateTask()

  const onSubmit = (data: CreateTaskSchema) => {
    taskRequest({
        task_type: data.task_type,
        details: data.details,
        description: data.description,
     }, {
      onError: (error: any) => {
        if (error.response?.data?.errors) {
          Object.entries(error.response.data.errors).forEach(([field, message]) => {
            setError(field as keyof CreateTaskSchema, {
              message: message as string,
            })
          })
        }
      }
    })
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="task_type">Task type</FieldLabel>
                 <Controller
                    name="task_type"
                    control={control}
                    render={({ field }) => (
                    <Select
                        onValueChange={field.onChange}
                        value={field.value}
                    >
                        <SelectTrigger className="w-full">
                        <SelectValue placeholder="Task type" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="Management">Management</SelectItem>
                        <SelectItem value="Shopping">Shopping</SelectItem>
                        <SelectItem value="Cleaning">Cleaning</SelectItem>
                        </SelectContent>
                    </Select>
                    )}
  />
                 {errors.task_type && 
                      <FieldDescription className="text-red-500">
                        {errors.task_type.message}
                      </FieldDescription>
                 }
              </Field>
               <Field>
                <FieldLabel htmlFor="details">Details</FieldLabel>
                <Textarea id="details"
                 {...register("details")}
                 placeholder="Details about the errand"  />
                 {errors.details && 
                      <FieldDescription className="text-red-500">
                        {errors.details.message}
                      </FieldDescription>
                 }
              </Field>
              <Field>
                <FieldLabel htmlFor="details">Description</FieldLabel>
                <Textarea id="description"
                 {...register("description")}
                 placeholder="More details about the errand"  />
                 {errors.description &&
                      <FieldDescription className="text-red-500">
                        {errors.description.message}
                      </FieldDescription>
                 }
              </Field>
              <Field>
                <Button 
                  disabled={isPending}
                type="submit">
                  {isPending ? 
                  <Loader className="w-5 h-5 animate-spin" />
                   : 'Save'}
                </Button>
              </Field>
            </FieldGroup>
          </form>

    </div>
  )
}
