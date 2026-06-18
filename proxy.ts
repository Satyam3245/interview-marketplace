import arcjet ,{ shield ,detectBot} from '@arcjet/next';
import { auth, clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
// import { use } from 'react';
const protectedRouter = createRouteMatcher([
  "/appointments(.*)",
  "/explore(.*)",
  "/dashboard(.*)",
  "/onboarding(.*)",
])

const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE", "CATEGORY:PREVIEW"],
    }),
  ],
});

export default clerkMiddleware(async (auth ,req)=>{
  const {userId} = await auth();
  const decision = await aj.protect(req);
  if(decision.isDenied()){
    return NextResponse.json({
      error : "forbidden"
    },{
      status : 403
    })
  };

  if(!userId && protectedRouter(req)){
    const {redirectToSignIn} = await auth();
    return redirectToSignIn();
  } 
  return NextResponse.next();
});




export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};