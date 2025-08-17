import React from 'react';
import { BookOpen, FileText, Calendar, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export type SupabaseBranch = {
  id: string;
  name: string;
  description: string;
  brochure?: string | null;
  semesters: {
    id: string;
    name: string;
    subjects: any[];
  }[];
};

interface ProgramCardProps {
  branch: SupabaseBranch;
}

const ProgramCard = ({ branch }: ProgramCardProps) => {
  const subjectCount = branch.semesters.reduce((total, s) => total + (s.subjects?.length || 0), 0);
  return (
    <Card className="bg-gray-900 border-gray-800 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
      <CardContent className="p-6">
        <div className="flex gap-4">
          <div className="inline-flex items-center justify-center rounded-lg bg-blue-700" style={{ width: '3rem', height: '3rem', minWidth: '3rem' }}>
            <BookOpen className="w-6 h-6 text-white" />
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-semibold text-white">{branch.name}</h3>
                <p className="mt-2 text-sm text-gray-300 line-clamp-2">{branch.description}</p>

                <div className="mt-3 flex items-center gap-4 text-sm text-gray-400">
                  <span className="inline-flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{branch.semesters.length} Semesters</span>
                  </span>
                  <span className="text-gray-500">•</span>
                  <span className="inline-flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <span>{subjectCount} Subjects</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a href={`/subjects?branch=${encodeURIComponent(branch.id)}`} className="inline-flex items-center gap-2 text-gray-300 hover:text-white bg-gray-800 px-3 py-1 rounded">
                  <BookOpen className="w-4 h-4" />
                  View Subjects
                </a>

                {/* Brochure link: external if provided, otherwise a subtle placeholder the user can replace later */}
                {branch.brochure ? (
                  <a href={branch.brochure} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 px-3 py-1 rounded">
                    <ExternalLink className="w-4 h-4" />
                    Brochure
                  </a>
                ) : (
                  <a href="#" aria-disabled="true" title="No brochure link set yet" className="inline-flex items-center gap-2 text-gray-500 bg-gray-800 px-3 py-1 rounded border border-dashed border-gray-700 opacity-70 cursor-not-allowed">
                    <ExternalLink className="w-4 h-4" />
                    Add Brochure
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgramCard;
