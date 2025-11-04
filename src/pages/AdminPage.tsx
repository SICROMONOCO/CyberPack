import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  getAllBranches, 
  getSemestersByBranch, 
  getSubjectsBySemester,
  addBranch, 
  addSemester, 
  addSubject, 
  addResource 
} from '../integrations/supabase/supabaseAcademicApi';

// Type definitions for admin data
interface Branch {
  id: string;
  name: string;
  description?: string;
}

interface Semester {
  id: string;
  name: string;
}

interface Subject {
  id: string;
  title: string;
  code?: string;
}

const AdminPage: React.FC = () => {
  // Mode selection
  const [branchMode, setBranchMode] = useState<'select' | 'create'>('select');
  const [semesterMode, setSemesterMode] = useState<'select' | 'create'>('select');
  const [subjectMode, setSubjectMode] = useState<'select' | 'create'>('select');

  // Existing data lists
  const [branches, setBranches] = useState<Branch[]>([]);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  // Selected IDs
  const [selectedBranchId, setSelectedBranchId] = useState<string>('');
  const [selectedSemesterId, setSelectedSemesterId] = useState<string>('');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('');

  // New item data
  const [newBranch, setNewBranch] = useState({ name: '', description: '', brochure: '' });
  const [newSemester, setNewSemester] = useState({ name: '' });
  const [newSubject, setNewSubject] = useState({
    title: '',
    description: '',
    tag: '',
    code: '',
    credit_hours: '',
    instructor: '',
    prerequisites: ''
  });

  // Resource data
  const [resource, setResource] = useState({
    title: '',
    description: '',
    url: '',
    file_path: '',
    type: '',
    author: '',
    keywords: '',
    file_size: '',
    language: '',
    status: 'active' as 'active' | 'archived' | 'draft'
  });

  // Load branches on mount
  useEffect(() => {
    loadBranches();
  }, []);

  // Load semesters when branch is selected
  useEffect(() => {
    if (selectedBranchId) {
      loadSemesters(selectedBranchId);
    } else {
      setSemesters([]);
      setSelectedSemesterId('');
    }
  }, [selectedBranchId]);

  // Load subjects when semester is selected
  useEffect(() => {
    if (selectedSemesterId) {
      loadSubjects(selectedSemesterId);
    } else {
      setSubjects([]);
      setSelectedSubjectId('');
    }
  }, [selectedSemesterId]);

  const loadBranches = async () => {
    try {
      const data = await getAllBranches();
      setBranches(data);
    } catch (error) {
      console.error('Error loading branches:', error);
      toast.error('Failed to load branches');
    }
  };

  const loadSemesters = async (branchId: string) => {
    try {
      const data = await getSemestersByBranch(branchId);
      setSemesters(data);
    } catch (error) {
      console.error('Error loading semesters:', error);
      toast.error('Failed to load semesters');
    }
  };

  const loadSubjects = async (semesterId: string) => {
    try {
      const data = await getSubjectsBySemester(semesterId);
      setSubjects(data);
    } catch (error) {
      console.error('Error loading subjects:', error);
      toast.error('Failed to load subjects');
    }
  };

  const handleSubmit = async () => {
    try {
      let branchId = selectedBranchId;
      let semesterId = selectedSemesterId;
      let subjectId = selectedSubjectId;

      // Handle branch
      if (branchMode === 'create') {
        if (!newBranch.name) {
          toast.error('Branch name is required');
          return;
        }
        const branch = await addBranch({
          name: newBranch.name,
          description: newBranch.description,
          brochure: newBranch.brochure,
        });
        branchId = branch.id;
      } else if (!selectedBranchId) {
        toast.error('Please select a branch');
        return;
      }

      // Handle semester
      if (semesterMode === 'create') {
        if (!newSemester.name) {
          toast.error('Semester name is required');
          return;
        }
        const semester = await addSemester({
          name: newSemester.name,
          branch_id: branchId,
        });
        semesterId = semester.id;
      } else if (!selectedSemesterId) {
        toast.error('Please select a semester');
        return;
      }

      // Handle subject
      if (subjectMode === 'create') {
        if (!newSubject.title) {
          toast.error('Subject title is required');
          return;
        }
        const creditHours = newSubject.credit_hours ? parseInt(newSubject.credit_hours, 10) : undefined;
        if (creditHours !== undefined && (isNaN(creditHours) || creditHours < 0)) {
          toast.error('Credit hours must be a non-negative number');
          return;
        }
        const prerequisites = (newSubject.prerequisites || '').split(',').map((p: string) => p.trim()).filter(Boolean);
        
        const subject = await addSubject({
          title: newSubject.title,
          semester_id: semesterId,
          description: newSubject.description,
          tag: newSubject.tag,
          code: newSubject.code,
          credit_hours: creditHours,
          instructor: newSubject.instructor,
          prerequisites: prerequisites,
        });
        subjectId = subject.id;
      } else if (!selectedSubjectId) {
        toast.error('Please select a subject');
        return;
      }

      // Add resource
      if (!resource.title) {
        toast.error('Resource title is required');
        return;
      }

      const keywords = (resource.keywords || '').split(',').map((k: string) => k.trim()).filter(Boolean);
      
      await addResource({
        title: resource.title,
        subject_id: subjectId,
        description: resource.description,
        url: resource.url,
        file_path: resource.file_path,
        type: resource.type,
        author: resource.author,
        keywords: keywords,
        file_size: resource.file_size,
        language: resource.language,
        status: resource.status,
      });

      toast.success('Resource added successfully!');
      
      // Reset form
      setResource({
        title: '',
        description: '',
        url: '',
        file_path: '',
        type: '',
        author: '',
        keywords: '',
        file_size: '',
        language: '',
        status: 'active'
      });
      
      // Reload data if new items were created
      if (branchMode === 'create') {
        await loadBranches();
        setNewBranch({ name: '', description: '', brochure: '' });
      }
      if (semesterMode === 'create' && branchId) {
        await loadSemesters(branchId);
        setNewSemester({ name: '' });
      }
      if (subjectMode === 'create' && semesterId) {
        await loadSubjects(semesterId);
        setNewSubject({
          title: '',
          description: '',
          tag: '',
          code: '',
          credit_hours: '',
          instructor: '',
          prerequisites: ''
        });
      }
      
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while adding the resource. Please check your input and try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Add Resource</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Branch Section */}
          <div className="space-y-3">
            <Label>Branch</Label>
            <RadioGroup value={branchMode} onValueChange={(value: any) => setBranchMode(value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="select" id="branch-select" />
                <Label htmlFor="branch-select" className="font-normal">Select existing branch</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="create" id="branch-create" />
                <Label htmlFor="branch-create" className="font-normal">Create new branch</Label>
              </div>
            </RadioGroup>

            {branchMode === 'select' ? (
              <Select value={selectedBranchId} onValueChange={setSelectedBranchId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a branch" />
                </SelectTrigger>
                <SelectContent>
                  {branches.map((branch) => (
                    <SelectItem key={branch.id} value={branch.id}>
                      {branch.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="space-y-2">
                <Input
                  placeholder="Branch name"
                  value={newBranch.name}
                  onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })}
                />
                <Textarea
                  placeholder="Description (optional)"
                  value={newBranch.description}
                  onChange={(e) => setNewBranch({ ...newBranch, description: e.target.value })}
                />
              </div>
            )}
          </div>

          {/* Semester Section */}
          <div className="space-y-3">
            <Label>Semester</Label>
            <RadioGroup value={semesterMode} onValueChange={(value: any) => setSemesterMode(value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="select" id="semester-select" />
                <Label htmlFor="semester-select" className="font-normal">Select existing semester</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="create" id="semester-create" />
                <Label htmlFor="semester-create" className="font-normal">Create new semester</Label>
              </div>
            </RadioGroup>

            {semesterMode === 'select' ? (
              <Select 
                value={selectedSemesterId} 
                onValueChange={setSelectedSemesterId}
                disabled={!selectedBranchId && branchMode === 'select'}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a semester" />
                </SelectTrigger>
                <SelectContent>
                  {semesters.map((semester) => (
                    <SelectItem key={semester.id} value={semester.id}>
                      {semester.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                placeholder="Semester name"
                value={newSemester.name}
                onChange={(e) => setNewSemester({ name: e.target.value })}
              />
            )}
          </div>

          {/* Subject Section */}
          <div className="space-y-3">
            <Label>Subject</Label>
            <RadioGroup value={subjectMode} onValueChange={(value: any) => setSubjectMode(value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="select" id="subject-select" />
                <Label htmlFor="subject-select" className="font-normal">Select existing subject</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="create" id="subject-create" />
                <Label htmlFor="subject-create" className="font-normal">Create new subject</Label>
              </div>
            </RadioGroup>

            {subjectMode === 'select' ? (
              <Select 
                value={selectedSubjectId} 
                onValueChange={setSelectedSubjectId}
                disabled={!selectedSemesterId && semesterMode === 'select'}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.id} value={subject.id}>
                      {subject.code ? `${subject.code} - ` : ''}{subject.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="space-y-2">
                <Input
                  placeholder="Subject title"
                  value={newSubject.title}
                  onChange={(e) => setNewSubject({ ...newSubject, title: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    placeholder="Code (optional)"
                    value={newSubject.code}
                    onChange={(e) => setNewSubject({ ...newSubject, code: e.target.value })}
                  />
                  <Input
                    placeholder="Credit hours (optional)"
                    type="number"
                    value={newSubject.credit_hours}
                    onChange={(e) => setNewSubject({ ...newSubject, credit_hours: e.target.value })}
                  />
                </div>
                <Textarea
                  placeholder="Description (optional)"
                  value={newSubject.description}
                  onChange={(e) => setNewSubject({ ...newSubject, description: e.target.value })}
                />
              </div>
            )}
          </div>

          {/* Resource Section */}
          <div className="space-y-3 border-t pt-6">
            <h3 className="text-lg font-semibold">Resource Details</h3>
            <div className="space-y-2">
              <Label htmlFor="resource-title">Title *</Label>
              <Input
                id="resource-title"
                placeholder="Resource title"
                value={resource.title}
                onChange={(e) => setResource({ ...resource, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resource-description">Description</Label>
              <Textarea
                id="resource-description"
                placeholder="Resource description"
                value={resource.description}
                onChange={(e) => setResource({ ...resource, description: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="resource-url">URL</Label>
                <Input
                  id="resource-url"
                  placeholder="https://..."
                  value={resource.url}
                  onChange={(e) => setResource({ ...resource, url: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="resource-type">Type</Label>
                <Input
                  id="resource-type"
                  placeholder="PDF, Video, etc."
                  value={resource.type}
                  onChange={(e) => setResource({ ...resource, type: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="resource-author">Author</Label>
                <Input
                  id="resource-author"
                  placeholder="Author name"
                  value={resource.author}
                  onChange={(e) => setResource({ ...resource, author: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="resource-language">Language</Label>
                <Input
                  id="resource-language"
                  placeholder="English, etc."
                  value={resource.language}
                  onChange={(e) => setResource({ ...resource, language: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="resource-keywords">Keywords (comma-separated)</Label>
              <Input
                id="resource-keywords"
                placeholder="security, networking, etc."
                value={resource.keywords}
                onChange={(e) => setResource({ ...resource, keywords: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resource-status">Status</Label>
              <Select value={resource.status} onValueChange={(value: any) => setResource({ ...resource, status: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={handleSubmit} className="w-full">
            Add Resource
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPage;
