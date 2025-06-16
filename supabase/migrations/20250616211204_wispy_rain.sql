/*
  # Portfolio Database Schema

  1. New Tables
    - `projects` - Portfolio projects with details and metadata
    - `experience` - Professional work experience
    - `education` - Educational background and certifications
    - `skills` - Technical skills with proficiency levels
    - `activities` - Activities, achievements, and community involvement
    - `contacts` - Contact form submissions

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access where appropriate
    - Add policies for authenticated admin access

  3. Data Structure
    - All tables include proper indexes for performance
    - Foreign key relationships where applicable
    - Default values and constraints for data integrity
*/

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  technologies text[] DEFAULT '{}',
  github_url text,
  live_url text,
  image_url text,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Public read access for projects
CREATE POLICY "Projects are publicly readable"
  ON projects
  FOR SELECT
  TO public
  USING (true);

-- Admin access for projects (authenticated users can manage)
CREATE POLICY "Authenticated users can manage projects"
  ON projects
  FOR ALL
  TO authenticated
  USING (true);

-- Experience table
CREATE TABLE IF NOT EXISTS experience (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company text NOT NULL,
  position text NOT NULL,
  description text NOT NULL,
  technologies text[] DEFAULT '{}',
  start_date date NOT NULL,
  end_date date,
  location text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE experience ENABLE ROW LEVEL SECURITY;

-- Public read access for experience
CREATE POLICY "Experience is publicly readable"
  ON experience
  FOR SELECT
  TO public
  USING (true);

-- Admin access for experience
CREATE POLICY "Authenticated users can manage experience"
  ON experience
  FOR ALL
  TO authenticated
  USING (true);

-- Education table
CREATE TABLE IF NOT EXISTS education (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  institution text NOT NULL,
  degree text NOT NULL,
  field text NOT NULL,
  start_date date NOT NULL,
  end_date date,
  description text,
  gpa text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE education ENABLE ROW LEVEL SECURITY;

-- Public read access for education
CREATE POLICY "Education is publicly readable"
  ON education
  FOR SELECT
  TO public
  USING (true);

-- Admin access for education
CREATE POLICY "Authenticated users can manage education"
  ON education
  FOR ALL
  TO authenticated
  USING (true);

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL CHECK (category IN ('language', 'framework', 'tool', 'database')),
  proficiency integer NOT NULL CHECK (proficiency >= 0 AND proficiency <= 100),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- Public read access for skills
CREATE POLICY "Skills are publicly readable"
  ON skills
  FOR SELECT
  TO public
  USING (true);

-- Admin access for skills
CREATE POLICY "Authenticated users can manage skills"
  ON skills
  FOR ALL
  TO authenticated
  USING (true);

-- Activities table
CREATE TABLE IF NOT EXISTS activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  date date NOT NULL,
  type text NOT NULL CHECK (type IN ('volunteer', 'hackathon', 'conference', 'project', 'other')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- Public read access for activities
CREATE POLICY "Activities are publicly readable"
  ON activities
  FOR SELECT
  TO public
  USING (true);

-- Admin access for activities
CREATE POLICY "Authenticated users can manage activities"
  ON activities
  FOR ALL
  TO authenticated
  USING (true);

-- Contacts table (form submissions)
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Only authenticated users can read contacts (for admin review)
CREATE POLICY "Only authenticated users can read contacts"
  ON contacts
  FOR SELECT
  TO authenticated
  USING (true);

-- Anyone can submit contact forms
CREATE POLICY "Anyone can submit contact forms"
  ON contacts
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_experience_start_date ON experience(start_date DESC);
CREATE INDEX IF NOT EXISTS idx_education_start_date ON education(start_date DESC);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category);
CREATE INDEX IF NOT EXISTS idx_skills_proficiency ON skills(proficiency DESC);
CREATE INDEX IF NOT EXISTS idx_activities_date ON activities(date DESC);
CREATE INDEX IF NOT EXISTS idx_activities_type ON activities(type);
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers to relevant tables
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_experience_updated_at BEFORE UPDATE ON experience FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_education_updated_at BEFORE UPDATE ON education FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_activities_updated_at BEFORE UPDATE ON activities FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();