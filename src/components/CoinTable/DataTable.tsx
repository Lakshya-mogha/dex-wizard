"use client";
import Image from "next/image";
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  TableHeader,
} from "../ui/table";
import { useRouter } from "next/navigation";

const columnHelper = createColumnHelper();
export const column: any = [
  columnHelper.accessor("image", {
    cell: (image) => (
      <Image src={image.getValue()} alt="" width={25} height={20} />
    ),
  }),
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "current_price",
    header: "Price",
  },
  {
    accessorKey: "market_cap",
    header: "Mcap",
  },
  {
    accessorKey: "total_volume",
    header: "Volume",
  },
  {
    accessorKey: "price_change_percentage_24h",
    header: "% 24h",
  },
  {
    accessorKey: "circulating_supply",
    header: "Supply",
  },
];

interface CoinTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
export function DataTable<TData, TValue>({
  columns,
  data,
}: CoinTableProps<TData, TValue>) {
  const router = useRouter();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="p-[4rem] ">
      <Table className=" border-2 bg-white">
        <TableHeader className="font-inter">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
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
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className=" font-lora">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                onClick={() => {
                  const id: string = row.getValue("name");
                  const coinId = id.toString().toLowerCase();
                  router.push(`coins/${coinId}`);
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className={
                    cell.column.id === "price_change_percentage_24h" ? (cell.getValue() as number < 0 )? "text-red-500" : "text-green-500" : "text-black"
                  }>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
