"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Edit, ExternalLink, Github, MoreHorizontal } from "lucide-react"
import CustomIcon from "@/components/CustomIcon"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"


export type Applications = {
    id: string
    name: string
    status: "running" | "launching" | "stopping" | "down" | null
    repository: string | null// Replace 'link' with 'string' or a valid type
    public_url: string | null// Replace 'link' with 'string' or a valid type
    version: string | null
    cloud: "aws" | "gcp" | "azure" | null
}

// actions funtions

export async function editDemo(demoId: string,createdAt:string) {
    console.log('Edit:', demoId + createdAt)
}
async function deleteDemo(demoId: string,createdAt:string) {
        console.log('Delete:', demoId + createdAt)
    }



export const columns: ColumnDef<Applications>[] = [

    {
        accessorKey: "name",
        header: "Nombre del App",
    },
    {
        accessorKey: "cloud",
        header: "Cloud",
        cell: ({ row }) => {
            const cloud = (row.getValue("cloud")) as string
            const iconHeight = 20
            if (cloud ==="aws"){ return <CustomIcon height={iconHeight} variant={cloud}  />}
            if (cloud ==="gcp"){ return <CustomIcon height={iconHeight} variant={cloud}/>}
            if (cloud ==="azure"){ return <CustomIcon height={iconHeight} variant={cloud}/>}
        },

    },
    {
        accessorKey: "status",
        header: "Estado",
        cell: ({ row }) => {
            const status = (row.getValue("status")) as string
            const formatted = status.charAt(0).toUpperCase() + status.slice(1)
            if (status === "running") return <Badge variant="outline" className="text-green-500 border-input">{formatted}</Badge>
            if (status === "launching") return <Badge variant="outline" className="text-yellow-500 border-input">{formatted}</Badge>
            if (status === "stopping") return <Badge variant="outline" className="text-blue-500 border-input">{formatted}</Badge>
            if (status === "down") return <Badge variant="outline" className="text-red-500 border-input">{formatted}</Badge>
            return <Badge variant="outline">{formatted}</Badge>
        },

    },
    {
        accessorKey: "repository",
        header: "Respositorio",
        cell: ({ row }) => {
            const repository = (row.getValue("repository")) as string
            return <a
                        href={repository.startsWith('http') ? repository : `//${repository}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center space-x-2"
                    >
                    <Github size={16} className="mr-2"/>
                    Ir
                    <ExternalLink className="ml-2" size={16}/>
                </a>
        }
        
    },
    {
        accessorKey: "public_url",
        header: "URL Pública",
        cell: ({ row }) => {
            const url = (row.getValue("public_url")) as string
            return <a
                href={url.startsWith('http') ? url : `//${url}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2"
            >
                Abrir
                <ExternalLink className="ml-2" size={16}/>
                
            </a>}  
        
    },
    {
        accessorKey: "version",
        header: "Versión",
        
    },
    {
        accessorKey:"actions",
        header: "",
        cell: ({ row }) => {
            return (
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
                        <DropdownMenuItem onClick={() => console.log(row) } >Editar</DropdownMenuItem>
                        <DropdownMenuItem>Eliminar</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]