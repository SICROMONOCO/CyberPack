
-- Improve column naming consistency across tables
-- Make column names more descriptive and follow consistent naming conventions

-- Update resources table column names
ALTER TABLE public.resources RENAME COLUMN dateadded TO date_added;
ALTER TABLE public.resources RENAME COLUMN file_url TO file_path;

-- Add missing columns that are commonly expected in resources
ALTER TABLE public.subjects ADD COLUMN IF NOT EXISTS code TEXT;
ALTER TABLE public.subjects ADD COLUMN IF NOT EXISTS credit_hours INTEGER DEFAULT 3;
ALTER TABLE public.subjects ADD COLUMN IF NOT EXISTS instructor TEXT;
ALTER TABLE public.subjects ADD COLUMN IF NOT EXISTS prerequisites TEXT[];

-- Add file_size column to resources for better file management
ALTER TABLE public.resources ADD COLUMN IF NOT EXISTS file_size TEXT;
ALTER TABLE public.resources ADD COLUMN IF NOT EXISTS language TEXT DEFAULT 'English';
ALTER TABLE public.resources ADD COLUMN IF NOT EXISTS last_updated TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Update resources table to have better organization
ALTER TABLE public.resources ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active' CHECK (status IN ('active', 'archived', 'draft'));

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_resources_subject_id ON public.resources(subject_id);
CREATE INDEX IF NOT EXISTS idx_resources_type ON public.resources(type);
CREATE INDEX IF NOT EXISTS idx_resources_date_added ON public.resources(date_added);
CREATE INDEX IF NOT EXISTS idx_subjects_semester_id ON public.subjects(semester_id);
CREATE INDEX IF NOT EXISTS idx_semesters_branch_id ON public.semesters(branch_id);

-- Add updated_at triggers for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.last_updated = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for automatic updated_at
DROP TRIGGER IF EXISTS update_resources_updated_at ON public.resources;
CREATE TRIGGER update_resources_updated_at
    BEFORE UPDATE ON public.resources
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
