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
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                {subject.code && (
                  <p className="text-sm text-blue-400 font-mono mb-1">{subject.code}</p>
                )}
                <h3 className="text-xl font-semibold text-white leading-tight mb-2">{subject.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-3 h-3" />
                    {subject.branchName}
                  </span>
                  <span>{subject.semesterName}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {subject.creditHours} Credit Hours
                  </div>
                </div>
              </div>
              <Badge className={`ml-4 ${getTagColor(subject.tag)}`}>
                {subject.tag}
              </Badge>
            </div>
            
            <p className="text-gray-300 mb-4 line-clamp-2">
              {subject.description}
            </p>
            
            <div className="flex items-center gap-6 text-sm text-gray-400">
              {subject.instructor && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {subject.instructor}
                </div>
              )}
              
              {subject.prerequisites && subject.prerequisites.length > 0 && (
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>Prerequisites: {subject.prerequisites.join(', ')}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectCard;
