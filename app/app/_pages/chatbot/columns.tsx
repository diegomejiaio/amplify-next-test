"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"



export type Applications = {
    id: string
    name: string
    status: "running" | "launching" | "stopping" | "down"
    repository: string // Replace 'link' with 'string' or a valid type
    public_url: string // Replace 'link' with 'string' or a valid type
    version: string
    cloud: "aws" | "gcp" | "azure"
}

export const columns: ColumnDef<Applications>[] = [
    {
        accessorKey: "name",
        header: "Nombre del App",    
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
]