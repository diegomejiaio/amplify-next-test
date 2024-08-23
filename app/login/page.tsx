'use client';

import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useEffect } from 'react';
import { I18n } from 'aws-amplify/utils';
import { translations } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import NavbarPublic from '../../components/NavbarPublic';
import SpaceBackground from '../../components/SpaceBackground';
import outputs from "../../amplify_outputs.json";
import Signup from '../../components/Signup';

// Set language and configure Amplify
I18n.putVocabularies(translations);
I18n.setLanguage('es');
Amplify.configure(outputs);

const LoginForm = () => {
    return (
        <>
            <NavbarPublic />
            <main className="relative w-full min-h-[calc(100vh-57px)] flex items-center justify-center">
                <section className="absolute inset-0" style={{ marginTop: "-60px" }}>
                    <SpaceBackground />
                    <Signup/>
                </section>
            </main>
        </>
    );
};

export default LoginForm;
