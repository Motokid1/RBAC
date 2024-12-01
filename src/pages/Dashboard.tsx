import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUsers, deleteUser } from '../api/auth';
import UserList from '../components/UserList';
import { getRolePermissions } from '../utils/roleUtils';
import type { User } from '../types/auth';

const Dashboard = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const permissions = getRolePermissions(user?.role);
  const canViewUsers = permissions.includes('View Users');
  const canDeleteUsers = permissions.includes('Delete Users');

  useEffect(() => {
    if (canViewUsers) {
      fetchUsers();
    }
  }, [canViewUsers]);

  const fetchUsers = async () => {
    try {
      const data = await getUsers(user.token);
      setUsers(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch users');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId, user.token);
      setUsers(users.filter((u) => u._id !== userId));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete user');
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">
          Welcome, {user?.username}
        </h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {canViewUsers ? (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">User Management</h2>
            <UserList
              users={users}
              onDeleteUser={handleDeleteUser}
              canDelete={canDeleteUsers}
            />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600">
              Welcome to your dashboard. You are logged in as a regular user.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;