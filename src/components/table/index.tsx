import { useState } from "react";
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai';
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  ColumnDef,
  SortingState,
  getSortedRowModel
} from "@tanstack/react-table";

export type DataTableProps<Data extends object> = {
  data: Data[];
  columns: ColumnDef<Data, any>[];
};

export function DataTable<Data extends object>({
  data,
  columns
}: DataTableProps<Data>) {

  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting
    }
  });

  return (
    <div className="relative   overflow-x-auto">
      <table className="table w-full text-sm text-left border !rounded text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    scope="col" className="px-6  py-3"
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}

                  >
                    <div className="flex items-center space-x-1">
                      <span>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </span>
                      <span >
                        {header.column.getIsSorted() ? (
                          header.column.getIsSorted() === "desc" ? (
                            <AiFillCaretUp />
                          ) : (
                            <AiFillCaretDown />
                          )
                        ) : null}
                      </span>
                    </div>

                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={row.id}>
              {row.getVisibleCells().map((cell) => {
                return (
                  <td className=" px-6 py-3" key={cell.id} >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}