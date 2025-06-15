
import React, { useState, useEffect } from 'react';
import { Search, BookOpen, FileText, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import SubjectCard from './SubjectCard';
import { getBranchesWithSemestersAndSubjects } from "@/integrations/supabase/supabaseAcademicApi";

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

const SubjectsPage = () => {
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

  if (loading) {
    return <div className="text-center text-gray-400 p-10">Loading subjects from database...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header - Simplified */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Academic Subjects
          </h1>
          <p className="text-gray-400">Explore courses organized by academic branches and semesters</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-gray-900 rounded-xl p-6 mb-8 border border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search subjects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white"
              />
            </div>

            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white"
            >
              <option value="all">All Branches</option>
              {subjectsData.branches.map(branch => (
                <option key={branch.id} value={branch.id}>{branch.name}</option>
              ))}
            </select>

            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white"
            >
              <option value="all">All Semesters</option>
              {allSemesters.map(semester => (
                <option key={`${semester.branchName}-${semester.id}`} value={semester.id}>
                  {semester.name} ({semester.branchName})
                </option>
              ))}
            </select>

            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white"
            >
              <option value="all">All Tags</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Academic Branches Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {subjectsData.branches.map(branch => (
            <Card key={branch.id} className="bg-gray-900 border-gray-800 hover:border-blue-500 transition-colors">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-400" />
                  {branch.name}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {branch.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Calendar className="w-4 h-4" />
                    {branch.semesters.length} Semesters
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <BookOpen className="w-4 h-4" />
                    {branch.semesters.reduce((total, sem) => total + sem.subjects.length, 0)} Subjects
                  </div>
                  {branch.brochure && (
                    <a
                      href={branch.brochure}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-2 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      View Brochure
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Results */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-white">
            Found {filteredSubjects.length} subjects
          </h2>
        </div>

        {/* Subject Cards */}
        <div className="space-y-4">
          {filteredSubjects.map(subject => (
            <SubjectCard
              key={`${subject.branchId}-${subject.semesterId}-${subject.id}`}
              subject={subject}
            />
          ))}
        </div>

        {filteredSubjects.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No subjects found</h3>
            <p className="text-gray-500">Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectsPage;
