'use server'

import {LoginSchemaType} from "@/types";
import {cookies} from "next/headers";

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
    const cookieStore = await cookies() ;
    cookieStore.set('access', data.access);
    cookieStore.set('refresh', data.refresh);
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