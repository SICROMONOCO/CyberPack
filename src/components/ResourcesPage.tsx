import React, { useState, useMemo } from 'react';
import { Search, Filter, Plus, Settings, Download, Upload, Calendar, User, Tag, Globe, Lock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ResourceCard from './ResourceCard';
import ResourceManager from './ResourceManager';
import { useAuth } from '@/contexts/AuthContext';
import { mockResourcesData, type Branch, type Resource } from '@/data/mockResourcesData';

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

  // Get all resources with flattened structure
  const allResources = useMemo(() => {
    const resources: (Resource & {
      branchName: string;
      branchId: string;
      semesterName: string;
      semesterId: string;
      subjectName: string;
      subjectId: string;
    })[] = [];

    branches.forEach(branch => {
      branch.semesters.forEach(semester => {
        semester.subjects.forEach(subject => {
          subject.resources.forEach(resource => {
            resources.push({
              ...resource,
              branchName: branch.name,
              branchId: branch.id,
              semesterName: semester.name,
              semesterId: semester.id,
              subjectName: subject.title,
              subjectId: subject.id
            });
          });
        });
      });
    });

    return resources;
  }, [branches]);

  // Filter and sort resources
  const filteredResources = useMemo(() => {
    let filtered = allResources;

    // Apply filters
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

    // Apply search
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchLower) ||
        resource.description.toLowerCase().includes(searchLower) ||
        resource.keywords?.some(keyword => keyword.toLowerCase().includes(searchLower)) ||
        resource.author?.toLowerCase().includes(searchLower)
      );
    }

    // Sort resources
    filtered.sort((a, b) => {
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

  const handleUpdateData = (newData: any) => {
    setResourcesData(newData.branches);
  };

  // Get resource statistics
  const stats = useMemo(() => {
    const total = allResources.length;
    const typeCount = allResources.reduce((acc, resource) => {
      acc[resource.type] = (acc[resource.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return { total, typeCount };
  }, [allResources]);

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
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Resources Library
            </h1>
            <p className="text-gray-300 mt-2">
              Access study materials, documents, and learning resources organized by subject
            </p>
          </div>
          {canManageContent ? (
            <Button
              onClick={() => setShowManager(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Settings className="w-4 h-4 mr-2" />
              Manage Resources
            </Button>
          ) : (
            <div className="flex items-center gap-2 text-gray-500">
              <Lock className="w-4 h-4" />
              <span className="text-sm">Editor access required</span>
            </div>
          )}
        </div>

        {/* User Role Info */}
        {user && (
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-300">
                  Signed in as <span className="font-medium text-white">{user.username}</span> 
                  <span className="ml-2 px-2 py-1 rounded text-xs bg-blue-600 text-white">
                    {user.role}
                  </span>
                </div>
                {canManageContent && (
                  <div className="text-xs text-green-400">
                    ✓ Resource management enabled
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Resources</p>
                  <p className="text-2xl font-bold text-white">{stats.total}</p>
                </div>
                <Download className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Documents</p>
                  <p className="text-2xl font-bold text-white">{stats.typeCount.pdf + stats.typeCount.document || 0}</p>
                </div>
                <Upload className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Videos</p>
                  <p className="text-2xl font-bold text-white">{stats.typeCount.video || 0}</p>
                </div>
                <Calendar className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">External Links</p>
                  <p className="text-2xl font-bold text-white">{stats.typeCount.link || 0}</p>
                </div>
                <User className="w-8 h-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search resources by title, description, keywords, or author..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
              </div>

              {/* Filter Controls */}
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <Select value={selectedBranch} onValueChange={handleBranchChange}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="All Branches" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="all">All Branches</SelectItem>
                    {branches.map(branch => (
                      <SelectItem key={branch.id} value={branch.id}>
                        {branch.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedSemester} onValueChange={handleSemesterChange} disabled={selectedBranch === 'all'}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="All Semesters" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="all">All Semesters</SelectItem>
                    {semesters.map(semester => (
                      <SelectItem key={semester.id} value={semester.id}>
                        {semester.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedSubject} onValueChange={setSelectedSubject} disabled={selectedSemester === 'all'}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="All Subjects" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="all">All Subjects</SelectItem>
                    {subjects.map(subject => (
                      <SelectItem key={subject.id} value={subject.id}>
                        {subject.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="document">Document</SelectItem>
                    <SelectItem value="presentation">Presentation</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="link">Link</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="dateAdded">Date Added</SelectItem>
                    <SelectItem value="title">Title</SelectItem>
                    <SelectItem value="type">Type</SelectItem>
                    <SelectItem value="author">Author</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as 'asc' | 'desc')}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Order" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="desc">Newest First</SelectItem>
                    <SelectItem value="asc">Oldest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              Resources ({filteredResources.length})
            </h2>
            {(selectedBranch !== 'all' || selectedSemester !== 'all' || selectedSubject !== 'all' || searchTerm) && (
              <Button
                onClick={() => {
                  setSelectedBranch('all');
                  setSelectedSemester('all');
                  setSelectedSubject('all');
                  setSearchTerm('');
                  setFilterType('all');
                }}
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Clear Filters
              </Button>
            )}
          </div>

          {filteredResources.length === 0 ? (
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
              {filteredResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;
