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
    header: "name",
  },
  {
    accessorKey: "current_price",
    header: "price",
  },
  {
    accessorKey: "market_cap",
    header: "mcap",
  },
  {
    accessorKey: "total_volume",
    header: "volume",
  },
  {
    accessorKey: "price_change_percentage_24h",
    header: "% 24h",
  },
  {
    accessorKey: "circulating_supply",
    header: "supply",
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
    <div className="m-[2rem]">
      <Table className=" border-2">
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
                  <TableCell key={cell.id} className="font-lora">
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
