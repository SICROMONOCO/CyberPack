import React from 'react';
import { Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Simplified types for props
type Branch = { id: string; name: string };
type Semester = { id: string; name: string };
type Subject = { id: string; title: string };

interface ResourceFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedBranch: string;
  handleBranchChange: (value: string) => void;
  selectedSemester: string;
  handleSemesterChange: (value: string) => void;
  selectedSubject: string;
  setSelectedSubject: (value: string) => void;
  filterType: string;
  setFilterType: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (value: 'asc' | 'desc') => void;
  branches: Branch[];
  semesters: Semester[];
  subjects: Subject[];
}

const ResourceFilters = ({
  searchTerm,
  setSearchTerm,
  selectedBranch,
  handleBranchChange,
  selectedSemester,
  handleSemesterChange,
  selectedSubject,
  setSelectedSubject,
  filterType,
  setFilterType,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  branches,
  semesters,
  subjects,
}: ResourceFiltersProps) => (
  <Card className="bg-gray-950/80 border border-gray-800 shadow-lg p-4 sm:p-6 md:p-10 mb-8">
    <h2 className="text-2xl font-bold text-blue-400 mb-6">Filter Resources</h2>
    <form className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 flex-wrap">
      {/* Search */}
  <div className="flex-1 min-w-[180px]">
        <Label htmlFor="resource-search" className="mb-2 text-white">Search</Label>
        <Input
          id="resource-search"
          placeholder="Search by resource title, description, keywords, or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-gray-900 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all rounded-lg shadow-sm h-12"
        />
      </div>
      {/* Branch Filter */}
  <div className="flex-1 min-w-[180px]">
        <Label className="mb-2 text-white">Branch</Label>
        <Select value={selectedBranch} onValueChange={handleBranchChange}>
    <SelectTrigger className="w-full bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm h-12">
            <SelectValue placeholder="All Branches" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Branches</SelectItem>
            {branches.map(branch => (
              <SelectItem key={branch.id} value={branch.id}>{branch.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/* Semester Filter */}
  <div className="flex-1 min-w-[180px]">
        <Label className="mb-2 text-white">Semester</Label>
        <Select value={selectedSemester} onValueChange={handleSemesterChange} disabled={selectedBranch === 'all'}>
    <SelectTrigger className="w-full bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm h-12">
            <SelectValue placeholder="All Semesters" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Semesters</SelectItem>
            {semesters.map(semester => (
              <SelectItem key={semester.id} value={semester.id}>{semester.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/* Subject Filter */}
  <div className="flex-1 min-w-[180px]">
        <Label className="mb-2 text-white">Subject</Label>
        <Select value={selectedSubject} onValueChange={setSelectedSubject} disabled={selectedSemester === 'all'}>
    <SelectTrigger className="w-full bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm h-12">
            <SelectValue placeholder="All Subjects" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subjects</SelectItem>
            {subjects.map(subject => (
              <SelectItem key={subject.id} value={subject.id}>{subject.title}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/* Type Filter */}
  <div className="flex-1 min-w-[180px]">
        <Label className="mb-2 text-white">Type</Label>
        <Select value={filterType} onValueChange={setFilterType}>
    <SelectTrigger className="w-full bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm h-12">
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
      {/* Sort By Filter */}
      <div className="flex-1 min-w-[180px]">
        <Label className="mb-2 text-white">Sort By</Label>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm">
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
      {/* Sort Order Filter */}
      <div className="flex-1 min-w-[180px]">
        <Label className="mb-2 text-white">Order</Label>
        <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as 'asc' | 'desc')}>
          <SelectTrigger className="w-full bg-gray-900 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm">
            <SelectValue placeholder="Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">Newest First</SelectItem>
            <SelectItem value="asc">Oldest First</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Reset Button */}
      <div className="flex items-end">
        <Button type="button" variant="outline" size="sm" className="w-full md:w-auto h-12" onClick={() => {
          setSearchTerm('');
          handleBranchChange('all');
          handleSemesterChange('all');
          setSelectedSubject('all');
          setFilterType('all');
          setSortBy('date_added');
          setSortOrder('desc');
        }}>
          Reset
        </Button>
      </div>
    </form>
    {/* Active Filters Badges (optional, for consistency) */}
    {/*
    <div className="flex flex-wrap gap-2 mt-4">
      {selectedBranch !== 'all' && <Badge variant="secondary">Branch: {branches.find(b => b.id === selectedBranch)?.name}</Badge>}
      {selectedSemester !== 'all' && <Badge variant="secondary">Semester: {semesters.find(s => s.id === selectedSemester)?.name}</Badge>}
      {selectedSubject !== 'all' && <Badge variant="secondary">Subject: {subjects.find(s => s.id === selectedSubject)?.title}</Badge>}
      {filterType !== 'all' && <Badge variant="secondary">Type: {filterType}</Badge>}
      {sortBy !== 'date_added' && <Badge variant="secondary">Sort: {sortBy}</Badge>}
      {sortOrder !== 'desc' && <Badge variant="secondary">Order: {sortOrder === 'asc' ? 'Oldest' : 'Newest'}</Badge>}
      {searchTerm && <Badge variant="secondary">Search: {searchTerm}</Badge>}
    </div>
    */}
  </Card>
);

export default ResourceFilters;
