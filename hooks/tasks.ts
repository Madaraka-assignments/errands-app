'use client';

import { useQuery } from '@tanstack/react-query';
import { getTasksAction } from '@/actions/tasks';
import { toast } from 'sonner';

export function useTasks() {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      try {
        const data = await getTasksAction();
        return data;
      } catch (err: any) {
        toast.error(err.message || 'Failed to load tasks');
        throw err;
      }
    },
  });
}
