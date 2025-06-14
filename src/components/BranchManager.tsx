
import React, { useState } from 'react';
import { ArrowLeft, Plus, Edit2, Trash2, Save, X, Upload, FileText, Calendar, BookOpen, Link as LinkIcon, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import SubjectManager from './SubjectManager';

interface BranchManagerProps {
  data: any;
  onUpdate: (data: any) => void;
  onClose: () => void;
}

const BranchManager = ({ data, onUpdate, onClose }: BranchManagerProps) => {
  const [activeTab, setActiveTab] = useState('branches');
  const [editingBranch, setEditingBranch] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [managingSemester, setManagingSemester] = useState<{ branchId: string, semesterId: string } | null>(null);
  const [editingBrochureBranch, setEditingBrochureBranch] = useState<string | null>(null);
  const [brochureLinkInput, setBrochureLinkInput] = useState<string>('');
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
        semesters: [],
        brochure: undefined
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

  // Subject update for a given semester inside a branch
  const handleUpdateSubjects = (branchId: string, semesterId: string, newSubjects: any[]) => {
    const updatedData = deepClone(data);
    const branchIdx = updatedData.branches.findIndex((b: any) => b.id === branchId);
    if (branchIdx === -1) return;
    const semesterIdx = updatedData.branches[branchIdx].semesters.findIndex(
      (s: any) => s.id === semesterId
    );
    if (semesterIdx === -1) return;
    updatedData.branches[branchIdx].semesters[semesterIdx].subjects = newSubjects;
    onUpdate(updatedData);
  };

  // Brochure link management
  const handleSaveBrochureLink = (branchId: string) => {
    if (!/^https?:\/\//.test(brochureLinkInput.trim())) {
      toast({ title: "Invalid Link", description: "Please enter a valid URL beginning with http or https." });
      return;
    }
    const updatedData = deepClone(data);
    const branchIndex = updatedData.branches.findIndex((b: any) => b.id === branchId);
    if (branchIndex !== -1) {
      updatedData.branches[branchIndex].brochure = brochureLinkInput.trim();
    }
    onUpdate(updatedData);
    setEditingBrochureBranch(null);
    setBrochureLinkInput('');
    toast({ title: 'Brochure Linked', description: 'Brochure link saved for branch.' });
  };

  const handleRemoveBrochureLink = (branchId: string) => {
    const updatedData = deepClone(data);
    const branchIndex = updatedData.branches.findIndex((b: any) => b.id === branchId);
    if (branchIndex !== -1) {
      updatedData.branches[branchIndex].brochure = undefined;
    }
    onUpdate(updatedData);
    toast({ title: 'Brochure Removed', description: 'Brochure link removed for branch.' });
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
              <div className="flex items-center justify-between mb-2">
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
              {/* Show semesters and their subjects */}
              {branch.semesters.map((semester: any) => (
                <div key={semester.id} className="mt-4">
                  <Card className="bg-gray-950 border-gray-800 mb-2">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white text-base">
                          {semester.name}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <SubjectManager
                        subjects={semester.subjects}
                        onUpdate={(updatedSubjects) =>
                          handleUpdateSubjects(branch.id, semester.id, updatedSubjects)
                        }
                        semesterName={semester.name}
                      />
                    </CardContent>
                  </Card>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // Brochure link management + list layout
  const renderBrochureManager = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Brochure Management</h2>
      <p className="text-gray-400 mb-4">Upload and manage program brochure links for each academic branch.</p>
      {/* LIST layout: not grid, but vertical list */}
      <div className="flex flex-col gap-4">
        {data.branches.length === 0 && (
          <div className="text-gray-400 italic text-sm">No branches found yet.</div>
        )}
        {data.branches.map((branch: any) => (
          <Card key={branch.id} className="bg-gray-900 border-gray-800 flex flex-col md:flex-row md:items-center md:justify-between p-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <BookOpen className="w-5 h-5 text-blue-400" />
                <span className="text-lg text-white font-medium">{branch.name}</span>
              </div>
              <div className="text-gray-400 mb-1">{branch.description}</div>
              {branch.brochure && (
                <div className="flex items-center gap-2 text-sm text-blue-400 mb-1">
                  <FileText className="w-4 h-4" />
                  <span>Brochure Linked</span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-blue-600 text-blue-500 px-2 py-1 ml-2"
                    onClick={() => window.open(branch.brochure, '_blank')}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                </div>
              )}
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 mt-2 md:mt-0">
              {/* Link editor */}
              {editingBrochureBranch === branch.id ? (
                <div className="flex gap-2 items-center">
                  <Input
                    value={brochureLinkInput}
                    onChange={e => setBrochureLinkInput(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="https://example.com/brochure.pdf"
                  />
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => handleSaveBrochureLink(branch.id)}
                  >
                    <Save className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-600 text-gray-300"
                    onClick={() => {
                      setEditingBrochureBranch(null);
                      setBrochureLinkInput('');
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-blue-600 text-blue-400"
                    onClick={() => {
                      setEditingBrochureBranch(branch.id);
                      setBrochureLinkInput(branch.brochure || '');
                    }}
                  >
                    <LinkIcon className="w-4 h-4 mr-1" />
                    {branch.brochure ? 'Edit Link' : 'Add Brochure Link'}
                  </Button>
                  {branch.brochure && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-600 text-red-400"
                      onClick={() => handleRemoveBrochureLink(branch.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove Link
                    </Button>
                  )}
                </div>
              )}
            </div>
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
          {/* Removed Subject Management tab */}
        </div>
        {/* Content */}
        {activeTab === 'branches' && renderBranchManager()}
        {activeTab === 'brochures' && renderBrochureManager()}
      </div>
    </div>
  );
};

export default BranchManager;
