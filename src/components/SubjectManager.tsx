
import React, { useState } from "react";
import { Plus, Edit2, Trash2, Save, X, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast";

interface Subject {
  id: string;
  title: string;
  description?: string;
  tag?: string;
}

interface SubjectManagerProps {
  subjects: Subject[];
  onUpdate: (subjects: Subject[]) => void;
  semesterName: string;
}

const SubjectManager: React.FC<SubjectManagerProps> = ({
  subjects,
  onUpdate,
  semesterName,
}) => {
  const [editingSubject, setEditingSubject] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Subject>>({});
  const { toast } = useToast();

  const handleSave = () => {
    let updatedList = [...subjects];
    if (editingSubject === "new") {
      const subject: Subject = {
        id: Date.now().toString(),
        title: form.title || "",
        description: form.description || "",
        tag: form.tag || "",
      };
      updatedList.push(subject);
      toast({ title: "Subject added", description: `Added "${subject.title}" to ${semesterName}` });
    } else {
      updatedList = updatedList.map((s) =>
        s.id === editingSubject ? { ...s, ...form } : s
      );
      toast({ title: "Subject updated", description: `Updated subject "${form.title}"` });
    }
    onUpdate(updatedList);
    setEditingSubject(null);
    setForm({});
  };

  const handleDelete = (id: string) => {
    const updatedList = subjects.filter((s) => s.id !== id);
    onUpdate(updatedList);
    toast({ title: "Subject deleted", description: `Removed subject.` });
  };

  return (
    <Card className="bg-gray-800 border-gray-700 my-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white text-base flex items-center gap-2">
            <BookOpen className="w-4 h-4" /> {semesterName} Subjects
          </CardTitle>
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => {
              setEditingSubject("new");
              setForm({});
            }}
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Subject
          </Button>
        </div>
        <CardDescription className="text-gray-400 text-sm">
          Manage subjects for {semesterName}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {editingSubject && (
          <div className="bg-gray-900 rounded-md p-4 mb-4 flex flex-col gap-2">
            <Input
              placeholder="Subject title"
              className="bg-gray-800 border-gray-600 text-white"
              value={form.title || ""}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <Input
              placeholder="Description"
              className="bg-gray-800 border-gray-600 text-white"
              value={form.description || ""}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
            <Input
              placeholder="Tag"
              className="bg-gray-800 border-gray-600 text-white"
              value={form.tag || ""}
              onChange={(e) => setForm({ ...form, tag: e.target.value })}
            />
            <div className="flex gap-2 mt-2">
              <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={handleSave}>
                <Save className="w-4 h-4 mr-1" /> Save
              </Button>
              <Button
                size="sm"
                className="border-gray-600 text-gray-300"
                variant="outline"
                onClick={() => {
                  setEditingSubject(null);
                  setForm({});
                }}
              >
                <X className="w-4 h-4 mr-1" /> Cancel
              </Button>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2">
          {subjects.length === 0 && (
            <div className="text-gray-400 italic text-sm">No subjects for this semester.</div>
          )}
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className="flex items-center justify-between px-4 py-2 bg-gray-900 rounded-md"
            >
              <div>
                <div className="font-medium text-white">{subject.title}</div>
                <div className="text-gray-400 text-xs">{subject.description}</div>
                {subject.tag && (
                  <div className="inline-block px-2 py-0.5 rounded bg-blue-700 text-xs text-white mt-1">
                    {subject.tag}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="border-gray-600 text-gray-300"
                  onClick={() => {
                    setEditingSubject(subject.id);
                    setForm(subject);
                  }}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="border-red-600 text-red-400 hover:bg-red-600"
                  onClick={() => handleDelete(subject.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectManager;
