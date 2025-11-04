import React, { useState, useEffect } from 'react';
import { BookOpen, FileText, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import SubjectCard from './SubjectCard';
import ProgramCard from './ProgramCard';
import { getBranchesWithSemestersAndSubjects } from "@/integrations/supabase/supabaseAcademicApi";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export type SupabaseBranch = {
  id: string;
  name: string;
  description: string;
  brochure?: string | null;
  semesters: {
    id: string;
    name: string;
    subjects: {
      id: string;
      title: string;
      description?: string;
      tag?: string;
      creditHours?: number;
      code?: string;
      prerequisites?: string[];
      instructor?: string;
    }[];
  }[];
};

interface SubjectsPageProps {
  onSubjectClick?: (subject: any) => void;
}

const SubjectsPage = ({ onSubjectClick }: SubjectsPageProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [selectedTag, setSelectedTag] = useState('all');
  const [subjectsData, setSubjectsData] = useState<{ branches: SupabaseBranch[] }>({ branches: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const apiData = await getBranchesWithSemestersAndSubjects();
        setSubjectsData({ branches: apiData });
      } catch (e) {
        setSubjectsData({ branches: [] });
        console.error(e); 
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // Read query param `branch` to preselect a branch when navigating from ProgramCard
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const branchParam = params.get('branch');
      if (branchParam) {
        setSelectedBranch(branchParam);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const filteredSubjects = subjectsData.branches.flatMap(branch =>
    branch.semesters.flatMap(semester =>
      semester.subjects.filter(subject => {
        const matchesSearch = subject.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (subject.description?.toLowerCase() || '').includes(searchTerm.toLowerCase());
        const matchesBranch = selectedBranch === 'all' || branch.id === selectedBranch;
        const matchesSemester = selectedSemester === 'all' || semester.id === selectedSemester;
        const matchesTag = selectedTag === 'all' || subject.tag === selectedTag;
        return matchesSearch && matchesBranch && matchesSemester && matchesTag;
      }).map(subject => ({
        ...subject,
        branchName: branch.name,
        semesterName: semester.name,
        branchId: branch.id,
        semesterId: semester.id,
        creditHours: (typeof subject.creditHours === "number" ? subject.creditHours : 3),
        tag: subject.tag ?? "",
        description: subject.description ?? "",
        code: subject.code ?? "",
        prerequisites: subject.prerequisites ?? [],
        instructor: subject.instructor ?? "",
      }))
    )
  );

  const allSemesters = subjectsData.branches.flatMap(branch =>
    branch.semesters.map(semester => ({ ...semester, branchName: branch.name }))
  );

  const allTags = [
    ...new Set(
      subjectsData.branches.flatMap(branch =>
        branch.semesters.flatMap(semester =>
          semester.subjects.map(subject => subject.tag).filter(Boolean)
        )
      )
    ),
  ].filter(Boolean);

  // Group filteredSubjects by semesterName
  const groupedBySemester = filteredSubjects.reduce((acc, subject) => {
    const key = `${subject.semesterName} - ${subject.branchName}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(subject);
    return acc;
  }, {} as Record<string, typeof filteredSubjects>);

  if (loading) {
    return <div className="text-center text-gray-400 p-10">Loading subjects from database...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto p-8 space-y-10">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Academic Subjects
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">Explore courses organized by academic branches and semesters</p>
        </div>

        {/* Filters and Search */}
        <Card className="bg-gray-950/80 border border-gray-800 shadow-lg p-6 md:p-10 mb-8">
          <h2 className="text-2xl font-bold text-blue-400 mb-6">Filter Subjects</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 flex-wrap">
            {/* Search */}
            <div className="flex-1 min-w-[180px]">
              <Label htmlFor="subject-search" className="mb-2 text-white">Search</Label>
              <Input
                id="subject-search"
                placeholder="Search by subject title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-900 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all rounded-lg shadow-sm"
              />
            </div>
            {/* Branch Filter */}
            <div className="flex-1 min-w-[180px]">
              <Label className="mb-2 text-white">Branch</Label>
              <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                <SelectTrigger className="w-full bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm">
                  <SelectValue placeholder="All Branches" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Branches</SelectItem>
                  {subjectsData.branches.map(branch => (
                    <SelectItem key={branch.id} value={branch.id}>{branch.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Semester Filter */}
            <div className="flex-1 min-w-[180px]">
              <Label className="mb-2 text-white">Semester</Label>
              <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                <SelectTrigger className="w-full bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm">
                  <SelectValue placeholder="All Semesters" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Semesters</SelectItem>
                  {allSemesters.map(semester => (
                    <SelectItem key={`${semester.branchName}-${semester.id}`} value={semester.id}>
                      {semester.name} ({semester.branchName})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Tag Filter */}
            <div className="flex-1 min-w-[180px]">
              <Label className="mb-2 text-white">Tag</Label>
              <Select value={selectedTag} onValueChange={setSelectedTag}>
                <SelectTrigger className="w-full bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm">
                  <SelectValue placeholder="All Tags" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tags</SelectItem>
                  {allTags.map(tag => (
                    <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Reset Button */}
            <div className="flex items-end">
              <Button type="button" variant="outline" size="sm" className="w-full md:w-auto" onClick={() => { setSearchTerm(''); setSelectedBranch('all'); setSelectedSemester('all'); setSelectedTag('all'); }}>
                Reset
              </Button>
            </div>
          </form>
          {/* Active Filters Badges */}
          <div className="flex flex-wrap gap-2 mt-4">
            {selectedBranch !== 'all' && <Badge variant="secondary">Branch: {subjectsData.branches.find(b => b.id === selectedBranch)?.name}</Badge>}
            {selectedSemester !== 'all' && <Badge variant="secondary">Semester: {allSemesters.find(s => s.id === selectedSemester)?.name}</Badge>}
            {selectedTag !== 'all' && <Badge variant="secondary">Tag: {selectedTag}</Badge>}
            {searchTerm && <Badge variant="secondary">Search: {searchTerm}</Badge>}
          </div>
        </Card>

        {/* Academic Branches Overview */}
        <div className="flex flex-col gap-6 mt-10 mb-14">
          {subjectsData.branches.map(branch => (
            <ProgramCard key={branch.id} branch={branch} />
          ))}
        </div>


        {/* Results */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">
            Found {filteredSubjects.length} subjects
          </h2>

          {/* Grouped Subject Cards by Semester */}
          <div className="space-y-10">
            {Object.entries(groupedBySemester).map(([semesterKey, subjects]) => (
              <div key={semesterKey}>
                <h3 className="text-xl font-bold text-blue-300 mb-4">{semesterKey}</h3>
                <div className="space-y-4">
                  {subjects.map(subject => (
                    <SubjectCard
                      key={`${subject.branchId}-${subject.semesterId}-${subject.id}`}
                      subject={subject}
                      onClick={onSubjectClick}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {filteredSubjects.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="w-20 h-20 text-gray-600 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-400 mb-3">No subjects found</h3>
              <p className="text-lg text-gray-500">Try adjusting your search terms or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectsPage;
