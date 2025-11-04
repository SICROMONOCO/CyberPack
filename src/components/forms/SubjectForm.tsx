import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface SubjectFormProps {
  onChange: (data: any) => void;
}

const SubjectForm: React.FC<SubjectFormProps> = ({ onChange }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const [code, setCode] = useState('');
  const [creditHours, setCreditHours] = useState('');
  const [instructor, setInstructor] = useState('');
  const [prerequisites, setPrerequisites] = useState('');

  const handleChange = () => {
    onChange({
      subjectTitle: title,
      subjectDescription: description,
      subjectTag: tag,
      subjectCode: code,
      subjectCreditHours: creditHours,
      subjectInstructor: instructor,
      subjectPrerequisites: prerequisites,
    });
  };

  return (
    <form onChange={handleChange} className="space-y-4">
      <h2 className="text-xl font-semibold">Step 3: Add Subject</h2>
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="tag">Tag</Label>
          <Input type="text" id="tag" value={tag} onChange={(e) => setTag(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="code">Code</Label>
          <Input type="text" id="code" value={code} onChange={(e) => setCode(e.target.value)} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="credit_hours">Credit Hours</Label>
        <Input type="number" id="credit_hours" value={creditHours} onChange={(e) => setCreditHours(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="instructor">Instructor</Label>
        <Input type="text" id="instructor" value={instructor} onChange={(e) => setInstructor(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="prerequisites">Prerequisites</Label>
        <Input type="text" id="prerequisites" value={prerequisites} onChange={(e) => setPrerequisites(e.target.value)} />
      </div>
    </form>
  );
};

export default SubjectForm;
