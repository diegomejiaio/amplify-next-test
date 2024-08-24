import { Applications, columns } from "./columns"
import { DataTable } from "./data-table"


import {
    File,
    Home,
    LineChart,
    ListFilter,
    MoreHorizontal,
    Package,
    Package2,
    PanelLeft,
    PlusCircle,
    Search,
    Settings,
    ShoppingCart,
    Users2,
    Boxes,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "@/components/ui/tooltip"
import LateralNavbar from "@/components/LateralNavbar"
import NavbarInternal from "@/components/NavbarInternal"

async function getData(): Promise<Applications[]> {
    // Fetch data from your API here.
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
    ]
}


export default async function Chatbot() {
    const data = await getData()
    return (
        <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Tabs defaultValue="all">
                <div className="flex items-center">
                    <TabsList>
                        <TabsTrigger value="all">
                            Todos
                        </TabsTrigger>
                        <TabsTrigger value="active">
                            Activos
                        </TabsTrigger>
                        <TabsTrigger value="draft">
                            Draft
                        </TabsTrigger>
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
                                        Filter
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem checked>
                                    Active
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>
                                    Archived
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button size="sm" variant="outline" className="h-7 gap-1">
                            <File className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Export
                            </span>
                        </Button>
                        <Button size="sm" className="h-7 gap-1">
                            <PlusCircle className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Add Product
                            </span>
                        </Button>
                    </div>
                </div>
                <TabsContent value="all">
                    <Card x-chunk="dashboard-06-chunk-0" className="border-input">
                        <CardHeader>
                            <CardTitle>Aplicaciones</CardTitle>
                            <CardDescription>
                                Lista de aplicaciones demo de Tivit Digital Latam.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <DataTable columns={columns} data={data} />
                            {/* <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="hidden w-[100px] sm:table-cell">
                                                    <span className="sr-only">Image</span>
                                                </TableHead>
                                                <TableHead>Nombre</TableHead>
                                                <TableHead>Estado</TableHead>
                                                <TableHead>Price</TableHead>
                                                <TableHead className="hidden md:table-cell">
                                                    Total Sales
                                                </TableHead>
                                                <TableHead className="hidden md:table-cell">
                                                    Created at
                                                </TableHead>
                                                <TableHead>
                                                    <span className="sr-only">Actions</span>
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className="hidden sm:table-cell">
                                                    <Boxes />
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    Laser Lemonade Machine
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">Draft</Badge>
                                                </TableCell>
                                                <TableCell>$499.99</TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    25
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    2023-07-12 10:42 AM
                                                </TableCell>
                                                <TableCell>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button
                                                                aria-haspopup="true"
                                                                size="icon"
                                                                variant="ghost"
                                                            >
                                                                <MoreHorizontal className="h-4 w-4" />
                                                                <span className="sr-only">Toggle menu</span>
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                                            <DropdownMenuItem>Delete</DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="hidden sm:table-cell">
                                                    <Boxes />
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    Hypernova Headphones
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">Active</Badge>
                                                </TableCell>
                                                <TableCell>$129.99</TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    100
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    2023-10-18 03:21 PM
                                                </TableCell>
                                                <TableCell>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button
                                                                aria-haspopup="true"
                                                                size="icon"
                                                                variant="ghost"
                                                            >
                                                                <MoreHorizontal className="h-4 w-4" />
                                                                <span className="sr-only">Toggle menu</span>
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                                            <DropdownMenuItem>Delete</DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="hidden sm:table-cell">
                                                    <Boxes />
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    AeroGlow Desk Lamp
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">Active</Badge>
                                                </TableCell>
                                                <TableCell>$39.99</TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    50
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    2023-11-29 08:15 AM
                                                </TableCell>
                                                <TableCell>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button
                                                                aria-haspopup="true"
                                                                size="icon"
                                                                variant="ghost"
                                                            >
                                                                <MoreHorizontal className="h-4 w-4" />
                                                                <span className="sr-only">Toggle menu</span>
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                                            <DropdownMenuItem>Delete</DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="hidden sm:table-cell">
                                                    <Boxes/>
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    TechTonic Energy Drink
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="secondary">Draft</Badge>
                                                </TableCell>
                                                <TableCell>$2.99</TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    0
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    2023-12-25 11:59 PM
                                                </TableCell>
                                                <TableCell>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button
                                                                aria-haspopup="true"
                                                                size="icon"
                                                                variant="ghost"
                                                            >
                                                                <MoreHorizontal className="h-4 w-4" />
                                                                <span className="sr-only">Toggle menu</span>
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                                            <DropdownMenuItem>Delete</DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="hidden sm:table-cell">
                                                    <Boxes/>
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    Gamer Gear Pro Controller
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">Active</Badge>
                                                </TableCell>
                                                <TableCell>$59.99</TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    75
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    2024-01-01 12:00 AM
                                                </TableCell>
                                                <TableCell>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button
                                                                aria-haspopup="true"
                                                                size="icon"
                                                                variant="ghost"
                                                            >
                                                                <MoreHorizontal className="h-4 w-4" />
                                                                <span className="sr-only">Toggle menu</span>
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                                            <DropdownMenuItem>Delete</DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="hidden sm:table-cell">
                                                    <Boxes/>
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    Luminous VR Headset
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">Active</Badge>
                                                </TableCell>
                                                <TableCell>$199.99</TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    30
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    2024-02-14 02:14 PM
                                                </TableCell>
                                                <TableCell>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button
                                                                aria-haspopup="true"
                                                                size="icon"
                                                                variant="ghost"
                                                            >
                                                                <MoreHorizontal className="h-4 w-4" />
                                                                <span className="sr-only">Toggle menu</span>
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                                            <DropdownMenuItem>Delete</DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table> */}
                        </CardContent>
                        <CardFooter>
                            <div className="text-xs text-muted-foreground">
                                Mostrando <strong>1-6</strong> de <strong>24</strong>{" "}
                                items
                            </div>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
