import { ColumnDef } from '@tanstack/react-table';
import { User } from '../../types/api';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'username',
    header: 'Username',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'website',
    header: 'Website',
    cell: (info) => (
      <a
        href={`https://${info.getValue()}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800"
      >
        {info.getValue()}
      </a>
    ),
  },
];