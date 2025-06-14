
import React from 'react';

interface SubjectCardProps {
  subject: {
    id: string;
    title: string;
    description: string;
    tag: string;
    creditHours: number;
    code: string;
    prerequisites: string[];
    instructor: string;
    branchId: string;
    semesterId: string;
    resources: any[];
  };
}

const SubjectCard = ({ subject }: SubjectCardProps) => (
  <div className="bg-gray-800 border border-gray-700 rounded-md p-6 flex flex-col sm:flex-row sm:items-center gap-2 hover:shadow-md transition">
    <div className="flex-1 min-w-0">
      <h2 className="font-semibold text-lg text-white truncate">{subject.title}</h2>
      <p className="text-gray-400 text-sm mt-1 truncate">{subject.description}</p>
    </div>
    <div className="flex gap-4 text-sm mt-2 sm:mt-0">
      <span className="bg-blue-600 text-white px-2 py-1 rounded">Code: {subject.code}</span>
      <span className="bg-purple-700 text-purple-100 px-2 py-1 rounded">{subject.tag}</span>
      <span className="bg-green-700 text-green-100 px-2 py-1 rounded">Hours: {subject.creditHours}</span>
    </div>
  </div>
);

export default SubjectCard;
