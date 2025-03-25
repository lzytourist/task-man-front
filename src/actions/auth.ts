'use server'

import {LoginSchemaType} from "@/types";
import {cookies} from "next/headers";
import {ACCESS_COOKIE_NAME, REFRESH_COOKIE_NAME} from "@/lib/constants";
import {getTokenExpiry} from "@/lib/utils";

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