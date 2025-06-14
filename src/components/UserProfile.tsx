import React, { useState } from 'react';
import { User, LogOut, Shield, BookOpen, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

interface UserProfileProps {
  isCollapsed?: boolean;
}

const UserProfile = ({ isCollapsed = false }: UserProfileProps) => {
  const { user, logout, canManageContent } = useAuth();
  const [showDetails, setShowDetails] = useState(false);

  if (!user) return null;

  const getRoleColor = (role: string) => {
    return 'bg-blue-600 text-white';
  };

  const getRoleIcon = (role: string) => {
    return <Settings className="w-3 h-3" />;
  };

  if (isCollapsed) {
    return (
      <div className="relative group">
        <Button
          variant="ghost"
          size="sm"
          className="w-full p-2 text-gray-300 hover:text-white hover:bg-gray-800"
          onClick={() => setShowDetails(!showDetails)}
        >
          <User className="w-4 h-4" />
        </Button>
        
        {/* Tooltip */}
        <div className="absolute left-full ml-3 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 border border-gray-700">
          {user.username} ({user.role})
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user.username}
                </p>
                <Badge className={`text-xs ${getRoleColor(user.role)} flex items-center gap-1 w-fit`}>
                  {getRoleIcon(user.role)}
                  {user.role}
                </Badge>
              </div>
            </div>
            <Button
              onClick={logout}
              size="sm"
              variant="ghost"
              className="text-gray-400 hover:text-red-400 hover:bg-red-900/20 h-8 w-8 p-0"
              title="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
          
          {canManageContent && (
            <div className="mt-2 flex items-center gap-1 text-xs text-blue-400">
              <Shield className="w-3 h-3" />
              Content Management Access
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
