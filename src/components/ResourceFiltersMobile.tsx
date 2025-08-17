import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

type Branch = { id: string; name: string };
type Semester = { id: string; name: string };
type Subject = { id: string; title: string };

interface Props {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  selectedBranch: string;
  handleBranchChange: (v: string) => void;
  selectedSemester: string;
  handleSemesterChange: (v: string) => void;
  selectedSubject: string;
  setSelectedSubject: (v: string) => void;
  filterType: string;
  setFilterType: (v: string) => void;
  sortBy: string;
  setSortBy: (v: string) => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (v: 'asc' | 'desc') => void;
  branches: Branch[];
  semesters: Semester[];
  subjects: Subject[];
}

const ResourceFiltersMobile = (props: Props) => {
  const [open, setOpen] = useState(false);

  const applyAndClose = () => setOpen(false);

  return (
    <>
      {/* Floating button - only on mobile */}
      <div className="fixed bottom-4 right-4 z-50 md:hidden">
        <Button onClick={() => setOpen(true)} className="rounded-full px-4 py-3 shadow-lg" variant="default">
          Filters
        </Button>
      </div>

      {/* Sheet / modal */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />

          <div className="absolute bottom-0 left-0 right-0 bg-gray-900 rounded-t-xl p-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Filters</h3>
              <Button variant="outline" size="sm" onClick={() => setOpen(false)}>Close</Button>
            </div>

            <Card className="bg-transparent border-0 p-0">
              <div className="space-y-4">
                <div>
                  <Label className="mb-2 text-white">Search</Label>
                  <Input value={props.searchTerm} onChange={(e) => props.setSearchTerm(e.target.value)} className="h-12 bg-gray-900" />
                </div>

                <div>
                  <Label className="mb-2 text-white">Branch</Label>
                  <Select value={props.selectedBranch} onValueChange={props.handleBranchChange}>
                    <SelectTrigger className="w-full h-12 bg-gray-900" aria-label="Branch">
                      <SelectValue placeholder="All Branches" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Branches</SelectItem>
                      {props.branches.map(b => <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-2 text-white">Semester</Label>
                  <Select value={props.selectedSemester} onValueChange={props.handleSemesterChange}>
                    <SelectTrigger className="w-full h-12 bg-gray-900" aria-label="Semester">
                      <SelectValue placeholder="All Semesters" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Semesters</SelectItem>
                      {props.semesters.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-2 text-white">Subject</Label>
                  <Select value={props.selectedSubject} onValueChange={props.setSelectedSubject}>
                    <SelectTrigger className="w-full h-12 bg-gray-900" aria-label="Subject">
                      <SelectValue placeholder="All Subjects" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Subjects</SelectItem>
                      {props.subjects.map(s => <SelectItem key={s.id} value={s.id}>{s.title}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-2 text-white">Type</Label>
                  <Select value={props.filterType} onValueChange={props.setFilterType}>
                    <SelectTrigger className="w-full h-12 bg-gray-900">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="document">Document</SelectItem>
                      <SelectItem value="presentation">Presentation</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="link">Link</SelectItem>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="exams">Exams</SelectItem>
                      <SelectItem value="disabled">Disabled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-2 text-white">Sort By</Label>
                  <Select value={props.sortBy} onValueChange={props.setSortBy}>
                    <SelectTrigger className="w-full h-12 bg-gray-900">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date_added">Date Added</SelectItem>
                      <SelectItem value="title">Title</SelectItem>
                      <SelectItem value="type">Type</SelectItem>
                      <SelectItem value="author">Author</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-2 text-white">Order</Label>
                  <Select value={props.sortOrder} onValueChange={(v) => props.setSortOrder(v as 'asc' | 'desc')}>
                    <SelectTrigger className="w-full h-12 bg-gray-900">
                      <SelectValue placeholder="Order" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="desc">Newest First</SelectItem>
                      <SelectItem value="asc">Oldest First</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button variant="outline" className="flex-1 h-12" onClick={() => {
                    props.setSearchTerm('');
                    props.handleBranchChange('all');
                    props.handleSemesterChange('all');
                    props.setSelectedSubject('all');
                    props.setFilterType('all');
                    props.setSortBy('date_added');
                    props.setSortOrder('desc');
                  }}>Reset</Button>
                  <Button className="flex-1 h-12" onClick={applyAndClose}>Apply</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </>
  );
};

export default ResourceFiltersMobile;
