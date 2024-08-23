"use client"
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { AuthUser } from "aws-amplify/auth";
import { withAuthenticator } from "@aws-amplify/ui-react";

const Signup = ({user}:{user?:AuthUser}) => {
    useEffect(() => {
        if (user) {
            // If user is authenticated, perform client-side redirect
            redirect('/home');
        }
    }
    ,);
    return null;
}

export default withAuthenticator(Signup);