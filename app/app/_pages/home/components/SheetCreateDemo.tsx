import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';
import { Save, Trash2 } from "lucide-react";
import { getCurrentUser } from 'aws-amplify/auth';
import { ButtonLoading } from "@/components/ButtonLoading";

const client = generateClient<Schema>();

interface SheetCreateDemoProps {
    children: React.ReactNode;
}

export default function SheetCreateDemo({ children }: SheetCreateDemoProps) {
    const [name, setName] = useState("");
    const [cloud, setCloud] = useState<"aws" | "gcp" | "azure">("aws");
    const [status, setStatus] = useState<"running" | "launching" | "stopping" | "down">("running");
    const [repositoryUrl, setRepositoryUrl] = useState("");
    const [applicationUrl, setApplicationUrl] = useState("");
    const [version, setVersion] = useState("");
    const [description, setDescription] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [sheetOpen, setSheetOpen] = useState(false);
    const [loadingButton, setLoadingButton] = useState(false);


    // Lógica para habilitar o deshabilitar el botón "Guardar demo"
    useEffect(() => {
        const areFieldsComplete = name.trim() && repositoryUrl.trim() && applicationUrl.trim() && version.trim();
        setIsButtonDisabled(!areFieldsComplete);
    }, [name, repositoryUrl, applicationUrl, version]);

    // Función para limpiar el formulario
    const clearForm = () => {
        setName("");
        setCloud("aws");
        setStatus("running");
        setRepositoryUrl("");
        setApplicationUrl("");
        setVersion("");
        setDescription("");
    };

    // Función para manejar la creación de la demo
    const handleCreateDemo = async () => {
        setLoadingButton(true);
        const { userId } = await getCurrentUser();
        try {
            const { data, errors } = await client.models.Demo.create({
                demoId: crypto.randomUUID(),
                name,
                cloud,
                status,
                repositoryUrl,
                applicationUrl,
                version,
                description,
                createdAt: new Date().toISOString(),
                ownerId: userId,
            });
            if (errors) {
                console.error(errors);
                setLoadingButton(false);
            } else {
                console.log('Demo created successfully:', data);
                setLoadingButton(false);
                clearForm();
                setSheetOpen(false);
            }
        } catch (error) {
            setLoadingButton(false);
            console.error('Failed to create demo:', error);
        }
    };

    return (
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent className="flex flex-col h-full"> {/* Flex y h-full para ocupar toda la altura */}
                <SheetHeader className="border-b pb-4">
                    <SheetTitle>Registra demo</SheetTitle>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto pr-1"> {/* Permite que el formulario sea scrolleable */}
                    <div className="grid gap-4 py-1">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Nombre
                            </Label>
                            <Input 
                                id="name" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                placeholder="Nombre de la demo"
                                className="col-span-3 w-full" 
                                required 
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="cloud" className="text-right">
                                Cloud
                            </Label>
                            <Select value={cloud} onValueChange={(value: "aws" | "gcp" | "azure") => setCloud(value)} required>
                                <SelectTrigger className="w-full col-span-3">
                                    <SelectValue placeholder="Selecciona un proveedor de cloud" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="aws">AWS</SelectItem>
                                        <SelectItem value="gcp">GCP</SelectItem>
                                        <SelectItem value="azure">Azure</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">
                                Estado
                            </Label>
                            <Select value={status} onValueChange={(value: "running" | "launching" | "stopping" | "down") => setStatus(value)} required>
                                <SelectTrigger className="w-full col-span-3">
                                    <SelectValue placeholder="Selecciona un estado" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="running">Running</SelectItem>
                                        <SelectItem value="launching">Launching</SelectItem>
                                        <SelectItem value="stopping">Stopping</SelectItem>
                                        <SelectItem value="down">Down</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="repositoryUrl" className="text-right">
                                Repositorio
                            </Label>
                            <Input 
                                id="repositoryUrl" 
                                value={repositoryUrl} 
                                onChange={(e) => setRepositoryUrl(e.target.value)} 
                                placeholder="URL del repositorio git"
                                className="col-span-3 w-full" 
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="applicationUrl" className="text-right">
                                Link
                            </Label>
                            <Input 
                                id="applicationUrl" 
                                value={applicationUrl} 
                                onChange={(e) => setApplicationUrl(e.target.value)} 
                                placeholder="URL de la aplicación"
                                className="col-span-3 w-full" 
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="version" className="text-right">
                                Versión
                            </Label>
                            <Input 
                                id="version" 
                                value={version} 
                                onChange={(e) => setVersion(e.target.value)} 
                                placeholder="Versión de la demo ej. 1.0.0"
                                className="col-span-3 w-full" 
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Descripción
                            </Label>
                            <Textarea 
                                id="description" 
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)} 
                                placeholder="Descripción detallada de la demo (opcional)"
                                className="col-span-3 w-full" 
                            />
                        </div>
                    </div>
                </div>
                <SheetFooter className="border-t flex-shrink-0 pt-2">
                    {loadingButton ? (
                        <ButtonLoading text="Guardando" className="ml-2"/>
                    ) : (
                        <Button onClick={handleCreateDemo} disabled={isButtonDisabled} className="ml-2">
                            <Save height={16} />
                            Guardar demo
                        </Button>
                    )}
                    <Button onClick={clearForm} variant="outline">
                        <Trash2 height={16}/>
                        Limpiar
                    </Button> {/* Botón Limpiar */}
                    <SheetClose asChild>
                        <Button variant="outline" className="ml-2">Cancelar</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
