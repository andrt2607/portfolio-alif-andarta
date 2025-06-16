export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  github_url?: string;
  live_url?: string;
  image_url?: string;
  featured: boolean;
  created_at: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  description: string;
  technologies: string[];
  start_date: string;
  end_date?: string;
  location: string;
  created_at: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  start_date: string;
  end_date?: string;
  description?: string;
  gpa?: string;
  created_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'language' | 'framework' | 'tool' | 'database';
  proficiency: number;
  created_at: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'volunteer' | 'hackathon' | 'conference' | 'project' | 'other';
  created_at: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}