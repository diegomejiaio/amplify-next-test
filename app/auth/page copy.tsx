"use client";

import type { FormEvent } from "react";
import { Amplify } from "aws-amplify";
import outputs from "../../amplify_outputs.json";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import NavbarPublic from '../../components/NavbarPublic';
import SpaceBackground from '../../components/SpaceBackground';

Amplify.configure(outputs);

interface SignInFormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement;
    password: HTMLInputElement;
    newPassword?: HTMLInputElement;
}

interface SignInForm extends HTMLFormElement {
    readonly elements: SignInFormElements;
}

const LoginForm = () => {
    const [error, setError] = useState<string | null>(null);
    const [isNewPasswordRequired, setIsNewPasswordRequired] = useState(false);
    const [userForPasswordChange, setUserForPasswordChange] = useState<any>(null);
    const router = useRouter();

    async function handleSubmit(event: FormEvent<SignInForm>) {
        event.preventDefault();
        const form = event.currentTarget;

        try {
            if (isNewPasswordRequired && userForPasswordChange) {
                await Auth.completeNewPassword(userForPasswordChange, form.elements.newPassword!.value);
                console.log("Password successfully changed");
                setIsNewPasswordRequired(false);
                setUserForPasswordChange(null);
                router.push('/home'); // Redirect after password change
            } else {
                const user = await Auth.signIn(form.elements.email.value, form.elements.password.value);

                if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                    setIsNewPasswordRequired(true);
                    setUserForPasswordChange(user);
                } else {
                    console.log("Sign in successful");
                    router.push('/home'); // Redirect after successful sign-in
                }
            }
        } catch (error: any) {
            console.error("Error signing in", error);
            setError(error.message || "Failed to sign in");
        }
    }

    return (
        <>
            <NavbarPublic />
            <main className="relative w-full min-h-[calc(100vh-57px)] flex items-center justify-center">
                <section className="absolute inset-0" style={{ marginTop: "-60px" }}>
                    <SpaceBackground />
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 m-8">
                        <Card className="w-full max-w-sm border-input">
                            <form onSubmit={handleSubmit}>
                                <CardHeader>
                                    <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
                                    <CardDescription>
                                        {isNewPasswordRequired ? 
                                            "Cambia tu contraseña para continuar." : 
                                            "Ingresa tu correo y contraseña para acceder a tu cuenta."
                                        }
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-4">
                                    {error && <p className="text-red-500 text-sm">{error}</p>}
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" name="email" type="email" placeholder="jorge.perez@tivit.com" required />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="password">Contraseña</Label>
                                        <Input id="password" name="password" placeholder="************" type="password" required />
                                    </div>
                                    {isNewPasswordRequired && (
                                        <div className="grid gap-2">
                                            <Label htmlFor="newPassword">Nueva Contraseña</Label>
                                            <Input id="newPassword" name="newPassword" type="password" placeholder="************" required />
                                        </div>
                                    )}
                                </CardContent>
                                <CardFooter>
                                    <Button variant={"default"} className="w-full" type="submit">
                                        {isNewPasswordRequired ? "Cambiar Contraseña" : "Iniciar Sesión"}
                                    </Button>
                                </CardFooter>
                            </form>
                        </Card>
                    </div>
                </section>
            </main>
        </>
    );
}

export default LoginForm;
