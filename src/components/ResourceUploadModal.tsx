
import React, { useState } from 'react';
import { X, Upload, Plus, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ResourceUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (resource: any) => void;
  branches: any[];
}

const ResourceUploadModal = ({ isOpen, onClose, onSave, branches }: ResourceUploadModalProps) => {
  const [uploadType, setUploadType] = useState<'file' | 'link'>('file');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'pdf',
    url: '',
    branchId: '',
    semesterId: '',
    subjectId: '',
    author: '',
    keywords: '',
    language: 'English'
  });

  const resourceTypes = [
    { value: 'pdf', label: 'PDF Document' },
    { value: 'document', label: 'Word Document' },
    { value: 'presentation', label: 'Presentation' },
    { value: 'video', label: 'Video' },
    { value: 'image', label: 'Image' },
    { value: 'link', label: 'External Link' }
  ];

  const selectedBranch = branches.find(b => b.id === formData.branchId);
  const availableSemesters = selectedBranch?.semesters || [];
  const selectedSemester = availableSemesters.find(s => s.id === formData.semesterId);
  const availableSubjects = selectedSemester?.subjects || [];

  const handleSave = () => {
    const newResource = {
      id: Date.now().toString(),
      ...formData,
      keywords: formData.keywords.split(',').map(k => k.trim()).filter(k => k),
      dateAdded: new Date().toISOString(),
      fileSize: uploadType === 'file' ? '2.3 MB' : undefined // Mock file size
    };
    onSave(newResource);
    onClose();
    setFormData({
      title: '',
      description: '',
      type: 'pdf',
      url: '',
      branchId: '',
      semesterId: '',
      subjectId: '',
      author: '',
      keywords: '',
      language: 'English'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="bg-gray-900 border-gray-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Add New Resource</CardTitle>
              <CardDescription className="text-gray-400">
                Upload a file or add a link to external resource
              </CardDescription>
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Upload Type Selection */}
          <div className="flex gap-2">
            <Button
              onClick={() => setUploadType('file')}
              variant={uploadType === 'file' ? 'default' : 'outline'}
              className={uploadType === 'file' ? 'bg-blue-600' : 'border-gray-600 text-gray-300'}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload File
            </Button>
            <Button
              onClick={() => setUploadType('link')}
              variant={uploadType === 'link' ? 'default' : 'outline'}
              className={uploadType === 'link' ? 'bg-blue-600' : 'border-gray-600 text-gray-300'}
            >
              <LinkIcon className="w-4 h-4 mr-2" />
              Add Link
            </Button>
          </div>

          {/* File Upload Area */}
          {uploadType === 'file' && (
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-400">Drag and drop files here, or click to browse</p>
              <p className="text-xs text-gray-500 mt-1">Max file size: 50MB</p>
            </div>
          )}

          {/* URL Input for Links */}
          {uploadType === 'link' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Resource URL</label>
              <Input
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                className="bg-gray-800 border-gray-600 text-white"
                placeholder="https://example.com/resource"
              />
            </div>
          )}

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Title *</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-gray-800 border-gray-600 text-white"
                placeholder="Resource title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Resource Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white"
              >
                {resourceTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-gray-800 border-gray-600 text-white"
              rows={3}
              placeholder="Brief description of the resource"
            />
          </div>

          {/* Categorization */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Branch *</label>
              <select
                value={formData.branchId}
                onChange={(e) => setFormData({ ...formData, branchId: e.target.value, semesterId: '', subjectId: '' })}
                className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white"
              >
                <option value="">Select Branch</option>
                {branches.map(branch => (
                  <option key={branch.id} value={branch.id}>{branch.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Semester *</label>
              <select
                value={formData.semesterId}
                onChange={(e) => setFormData({ ...formData, semesterId: e.target.value, subjectId: '' })}
                className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white"
                disabled={!formData.branchId}
              >
                <option value="">Select Semester</option>
                {availableSemesters.map(semester => (
                  <option key={semester.id} value={semester.id}>{semester.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Subject *</label>
              <select
                value={formData.subjectId}
                onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
                className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white"
                disabled={!formData.semesterId}
              >
                <option value="">Select Subject</option>
                {availableSubjects.map(subject => (
                  <option key={subject.id} value={subject.id}>{subject.title}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Author/Source</label>
              <Input
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="bg-gray-800 border-gray-600 text-white"
                placeholder="Author or source name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
              <select
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                className="w-full bg-gray-800 border border-gray-600 rounded-md px-3 py-2 text-white"
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Keywords</label>
            <Input
              value={formData.keywords}
              onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
              className="bg-gray-800 border-gray-600 text-white"
              placeholder="keyword1, keyword2, keyword3"
            />
            <p className="text-xs text-gray-500 mt-1">Separate keywords with commas</p>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button
              onClick={handleSave}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={!formData.title || !formData.branchId || !formData.semesterId || !formData.subjectId}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Resource
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="border-gray-600 text-gray-300"
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResourceUploadModal;
