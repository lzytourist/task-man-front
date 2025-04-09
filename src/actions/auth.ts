'use server'

import {EmailSchemaType, LoginSchemaType} from "@/types";
import {cookies} from "next/headers";
import {ACCESS_COOKIE_NAME, REFRESH_COOKIE_NAME} from "@/lib/constants";
import {getTokenExpiry} from "@/lib/utils";
import {revalidatePath} from "next/cache";

interface LoginToken {
  access: string;
  refresh: string;
}

export const login = async (data: LoginSchemaType) => {
  const response = await fetch(`${process.env.API_URL}/account/token/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });

  // console.log(response);

  if (response.ok) {
    const data = await response.json() as LoginToken;
    const cookieStore = await cookies();

    const accessExp = getTokenExpiry(data.access);
    const refreshExp = getTokenExpiry(data.refresh);

    cookieStore.set(ACCESS_COOKIE_NAME, data.access, {
      httpOnly: true,
      expires: accessExp * 1000
    });
    cookieStore.set(REFRESH_COOKIE_NAME, data.refresh, {
      httpOnly: true,
      expires: refreshExp * 1000
    });
    return {
      error: false,
      data: data
    };
  } else {
    return {
      error: true,
      data: await response.json()
    }
  }
};

export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_COOKIE_NAME);
  cookieStore.delete(REFRESH_COOKIE_NAME);
}

export const authUser = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_COOKIE_NAME);

  const response = await fetch(`${process.env.API_URL}/account/user/`, {
    headers: {
      'Authorization': `Bearer ${accessToken!.value}`
    }
  });
  return await response.json();
}

export const getNotifications = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_COOKIE_NAME);

  const response = await fetch(`${process.env.API_URL}/account/notifications/`, {
    headers: {
      'Authorization': `Bearer ${accessToken!.value}`
    }
  });
  return await response.json();
}

export const deleteNotification = async (id: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_COOKIE_NAME);

  await fetch(`${process.env.API_URL}/account/notifications/${id}/`, {
    headers: {
      'Authorization': `Bearer ${accessToken!.value}`
    },
    method: 'DELETE'
  });
}

export const notificationMarkSeen = async (ids: string[]) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_COOKIE_NAME);

  await fetch(`${process.env.API_URL}/account/notifications/mark-seen/`, {
    headers: {
      'Authorization': `Bearer ${accessToken!.value}`,
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({'ids': ids})
  });
}

export const getAccesToken = async () => {
  const cookieStore = await cookies();
  const access = cookieStore.get(ACCESS_COOKIE_NAME);
  if (!access?.value) {
    return '';
  }
  return access.value;
}

export const sendEmail = async (data: EmailSchemaType) => {
  const cookieStore = await cookies();
  const access = cookieStore.get(ACCESS_COOKIE_NAME);

  const response = await fetch(`${process.env.API_URL}/account/send-email/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${access?.value}`
    },
    body: JSON.stringify(data)
  });
  
  return {
    error: !response.ok,
    data: !response.ok ? await response.json() : ''
  }
}