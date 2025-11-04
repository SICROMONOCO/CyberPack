import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface SemesterFormProps {
  onChange: (data: any) => void;
}

const SemesterForm: React.FC<SemesterFormProps> = ({ onChange }) => {
  const [name, setName] = useState('');

  const handleChange = () => {
    onChange({ semesterName: name });
  };

  return (
    <form onChange={handleChange} className="space-y-4">
      <h2 className="text-xl font-semibold">Step 2: Add Semester</h2>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
    </form>
  );
};

export default SemesterForm;
