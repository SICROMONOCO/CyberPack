
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



const typeCards = [
  { key: 'link', label: 'Link', icon: Download, color: 'text-blue-400' },
  { key: 'courses', label: 'Courses', icon: Upload, color: 'text-green-400' },
  { key: 'project', label: 'Project', icon: Calendar, color: 'text-purple-400' },
  { key: 'tp', label: 'TP', icon: Calendar, color: 'text-orange-400' },
  { key: 'td', label: 'TD', icon: Calendar, color: 'text-pink-400' },
  { key: 'exams', label: 'Exams', icon: Upload, color: 'text-yellow-400' },
  { key: 'disabled', label: 'Disabled', icon: Upload, color: 'text-gray-400 opacity-60' },
];

const ResourceStats = ({ stats }: ResourceStatsProps) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 mb-4">
    <Card className="bg-gray-900 border-gray-800 rounded-xl">
      <CardContent className="p-3 sm:p-4 flex flex-col items-center justify-center text-center">
        <Download className="w-7 h-7 sm:w-8 sm:h-8 text-blue-400 mb-1" />
        <p className="text-gray-400 text-xs sm:text-sm">Total Resources</p>
        <p className="text-xl sm:text-2xl font-bold text-white">{stats.total}</p>
      </CardContent>
    </Card>
    {typeCards.map(({ key, label, icon: Icon, color }) => (
      <Card key={key} className="bg-gray-900 border-gray-800 rounded-xl">
        <CardContent className="p-3 sm:p-4 flex flex-col items-center justify-center text-center">
          <Icon className={`w-7 h-7 sm:w-8 sm:h-8 ${color} mb-1`} />
          <p className="text-gray-400 text-xs sm:text-sm">{label}</p>
          <p className="text-xl sm:text-2xl font-bold text-white">{stats.typeCount[key] || 0}</p>
        </CardContent>
      </Card>
    ))}
  </div>
);

export default ResourceStats;
