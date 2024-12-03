import React from 'react';
import { flexRender, Row } from '@tanstack/react-table';

interface TableBodyProps<T> {
  rows: Row<T>[];
}

export function TableBody<T>({ rows }: TableBodyProps<T>) {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {rows.map((row) => (
        <tr key={row.id}>
          {row.getVisibleCells().map((cell) => (
            <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}