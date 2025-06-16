import { createClient } from '@supabase/supabase-js';
import type { Project, Experience, Education, Skill, Activity, Contact } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database service functions
export const portfolioService = {
  // Projects
  async getProjects(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async getFeaturedProjects(): Promise<Project[]> {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(6);
    
    if (error) throw error;
    return data || [];
  },

  // Experience
  async getExperience(): Promise<Experience[]> {
    const { data, error } = await supabase
      .from('experience')
      .select('*')
      .order('start_date', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // Education
  async getEducation(): Promise<Education[]> {
    const { data, error } = await supabase
      .from('education')
      .select('*')
      .order('start_date', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // Skills
  async getSkills(): Promise<Skill[]> {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('proficiency', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // Activities
  async getActivities(): Promise<Activity[]> {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  // Contact
  async submitContact(contact: Omit<Contact, 'id' | 'created_at'>): Promise<void> {
    const { error } = await supabase
      .from('contacts')
      .insert([contact]);
    
    if (error) throw error;
  }
};