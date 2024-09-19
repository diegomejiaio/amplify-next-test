'use client';
import '@aws-amplify/ui-react/styles.css';
import { Suspense } from 'react';
import { I18n } from 'aws-amplify/utils';
import { translations } from '@aws-amplify/ui-react';
import NavbarPublic from '../../../components/NavbarPublic';
import SpaceBackground from '../../../components/SpaceBackground';
import Signup from '../../../components/Auth';
import { Skeleton } from "@/components/ui/skeleton"
import { Amplify } from 'aws-amplify';
import outputs from "../../../amplify_outputs.json";
import Login from '@/app/auth/_components/Login';
import Auth from '../../../components/Auth';
import { useState } from 'react';
import ConfirmPassword from '../_components/ConfirmPassword';
import { LoadingSpinner } from '@/components/LoadingSpinner';


// Set language and configure Amplify
I18n.putVocabularies(translations);
I18n.setLanguage('es');



Amplify.configure(outputs);


const LoginForm = () => {

    const [authCase, setAuthCase] = useState("login");
    const [email, setEmail] = useState("");

    const handleAuthCase = (authCase: string) => {
        setAuthCase(authCase);
    }
    const handleEmail = (email: string) => {
        setEmail(email);
    }

    return (
        <>
            <NavbarPublic isAuthenticated={false} />
            <main className="relative w-full min-h-[calc(100vh-57px)] flex items-center justify-center">
                <section className="absolute inset-0" style={{ marginTop: "-60px" }}>
                    <SpaceBackground />
                    {/* <Login/> */}
                    <Suspense fallback={<LoadingSpinner/>}>
                        <Auth/>
                    </Suspense>
                    
                </section>
            </main>
        </>
    );
};

export default LoginForm;
