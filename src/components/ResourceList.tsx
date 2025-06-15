
import React from 'react';
import { Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ResourceCard from './ResourceCard';
import { type Resource } from '@/data/mockResourcesData';

type FilteredResource = Resource & {
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

const ResourceList = ({ resources, hasActiveFilters, onClearFilters }: ResourceListProps) => (
  <div className="space-y-8">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-semibold text-white">
        Resources ({resources.length})
      </h2>
      {hasActiveFilters && (
        <Button
          onClick={onClearFilters}
          variant="outline"
          size="sm"
          className="border-gray-600 text-gray-300 hover:bg-gray-800 px-6 py-2"
        >
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
            <p className="text-lg text-gray-400 leading-relaxed">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
          </div>
        </CardContent>
      </Card>
    ) : (
      <div className="space-y-6">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    )}
  </div>
);

export default ResourceList;
