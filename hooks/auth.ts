import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import {loginUser, registerUser } from '@/actions/auth';
import { createTaskAction } from '@/actions/tasks';


export function useRegister() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log('data',data)
      toast.success('Account created successfully!');
       queryClient.invalidateQueries({ queryKey: ['user'] });
      router.push('/login');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create account');
    },
  });
}


export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
      toast.success('Logged in successfully!');
       queryClient.invalidateQueries({ queryKey: ['user'] });
      router.push('/dashboard');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create account');
    },
  });
}


export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTaskAction,
    onSuccess: (data) => {
      toast.success('Task created successfully!');
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create task');
    },
  });
}
