'use client';
import '@aws-amplify/ui-react/styles.css';
import { Suspense } from 'react';
import NavbarPublic from '../../components/NavbarPublic';
import SpaceBackground from '../../components/SpaceBackground';
import { Skeleton } from "@/components/ui/skeleton"
import { Amplify } from 'aws-amplify';
import outputs from "../../amplify_outputs.json";
import Login from '@/app/auth/_components/Login';
import { useState } from 'react';
import ConfirmPassword from './_components/ConfirmPassword';
import RecoverPassword from './_components/RecoverPassword';
import Auth from '@/components/Auth';

Amplify.configure(outputs);


const LoginForm = () => {

    const [authCase, setAuthCase] = useState("login");
    const [email, setEmail] = useState("");
    const [tempPassword, setTempPassword] = useState("");

    const handleAuthCase = (authCase: string) => {
        setAuthCase(authCase);
    }
    const handleEmail = (email: string) => {
        setEmail(email);
    }

    const handleTempPassword = (tempPassword: string) => {
        setTempPassword(tempPassword);
    }

    const handleAuth = () => {
        if (authCase === "login") {
            return <Login handleEmail={handleEmail} handleAuthCase={handleAuthCase} handleTempPassword={handleTempPassword}/>
        } if (authCase === "defineNewPassword") {
            return <ConfirmPassword  handleAuthCase={handleAuthCase} email={email} tempPasswordPass={tempPassword}/>
        } if (authCase === "recoverPassword") {
            return <RecoverPassword handleAuthCase={handleAuthCase}/>
        }
    }

    return (
        <>
            <NavbarPublic isAuthenticated={false} />
            <main className="relative w-full min-h-[calc(100vh-57px)] flex items-center justify-center">
                <section className="absolute inset-0" style={{ marginTop: "-60px" }}>
                    <SpaceBackground />
                    {/* <Login/> */}
                    <Suspense fallback={<Skeleton className="w-[480px] h-[420px] rounded-full" />}>
                        {handleAuth()}
                    </Suspense>
                    
                </section>
            </main>
        </>
    );
};

export default LoginForm;
