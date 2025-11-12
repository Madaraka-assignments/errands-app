"use client"
import { CreateTaskModal } from "@/components/modals/create-task";
import { TaskForm } from "@/components/task-form";
import { useTasks } from "@/hooks/tasks";
import { Spinner } from "@/components/ui/spinner"


export default function Home() {
    const { data, isLoading, isError } = useTasks();

  console.log('tasks',data?.tasks)
  return (
<div className="w-full flex flex-col gap-6">
  {isLoading &&
            (
                <div className="flex flex-row items-center gap-2">
                    <Spinner />
                    Loading tasks...
                </div>
            )}

  {isError && <p>Failed to load tasks</p>}

      
  {!isLoading && !isError && data ?
    <div className="flex min-h-svh w-full  p-6 md:p-10">
    <div className="w-full max-w-ld">
    <CreateTaskModal/>
  </div>
  </div>

  :

      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
            <TaskForm/>
        </div>
      </div>
  }

</div>      
    
  );
}
