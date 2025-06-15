
import React from 'react';
import { BookOpen, Tag, User, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
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
    <Card className="bg-gray-900 border-gray-800 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-[1.02]">
      <CardContent className="p-8">
        <div className="space-y-6">
          {/* Header with Title and Tag */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-3">
              {subject.code && (
                <div className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 text-sm font-mono rounded-md">
                  {subject.code}
                </div>
              )}
              <h3 className="text-2xl font-bold text-white leading-tight">{subject.title}</h3>
            </div>
            <Badge className={`${getTagColor(subject.tag)} px-4 py-2 text-sm font-medium`}>
              <Tag className="w-4 h-4 mr-2" />
              {subject.tag}
            </Badge>
          </div>
          
          {/* Description */}
          <p className="text-gray-300 text-lg leading-relaxed">
            {subject.description}
          </p>
          
          {/* Branch and Semester Info */}
          <div className="flex items-center gap-6 text-gray-400">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-400" />
              <span className="font-medium">{subject.branchName}</span>
            </div>
            <div className="text-gray-500">•</div>
            <span className="font-medium">{subject.semesterName}</span>
          </div>
          
          {/* Additional Info */}
          {(subject.instructor || (subject.prerequisites && subject.prerequisites.length > 0)) && (
            <div className="pt-4 border-t border-gray-800 space-y-3">
              {subject.instructor && (
                <div className="flex items-center gap-3 text-gray-300">
                  <User className="w-5 h-5 text-green-400" />
                  <span><strong>Instructor:</strong> {subject.instructor}</span>
                </div>
              )}
              
              {subject.prerequisites && subject.prerequisites.length > 0 && (
                <div className="flex items-start gap-3 text-gray-300">
                  <Award className="w-5 h-5 text-yellow-400 mt-0.5" />
                  <div>
                    <strong>Prerequisites:</strong>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {subject.prerequisites.map((prereq, index) => (
                        <Badge key={index} variant="outline" className="border-gray-600 text-gray-400 bg-gray-800/50">
                          {prereq}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectCard;
