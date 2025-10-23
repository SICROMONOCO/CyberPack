import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface BranchFormProps {
  onChange: (data: any) => void;
}

const BranchForm: React.FC<BranchFormProps> = ({ onChange }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [brochure, setBrochure] = useState('');

  const handleChange = () => {
    onChange({
      branchName: name,
      branchDescription: description,
      branchBrochure: brochure,
    });
  };

  return (
    <form onChange={handleChange} className="space-y-4">
      <h2 className="text-xl font-semibold">Step 1: Add Branch</h2>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="brochure">Brochure</Label>
        <Input type="text" id="brochure" value={brochure} onChange={(e) => setBrochure(e.target.value)} />
      </div>
    </form>
  );
};

export default BranchForm;
