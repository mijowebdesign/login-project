import React, { useEffect, useState } from 'react';
import type { User } from '@/types/Users';
import { getUsers } from '@/services/userService';
import { DataTable } from '@/components/ui/data-table';
import { type ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Ime',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'role',
    header: 'Uloga',
    cell: ({ row }) => {
      const role = row.getValue('role') as string;
      return (
        <Badge variant={role === 'admin' ? 'destructive' : role === 'manager' ? 'default' : 'secondary'}>
          {role}
        </Badge>
      );
    },
  },
];

const AdminPanel: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                console.log('Fetched users:', data);
                setUsers(data);
            } catch (err: any) {
                setError(err.message || 'Greška pri učitavanju korisnika');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <div className="p-8 text-center">Učitavanje...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-2xl font-bold mb-6">Pregled Korisnika</h1>
            <DataTable columns={columns} data={users} />
        </div>
    );
};

export default AdminPanel;