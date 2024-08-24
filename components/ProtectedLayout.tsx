"use client";

import { ReactNode, useEffect } from "react";
import { redirect } from "next/navigation";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { AuthUser } from "aws-amplify/auth";

interface ProtectedLayoutProps {
    children: ReactNode;
    user?: AuthUser; // `user` prop injected by `withAuthenticator`
}

const ProtectedLayout = ({ children, user }: ProtectedLayoutProps) => {
    useEffect(() => {
        if (!user) {
            // If the user is not authenticated, redirect to /auth
            redirect('/auth');
        }
    }, [user]);

    // Render the children content only if the user is authenticated
    if (!user) {
        return null; // Prevent rendering until the redirect occurs
    }

    return (
        <>
            {children}
        </>
    );
};

// Wrap the component with `withAuthenticator`
export default withAuthenticator(ProtectedLayout);
