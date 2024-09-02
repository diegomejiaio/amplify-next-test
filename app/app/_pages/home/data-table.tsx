"use client"

import {
    MoreHorizontal,
    Package,
    PackageSearch,
    PackageX,
} from "lucide-react"
import React from "react";
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Applications } from "./columns";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    deleteDemo?: (id: string) => Promise<void>
}

export function DataTable<TData, TValue>({
    columns,
    data,
    deleteDemo,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        <TableCell>
                            <div className="ml-8"></div> {/* Spacer */}
                        </TableCell>
                        {headerGroup.headers.map((header) => {
                            return (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </TableHead>
                            )
                        })}
                        <TableCell>
                            <div className="ml-8"></div> {/* Spacer */}
                        </TableCell>
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                        >
                            <TableCell>
                                <Package height={18} />
                            </TableCell>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
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
                                        <DropdownMenuItem onClick={() => {
                                            const id = (row.original as Applications)?.id;
                                            if (id) {
                                                console.log(id);
                                            } else {
                                                console.error('Invalid row: id is undefined or null');
                                            }
                                        }}>Editar</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => {
                                            const id = (row.original as Applications)?.id;
                                            if (deleteDemo && id) {
                                                deleteDemo(id);
                                            } else {
                                                console.error('Invalid row or deleteDemo function is not defined');
                                            }
                                        }}>Eliminar</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={columns.length+2} className="w-full h-40 text-center">
                            <div className="flex items-center justify-center gap-4">
                            <PackageSearch size={48} absoluteStrokeWidth />
                            Sin resultados
                            </div>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
