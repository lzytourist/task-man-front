'use server'

import {LoginSchemaType} from "@/types";
import {cookies} from "next/headers";
import {ACCESS_COOKIE_NAME, REFRESH_COOKIE_NAME} from "@/lib/constants";
import {getTokenExpiry} from "@/lib/utils";
import {fetchAPI} from "@/actions/base";

interface LoginToken {
  access: string;
  refresh: string;
}

export const login = async (data: LoginSchemaType) => {
  const response = await fetchAPI(`/account/token/`, {
    method: 'POST',
    body: JSON.stringify(data)
  }, false);

  if (!response.error) {
    const data = response.data as LoginToken;
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
  }

  return response;
};

export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_COOKIE_NAME);
  cookieStore.delete(REFRESH_COOKIE_NAME);
}

export const authUser = async () => {
  return await fetchAPI(`${process.env.API_URL}/account/user/`, {method: 'GET'});
}