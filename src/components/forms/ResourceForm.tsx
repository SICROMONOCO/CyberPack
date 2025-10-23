import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface ResourceFormProps {
  onChange: (data: any) => void;
}

const ResourceForm: React.FC<ResourceFormProps> = ({ onChange }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [filePath, setFilePath] = useState('');
  const [type, setType] = useState('');
  const [author, setAuthor] = useState('');
  const [keywords, setKeywords] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [language, setLanguage] = useState('');
  const [status, setStatus] = useState('active');

  const handleChange = () => {
    onChange({
      resourceTitle: title,
      resourceDescription: description,
      resourceUrl: url,
      resourceFilePath: filePath,
      resourceType: type,
      resourceAuthor: author,
      resourceKeywords: keywords,
      resourceFileSize: fileSize,
      resourceLanguage: language,
      resourceStatus: status,
    });
  };

  return (
    <form onChange={handleChange} className="space-y-4">
      <h2 className="text-xl font-semibold">Step 4: Add Resource</h2>
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
          <Label htmlFor="url">URL</Label>
          <Input type="text" id="url" value={url} onChange={(e) => setUrl(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="file_path">File Path</Label>
          <Input type="text" id="file_path" value={filePath} onChange={(e) => setFilePath(e.target.value)} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Input type="text" id="type" value={type} onChange={(e) => setType(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="author">Author</Label>
          <Input type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="keywords">Keywords</Label>
        <Input type="text" id="keywords" value={keywords} onChange={(e) => setKeywords(e.target.value)} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="file_size">File Size</Label>
          <Input type="text" id="file_size" value={fileSize} onChange={(e) => setFileSize(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="language">Language</Label>
          <Input type="text" id="language" value={language} onChange={(e) => setLanguage(e.target.value)} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select value={status} onValueChange={setStatus}>
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
    </form>
  );
};

export default ResourceForm;
