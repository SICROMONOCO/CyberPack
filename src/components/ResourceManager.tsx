
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Edit2, Trash2, Upload, FolderOpen, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ResourceUploadModal from './ResourceUploadModal';
import ResourceCard from './ResourceCard';
import { addResource, deleteResource, getResourcesForSubject } from "@/integrations/supabase/supabaseAcademicApi";

interface ResourceManagerProps {
  data: any;
  onUpdate: (data: any) => void;
  onClose: () => void;
}

const ResourceManager = ({ data, onUpdate, onClose }: ResourceManagerProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [loading, setLoading] = useState(false);
  const [allResources, setAllResources] = useState<any[]>([]);
  const [deleteLoadingIds, setDeleteLoadingIds] = useState<Set<string>>(new Set());

  // Fetch all resources for all subjects
  useEffect(() => {
    async function fetchAllResources() {
      setLoading(true);
      try {
        const collected: any[] = [];
        for (const branch of data.branches) {
          for (const semester of branch.semesters) {
            for (const subject of semester.subjects) {
              const resources = await getResourcesForSubject(subject.id);
              for (const resource of resources) {
                collected.push({
                  ...resource,
                  branchName: branch.name,
                  branchId: branch.id,
                  semesterName: semester.name,
                  semesterId: semester.id,
                  subjectName: subject.title,
                  subjectId: subject.id,
                });
              }
            }
          }
        }
        setAllResources(collected);
      } catch (e) {
        console.error("Error fetching resources", e);
      } finally {
        setLoading(false);
      }
    }
    fetchAllResources();
  }, [data]);

  const filteredResources = allResources.filter((resource) => {
    const matchesSearch = resource.title?.toLowerCase().includes(searchTerm.toLowerCase() || "");
    const matchesBranch = selectedBranch === 'all' || resource.branchId === selectedBranch;
    return matchesSearch && matchesBranch;
  });

  const refreshResources = async () => {
    setLoading(true);
    try {
      const collected: any[] = [];
      for (const branch of data.branches) {
        for (const semester of branch.semesters) {
          for (const subject of semester.subjects) {
            const resources = await getResourcesForSubject(subject.id);
            for (const resource of resources) {
              collected.push({
                ...resource,
                branchName: branch.name,
                branchId: branch.id,
                semesterName: semester.name,
                semesterId: semester.id,
                subjectName: subject.title,
                subjectId: subject.id,
              });
            }
          }
        }
      }
      setAllResources(collected);
    } catch (e) {
      console.error("Error refreshing resources", e);
    } finally {
      setLoading(false);
    }
  };

  const handleAddResource = async (newResource: any) => {
    try {
      await addResource(newResource.subjectId, newResource);
      await refreshResources();
    } catch (e) {
      console.error("Failed to add resource", e);
    }
  };

  const handleDeleteResource = async (
    resourceId: string,
    branchId: string,
    semesterId: string,
    subjectId: string
  ) => {
    setDeleteLoadingIds((prev) => new Set([...prev, resourceId]));
    try {
      await deleteResource(resourceId);
      await refreshResources();
    } catch (e) {
      console.error("Failed to delete resource", e);
    } finally {
      setDeleteLoadingIds((prev) => {
        const next = new Set(prev);
        next.delete(resourceId);
        return next;
      });
    }
  };

  const resourceStats = {
    total: allResources.length,
    byType: allResources.reduce((acc: any, resource: any) => {
      acc[resource.type] = (acc[resource.type] || 0) + 1;
      return acc;
    }, {}),
    byBranch: data.branches.map((branch: any) => ({
      name: branch.name,
      count: allResources.filter((r: any) => r.branchId === branch.id).length
    }))
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Resource Overview</h2>
        <Button
          onClick={() => setShowUploadModal(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Resource
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-blue-400" />
              Total Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-400">{resourceStats.total}</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Resources by Type</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {Object.entries(resourceStats.byType).map(([type, count]: [string, any]) => (
              <div key={type} className="flex justify-between text-sm">
                <span className="text-gray-300 capitalize">{type}</span>
                <span className="text-gray-400">{count}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Resources by Branch</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {resourceStats.byBranch.map((branch: any) => (
              <div key={branch.name} className="flex justify-between text-sm">
                <span className="text-gray-300">{branch.name}</span>
                <span className="text-gray-400">{branch.count}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderResourceList = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Manage Resources</h2>
        <Button
          onClick={() => setShowUploadModal(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Resource
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-800 border-gray-600 text-white"
          />
        </div>
        <select
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
          className="bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white"
        >
          <option value="all">All Branches</option>
          {data.branches.map((branch: any) => (
            <option key={branch.id} value={branch.id}>{branch.name}</option>
          ))}
        </select>
      </div>

      {/* Resource List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource: any) => (
          <div key={`${resource.branchId}-${resource.semesterId}-${resource.subjectId}-${resource.id}`} className="relative">
            <ResourceCard resource={resource} />
            <div className="absolute top-2 right-2 flex gap-1">
              <Button
                size="sm"
                variant="outline"
                className="border-yellow-600 text-yellow-400 hover:bg-yellow-600 h-8 w-8 p-0"
                // TODO: Implement edit
              >
                <Edit2 className="w-3 h-3" />
              </Button>
              <Button
                onClick={() => handleDeleteResource(resource.id, resource.branchId, resource.semesterId, resource.subjectId)}
                size="sm"
                variant="outline"
                className={`border-red-600 text-red-400 hover:bg-red-600 h-8 w-8 p-0 ${deleteLoadingIds.has(resource.id) ? "opacity-50 pointer-events-none" : ""}`}
                disabled={deleteLoadingIds.has(resource.id)}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              {resource.branchName} → {resource.semesterName} → {resource.subjectName}
            </div>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && !loading && (
        <div className="text-center py-12">
          <FolderOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No resources found</h3>
          <p className="text-gray-500">Try adjusting your search terms or add new resources</p>
        </div>
      )}
      {loading && (
        <div className="text-center py-6 text-gray-400">Loading resources...</div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={onClose}
            variant="outline"
            className="border-gray-600 text-gray-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Resources
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Resource Management System
          </h1>
        </div>
        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8">
          <Button
            onClick={() => setActiveTab('overview')}
            variant={activeTab === 'overview' ? 'default' : 'outline'}
            className={activeTab === 'overview' ? 'bg-blue-600' : 'border-gray-600 text-gray-300'}
          >
            Overview
          </Button>
          <Button
            onClick={() => setActiveTab('resources')}
            variant={activeTab === 'resources' ? 'default' : 'outline'}
            className={activeTab === 'resources' ? 'bg-blue-600' : 'border-gray-600 text-gray-300'}
          >
            Manage Resources
          </Button>
          <Button
            onClick={() => setActiveTab('bulk')}
            variant={activeTab === 'bulk' ? 'default' : 'outline'}
            className={activeTab === 'bulk' ? 'bg-blue-600' : 'border-gray-600 text-gray-300'}
          >
            Bulk Operations
          </Button>
        </div>

        {/* Content */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'resources' && renderResourceList()}
        {activeTab === 'bulk' && (
          <div className="text-center py-12">
            <Upload className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">Bulk Operations</h3>
            <p className="text-gray-500">Upload multiple resources at once and manage in batches</p>
          </div>
        )}

        {/* Upload Modal */}
        <ResourceUploadModal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          onSave={handleAddResource}
          branches={data.branches}
        />
      </div>
    </div>
  );
};

export default ResourceManager;
