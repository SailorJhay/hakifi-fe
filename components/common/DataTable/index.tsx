"use client";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable
} from "@tanstack/react-table";

import colors from "@/colors";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import clsx from "clsx";
import { useMemo } from "react";
import ChevronBottomTriangleIcon from "../Icons/ChevronBottomTriangleIcon";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    const noData = useMemo(() => table.getRowModel().rows?.length <= 0, [data]);
    return (
        <>
            <div className="border border-light-1 box-radius">
                <Table className="box-radius relative">
                    <TableHeader className="relative">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="bg-light-2">
                                {headerGroup.headers.map((header, index) => {
                                    const heightSpan = (table.getRowModel().rows?.length + 1) * 59.5;
                                    const isFixed = header.column.columnDef.meta?.fixed;
                                    const width = header.column.columnDef.meta?.width;
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className={clsx("text-caption-12B text-grey-1 relative", isFixed && "sticky right-0 bg-light-2 z-10 shadow-left border-b")}
                                            style={{
                                                width: `${width}px`,
                                                minWidth: `${width}px`,
                                            }}
                                        >
                                            {isFixed && !noData && (
                                                <span
                                                    style={{ height: `${heightSpan}px`, right: 0 }}
                                                    className={'absolute top-0 w-full shadow-fixedColumn'}
                                                />
                                            )}
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {!noData ? (
                            table.getRowModel().rows.map((row) => {
                                return (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                        className="relative hover:bg-light-2 cursor-pointer"
                                    >
                                        {row.getVisibleCells().map((cell) => {
                                            const isFixed = cell.column.columnDef.meta?.fixed;
                                            const width = cell.column.columnDef.meta?.width;
                                            return (
                                                <TableCell
                                                    key={cell.id}
                                                    className={clsx("", isFixed && "sticky right-0 z-10 shadow-left bg-white")}
                                                    style={{
                                                        width: `${width}px`
                                                    }}
                                                >
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div >
            <section className="w-full flex justify-end">
                <div className="flex items-center p-1 rounded-full justify-end mt-4 bg-light-2 w-fit">
                    <Button
                        variant="outline"
                        className="h-5 w-5"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronBottomTriangleIcon className={clsx("h-5 w-5 rotate-90", !table.getCanPreviousPage() && "opacity-30")} color={
                            !table.getCanPreviousPage() && colors.grey[1]
                        } />
                    </Button>
                    <div className="flex w-[100px] items-center justify-center text-caption-12B text-grey-1">
                        Page {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </div>
                    {/* <Tabs defaultValue={1} className="w-full rounded-full max-w-[200px]">
                    <TabsList className="grid w-full grid-cols-2">
                        {
                            Array.from({ length: table.getPageCount() }, (value, index) => index).map((item) => {
                                const page = item + 1;
                                return <TabsTrigger
                                    key={page}
                                    value={page}
                                    onClick={table.setPageIndex(page)}
                                    className={clsx('text-caption-12B rounded-full data-[state=active]:bg-primary-1 data-[state=active]:text-white px-3')}>
                                    {page}
                                </TabsTrigger>;
                            })
                        }
                    </TabsList>
                </Tabs> */}
                    <Button
                        variant="outline"
                        className="h-5 w-5"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronBottomTriangleIcon className={clsx("h-5 w-5 -rotate-90", !table.getCanPreviousPage() && "opacity-30")} color={
                            !table.getCanNextPage() && colors.grey[1]
                        } />
                    </Button>
                </div>
            </section>

        </>
    );
}

export default DataTable;
