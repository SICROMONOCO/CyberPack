
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const ResourceUserStatus = () => {
  const { user, canManageContent } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-300">
            Signed in as <span className="font-medium text-white">{user.username}</span>
            <span className="ml-2 px-2 py-1 rounded text-xs bg-blue-600 text-white">
              {user.role}
            </span>
          </div>
          {canManageContent && (
            <div className="text-xs text-green-400">
              ✓ Resource management enabled
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourceUserStatus;
