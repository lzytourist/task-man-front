'use server'

import {cookies} from "next/headers";
import {ACCESS_COOKIE_NAME} from "@/lib/constants";
import {TaskSchemaType} from "@/types";

const API_BASE = process.env.API_URL;

const getAccessToken = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_COOKIE_NAME);
  return accessToken?.value;
}

export const getTasks = async () => {
  const response = await fetch(`${API_BASE}/tasks/`, {
    headers: {'Authorization': `Bearer ${await getAccessToken()}`}
  });
  return await response.json();
}

export const createTask = async (data: TaskSchemaType) => {
  const response = await fetch(`${API_BASE}/tasks/`, {
    headers: {
      'Authorization': `Bearer ${await getAccessToken()}`,
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data)
  });
  return {
    error: !response.ok,
    data: await response.json()
  };
}

export const getTask = async (id: string) => {
  const response = await fetch(`${API_BASE}/tasks/${id}/`, {
    headers: {
      'Authorization': `Bearer ${await getAccessToken()}`,
    },
  });
  return await response.json();
}

export const updateTask = async (id: string, data: TaskSchemaType) => {
  const response = await fetch(`${API_BASE}/tasks/${id}/`, {
    headers: {
      'Authorization': `Bearer ${await getAccessToken()}`,
      'Content-Type': 'application/json'
    },
    method: 'PATCH',
    body: JSON.stringify(data)
  });
  return {
    error: !response.ok,
    data: await response.json()
  };
}

export const getAssignedTasks = async (id: string) => {
  const response = await fetch(`${API_BASE}/tasks/assigned/${id}`, {
    headers: {
      'Authorization': `Bearer ${await getAccessToken()}`,
    },
  });
  return await response.json();
}