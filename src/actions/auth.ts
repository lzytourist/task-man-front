'use server'

import {LoginSchemaType} from "@/types";
import {cookies} from "next/headers";

interface LoginToken {
  access: string;
  refresh: string;
}

const ACCESS_COOKIE_NAME = 'access';
const REFRESH_COOKIE_NAME = 'refresh';

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
    cookieStore.set(ACCESS_COOKIE_NAME, data.access);
    cookieStore.set(REFRESH_COOKIE_NAME, data.refresh);
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