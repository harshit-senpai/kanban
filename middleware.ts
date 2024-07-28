import { NextResponse } from "next/server";

import {
  clerkMiddleware,
  createRouteMatcher,
  redirectToSignIn,
} from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/"]);

const isProtectedRoute = createRouteMatcher([
  "/select-org",
  "/organization/:id",
]);

export default clerkMiddleware((auth, req) => {
  if (auth().userId && isPublicRoute(req)) {
    // user is logged in but the is at landing page, redirect to the org selection page
    let path = "/select-org";

    // user id logged in and has a organization but is trying yo visit landing page
    if (auth().orgId) {
      path = `/organization/${auth().orgId}`;
    }

    const orgSelection = new URL(path, req.url);
    return NextResponse.redirect(orgSelection);
  }

  // user is not logged in and is trying to access a protected route, redirect to sign in
  if (!auth().userId && isProtectedRoute(req)) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  // user is logged in but has no organization, redirect to org selection
  if (
    auth().userId &&
    !auth().orgId &&
    req.nextUrl.pathname !== "/select-org"
  ) {
    const orgSelection = new URL("/select-org", req.url);
    return NextResponse.redirect(orgSelection);
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
