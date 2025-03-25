import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {cookies} from "next/headers";
import {ACCESS_COOKIE_NAME, REFRESH_COOKIE_NAME, USER_COOKIE_NAME} from "@/lib/constants";
import {getTokenExpiry} from "@/lib/utils";
import {authUser} from "@/actions/auth";

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get(ACCESS_COOKIE_NAME);
  const refreshToken = cookieStore.get(REFRESH_COOKIE_NAME);

  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!accessToken) {
    const response = await fetch(`${process.env.API_URL}/account/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'refresh': refreshToken!.value
      })
    });

    if (response.ok) {
      const {access} = await response.json() as {access: string};
      cookieStore.set(ACCESS_COOKIE_NAME, access, {
        httpOnly: true,
        expires: getTokenExpiry(access) * 1000
      });
    } else {
      cookieStore.delete(REFRESH_COOKIE_NAME);
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/dashboard/:path*',
}