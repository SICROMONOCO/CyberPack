
// Accept groupedResources: [{ branchId, branchName, semesters: [{ semesterId, semesterName, subjects: [{ subjectId, subjectName, resources: Resource[] }] }] }]
import React from 'react';
import { Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ResourceCard from './ResourceCard';

interface GroupedResource {
  branchId: string;
  branchName: string;
  semesters: {
    semesterId: string;
    semesterName: string;
    subjects: {
      subjectId: string;
      subjectName: string;
      resources: any[];
    }[];
  }[];
}

interface ResourceListProps {
  groupedResources: GroupedResource[];
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

const ResourceList = ({ groupedResources, hasActiveFilters, onClearFilters }: ResourceListProps) => {
  // Check for no resources after filters
  const empty =
    !groupedResources ||
    groupedResources.length === 0 ||
    groupedResources.every(b =>
      b.semesters.every(s =>
        s.subjects.every(sub => sub.resources.length === 0)
      )
    );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">
          Resources
        </h2>
        {hasActiveFilters && (
          <Button
            onClick={onClearFilters}
            variant="outline"
            size="sm"
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            Clear Filters
          </Button>
        )}
      </div>
      {empty ? (
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">No resources found</h3>
              <p className="text-gray-400">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {groupedResources.map(branch =>
            branch.semesters.map(semester =>
              semester.subjects.length > 0 && (
                <div key={semester.semesterId} className="space-y-4">
                  <h3 className="text-lg font-bold text-blue-300">{semester.semesterName}</h3>
                  {semester.subjects.map(subject =>
                    subject.resources.length > 0 && (
                      <div key={subject.subjectId} className="space-y-2">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-md text-purple-400 font-semibold">{subject.subjectName}</span>
                        </div>
                        <ul className="divide-y divide-gray-800">
                          {subject.resources.map(resource => (
                            <li key={resource.id} className="py-4">
                              <ResourceCard resource={resource} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  )}
                </div>
              )
            )
          )}
        </div>
      )}
    </div>
  );
};

export default ResourceList;
