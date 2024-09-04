// app/app/_pages/Home.tsx
"use client";

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
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
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

// Simulación de función para obtener datos
async function getData(): Promise<Applications[]> {
    return [
        {
            id: "1",
            name: "Laser Lemonade Machine",
            status: "running",
            repository: "www.google.com",
            public_url: "www.google.com",
            version: "1.0.0",
            cloud: "aws",
        },
        {
            id: "2",
            name: "Hypernova Headphones",
            status: "launching",
            repository: "google.com",
            public_url: "google.com",
            version: "1.0.0",
            cloud: "aws",
        },
        {
            id: "3",
            name: "AeroGlow Desk Lamp",
            status: "running",
            repository: "google.com",
            public_url: "google.com",
            version: "1.0.0",
            cloud: "gcp",
        },
        {
            id: "4",
            name: "TechTonic Energy Drink",
            status: "down",
            repository: "google.com",
            public_url: "google.com",
            version: "1.0.0",
            cloud: "aws",
        },
        {
            id: "5",
            name: "Gamer Gear Pro Controller",
            status: "down",
            repository: "google.com",
            public_url: "google.com",
            version: "1.0.0",
            cloud: "gcp",
        },
        {
            id: "6",
            name: "Luminous VR Headset",
            status: "down",
            repository: "google.com",
            public_url: "google.com",
            version: "1.0.0",
            cloud: "aws",
        }
    ];
}

const DemosPage: React.FC = () => {
    const [data, setData] = React.useState<Applications[]>([]);

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await getData();
            setData(result);
        };
        fetchData();
    }, []);

    return (
        <div className="pr-4 sm:pr-0">
            <Tabs defaultValue="all">
                <div className="flex items-center">
                    <TabsList>
                        <TabsTrigger value="all">Todos</TabsTrigger>
                        <TabsTrigger value="active">Activos</TabsTrigger>
                        <TabsTrigger value="draft">Draft</TabsTrigger>
                        <TabsTrigger value="archived" className="hidden sm:flex">
                            Archivados
                        </TabsTrigger>
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
                                <DropdownMenuCheckboxItem>
                                    Archivados
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button size="sm" variant="outline" className="h-7 gap-1">
                            <File className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Exportar
                            </span>
                        </Button>
                        <Button size="sm" className="h-7 gap-1">
                            <PlusCircle className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Agregar Producto
                            </span>
                        </Button>
                    </div>
                </div>
                <TabsContent value="all">
                    <Card className="border-input">
                        <CardHeader>
                        <CardTitle>Demos</CardTitle>
                            <CardDescription>
                                Lista de aplicaciones demo de Tivit Digital Latam.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <DataTable columns={columns} data={data} />
                        </CardContent>
                        <CardFooter>
                            <div className="text-xs text-muted-foreground">
                                Mostrando <strong>1-6</strong> de <strong>24</strong> items
                            </div>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default DemosPage;