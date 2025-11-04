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
      {/* Floating button - only on mobile, above BottomBar/FooterBar */}
      <div
        className="fixed z-50 md:hidden left-1/2 -translate-x-1/2 flex justify-center w-auto"
        style={{ bottom: '4.5rem' }}
      >
        <Button
          onClick={() => setOpen(true)}
          className="rounded-full px-6 py-3 shadow-lg bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold"
          variant="default"
        >
          Filters
        </Button>
      </div>

      {open && (
        <div className="fixed inset-0 z-[999] md:hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-xs mx-auto bg-gray-900 rounded-xl p-4 max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-800">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-white">Filters</h3>
              <Button variant="outline" size="sm" onClick={() => setOpen(false)}>Close</Button>
            </div>
            <Card className="bg-transparent border-0 p-0">
              <div className="space-y-3">
                <div>
                  <Label className="mb-1 text-white text-xs">Search</Label>
                  <Input value={props.searchTerm} onChange={(e) => props.setSearchTerm(e.target.value)} className="h-9 bg-gray-900 text-xs" />
                </div>
                <div>
                  <Label className="mb-1 text-white text-xs">Branch</Label>
                  <Select value={props.selectedBranch} onValueChange={props.handleBranchChange}>
                    <SelectTrigger className="w-full h-9 bg-gray-900 text-xs" aria-label="Branch">
                      <SelectValue placeholder="All Branches" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Branches</SelectItem>
                      {props.branches.map(b => <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="mb-1 text-white text-xs">Semester</Label>
                  <Select value={props.selectedSemester} onValueChange={props.handleSemesterChange}>
                    <SelectTrigger className="w-full h-9 bg-gray-900 text-xs" aria-label="Semester">
                      <SelectValue placeholder="All Semesters" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Semesters</SelectItem>
                      {props.semesters.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="mb-1 text-white text-xs">Subject</Label>
                  <Select value={props.selectedSubject} onValueChange={props.setSelectedSubject}>
                    <SelectTrigger className="w-full h-9 bg-gray-900 text-xs" aria-label="Subject">
                      <SelectValue placeholder="All Subjects" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Subjects</SelectItem>
                      {props.subjects.map(s => <SelectItem key={s.id} value={s.id}>{s.title}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="mb-1 text-white text-xs">Type</Label>
                  <Select value={props.filterType} onValueChange={props.setFilterType}>
                    <SelectTrigger className="w-full h-9 bg-gray-900 text-xs">
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
                  <Label className="mb-1 text-white text-xs">Sort By</Label>
                  <Select value={props.sortBy} onValueChange={props.setSortBy}>
                    <SelectTrigger className="w-full h-9 bg-gray-900 text-xs">
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
                  <Label className="mb-1 text-white text-xs">Order</Label>
                  <Select value={props.sortOrder} onValueChange={(v) => props.setSortOrder(v as 'asc' | 'desc')}>
                    <SelectTrigger className="w-full h-9 bg-gray-900 text-xs">
                      <SelectValue placeholder="Order" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="desc">Newest First</SelectItem>
                      <SelectItem value="asc">Oldest First</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 pt-1">
                  <Button variant="outline" className="flex-1 h-9 text-xs" onClick={() => {
                    props.setSearchTerm('');
                    props.handleBranchChange('all');
                    props.handleSemesterChange('all');
                    props.setSelectedSubject('all');
                    props.setFilterType('all');
                    props.setSortBy('date_added');
                    props.setSortOrder('desc');
                  }}>Reset</Button>
                  <Button className="flex-1 h-9 text-xs" onClick={applyAndClose}>Apply</Button>
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
