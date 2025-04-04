'use server'

import {cookies} from "next/headers";
import {ACCESS_COOKIE_NAME} from "@/lib/constants";
import {RoleSchemaType, UserSchemaType} from "@/types";
import {revalidatePath} from "next/cache";

export const getUsers = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_COOKIE_NAME);
  const response = await fetch(`${process.env.API_URL}/account/users/`, {
    headers: {
      'Authorization': `Bearer ${accessToken!.value}`
    }
  });
  return await response.json();
}

export const getUser = async (id: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_COOKIE_NAME);
  const response = await fetch(`${process.env.API_URL}/account/users/${id}/`, {
    headers: {
      'Authorization': `Bearer ${accessToken!.value}`
    }
  });
  return await response.json();
}

export const createUser = async (data: UserSchemaType) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_COOKIE_NAME);
  const response = await fetch(`${process.env.API_URL}/account/users/`, {
    headers: {
      'Authorization': `Bearer ${accessToken!.value}`,
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data)
  });

  return {
    error: !response.ok,
    data: await response.json()
  }
}

export const getRoles = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_COOKIE_NAME);
  const response = await fetch(`${process.env.API_URL}/account/roles/`, {
    headers: {
      'Authorization': `Bearer ${accessToken!.value}`
    }
  });
  return await response.json();
}

export const getRole = async (id: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_COOKIE_NAME);
  const response = await fetch(`${process.env.API_URL}/account/roles/${id}/`, {
    headers: {
      'Authorization': `Bearer ${accessToken!.value}`
    }
  });
  return await response.json();
}

export const getPermissions = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_COOKIE_NAME);
  const response = await fetch(`${process.env.API_URL}/account/permissions/`, {
    headers: {
      'Authorization': `Bearer ${accessToken!.value}`
    }
  });
  return await response.json();
}

export const addRole = async (data: RoleSchemaType) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_COOKIE_NAME);
  const response = await fetch(`${process.env.API_URL}/account/roles/`, {
    headers: {
      'Authorization': `Bearer ${accessToken!.value}`,
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data)
  });

  if (response.ok) {
    return {
      error: false,
      data: await response.json()
    }
  } else {
    return {
      error: true,
      data: await response.json()
    }
  }
}

export const updateRole = async (id: string, data: RoleSchemaType) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_COOKIE_NAME);
  const response = await fetch(`${process.env.API_URL}/account/roles/${id}/`, {
    headers: {
      'Authorization': `Bearer ${accessToken!.value}`,
      'Content-Type': 'application/json'
    },
    method: 'PATCH',
    body: JSON.stringify(data)
  });

  return {
    error: !response.ok,
    data: await response.json()
  }
}

export const assignRole = async (role: string, userId: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_COOKIE_NAME);
  const response = await fetch(`${process.env.API_URL}/account/users/${userId}/`, {
    headers: {
      'Authorization': `Bearer ${accessToken!.value}`,
      'Content-Type': 'application/json'
    },
    method: 'PATCH',
    body: JSON.stringify({'role': role})
  });

  if (response.ok) {
    return {
      error: false,
      data: await response.json()
    }
  } else {
    return {
      error: true,
      data: await response.json()
    }
  }
}

export const deleteRole = async (id: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_COOKIE_NAME);
  const response = await fetch(`${process.env.API_URL}/account/roles/${id}/`, {
    headers: {
      'Authorization': `Bearer ${accessToken!.value}`,
      'Content-Type': 'application/json'
    },
    method: 'DELETE',
  });
  revalidatePath('/dashboard/roles');
  return response.ok;
}

export const deleteUser = async (id: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_COOKIE_NAME);
  const response = await fetch(`${process.env.API_URL}/account/users/${id}/`, {
    headers: {
      'Authorization': `Bearer ${accessToken!.value}`,
      'Content-Type': 'application/json'
    },
    method: 'DELETE',
  });
  revalidatePath('/dashboard/users');
  return response.ok;
}

