import React, { useEffect, useState } from 'react';
import type { User } from '@/types/Users';
import { DataTable } from '@/components/ui/data-table';
import { type ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2, Edit2, Check, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { fetchUsers, deleteUser, updateUser } from '@/state/user/userSlice';

const AdminPanel: React.FC = () => {
    const dispatch = useAppDispatch();
    const { users, loading, error } = useAppSelector((state) => state.user);
    const roles = ["user", "manager", "admin"] as const;
    type Role = typeof roles[number];

    const [editingId, setEditingId] = useState<string | null>(null);
    const [editName, setEditName] = useState('');
    const [editRole, setEditRole] = useState<Role | "">("");

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleDeleteUser = (id: string) => {
        if (window.confirm('Da li ste sigurni da želite da obrišete ovog korisnika?')) {
            dispatch(deleteUser(id));
        }
    };

    const handleEdit = (user: User) => {
        setEditingId(user._id || user.id || null);
        setEditName(user.name);
        setEditRole(user.role);
    };

    const handleSave = async (id: string) => {
        if (editRole) {
            await dispatch(updateUser({ id, data: { name: editName, role: editRole } }));
        }
        setEditingId(null);
    };

    const handleCancel = () => {
        setEditingId(null);
    };

    const columns: ColumnDef<User>[] = [
        {
            accessorKey: 'name',
            header: 'Ime',
            cell: ({ row }) => {
                const user = row.original;
                const isEditing = editingId === (user._id || user.id);
                if (isEditing) {
                    return (
                        <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="border rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    );
                }
                return user.name;
            }
        },
        {
            accessorKey: 'email',
            header: 'Email',
        },
        {
            accessorKey: 'role',
            header: 'Uloga',
            cell: ({ row }) => {
                const user = row.original;
                const isEditing = editingId === (user._id || user.id);
                const role = isEditing ? editRole : user.role;

                if (isEditing) {
                    return (
                        <select
                            value={editRole}
                            onChange={(e) => setEditRole(e.target.value as Role)}
                            className="border rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="user">user</option>
                            <option value="manager">manager</option>
                            <option value="admin">admin</option>
                        </select>
                    );
                }
                
                return (
                    <Badge variant={role === 'admin' ? 'destructive' : role === 'manager' ? 'default' : 'secondary'}>
                        {role}
                    </Badge>
                );
            },
        },
        {
            id: 'actions',
            header: 'Akcije',
            cell: ({ row }) => {
                const user = row.original;
                const userId = user._id || user.id;
                const isEditing = editingId === userId;

                if (isEditing && userId) {
                    return (
                        <div className="flex gap-2">
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                onClick={() => handleSave(userId)}
                            >
                                <Check className="h-4 w-4" />
                            </Button>
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                className="text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                                onClick={handleCancel}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    );
                }

                return (
                    <div className="flex gap-2">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            onClick={() => handleEdit(user)}
                        >
                            <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => userId && handleDeleteUser(userId)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                );
            },
        },
    ];

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
