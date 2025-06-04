
import React from 'react';
import { Clock, BookOpen, Tag, User, Award } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SubjectCardProps {
  subject: {
    id: string;
    title: string;
    description: string;
    tag: string;
    creditHours: number;
    code?: string;
    prerequisites?: string[];
    instructor?: string;
    branchName: string;
    semesterName: string;
  };
}

const SubjectCard = ({ subject }: SubjectCardProps) => {
  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'Disciplinary':
        return 'bg-blue-600 text-blue-100';
      case 'Soft Skills':
        return 'bg-green-600 text-green-100';
      case 'Core':
        return 'bg-purple-600 text-purple-100';
      case 'Elective':
        return 'bg-orange-600 text-orange-100';
      default:
        return 'bg-gray-600 text-gray-100';
    }
  };

  return (
    <Card className="bg-gray-900 border-gray-800 hover:border-blue-500 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/10">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {subject.code && (
              <p className="text-sm text-blue-400 font-mono mb-1">{subject.code}</p>
            )}
            <CardTitle className="text-white text-lg leading-tight">{subject.title}</CardTitle>
          </div>
          <Badge className={`ml-2 ${getTagColor(subject.tag)}`}>
            {subject.tag}
          </Badge>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span className="flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            {subject.branchName}
          </span>
          <span>{subject.semesterName}</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <CardDescription className="text-gray-300 line-clamp-3">
          {subject.description}
        </CardDescription>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Clock className="w-4 h-4" />
            {subject.creditHours} Credit Hours
          </div>
          
          {subject.instructor && (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <User className="w-4 h-4" />
              {subject.instructor}
            </div>
          )}
          
          {subject.prerequisites && subject.prerequisites.length > 0 && (
            <div className="flex items-start gap-2 text-sm text-gray-400">
              <Award className="w-4 h-4 mt-0.5" />
              <div>
                <span className="block">Prerequisites:</span>
                <span className="text-gray-500">
                  {subject.prerequisites.join(', ')}
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectCard;
