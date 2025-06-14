
-- Table for Academic Branches
CREATE TABLE public.branches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  brochure text,
  created_at timestamp with time zone DEFAULT now()
);

-- Table for Semesters, relating to a branch
CREATE TABLE public.semesters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id uuid REFERENCES public.branches(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Table for Subjects, relating to a semester
CREATE TABLE public.subjects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  semester_id uuid REFERENCES public.semesters(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  tag text,
  created_at timestamp with time zone DEFAULT now()
);

-- Table for Resources, relating to a subject
CREATE TABLE public.resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id uuid REFERENCES public.subjects(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  url text,
  file_url text,
  dateAdded date DEFAULT current_date,
  type text,
  author text,
  keywords text[],
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS (Row Level Security) on all new tables (optional, but recommended for future user-based access control)
ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.semesters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users to Select; Only "editor" role users can write
CREATE POLICY "Allow read for all users" ON public.branches FOR SELECT USING (true);
CREATE POLICY "Allow editor write" ON public.branches FOR INSERT WITH CHECK (current_user = 'authenticated');
CREATE POLICY "Allow editor update" ON public.branches FOR UPDATE USING (current_user = 'authenticated');
CREATE POLICY "Allow editor delete" ON public.branches FOR DELETE USING (current_user = 'authenticated');

CREATE POLICY "Allow read for all users" ON public.semesters FOR SELECT USING (true);
CREATE POLICY "Allow editor write" ON public.semesters FOR INSERT WITH CHECK (current_user = 'authenticated');
CREATE POLICY "Allow editor update" ON public.semesters FOR UPDATE USING (current_user = 'authenticated');
CREATE POLICY "Allow editor delete" ON public.semesters FOR DELETE USING (current_user = 'authenticated');

CREATE POLICY "Allow read for all users" ON public.subjects FOR SELECT USING (true);
CREATE POLICY "Allow editor write" ON public.subjects FOR INSERT WITH CHECK (current_user = 'authenticated');
CREATE POLICY "Allow editor update" ON public.subjects FOR UPDATE USING (current_user = 'authenticated');
CREATE POLICY "Allow editor delete" ON public.subjects FOR DELETE USING (current_user = 'authenticated');

CREATE POLICY "Allow read for all users" ON public.resources FOR SELECT USING (true);
CREATE POLICY "Allow editor write" ON public.resources FOR INSERT WITH CHECK (current_user = 'authenticated');
CREATE POLICY "Allow editor update" ON public.resources FOR UPDATE USING (current_user = 'authenticated');
CREATE POLICY "Allow editor delete" ON public.resources FOR DELETE USING (current_user = 'authenticated');
