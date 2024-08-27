import { NextRequest, NextResponse } from "next/server";
import { runWithAmplifyServerContext } from "./utils/utils";
import { fetchAuthSession } from "aws-amplify/auth/server";

export async function middleware(request: NextRequest) {
    const response = NextResponse.next()

    const authenticated = await runWithAmplifyServerContext({
        nextServerContext: {request, response},
        operation: async (context: any) => {
            try{
                const session = await fetchAuthSession(context, {})
                return session.tokens !== undefined
            }catch(err){
                console.log(err)
                return false
            }
        }
    })
    if(authenticated) {
        return response

    }
    const parsedURL = new URL(request.url);
    const path = parsedURL.pathname;
    return NextResponse.redirect(new URL(`/auth/?origin=${path}`, request.url));
}

export const config = {
    matcher: ["/app/:path*"],
}