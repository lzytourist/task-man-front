'use server'

import {cookies} from "next/headers";
import {ACCESS_COOKIE_NAME} from "@/lib/constants";

export const fetchAPI = async (uri: string, options: RequestInit, authorized: boolean  = true) => {
  options.headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (authorized) {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get(ACCESS_COOKIE_NAME);

    if (accessToken?.value) {
      options.headers = {
        'Authorization': `Bearer ${accessToken.value}`,
        ...options.headers,
      }
    }
  }

  const response = await fetch(`${process.env.API_URL}/${uri}`, options);
  return {
    error: !response.ok,
    statusCode: response.status,
    data: await response.json()
  }
}