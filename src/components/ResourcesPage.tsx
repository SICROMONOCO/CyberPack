
import React, { useState } from 'react';
import { Search, Filter, Settings, Plus, BookOpen, Calendar, FolderOpen, SortAsc, SortDesc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ResourceCard from './ResourceCard';
import ResourceManager from './ResourceManager';
import { mockResourcesData } from '../data/mockResourcesData';

const ResourcesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('dateAdded');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showCMS, setShowCMS] = useState(false);
  const [resourcesData, setResourcesData] = useState(mockResourcesData);

  // Get all available resources with branch/semester/subject context
  const allResources = resourcesData.branches.flatMap(branch =>
    branch.semesters.flatMap(semester =>
      semester.subjects.flatMap(subject =>
        (subject.resources || []).map(resource => ({
          ...resource,
          branchName: branch.name,
          branchId: branch.id,
          semesterName: semester.name,
          semesterId: semester.id,
          subjectName: subject.title,
          subjectId: subject.id
        }))
      )
    )
  );

  // Filter resources
  const filteredResources = allResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (resource.keywords || []).some(keyword => 
                           keyword.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    const matchesBranch = selectedBranch === 'all' || resource.branchId === selectedBranch;
    const matchesSemester = selectedSemester === 'all' || resource.semesterId === selectedSemester;
    const matchesSubject = selectedSubject === 'all' || resource.subjectId === selectedSubject;
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    
    return matchesSearch && matchesBranch && matchesSemester && matchesSubject && matchesType;
  });

  // Sort resources
  const sortedResources = [...filteredResources].sort((a, b) => {
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
      default:
        comparison = 0;
    }
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const allSemesters = resourcesData.branches.flatMap(branch => 
    branch.semesters.map(semester => ({ ...semester, branchName: branch.name, branchId: branch.id }))
  );

  const availableSubjects = selectedSemester === 'all' 
    ? resourcesData.branches.flatMap(branch =>
        branch.semesters.flatMap(semester =>
          semester.subjects.map(subject => ({ 
            ...subject, 
            branchName: branch.name, 
            semesterName: semester.name,
            branchId: branch.id,
            semesterId: semester.id
          }))
        )
      )
    : allSemesters
        .filter(sem => sem.id === selectedSemester)
        .flatMap(sem => 
          resourcesData.branches
            .find(branch => branch.id === sem.branchId)?.semesters
            .find(semester => semester.id === sem.id)?.subjects || []
        );

  const resourceTypes = [...new Set(allResources.map(resource => resource.type))];

  const toggleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  if (showCMS) {
    return (
      <ResourceManager 
        data={resourcesData} 
        onUpdate={setResourcesData}
        onClose={() => setShowCMS(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
              Study Resources
            </h1>
            <p className="text-gray-400">Access and download study materials organized by subject</p>
          </div>
          <Button
            onClick={() => setShowCMS(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Settings className="w-4 h-4 mr-2" />
            Manage Resources
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="bg-gray-900 rounded-xl p-6 mb-8 border border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-4">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white"
              />
            </div>

            {/* Branch Filter */}
            <select
              value={selectedBranch}
              onChange={(e) => {
                setSelectedBranch(e.target.value);
                setSelectedSemester('all');
                setSelectedSubject('all');
              }}
              className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white"
            >
              <option value="all">All Branches</option>
              {resourcesData.branches.map(branch => (
                <option key={branch.id} value={branch.id}>{branch.name}</option>
              ))}
            </select>

            {/* Semester Filter */}
            <select
              value={selectedSemester}
              onChange={(e) => {
                setSelectedSemester(e.target.value);
                setSelectedSubject('all');
              }}
              className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white"
            >
              <option value="all">All Semesters</option>
              {allSemesters
                .filter(sem => selectedBranch === 'all' || sem.branchId === selectedBranch)
                .map(semester => (
                  <option key={`${semester.branchId}-${semester.id}`} value={semester.id}>
                    {semester.name} ({semester.branchName})
                  </option>
                ))}
            </select>

            {/* Subject Filter */}
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white"
            >
              <option value="all">All Subjects</option>
              {availableSubjects.map(subject => (
                <option key={`${subject.branchId || 'unknown'}-${subject.semesterId || 'unknown'}-${subject.id}`} value={subject.id}>
                  {subject.title}
                </option>
              ))}
            </select>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white"
            >
              <option value="all">All Types</option>
              {resourceTypes.map(type => (
                <option key={type} value={type}>{type.toUpperCase()}</option>
              ))}
            </select>
          </div>

          {/* Sort Controls */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-md px-3 py-1 text-white text-sm"
            >
              <option value="dateAdded">Date Added</option>
              <option value="title">Title</option>
              <option value="type">Type</option>
            </select>
            <Button
              onClick={toggleSort}
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300"
            >
              {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Resource Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <FolderOpen className="w-8 h-8 text-blue-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{allResources.length}</p>
                  <p className="text-sm text-gray-400">Total Resources</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-green-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{resourcesData.branches.length}</p>
                  <p className="text-sm text-gray-400">Academic Branches</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8 text-purple-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{allSemesters.length}</p>
                  <p className="text-sm text-gray-400">Semesters</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Filter className="w-8 h-8 text-orange-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{filteredResources.length}</p>
                  <p className="text-sm text-gray-400">Filtered Results</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-white">
            Found {sortedResources.length} resources
          </h2>
        </div>

        {/* Resource Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedResources.map(resource => (
            <ResourceCard 
              key={`${resource.branchId}-${resource.semesterId}-${resource.subjectId}-${resource.id}`}
              resource={resource}
            />
          ))}
        </div>

        {sortedResources.length === 0 && (
          <div className="text-center py-12">
            <FolderOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No resources found</h3>
            <p className="text-gray-500">Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourcesPage;
