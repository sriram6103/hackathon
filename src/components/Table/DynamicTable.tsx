import React, { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  ColumnDef,
} from '@tanstack/react-table';
import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';

interface DynamicTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
}

export function DynamicTable<T>({ data, columns }: DynamicTableProps<T>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <TableHeader headers={table.getHeaderGroups()[0].headers} />
        <TableBody rows={table.getRowModel().rows} />
      </table>
    </div>
  );
}