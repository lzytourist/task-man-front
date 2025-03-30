'use server'

import {TaskSchemaType} from "@/types";
import {fetchAPI} from "@/actions/base";

export const getTasks = async () => {
  return await fetchAPI(`/tasks/`, {method: 'GET'});
}

export const createTask = async (data: TaskSchemaType) => {
  return await fetchAPI(`/tasks/`, {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export const getTask = async (id: string) => {
  return await fetchAPI(`/tasks/${id}/`, {method: 'GET'});
}

export const updateTask = async (id: string, data: TaskSchemaType) => {
  return await fetchAPI(`/tasks/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  });
}