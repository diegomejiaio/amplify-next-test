// app/app/_pages/Home.tsx
"use client";
import { useToast } from "@/components/ui/use-toast";
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
import { Toaster } from "@/components/ui/toaster";
import { getCurrentUser } from 'aws-amplify/auth';

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
            }));
        }
    } catch (error) {
        console.error('Unexpected error:', error);
        return [];
    }
}

const HomePage: React.FC = () => {
    const [data, setData] = React.useState<Applications[]>([]);
    const [isDeleting, setIsDeleting] = React.useState(false);
    const { toast } = useToast();

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await getData();
            setData(result);
        };
        fetchData();
    }, []);

    const deleteDemo = async (demoId: string) => {
        setIsDeleting(true);
        console.log(`Deleting demo with ID: ${demoId}`);
        try {
            // update is visuble false
            const { data: deletedDemo, errors } = await client.models.Demo.update({
                demoId: demoId,
                isVisible: false,
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
                throw new Error("Failed to delete demo");
            }
        } catch (error) {
            console.error('Error deleting demo:', error);
            toast({
                title: "Error",
                description: "Failed to delete the demo. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsDeleting(false);
        }
    };

    const undoDelete = async (deletedDemo: any) => {
        try {
            // update is visuble true
            const { data: updatedDemo, errors } = await client.models.Demo.update({
                demoId: deletedDemo.demoId,
                isVisible: true,
            });
        } catch (error) {
            console.error('Error undoing delete:', error);
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
                setData((prevData) => [...prevData, demo]);
            } else {
                throw new Error("Failed to create demo");
            }
        } catch (error) {
            console.error('Error creating demo:', error);
        }
    }

    return (
        <div className="grid flex-1 max-w-[1200px] witems-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {/* Rest of the component */}
            <Toaster />
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
                <TabsContent value="all">
                    <Card className="border-input">
                        <CardHeader>
                        <CardTitle>Demos</CardTitle>
                            <CardDescription>
                                Lista de aplicaciones demo de Tivit Digital Latam.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <DataTable columns={columns} data={data} deleteDemo={deleteDemo} />
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
