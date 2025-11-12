"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { TaskForm } from "../task-form"
import { useState } from "react"

export function CreateTaskModal() {
    const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button variant="default">Create another task</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create task</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new errand request.
            </DialogDescription>
          </DialogHeader>
          <TaskForm/>
        </DialogContent>
      </form>
    </Dialog>
  )
}
