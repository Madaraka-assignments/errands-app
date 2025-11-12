'use server';
import { getSession, getUserFromSession } from "@/lib/session-manager";
import { TaskRequest, TaskResponse } from "@/types/tasks";

const appBaseUrl = process.env.API_BASE_URL 
interface TaskReq {
    tasks: TaskRequest[];
}
export async function createTaskAction(data: TaskReq) {
    const session = await getSession()
    if (!session) {
      throw new Error('Unauthorized');
    }
    // get customer Id from cookies   
  const customerId = await getUserFromSession().then(user => user);
  console.log('customerId',customerId)
  const response = await fetch(`${appBaseUrl}/customers/${customerId}/customer-requests/`, {
    method: 'POST',
    credentials: 'include', 
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.access_token}`,
    },
    body: JSON.stringify(data),
    cache: 'no-store',
  });

  console.log('response',response)

  if (!response.ok) {
    const error = await response.json();
    console.log('error',error)
    throw new Error(error.message || 'Task creation failed');
  }
  
  const result: TaskResponse = await response.json();
  
  return result;
}

export async function getTasksAction() {
    const session = await getSession()
    if (!session) {
      throw new Error('Unauthorized');
    }
const customerId = await getUserFromSession().then(user => user);
  const response = await fetch(`${appBaseUrl}/customers/${customerId}/customer-requests/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.access_token}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to get tasks');
  }
  
  const result: TaskResponse = await response.json();
  
  return result;
}
