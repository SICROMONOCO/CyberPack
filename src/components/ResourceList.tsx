
import React from 'react';
import { Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ResourceCard from './ResourceCard';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
// Local minimal resource shape used here to avoid depending on mock data typings
type ResourceBase = {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'video' | 'link' | 'document' | 'presentation' | 'image' | 'exams' | 'disabled';
  url?: string;
  fileSize?: string;
  dateAdded: string;
  lastUpdated?: string;
  author?: string;
  keywords?: string[];
  language?: string;
  semesterName?: string;
};

type FilteredResource = ResourceBase & {
  branchName: string;
  branchId: string;
  semesterName: string;
  semesterId: string;
  subjectName: string;
  subjectId: string;
};

interface ResourceListProps {
  resources: FilteredResource[];
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

const ResourceList = ({ resources, hasActiveFilters, onClearFilters }: ResourceListProps) => {
  // Group resources by semesterName, with primary groups for 1st and 2nd semester
  const normalizeSemesterGroup = (name?: string) => {
    if (!name) return 'Unknown Semester';
    const lower = name.toLowerCase();
    if (lower.includes('1st') || lower.includes('first') || /(^|\D)1(\D|$)/.test(lower)) return '1st Semester';
    if (lower.includes('2nd') || lower.includes('second') || /(^|\D)2(\D|$)/.test(lower)) return '2nd Semester';
    return name;
  };

  const groups: Record<string, FilteredResource[]> = {};
  resources.forEach(r => {
    const key = normalizeSemesterGroup(r.semesterName);
    if (!groups[key]) groups[key] = [];
    groups[key].push(r);
  });

  // Order groups: 1st, 2nd, then alphabetical others
  const orderedGroupKeys = Object.keys(groups).sort((a, b) => {
    if (a === '1st Semester') return -1;
    if (b === '1st Semester') return 1;
    if (a === '2nd Semester') return -1;
    if (b === '2nd Semester') return 1;
    return a.localeCompare(b);
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">Resources ({resources.length})</h2>
        {hasActiveFilters && (
          <Button onClick={onClearFilters} variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-6 py-2">
            Clear Filters
          </Button>
        )}
      </div>

      {resources.length === 0 ? (
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-16 text-center">
            <div className="space-y-6">
              <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white">No resources found</h3>
              <p className="text-lg text-gray-400 leading-relaxed">Try adjusting your search terms or filters to find what you're looking for.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {orderedGroupKeys.map((groupKey) => (
            <div key={groupKey} className="space-y-4">
              <h3 className="text-lg font-bold text-blue-300">{groupKey}</h3>
              <div className="grid gap-4 sm:gap-6">
                {groups[groupKey].map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResourceList;
     