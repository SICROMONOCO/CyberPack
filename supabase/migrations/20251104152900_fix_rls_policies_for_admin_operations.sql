-- Fix RLS policies to properly check for authenticated Supabase users
-- The existing policies use `current_user = 'authenticated'` which is a PostgreSQL check
-- We need to use Supabase's auth.uid() to check if the user is authenticated

-- Drop existing policies
DROP POLICY IF EXISTS "Allow editor write" ON public.branches;
DROP POLICY IF EXISTS "Allow editor update" ON public.branches;
DROP POLICY IF EXISTS "Allow editor delete" ON public.branches;

DROP POLICY IF EXISTS "Allow editor write" ON public.semesters;
DROP POLICY IF EXISTS "Allow editor update" ON public.semesters;
DROP POLICY IF EXISTS "Allow editor delete" ON public.semesters;

DROP POLICY IF EXISTS "Allow editor write" ON public.subjects;
DROP POLICY IF EXISTS "Allow editor update" ON public.subjects;
DROP POLICY IF EXISTS "Allow editor delete" ON public.subjects;

DROP POLICY IF EXISTS "Allow editor write" ON public.resources;
DROP POLICY IF EXISTS "Allow editor update" ON public.resources;
DROP POLICY IF EXISTS "Allow editor delete" ON public.resources;

-- Create new policies that properly check for authenticated users using auth.uid()
-- For branches
CREATE POLICY "Allow authenticated users to insert branches" 
  ON public.branches FOR INSERT 
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to update branches" 
  ON public.branches FOR UPDATE 
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to delete branches" 
  ON public.branches FOR DELETE 
  USING (auth.uid() IS NOT NULL);

-- For semesters
CREATE POLICY "Allow authenticated users to insert semesters" 
  ON public.semesters FOR INSERT 
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to update semesters" 
  ON public.semesters FOR UPDATE 
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to delete semesters" 
  ON public.semesters FOR DELETE 
  USING (auth.uid() IS NOT NULL);

-- For subjects
CREATE POLICY "Allow authenticated users to insert subjects" 
  ON public.subjects FOR INSERT 
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to update subjects" 
  ON public.subjects FOR UPDATE 
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to delete subjects" 
  ON public.subjects FOR DELETE 
  USING (auth.uid() IS NOT NULL);

-- For resources
CREATE POLICY "Allow authenticated users to insert resources" 
  ON public.resources FOR INSERT 
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to update resources" 
  ON public.resources FOR UPDATE 
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to delete resources" 
  ON public.resources FOR DELETE 
  USING (auth.uid() IS NOT NULL);
