
import React, { useMemo } from 'react';
import { BookOpen, Eye } from 'lucide-react';
import { mockResourcesData } from '@/data/mockResourcesData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SubjectCard from './SubjectCard';

const SubjectsPage = () => {
  // Use the CMS-managed resource data for branches, as this includes brochure links
  const branches = mockResourcesData;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
          Academic Branches & Subjects
        </h1>
        <div className="flex flex-col gap-8">
          {branches.map((branch) => (
            <Card key={branch.id} className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white">{branch.name}</CardTitle>
                  <CardDescription className="text-gray-400">{branch.description}</CardDescription>
                </div>
                {branch.brochure && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-blue-600 text-blue-400"
                    onClick={() => window.open(branch.brochure, '_blank')}
                    aria-label="View Brochure"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View Brochure
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {branch.semesters.map((semester) => (
                  <div key={semester.id} className="mb-4">
                    <h3 className="text-lg text-blue-300 font-semibold mb-2">{semester.name}</h3>
                    <div className="flex flex-col gap-4">
                      {semester.subjects.length === 0 ? (
                        <div className="text-gray-500 italic text-sm ml-2">No subjects yet.</div>
                      ) : (
                        semester.subjects.map((subject) => (
                          <SubjectCard
                            key={subject.id}
                            subject={{
                              ...subject,
                              branchName: branch.name,
                              semesterName: semester.name,
                            }}
                          />
                        ))
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubjectsPage;

