
import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings, Lock } from 'lucide-react';

interface ResourceHeaderProps {
  canManageContent: boolean;
  onManageClick: () => void;
}

const ResourceHeader = ({ canManageContent, onManageClick }: ResourceHeaderProps) => (
  <div className="flex items-center justify-between">
    <div>
      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Resources Library
      </h1>
      <p className="text-gray-300 mt-2">
        Access study materials, documents, and learning resources organized by subject
      </p>
    </div>
    {canManageContent ? (
      <Button
        onClick={onManageClick}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        <Settings className="w-4 h-4 mr-2" />
        Manage Resources
      </Button>
    ) : (
      <div className="flex items-center gap-2 text-gray-500">
        <Lock className="w-4 h-4" />
        <span className="text-sm">Editor access required</span>
      </div>
    )}
  </div>
);

export default ResourceHeader;
