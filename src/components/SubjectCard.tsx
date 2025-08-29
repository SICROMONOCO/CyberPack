

import React from 'react';
import { BookOpen, Tag, User, Award, Copy, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

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
    branchId?: string;
    semesterId?: string;
  };
  onClick?: (subject: SubjectCardProps['subject']) => void;
}

const SubjectCard = ({ subject, onClick }: SubjectCardProps) => {
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

  const handleCopyCode = async () => {
    if (!subject.code) return;
    try {
      await navigator.clipboard.writeText(subject.code);
  toast({ title: 'Code copied', description: 'Subject code copied to clipboard.' });
    } catch (e) {
  toast({ title: 'Copy failed', description: 'Could not copy subject code.' });
    }
  };

  return (
    <Card
      className="bg-gray-900 border-gray-800 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-[1.01] cursor-pointer"
      onClick={() => onClick && onClick(subject)}
      tabIndex={0}
      role="button"
      aria-label={`View resources for subject ${subject.title}`}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick && onClick(subject);
        }
      }}
    >
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="inline-flex items-center justify-center rounded-lg bg-indigo-700 w-12 h-12 flex-shrink-0">
            <BookOpen className="w-6 h-6 text-white" />
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white">{subject.title}</h3>

                <div className="mt-2 flex items-center gap-3 text-sm text-gray-400 flex-wrap">
                  {subject.code && (
                    <span className="inline-flex items-center gap-2 bg-gray-800 px-2 py-1 rounded text-xs text-gray-300 font-mono">
                      {subject.code}
                      <button onClick={e => { e.stopPropagation(); handleCopyCode(); }} className="ml-2 p-1 rounded text-gray-400 hover:text-gray-200" aria-label="Copy subject code">
                        <Copy className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                  {subject.tag && (
                    <Badge className="text-xs font-semibold bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-lg px-3 py-1 shadow-sm border-0">
                      {subject.tag.toUpperCase()}
                    </Badge>
                  )}

                  <span className="text-gray-500">2 {subject.creditHours} C</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Potential actions could go here */}
              </div>
            </div>

            {subject.description && (
              <p className="mt-3 text-sm sm:text-sm text-gray-300 leading-relaxed line-clamp-4">{subject.description}</p>
            )}

            {subject.prerequisites && subject.prerequisites.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {subject.prerequisites.map((p, i) => (
                  <Badge key={i} className="text-xs font-semibold bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-lg px-3 py-1 shadow-sm border-0">{p}</Badge>
                ))}
              </div>
            )}

            <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm text-gray-400 gap-3">
              <div className="flex items-center gap-4 flex-wrap">
                {subject.instructor && (
                  <div className="inline-flex items-center gap-2">
                    <User className="w-4 h-4 text-green-400" />
                    <span>{subject.instructor}</span>
                  </div>
                )}

                <div className="inline-flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{subject.semesterName} 2 {subject.branchName}</span>
                </div>
              </div>

              <div className="text-gray-400 text-xs"></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectCard;
