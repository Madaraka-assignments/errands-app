"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Controller, useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createTaskSchema } from "@/form-schemas/tasks"
import { useCreateTask } from "@/hooks/auth"
import { Textarea } from "@/components/ui/textarea"
import { Loader, Plus, Trash2 } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { z } from "zod"

const multiTaskSchema = z.object({
  tasks: z.array(createTaskSchema),
})
type MultiTaskSchema = z.infer<typeof multiTaskSchema>

export function TaskForm({ className, ...props }: React.ComponentProps<"div">) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<MultiTaskSchema>({
    resolver: zodResolver(multiTaskSchema),
    defaultValues: {
      tasks: [
        { task_type: "", details: "", description: "" },
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tasks",
  })

  const { mutate: taskRequest, isPending } = useCreateTask()

  const onSubmit = (data: MultiTaskSchema) => {
    console.log('data',data.tasks)
    taskRequest(
      { tasks: data.tasks },
      {
        onError: (error: any) => {
          if (error.response?.data?.errors) {
            Object.entries(error.response.data.errors).forEach(([field, message]) => {
              setError(field as any, {
                message: message as string,
              })
            })
          }
        },
      }
    )
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup className="space-y-8">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="border p-3 rounded-md space-y-2 bg-gray-50"
            >
              <div className="flex flex-row-reverse">
                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <Field>
                <FieldLabel>Task type</FieldLabel>
                <Controller
                  name={`tasks.${index}.task_type`}
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select task type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Management">Management</SelectItem>
                        <SelectItem value="Shopping">Shopping</SelectItem>
                        <SelectItem value="Cleaning">Cleaning</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.tasks?.[index]?.task_type && (
                  <FieldDescription className="text-red-500">
                    {errors.tasks[index]?.task_type?.message}
                  </FieldDescription>
                )}
              </Field>

              {/* Details */}
              <Field>
                <FieldLabel>Details</FieldLabel>
                <Textarea
                  {...control.register(`tasks.${index}.details` as const)}
                  placeholder="Details about the errand"
                />
                {errors.tasks?.[index]?.details && (
                  <FieldDescription className="text-red-500">
                    {errors.tasks[index]?.details?.message}
                  </FieldDescription>
                )}
              </Field>

              <Field>
                <FieldLabel>Description</FieldLabel>
                <Textarea
                  {...control.register(`tasks.${index}.description` as const)}
                  placeholder="More details about the errand"
                />
                {errors.tasks?.[index]?.description && (
                  <FieldDescription className="text-red-500">
                    {errors.tasks[index]?.description?.message}
                  </FieldDescription>
                )}
              </Field>
            </div>
          ))}

          <div className="flex flex-row-reverse">
          <Button
            type="button"
            variant="secondary"
            className="flex items-center gap-2"
            onClick={() => append({ task_type: "", details: "", description: "" })}
          >
            <Plus className="w-4 h-4" />
            Add Another Task
          </Button>
          </div>

          <div className="flex flex-row-reverse">
            <div className="">
            <Button disabled={isPending} type="submit" className="w-full">
              {isPending ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                "Create"
              )}
            </Button>
            </div>
          </div>
        </FieldGroup>
      </form>
    </div>
  )
}
