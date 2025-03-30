'use server'

import {RoleSchemaType, UserSchemaType} from "@/types";

export const getUsers = async () => {
  return await fetch(`/account/users/`, {method: 'GET'});
}

export const createUser = async (data: UserSchemaType) => {
  return await fetch(`/account/users/`, {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export const getRoles = async () => {
  return await fetch(`/account/roles/`, {method: 'GET'});
}

export const getRole = async (id: string) => {
  return await fetch(`/account/roles/${id}/`, {method: 'GET'});
}

export const getPermissions = async () => {
  return await fetch(`/account/permissions/`, {method: 'GET'});
}

export const addRole = async (data: RoleSchemaType) => {
  return await fetch(`/account/roles/`, {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export const updateRole = async (id: string, data: RoleSchemaType) => {
  return await fetch(`/account/roles/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(data)
  });
}

export const assignRole = async (role: string, userId: string) => {
  return await fetch(`/account/users/${userId}/`, {
    method: 'PATCH',
    body: JSON.stringify({'role': role})
  });
}

