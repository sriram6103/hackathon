import React from 'react';
import { flexRender, Header } from '@tanstack/react-table';
import { clsx } from 'clsx';

interface TableHeaderProps<T> {
  headers: Header<T, unknown>[];
}

export function TableHeader<T>({ headers }: TableHeaderProps<T>) {
  return (
    <thead className="bg-gray-50">
      <tr>
        {headers.map((header) => (
          <th
            key={header.id}
            className={clsx(
              'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
              header.column.getCanSort() && 'cursor-pointer select-none'
            )}
            onClick={header.column.getToggleSortingHandler()}
          >
            {flexRender(header.column.columnDef.header, header.getContext())}
            <span className="ml-2">
              {{
                asc: '↑',
                desc: '↓',
              }[header.column.getIsSorted() as string] ?? null}
            </span>
          </th>
        ))}
      </tr>
    </thead>
  );
}