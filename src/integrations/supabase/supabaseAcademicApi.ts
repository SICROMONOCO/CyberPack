
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
