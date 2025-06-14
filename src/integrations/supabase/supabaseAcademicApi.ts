
import { supabase } from "@/integrations/supabase/client";

// --- BRANCHES ---
export async function getBranchesWithSemestersAndSubjects() {
  // Fetch branches
  const { data: branches, error: branchesError } = await supabase
    .from("branches")
    .select(`
      id, name, description, brochure, created_at,
      semesters (
        id, name, created_at,
        subjects (
          id, title, description, tag, created_at
        )
      )
    `);

  if (branchesError) throw branchesError;
  // The nested query above will get all: branches, semesters, and subjects
  return branches || [];
}

// Branch CRUDs
export async function addBranch(branch: { name: string; description: string; brochure?: string }) {
  const { data, error } = await supabase.from("branches").insert([branch]).select().single();
  if (error) throw error;
  return data;
}
export async function updateBranch(id: string, updates: any) {
  const { data, error } = await supabase.from("branches").update(updates).eq("id", id).select().single();
  if (error) throw error;
  return data;
}
export async function deleteBranch(id: string) {
  const { error } = await supabase.from("branches").delete().eq("id", id);
  if (error) throw error;
}

// --- SEMESTERS ---
export async function addSemester(branchId: string, name: string) {
  const { data, error } = await supabase.from("semesters").insert([{ branch_id: branchId, name }]).select().single();
  if (error) throw error;
  return data;
}
export async function updateSemester(id: string, updates: any) {
  const { data, error } = await supabase.from("semesters").update(updates).eq("id", id).select().single();
  if (error) throw error;
  return data;
}
export async function deleteSemester(id: string) {
  const { error } = await supabase.from("semesters").delete().eq("id", id);
  if (error) throw error;
}

// --- SUBJECTS ---
export async function addSubject(semesterId: string, subject: { title: string; description?: string; tag?: string }) {
  const { data, error } = await supabase
    .from("subjects")
    .insert([{ semester_id: semesterId, ...subject }])
    .select()
    .single();
  if (error) throw error;
  return data;
}
export async function updateSubject(id: string, updates: any) {
  const { data, error } = await supabase.from("subjects").update(updates).eq("id", id).select().single();
  if (error) throw error;
  return data;
}
export async function deleteSubject(id: string) {
  const { error } = await supabase.from("subjects").delete().eq("id", id);
  if (error) throw error;
}

// --- RESOURCES ---
export async function getResourcesForSubject(subjectId: string) {
  const { data, error } = await supabase.from("resources").select("*").eq("subject_id", subjectId);
  if (error) throw error;
  return data || [];
}
export async function addResource(subjectId: string, resource: any) {
  const { data, error } = await supabase.from("resources").insert([{ subject_id: subjectId, ...resource }]).select().single();
  if (error) throw error;
  return data;
}
export async function updateResource(id: string, updates: any) {
  const { data, error } = await supabase.from("resources").update(updates).eq("id", id).select().single();
  if (error) throw error;
  return data;
}
export async function deleteResource(id: string) {
  const { error } = await supabase.from("resources").delete().eq("id", id);
  if (error) throw error;
}
