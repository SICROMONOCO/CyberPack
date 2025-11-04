
import { supabase } from "@/integrations/supabase/client";

// --- READ-ONLY OPERATIONS FOR VIEW-ONLY SITE ---

export async function getBranchesWithSemestersAndSubjects() {
  const { data: branches, error: branchesError } = await supabase
    .from("branches")
    .select(`
      id, name, description, brochure, created_at,
      semesters (
        id, name, created_at,
        subjects (
          id, title, description, tag, code, credit_hours, instructor, prerequisites, created_at
        )
      )
    `);

  if (branchesError) throw branchesError;
  return branches || [];
}

export async function getResourcesForSubject(subjectId: string) {
  const { data, error } = await supabase
    .from("resources")
    .select("*")
    .eq("subject_id", subjectId);
  // No status filter, so 'disabled' and others are included
  if (error) throw error;
  return data || [];
}

// --- WRITE OPERATIONS FOR ADMIN ---

// Get all branches for selection
export async function getAllBranches() {
  const { data, error } = await supabase
    .from('branches')
    .select('id, name, description')
    .order('name');
  if (error) throw error;
  return data || [];
}

// Get semesters for a specific branch
export async function getSemestersByBranch(branchId: string) {
  const { data, error } = await supabase
    .from('semesters')
    .select('id, name')
    .eq('branch_id', branchId)
    .order('name');
  if (error) throw error;
  return data || [];
}

// Get subjects for a specific semester
export async function getSubjectsBySemester(semesterId: string) {
  const { data, error } = await supabase
    .from('subjects')
    .select('id, title, code')
    .eq('semester_id', semesterId)
    .order('title');
  if (error) throw error;
  return data || [];
}

export async function addBranch(branch: { name: string; description?: string; brochure?: string }) {
  const { data, error } = await supabase.from('branches').insert(branch).select();
  if (error) throw error;
  return data[0];
}

export async function addSemester(semester: { name: string; branch_id: string }) {
  const { data, error } = await supabase.from('semesters').insert(semester).select();
  if (error) throw error;
  return data[0];
}

export async function addSubject(subject: {
  title: string;
  semester_id: string;
  description?: string;
  tag?: string;
  code?: string;
  credit_hours?: number;
  instructor?: string;
  prerequisites?: string[];
}) {
  const { data, error } = await supabase.from('subjects').insert(subject).select();
  if (error) throw error;
  return data[0];
}

export async function addResource(resource: {
  title: string;
  subject_id: string;
  description?: string;
  url?: string;
  file_path?: string;
  type?: string;
  author?: string;
  keywords?: string[];
  file_size?: string;
  language?: string;
  status?: 'active' | 'archived' | 'draft';
}) {
  const { data, error } = await supabase.from('resources').insert(resource).select();
  if (error) throw error;
  return data[0];
}
