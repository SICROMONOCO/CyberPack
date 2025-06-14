import React, { useState, useEffect } from 'react';
import { mockResourcesData } from '@/data/mockResourcesData';
import SubjectCard from "./SubjectCard";

const SubjectsPage = () => {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    // Extract subjects from mockResourcesData
    const extractedSubjects = mockResourcesData.flatMap(branch =>
      branch.semesters.flatMap(semester =>
        semester.subjects.map(subject => ({
          ...subject,
          branchName: branch.name,
          branchId: branch.id,
          semesterName: semester.name,
          semesterId: semester.id,
        }))
      )
    );
    setSubjects(extractedSubjects);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto p-6 space-y-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Subjects
        </h1>
        <div className="space-y-2">
          {subjects.map((subject) => (
            <div key={subject.id} className="mb-3">
              <SubjectCard subject={subject} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubjectsPage;
