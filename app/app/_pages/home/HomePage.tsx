// app/app/_pages/Home.tsx
"use client";
import { generateClient } from 'aws-amplify/data';
import { type Schema } from '@/amplify/data/resource';
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
import SheetCreateDemo from "./components/SheetCreateDemo";

const client = generateClient<Schema>();

// Simulación de función para obtener datos
async function getData(): Promise<Applications[]> {
    try {
        const { data: Demo, errors } = await client.models.Demo.list();
        if (errors) {
            console.error('Error fetching data:', errors);
            return [];
        } else if (!Demo || Demo.length === 0) {
            console.warn('No data returned from query');
            return [];
        } else {
            console.log('Data fetched successfully:', Demo);
            return Demo
                // sort by createdAt timestamp
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .map((item) => ({
                id: item.demoId,
                name: item.name,
                status: item.status || "running",
                repository: item.repositoryUrl,
                public_url: item.applicationUrl,
                version: item.version,
                cloud: item.cloud,
            }));
        }
    } catch (error) {
        console.error('Unexpected error:', error);
        return [];
    }
}

const HomePage: React.FC = () => {
    const [data, setData] = React.useState<Applications[]>([]);

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await getData();
            setData(result);
        };
        fetchData();
    }, []);

    async function handleDelete(demoId: string, createdAt: string) {
        try {
            const { data , errors } = await client.models.Demo.delete({ demoId, createdAt });
            if (errors) {
                console.error('Error deleting data:', errors);
            } else {
                console.log('Data deleted successfully');
                setData(data => data.filter(item => item.id !== demoId));
            }
        } catch (error) {
            console.error('Unexpected error:', error);
        }
    }

    return (
        <div className="grid flex-1 max-w-[1200px] witems-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
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

                        <Button size="sm" variant="outline" className="h-7 gap-1" disabled>
                            <File className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Exportar
                            </span>
                        </Button>
                        <SheetCreateDemo>
                            <Button size="sm" className="h-7 gap-1">
                                <PlusCircle className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Agregar Producto
                                </span>
                            </Button>
                        </SheetCreateDemo>
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

export default HomePage;