import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BranchForm from '../components/forms/BranchForm';
import SemesterForm from '../components/forms/SemesterForm';
import SubjectForm from '../components/forms/SubjectForm';
import ResourceForm from '../components/forms/ResourceForm';
import { addBranch, addSemester, addSubject, addResource } from '../integrations/supabase/supabaseAcademicApi';

const AdminPage: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({});

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleFormChange = (data: any) => {
    setFormData({ ...formData, ...data });
  };

  const handleSubmit = async () => {
    try {
      const creditHours = formData.subjectCreditHours ? parseInt(formData.subjectCreditHours, 10) : undefined;
      const prerequisites = (formData.subjectPrerequisites || '').split(',').map((p: string) => p.trim());
      const keywords = (formData.resourceKeywords || '').split(',').map((k: string) => k.trim());

      if (creditHours !== undefined && isNaN(creditHours)) {
        toast.error('Credit hours must be a number.');
        return;
      }

      const branch = await addBranch({
        name: formData.branchName,
        description: formData.branchDescription,
        brochure: formData.branchBrochure,
      });
      const semester = await addSemester({
        name: formData.semesterName,
        branch_id: branch.id,
      });
      const subject = await addSubject({
        title: formData.subjectTitle,
        semester_id: semester.id,
        description: formData.subjectDescription,
        tag: formData.subjectTag,
        code: formData.subjectCode,
        credit_hours: creditHours,
        instructor: formData.subjectInstructor,
        prerequisites: prerequisites,
      });
      await addResource({
        title: formData.resourceTitle,
        subject_id: subject.id,
        description: formData.resourceDescription,
        url: formData.resourceUrl,
        file_path: formData.resourceFilePath,
        type: formData.resourceType,
        author: formData.resourceAuthor,
        keywords: keywords,
        file_size: formData.resourceFileSize,
        language: formData.resourceLanguage,
        status: formData.resourceStatus,
      });
      toast.success('Data added successfully!');
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while adding the data. Please check your input and try again.');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <BranchForm onChange={handleFormChange} />;
      case 2:
        return <SemesterForm onChange={handleFormChange} />;
      case 3:
        return <SubjectForm onChange={handleFormChange} />;
      case 4:
        return <ResourceForm onChange={handleFormChange} />;
      default:
        return <BranchForm onChange={handleFormChange} />;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Admin Page</CardTitle>
        </CardHeader>
        <CardContent>
          {renderStep()}
          <div className="flex justify-between mt-4">
            {step > 1 && (
              <Button onClick={prevStep} variant="outline">
                Previous
              </Button>
            )}
            <div className="flex-grow" />
            {step < 4 && (
              <Button onClick={nextStep}>
                Next
              </Button>
            )}
            {step === 4 && (
              <Button onClick={handleSubmit}>
                Submit
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPage;
