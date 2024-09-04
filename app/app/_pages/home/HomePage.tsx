// app/app/_pages/Home.tsx
"use client";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";
import React from "react";
import { Applications, columns } from "./columns";
import { DataTable } from "./data-table";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { File, ListFilter, PlusCircle } from "lucide-react";
import SheetCreateDemo from "./components/SheetCreateDemo";
import { Toaster } from "@/components/ui/toaster";
import { getCurrentUser } from "aws-amplify/auth";
import App from "next/app";

const client = generateClient<Schema>();

// Simulación de función para obtener datos
async function getData(): Promise<Applications[]> {
    try {
        const { data: Demo, errors } = await client.models.Demo.list();
        if (errors) {
            console.error("Error fetching data:", errors);
            return [];
        } else if (!Demo || Demo.length === 0) {
            console.warn("No data returned from query");
            return [];
        } else {
            console.log("Data fetched successfully:", Demo);
            return (
                Demo
                    // fiter isVisible true
                    .filter((item) => item.isVisible === true)
                    .map((item) => ({
                        id: item.demoId,
                        name: item.name,
                        status: item.status || "running",
                        repository: item.repositoryUrl,
                        public_url: item.applicationUrl,
                        version: item.version,
                        cloud: item.cloud,
                        created_at: item.createdAt,
                        description: item.description,
                        owner: item.ownerId,
                    }))
            );
        }
    } catch (error) {
        console.error("Unexpected error:", error);
        return [];
    }
}

const HomePage: React.FC = () => {
    const [dataIsLoading, setDataIsLoadig] = useState(true);
    const [data, setData] = useState<Applications[]>([]);
    const { toast } = useToast();
    const [tab, setTab] = useState("active");

    useEffect(() => {
        const fetchData = async () => {
            const result = await getData();
            setDataIsLoadig(false);
            setData(result);
        };
        fetchData();
    }, []);

    const deleteDemo = async (demoId: string) => {
        console.log(`Deleting demo with ID: ${demoId}`);
        try {
            const { data: deletedDemo, errors } = await client.models.Demo.update({
                demoId: demoId,
                isVisible: false as boolean,
            });
            if (!errors) {
                setData((prevData) => prevData.filter((demo) => demo.id !== demoId));
                toast({
                    title: "Demostración eliminada",
                    description: "La demostración se ha eliminado correctamente.",
                    action: (
                        <Button variant="outline" onClick={() => undoDelete(deletedDemo)}>
                            Undo
                        </Button>
                    ),
                });
            } else {
                throw new Error("Hubo un error al eliminar la demo");
            }
        } catch (error) {
            console.error("Error deleting demo:", error);
            toast({
                title: "Error",
                description: "Error la intentar eliminar.",
                variant: "destructive",
            });
        } finally {
            console.log("Delete operation completed");
        }
    };

    const undoDelete = async (deletedDemo: any) => {
        try {
            const { data: updatedDemo, errors } = await client.models.Demo.update({
                demoId: deletedDemo.demoId,
                isVisible: true,
            });
            if (!errors) {
                setData(data);
                toast({
                    title: "Demostración restaurada",
                    description: "La demostración se ha restaurado correctamente.",
                });
            } else {
                throw new Error("Failed to undo delete");
            }
        } catch (error) {
            console.error("Error undoing delete:", error);
        }
    };

    const createDemo = async (demo: Applications) => {
        const { userId } = await getCurrentUser();
        try {
            const { data: createdDemo, errors } = await client.models.Demo.create({
                demoId: crypto.randomUUID(),
                name: demo.name,
                status: demo.status,
                repositoryUrl: demo.repository,
                applicationUrl: demo.public_url,
                version: demo.version,
                cloud: demo.cloud,
                description: demo.description,
                createdAt: new Date().toISOString(),
                ownerId: userId,
                isVisible: true,
            });
            if (!errors) {
                const newDemo: Applications = {
                    id: createdDemo?.demoId ?? "",
                    name: createdDemo?.name ?? "",
                    status: createdDemo?.status ?? "running",
                    repository: createdDemo?.repositoryUrl ?? "",
                    public_url: createdDemo?.applicationUrl ?? "",
                    version: createdDemo?.version ?? "",
                    cloud: createdDemo?.cloud ?? "aws",
                    created_at: createdDemo?.createdAt ?? "",
                    description: createdDemo?.description ?? "",
                };
                setData((prevData) => [...prevData, newDemo]);
            } else {
                throw new Error("Failed to create demo");
            }
        } catch (error) {
            console.error("Error creating demo:", error);
        }
    };

    return (
        <div className="pr-4 sm:pr-0">
            <Tabs defaultValue="active">
                <div className="flex items-center">
                    <TabsList>
                        <TabsTrigger value="active">Activos</TabsTrigger>
                        <TabsTrigger value="inactive">Inactivos</TabsTrigger>
                    </TabsList>
                    <div className="ml-auto flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="h-7 gap-1">
                                    <ListFilter className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Filtrar
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem checked>
                                    Activos
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>Borrador</DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>Archivados</DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Button size="sm" variant="outline" className="h-7 gap-1" disabled>
                            <File className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Exportar
                            </span>
                        </Button>
                        <SheetCreateDemo createDemo={createDemo}>
                            <Button size="sm" className="h-7 gap-1">
                                <PlusCircle className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Agregar Producto
                                </span>
                            </Button>
                        </SheetCreateDemo>
                    </div>
                </div>
                <TabsContent value="active">
                    <Card className="border-input">
                        <CardHeader>
                            <CardTitle>Demostraciones</CardTitle>
                            <CardDescription>
                                Lista de aplicaciones demo de Tivit Digital Latam.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                        <div className="overflow-x-auto">

                                <DataTable
                                    columns={columns}
                                    data={data}
                                    deleteDemo={deleteDemo}
                                    isLoading={dataIsLoading}
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <div className="text-xs text-muted-foreground">
                                Mostrando <strong>1-6</strong> de <strong>24</strong> items
                            </div>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
            <Toaster />
        </div>
    );
};

export default HomePage;
