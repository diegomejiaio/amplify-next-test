"use client";
import type { FormEvent } from "react";
import { Amplify } from "aws-amplify";
import { signIn } from 'aws-amplify/auth';
import outputs from "../../../amplify_outputs.json";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "../../../components/ui/input";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import PasswordInput from "@/components/ui/password-input";
import { ButtonLoading } from "@/components/ButtonLoading";

Amplify.configure(outputs);

interface SignInFormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement;
    password: HTMLInputElement;
}

interface SignInForm extends HTMLFormElement {
    readonly elements: SignInFormElements;
}

export default function Login({ handleAuthCase, handleEmail, handleTempPassword }: { handleAuthCase: (authCase: string) => void, handleEmail: (email: string) => void, handleTempPassword: (tempPassword: string) => void }) {
    const router = useRouter()
    const [authError, setAuthError] = useState<string | null>(null);
    const [password, setPassword] = useState("")
    const [loadingButton, setLoadingButton] = useState(false);

    async function handleSubmit(event: FormEvent<SignInForm>) {
        setLoadingButton(true);
        event.preventDefault();
        const form = event.currentTarget;
        try {
            const signInResponse = await signIn({
                username: form.elements.email.value,
                password: form.elements.password.value,
            });
            if (signInResponse.nextStep.signInStep === 'DONE') {
                router.push('/app');
            } if (signInResponse.nextStep.signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
                handleEmail(form.elements.email.value);
                handleAuthCase('defineNewPassword');
                handleTempPassword(form.elements.password.value);
                setLoadingButton(false);
            } if (signInResponse.nextStep.signInStep === 'CONFIRM_SIGN_UP') {
                setLoadingButton(false);
            }
        } catch (error:any) {
            console.error('Error signing in', error.message);
            if (error.message === 'Incorrect username or password.') {
                setAuthError('Usuario o contraseña incorrectos');
                setLoadingButton(false);
                return false;
            } else {
                setAuthError('Error al iniciar sesión');
                console.error('Error signing in', error);
                setLoadingButton(false);
            }
        }
    }

    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 m-8">
            <Card className="w-full max-w-sm border-input">
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle className="text-2xl">Iniciar sesión</CardTitle>
                        <CardDescription>
                            {"Ingresa tu correo y contraseña para acceder a tu cuenta."}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" placeholder="usuario@tivit.com" required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <PasswordInput id="password" name="password" placeholder="••••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                            {authError && <p className="text-red-500 text-sm">{authError}</p>}
                    </CardContent>
                    <CardFooter>
                        <div className="flex-auto space-y-2">
                        {loadingButton ? (
                            <ButtonLoading text="Cargando" className="w-full"/>
                        ) : (
                            <Button variant={"default"} className="w-full" type="submit">
                                Iniciar sesión
                            </Button>
                        )}
                        <Button variant={"ghost"} className="w-full" onClick={() => handleAuthCase('recoverPassword')}>
                            <p className="text-xs">¿Olvidaste tu contraseña?</p>
                        </Button>
                        <Button variant={"ghost"} className="w-full hidden" onClick={() => router.push('/auth/create')}>
                            <p className="text-xs">Autencitación cognito</p>
                        </Button>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
