
-- Drop existing policies that are causing issues
DROP POLICY IF EXISTS "Allow read for all users" ON public.branches;
DROP POLICY IF EXISTS "Allow editor write" ON public.branches;
DROP POLICY IF EXISTS "Allow editor update" ON public.branches;
DROP POLICY IF EXISTS "Allow editor delete" ON public.branches;

DROP POLICY IF EXISTS "Allow read for all users" ON public.semesters;
DROP POLICY IF EXISTS "Allow editor write" ON public.semesters;
DROP POLICY IF EXISTS "Allow editor update" ON public.semesters;
DROP POLICY IF EXISTS "Allow editor delete" ON public.semesters;

DROP POLICY IF EXISTS "Allow read for all users" ON public.subjects;
DROP POLICY IF EXISTS "Allow editor write" ON public.subjects;
DROP POLICY IF EXISTS "Allow editor update" ON public.subjects;
DROP POLICY IF EXISTS "Allow editor delete" ON public.subjects;

DROP POLICY IF EXISTS "Allow read for all users" ON public.resources;
DROP POLICY IF EXISTS "Allow editor write" ON public.resources;
DROP POLICY IF EXISTS "Allow editor update" ON public.resources;
DROP POLICY IF EXISTS "Allow editor delete" ON public.resources;

-- Create new policies that allow public access for reading and authenticated users for writing
-- BRANCHES
CREATE POLICY "Allow public read access" ON public.branches FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users to insert" ON public.branches FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to update" ON public.branches FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to delete" ON public.branches FOR DELETE USING (auth.role() = 'authenticated');

-- SEMESTERS
CREATE POLICY "Allow public read access" ON public.semesters FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users to insert" ON public.semesters FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to update" ON public.semesters FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to delete" ON public.semesters FOR DELETE USING (auth.role() = 'authenticated');

-- SUBJECTS
CREATE POLICY "Allow public read access" ON public.subjects FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users to insert" ON public.subjects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to update" ON public.subjects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to delete" ON public.subjects FOR DELETE USING (auth.role() = 'authenticated');

-- RESOURCES
CREATE POLICY "Allow public read access" ON public.resources FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users to insert" ON public.resources FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to update" ON public.resources FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated users to delete" ON public.resources FOR DELETE USING (auth.role() = 'authenticated');
