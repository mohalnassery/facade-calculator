'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Profile } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, ArrowUpDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const columns: ColumnDef<Profile>[] = [
  {
    accessorKey: 'code',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Code
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'weight',
    header: 'Weight (g/m)',
  },
  {
    accessorKey: 'unitPrice',
    header: 'Unit Price (BHD)',
    cell: ({ row }) => {
      const price = parseFloat(row.getValue('unitPrice'));
      return price ? `${price.toFixed(2)} BHD` : '-';
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const profile = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(profile.code)}
            >
              Copy profile code
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit profile</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              Delete profile
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];