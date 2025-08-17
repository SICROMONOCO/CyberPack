
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Download, Upload, Calendar, User } from 'lucide-react';

interface Stats {
  total: number;
  typeCount: Record<string, number>;
}

interface ResourceStatsProps {
  stats: Stats;
}

const ResourceStats = ({ stats }: ResourceStatsProps) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Total Resources</p>
            <p className="text-2xl font-bold text-white">{stats.total}</p>
          </div>
          <Download className="w-8 h-8 text-blue-400" />
        </div>
      </CardContent>
    </Card>
    
    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Documents</p>
            <p className="text-2xl font-bold text-white">{(stats.typeCount.pdf || 0) + (stats.typeCount.document || 0)}</p>
          </div>
          <Upload className="w-8 h-8 text-green-400" />
        </div>
      </CardContent>
    </Card>
    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Exams</p>
            <p className="text-2xl font-bold text-white">{stats.typeCount.exams || 0}</p>
          </div>
          <Upload className="w-8 h-8 text-yellow-400" />
        </div>
      </CardContent>
    </Card>
    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Disabled</p>
            <p className="text-2xl font-bold text-white">{stats.typeCount.disabled || 0}</p>
          </div>
          <Upload className="w-8 h-8 text-gray-400 opacity-60" />
        </div>
      </CardContent>
    </Card>
    
    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Videos</p>
            <p className="text-2xl font-bold text-white">{stats.typeCount.video || 0}</p>
          </div>
          <Calendar className="w-8 h-8 text-purple-400" />
        </div>
      </CardContent>
    </Card>
    
    <Card className="bg-gray-900 border-gray-800">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">External Links</p>
            <p className="text-2xl font-bold text-white">{stats.typeCount.link || 0}</p>
          </div>
          <User className="w-8 h-8 text-orange-400" />
        </div>
      </CardContent>
    </Card>
  </div>
);

export default ResourceStats;
