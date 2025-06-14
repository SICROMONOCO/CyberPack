
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
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold text-white">
        Resources ({resources.length})
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

    {resources.length === 0 ? (
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    )}
  </div>
);

export default ResourceList;
