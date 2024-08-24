"use client";
import type { FormEvent } from "react";
import { Amplify } from "aws-amplify";
import { signIn, getCurrentUser } from 'aws-amplify/auth';
import outputs from "../amplify_outputs.json";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation"; // Import the redirect function

Amplify.configure(outputs);

interface SignInFormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement;
    password: HTMLInputElement;
}

interface SignInForm extends HTMLFormElement {
    readonly elements: SignInFormElements;
}


export default function Login() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const checkUser = async () => {
            try {
                const user = await getCurrentUser();
                if (user) {
                    // User is already authenticated, redirect to /app/home
                    redirect('/app/home');
                } else {
                    setIsMounted(true); // Allow the page to render if no user is authenticated
                }
            } catch (error) {
                setIsMounted(true); // If there's an error (e.g., no user), allow the page to render
            }
        };
        checkUser();
    }, []);

    async function handleSubmit(event: FormEvent<SignInForm>) {
        event.preventDefault();
        const form = event.currentTarget;

        try {
            await signIn({
                username: form.elements.email.value,
                password: form.elements.password.value,
            });
            redirect('/app/home');
            
        } catch (error) {
            const user = await getCurrentUser();
            if (user) {
                redirect('/app/home');
            } else {
                console.error('Error signing in', error);
            }            
        }
    }

    if (!isMounted) {
        return null; // Don't render anything until we've checked the authentication status
    }

    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 m-8">
            <Card className="w-full max-w-sm border-input">
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
                        <CardDescription>
                            {"Ingresa tu correo y contraseña para acceder a tu cuenta."}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" placeholder="tu.email@dominio.com" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input id="password" name="password" placeholder="************" type="password" required />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button variant={"default"} className="w-full" type="submit">
                            Iniciar Sesión
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
