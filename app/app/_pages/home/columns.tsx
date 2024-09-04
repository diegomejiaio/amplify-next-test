//app/app/_pages/home/columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import CustomIcon from "@/components/CustomIcon";


export type Applications = {
    id: string;
    name: string;
    status: "running" | "launching" | "stopping" | "down" | null;
    repository: string | null; // Replace 'link' with 'string' or a valid type
    public_url: string | null; // Replace 'link' with 'string' or a valid type
    version: string | null;
    cloud: "aws" | "gcp" | "azure" | null;
    created_at: string | null;
    description: string | null;
};


export const columns: ColumnDef<Applications>[] = [
    {
        accessorKey: "name",
        header: "Nombre del App",
    },
    {
        accessorKey: "cloud",
        header: "Cloud",
        cell: ({ row }) => {
            const cloud = row.getValue("cloud") as string;
            const iconHeight = 20;
            if (cloud === "aws") {
                return <CustomIcon height={iconHeight} variant={cloud} />;
            }
            if (cloud === "gcp") {
                return <CustomIcon height={iconHeight} variant={cloud} />;
            }
            if (cloud === "azure") {
                return <CustomIcon height={iconHeight} variant={cloud} />;
            }
        },
    },
    {
        accessorKey: "status",
        header: "Estado",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            const formatted = status.charAt(0).toUpperCase() + status.slice(1);
            if (status === "running")
                return (
                    <Badge variant="outline" className="border-input text-green-500">
                        {formatted}
                    </Badge>
                );
            if (status === "launching")
                return (
                    <Badge variant="outline" className="border-input text-yellow-500">
                        {formatted}
                    </Badge>
                );
            if (status === "stopping")
                return (
                    <Badge variant="outline" className="border-input text-blue-500">
                        {formatted}
                    </Badge>
                );
            if (status === "down")
                return (
                    <Badge variant="outline" className="border-input text-red-500">
                        {formatted}
                    </Badge>
                );
            return <Badge variant="outline">{formatted}</Badge>;
        },
    },
    {
        accessorKey: "repository",
        header: () => (
            <p className="hidden sm:block">
                Repositorio
            </p>),
        cell: ({ row }) => {
            const repository = row.getValue("repository") as string;
            return (
                <a
                    href={repository}
                    target="_blank"
                    rel="noreferrer"
                    className="items-center space-x-2 hidden sm:flex"
                >
                    <Github size={16} className="mr-2" />
                    Ir
                    <ExternalLink className="ml-2" size={16} />
                </a>
            );
        },
    },
    {
        accessorKey: "public_url",
        header: "URL Pública",
        cell: ({ row }) => {
            const url = row.getValue("public_url") as string;
            return (
                <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-2 "
                >
                    <div className="hidden sm:block">Abrir</div>
                    <ExternalLink className="ml-2" size={16} />
                </a>
            );
        },
    },
    {
        accessorKey: "version",
        header: () => (
            <p className="hidden sm:block">
                Versión
            </p>),
        cell: ({ row }) => {
            const version = row.getValue("version") as string;
            return <div className="hidden sm:block">{version}</div>;
        },
    },
];
