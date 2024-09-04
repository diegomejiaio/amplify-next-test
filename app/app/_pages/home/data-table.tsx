//app/app/_pages/home/data-table.tsx
"use client";

import { MoreHorizontal, Package, PackageSearch } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton"; // Importa el componente Skeleton
import { Applications } from "./columns";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    deleteDemo?: (id: string) => Promise<void>;
    isLoading?: boolean;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    deleteDemo,
    isLoading,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        <TableCell className="hidden sm:block">
                            <div className="ml-8 hidden sm:block"></div> {/* Spacer */}
                        </TableCell>
                        {headerGroup.headers.map((header) => {
                            return (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
                                        )}
                                </TableHead>
                            );
                        })}
                        <TableCell className="hidden sm:block">
                            <div className="ml-8 hidden sm:block"></div> {/* Spacer */}
                        </TableCell>
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {isLoading ? (
                    // Muestra Skeletons mientras isLoading es true
                    Array.from({ length: 3 }).map((_, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <Skeleton className="h-4 w-4" />
                            </TableCell>
                            {columns.map((_, colIndex) => (
                                <TableCell key={colIndex}>
                                    <Skeleton className="h-[32px] w-full" />
                                </TableCell>
                            ))}
                            <TableCell>
                                <Skeleton className="h-4 w-4" />
                            </TableCell>
                        </TableRow>
                    ))
                ) : table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                        >
                            <TableCell className="hidden sm:table-cell">
                                <Package height={18} className=""/>
                            </TableCell>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button aria-haspopup="true" size="icon" variant="ghost">
                                            <MoreHorizontal className="h-4 w-4" />
                                            <span className="sr-only">Toggle menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem
                                            onClick={() => {
                                                const id = (row.original as Applications)?.id;
                                                if (id) {
                                                    console.log(id);
                                                } else {
                                                    console.error("Invalid row: id is undefined or null");
                                                }
                                            }}
                                        >
                                            Editar
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => {
                                                const id = (row.original as Applications)?.id;
                                                if (deleteDemo && id) {
                                                    deleteDemo(id);
                                                } else {
                                                    console.error(
                                                        "Invalid row or deleteDemo function is not defined",
                                                    );
                                                }
                                            }}
                                        >
                                            Eliminar
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell
                            colSpan={columns.length + 2}
                            className="h-40 w-full text-center"
                        >
                            <div className="flex items-center justify-center gap-4">
                                <PackageSearch size={48} absoluteStrokeWidth />
                                Sin resultados
                            </div>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
