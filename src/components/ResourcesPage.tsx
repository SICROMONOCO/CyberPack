
import React, { useState, useEffect, useMemo } from 'react';
import ResourceManager from './ResourceManager';
import { useAuth } from '@/contexts/AuthContext';
import ResourceHeader from './ResourceHeader';
import ResourceUserStatus from './ResourceUserStatus';
import ResourceStats from './ResourceStats';
import ResourceFilters from './ResourceFilters';
import ResourceList from './ResourceList';
import { getBranchesWithSemestersAndSubjects, getResourcesForSubject } from '@/integrations/supabase/supabaseAcademicApi';

const ResourcesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [selectedSemester, setSelectedSemester] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('dateAdded');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filterType, setFilterType] = useState<string>('all');
  const [showManager, setShowManager] = useState(false);
  const [branchesData, setBranchesData] = useState<any[]>([]);
  const [allResources, setAllResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { canManageContent, user } = useAuth();

  // Fetch all branches, semesters, subjects from Supabase
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const branches = await getBranchesWithSemestersAndSubjects();
        setBranchesData(branches);

        // Now fetch all resources for every subject
        const resourcePromises: Promise<any[]>[] = [];
        branches.forEach(branch =>
          branch.semesters.forEach(semester =>
            semester.subjects.forEach((subject: any) => {
              resourcePromises.push(
                getResourcesForSubject(subject.id).then(resources =>
                  resources.map(resource => ({
                    ...resource,
                    branchName: branch.name,
                    branchId: branch.id,
                    semesterName: semester.name,
                    semesterId: semester.id,
                    subjectName: subject.title,
                    subjectId: subject.id
                  }))
                )
              );
            })
          )
        );
        const resourcesBySubject = await Promise.all(resourcePromises);
        setAllResources(resourcesBySubject.flat());
      } catch (e) {
        console.error('[ResourcePage] Failed to fetch data:', e);
        setBranchesData([]);
        setAllResources([]);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  // Refetch resources after management
  const handleUpdateData = () => {
    setLoading(true);
    // Just re-run the same fetching as above
    (async () => {
      try {
        const branches = await getBranchesWithSemestersAndSubjects();
        setBranchesData(branches);

        const resourcePromises: Promise<any[]>[] = [];
        branches.forEach(branch =>
          branch.semesters.forEach(semester =>
            semester.subjects.forEach((subject: any) => {
              resourcePromises.push(
                getResourcesForSubject(subject.id).then(resources =>
                  resources.map(resource => ({
                    ...resource,
                    branchName: branch.name,
                    branchId: branch.id,
                    semesterName: semester.name,
                    semesterId: semester.id,
                    subjectName: subject.title,
                    subjectId: subject.id
                  }))
                )
              );
            })
          )
        );
        const resourcesBySubject = await Promise.all(resourcePromises);
        setAllResources(resourcesBySubject.flat());
      } catch (e) {
        setBranchesData([]);
        setAllResources([]);
      }
      setLoading(false);
    })();
  };

  // Get all available options for filters
  const branches = branchesData || [];
  const semesters = useMemo(() => {
    if (selectedBranch === 'all') return [];
    const branch = branches.find((b: any) => b.id === selectedBranch);
    return branch?.semesters || [];
  }, [selectedBranch, branches]);

  const subjects = useMemo(() => {
    if (selectedBranch === 'all' || selectedSemester === 'all') return [];
    const branch = branches.find((b: any) => b.id === selectedBranch);
    const semester = branch?.semesters.find((s: any) => s.id === selectedSemester);
    return semester?.subjects || [];
  }, [selectedBranch, selectedSemester, branches]);
  
  // Filter and sort resources from database
  const filteredResources = useMemo(() => {
    let filtered = allResources;

    if (selectedBranch !== 'all') {
      filtered = filtered.filter(resource => resource.branchId === selectedBranch);
    }

    if (selectedSemester !== 'all') {
      filtered = filtered.filter(resource => resource.semesterId === selectedSemester);
    }

    if (selectedSubject !== 'all') {
      filtered = filtered.filter(resource => resource.subjectId === selectedSubject);
    }

    if (filterType !== 'all') {
      filtered = filtered.filter(resource => resource.type === filterType);
    }

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(resource =>
        (resource.title || '').toLowerCase().includes(searchLower) ||
        (resource.description || '').toLowerCase().includes(searchLower) ||
        (resource.keywords || []).some((keyword: string) => keyword.toLowerCase().includes(searchLower)) ||
        (resource.author || '').toLowerCase().includes(searchLower)
      );
    }

    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'title':
          comparison = (a.title || '').localeCompare(b.title || '');
          break;
        case 'dateAdded':
          comparison = new Date(a.dateadded || a.dateAdded || "").getTime() - new Date(b.dateadded || b.dateAdded || "").getTime();
          break;
        case 'type':
          comparison = (a.type || '').localeCompare(b.type || '');
          break;
        case 'author':
          comparison = (a.author || '').localeCompare(b.author || '');
          break;
        default:
          comparison = 0;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [allResources, selectedBranch, selectedSemester, selectedSubject, filterType, searchTerm, sortBy, sortOrder]);

  const handleBranchChange = (value: string) => {
    setSelectedBranch(value);
    setSelectedSemester('all');
    setSelectedSubject('all');
  };

  const handleSemesterChange = (value: string) => {
    setSelectedSemester(value);
    setSelectedSubject('all');
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

  // Resource stats from live resources
  const stats = useMemo(() => {
    const total = allResources.length;
    const typeCount = allResources.reduce((acc: Record<string, number>, resource: any) => {
      acc[resource.type] = (acc[resource.type] || 0) + 1;
      return acc;
    }, {});
    return { total, typeCount };
  }, [allResources]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-300 bg-gray-950">
        Loading resources from database...
      </div>
    );
  }

  if (showManager) {
    return (
      <ResourceManager
        data={{ branches: branchesData }}
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
          resources={filteredResources}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={clearFilters}
        />
      </div>
    </div>
  );
};

export default ResourcesPage;

