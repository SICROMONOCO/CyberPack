
import React, { useState, useMemo } from 'react';
import ResourceManager from './ResourceManager';
import { useAuth } from '@/contexts/AuthContext';
import { mockResourcesData, type Resource } from '@/data/mockResourcesData';
import ResourceHeader from './ResourceHeader';
import ResourceUserStatus from './ResourceUserStatus';
import ResourceStats from './ResourceStats';
import ResourceFilters from './ResourceFilters';
import ResourceList from './ResourceList';

const ResourcesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [selectedSemester, setSelectedSemester] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('dateAdded');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterType, setFilterType] = useState<string>('all');
  const [showManager, setShowManager] = useState(false);
  const [resourcesData, setResourcesData] = useState(mockResourcesData);
  const { canManageContent, user } = useAuth();

  // Get all available options for filters
  const branches = resourcesData;
  const semesters = useMemo(() => {
    if (selectedBranch === 'all') return [];
    const branch = branches.find(b => b.id === selectedBranch);
    return branch?.semesters || [];
  }, [selectedBranch, branches]);

  const subjects = useMemo(() => {
    if (selectedBranch === 'all' || selectedSemester === 'all') return [];
    const branch = branches.find(b => b.id === selectedBranch);
    const semester = branch?.semesters.find(s => s.id === selectedSemester);
    return semester?.subjects || [];
  }, [selectedBranch, selectedSemester, branches]);

  // Group resources by semester and subject
  const groupedResources = useMemo(() => {
    let filteredBranches = branches;
    if (selectedBranch !== 'all') {
      filteredBranches = filteredBranches.filter(b => b.id === selectedBranch);
    }

    return filteredBranches
      .map(branch => ({
        branchId: branch.id,
        branchName: branch.name,
        semesters: branch.semesters
          .filter(sem => selectedSemester === 'all' || sem.id === selectedSemester)
          .map(semester => ({
            semesterId: semester.id,
            semesterName: semester.name,
            subjects: semester.subjects
              .filter(sub => selectedSubject === 'all' || sub.id === selectedSubject)
              .map(subject => ({
                subjectId: subject.id,
                subjectName: subject.title,
                resources: subject.resources
                  .filter(resource =>
                    (filterType === 'all' || resource.type === filterType) &&
                    (!searchTerm ||
                      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      resource.keywords?.some(k => k.toLowerCase().includes(searchTerm.toLowerCase())) ||
                      resource.author?.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                  )
                  .sort((a, b) => {
                    let comparison = 0;
                    switch (sortBy) {
                      case 'title':
                        comparison = a.title.localeCompare(b.title);
                        break;
                      case 'dateAdded':
                        comparison = new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
                        break;
                      case 'type':
                        comparison = a.type.localeCompare(b.type);
                        break;
                      case 'author':
                        comparison = (a.author || '').localeCompare(b.author || '');
                        break;
                      default:
                        comparison = 0;
                    }
                    return sortOrder === 'asc' ? comparison : -comparison;
                  }),
              }))
              .filter(sub => sub.resources.length > 0)
          }))
          .filter(sem => sem.subjects.length > 0)
      }))
      .filter(branch => branch.semesters.length > 0);
  }, [branches, selectedBranch, selectedSemester, selectedSubject, filterType, searchTerm, sortBy, sortOrder]);

  const handleBranchChange = (value: string) => {
    setSelectedBranch(value);
    setSelectedSemester('all');
    setSelectedSubject('all');
  };

  const handleSemesterChange = (value: string) => {
    setSelectedSemester(value);
    setSelectedSubject('all');
  };

  const handleUpdateData = (newData: any) => {
    setResourcesData(newData.branches);
  };

  const clearFilters = () => {
    setSelectedBranch('all');
    setSelectedSemester('all');
    setSelectedSubject('all');
    setSearchTerm('');
    setFilterType('all');
  };

  const hasActiveFilters = useMemo(() => {
    return selectedBranch !== 'all' ||
      selectedSemester !== 'all' ||
      selectedSubject !== 'all' ||
      !!searchTerm ||
      filterType !== 'all';
  }, [selectedBranch, selectedSemester, selectedSubject, searchTerm, filterType]);

  // Get resource statistics
  const stats = useMemo(() => {
    let allResources: Resource[] = [];
    branches.forEach(branch => {
      branch.semesters.forEach(semester => {
        semester.subjects.forEach(subject => {
          allResources = allResources.concat(subject.resources);
        });
      });
    });
    const total = allResources.length;
    const typeCount = allResources.reduce((acc, resource) => {
      acc[resource.type] = (acc[resource.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return { total, typeCount };
  }, [branches]);

  if (showManager) {
    return (
      <ResourceManager
        data={{ branches: resourcesData }}
        onUpdate={handleUpdateData}
        onClose={() => setShowManager(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto p-6 space-y-6">
        <ResourceHeader canManageContent={canManageContent} onManageClick={() => setShowManager(true)} />
        {user && <ResourceUserStatus />}
        <ResourceStats stats={stats} />
        <ResourceFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedBranch={selectedBranch}
          handleBranchChange={handleBranchChange}
          selectedSemester={selectedSemester}
          handleSemesterChange={handleSemesterChange}
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
          filterType={filterType}
          setFilterType={setFilterType}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          branches={branches}
          semesters={semesters}
          subjects={subjects}
        />
        <ResourceList
          groupedResources={groupedResources}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={clearFilters}
        />
      </div>
    </div>
  );
};

export default ResourcesPage;

