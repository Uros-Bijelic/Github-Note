import { EOnboardingStep } from './types/onboarding-step';

import { Session } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

import {
  AUTH_ROUTES,
  HOME_ROUTE,
  LOGIN_ROUTE,
  ONBOARDING_ROUTE,
} from '@/lib/routes';

// ----------------------------------------------------------------

export const proxy = async (req: NextRequest) => {
  const currentRoute = req.nextUrl.pathname;

  const response = await fetch(`${req.nextUrl.origin}/api/user`, {
    headers: {
      Cookie: req.cookies.toString(),
    },
  });
  const session: Session | undefined = await response.json();
  const isAuthenticated = !!session?.user;

  const isOnboardingFinished =
    session?.user?.onboardingStep === EOnboardingStep.FINISHED_ONBOARDING;

  // routes
  const isAuthRoute = AUTH_ROUTES.includes(currentRoute);
  const isOnboardingRoute = currentRoute.startsWith(ONBOARDING_ROUTE);

  if (isAuthenticated) {
    if (!isOnboardingFinished && !isOnboardingRoute) {
      return NextResponse.redirect(new URL(ONBOARDING_ROUTE, req.nextUrl));
    }

    if (isOnboardingFinished && isOnboardingRoute) {
      return NextResponse.redirect(new URL(HOME_ROUTE, req.nextUrl));
    }

    if (isAuthRoute) {
      return NextResponse.redirect(new URL(HOME_ROUTE, req.nextUrl));
    }
  } else {
    if (!isAuthRoute) {
      return NextResponse.redirect(new URL(LOGIN_ROUTE, req.nextUrl));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico).*)'],
};
