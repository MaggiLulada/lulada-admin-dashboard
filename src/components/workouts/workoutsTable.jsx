import React, { useEffect, useState, useMemo } from 'react';
import { useReactTable, getCoreRowModel } from '@tanstack/react-table';
import { getAllDocuments } from '@/services/firebase/db';

const WorkoutsTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const workouts = await getAllDocuments('Workouts');
        setData(workouts);
      } catch (error) {
        console.error('Error fetching workouts: ', error);
      }
    };

    fetchWorkouts();
  }, []);

  const columns = useMemo(
    () => [
      {
        id: 'name',
        header: 'Name Workout',
        accessorKey: 'name',
      },
      {
        id: 'coach',
        header: 'Coach',
        accessorFn: row => `${row.user.name} ${row.user.lastName}`,
      },
      {
        id: 'userPhone',
        header: 'Coach Phone',
        accessorKey: 'user.phoneInfo.completeNumber',
      },
      {
        id: 'userPaypalEmail',
        header: 'Coach Paypal',
        accessorKey: 'user.data_pay_tax.emailPaypal',
      },
      {
        id: 'participants',
        header: 'Participants',
        accessorKey: 'participants',
      },
      {
        id: 'cost',
        header: 'Cost',
        accessorKey: 'cost',
        cell: ({ getValue }) => `${getValue()}€`,
      },
      {
        id: 'location',
        header: 'Location',
        accessorKey: 'location.address',
        cell: ({ getValue }) => {
          const value = getValue();
          return value ? (
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(value)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {value}
            </a>
          ) : (
            'N/A'
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="min-w-full bg-white">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="w-full border-b">
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="px-4 py-2 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header.column.columnDef.header}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="border-b">
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900"
              >
                {cell.column.columnDef.cell ? cell.column.columnDef.cell(cell.getContext()) : cell.getValue()}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WorkoutsTable;