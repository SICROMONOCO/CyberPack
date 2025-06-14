
import React, { useState } from 'react';
import { ArrowLeft, Plus, Edit2, Trash2, Save, X, Upload, FileText, Calendar, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

interface BranchManagerProps {
  data: any;
  onUpdate: (data: any) => void;
  onClose: () => void;
}

const BranchManager = ({ data, onUpdate, onClose }: BranchManagerProps) => {
  const [activeTab, setActiveTab] = useState('branches');
  const [editingBranch, setEditingBranch] = useState<string | null>(null);
  const [editingSubject, setEditingSubject] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const { toast } = useToast();

  // DEEP CLONE UTILITY
  function deepClone(obj: any) {
    return JSON.parse(JSON.stringify(obj));
  }

  const handleSaveBranch = () => {
    const updatedData = deepClone(data);
    if (editingBranch === 'new') {
      const newBranch = {
        id: Date.now().toString(),
        name: formData.name || '',
        description: formData.description || '',
        semesters: []
      };
      updatedData.branches.push(newBranch);
      toast({ title: 'Branch added', description: `Branch "${newBranch.name}" was created.`, duration: 2500 });
    } else {
      const branchIndex = updatedData.branches.findIndex((b: any) => b.id === editingBranch);
      if (branchIndex !== -1) {
        updatedData.branches[branchIndex] = {
          ...updatedData.branches[branchIndex],
          ...formData
        };
        toast({ title: 'Branch updated', description: `Branch "${formData.name}" was updated.`, duration: 2500 });
      }
    }
    onUpdate(updatedData);
    setEditingBranch(null);
    setFormData({});
  };

  const handleDeleteBranch = (branchId: string) => {
    const updatedData = deepClone(data);
    const deletedBranch = updatedData.branches.find((b: any) => b.id === branchId);
    updatedData.branches = updatedData.branches.filter((b: any) => b.id !== branchId);
    onUpdate(updatedData);
    toast({ title: 'Branch deleted', description: deletedBranch ? `"${deletedBranch.name}" was deleted.` : 'Branch deleted.', duration: 2500 });
  };

  const handleAddSemester = (branchId: string) => {
    const updatedData = deepClone(data);
    const branchIndex = updatedData.branches.findIndex((b: any) => b.id === branchId);
    if (branchIndex !== -1) {
      const newSemester = {
        id: Date.now().toString(),
        name: `Semester ${updatedData.branches[branchIndex].semesters.length + 1}`,
        subjects: []
      };
      updatedData.branches[branchIndex].semesters.push(newSemester);
      onUpdate(updatedData);
      toast({ title: 'Semester added', description: `Added ${newSemester.name} to ${updatedData.branches[branchIndex].name}`, duration: 2500 });
    }
  };

  const renderBranchManager = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Manage Academic Branches</h2>
        <Button
          onClick={() => {
            setEditingBranch('new');
            setFormData({});
          }}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Branch
        </Button>
      </div>

      {editingBranch && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">
              {editingBranch === 'new' ? 'Add New Branch' : 'Edit Branch'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Branch Name</label>
              <Input
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-gray-900 border-gray-600 text-white"
                placeholder="e.g., Cybersecurity Branch"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 text-white"
                rows={3}
                placeholder="Brief description of the academic branch"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSaveBranch} className="bg-green-600 hover:bg-green-700">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button
                onClick={() => {
                  setEditingBranch(null);
                  setFormData({});
                }}
                variant="outline"
                className="border-gray-600 text-gray-300"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col gap-4">
        {data.branches.map((branch: any) => (
          <Card key={branch.id} className="bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">{branch.name}</CardTitle>
                  <CardDescription className="text-gray-400">{branch.description}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      setEditingBranch(branch.id);
                      setFormData(branch);
                    }}
                    size="sm"
                    variant="outline"
                    className="border-gray-600 text-gray-300"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleDeleteBranch(branch.id)}
                    size="sm"
                    variant="outline"
                    className="border-red-600 text-red-400 hover:bg-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {branch.semesters.length} Semesters
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {branch.semesters.reduce((total: number, sem: any) => total + sem.subjects.length, 0)} Subjects
                  </span>
                </div>
                <Button
                  onClick={() => handleAddSemester(branch.id)}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Semester
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            onClick={onClose}
            variant="outline"
            className="border-gray-600 text-gray-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Subjects
          </Button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Content Management System
          </h1>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8">
          <Button
            onClick={() => setActiveTab('branches')}
            variant={activeTab === 'branches' ? 'default' : 'outline'}
            className={activeTab === 'branches' ? 'bg-blue-600' : 'border-gray-600 text-gray-300'}
          >
            Academic Branches
          </Button>
          <Button
            onClick={() => setActiveTab('brochures')}
            variant={activeTab === 'brochures' ? 'default' : 'outline'}
            className={activeTab === 'brochures' ? 'bg-blue-600' : 'border-gray-600 text-gray-300'}
          >
            Program Brochures
          </Button>
          <Button
            onClick={() => setActiveTab('subjects')}
            variant={activeTab === 'subjects' ? 'default' : 'outline'}
            className={activeTab === 'subjects' ? 'bg-blue-600' : 'border-gray-600 text-gray-300'}
          >
            Subject Management
          </Button>
        </div>

        {/* Content */}
        {activeTab === 'branches' && renderBranchManager()}
        {activeTab === 'brochures' && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">Brochure Management</h3>
            <p className="text-gray-500">Upload and manage program brochures for each academic branch</p>
          </div>
        )}
        {activeTab === 'subjects' && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">Subject Management</h3>
            <p className="text-gray-500">Manage individual subjects within each semester</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BranchManager;

