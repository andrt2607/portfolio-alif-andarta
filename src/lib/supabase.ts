import type { Project, Experience, Education, Skill, Activity, Contact, Profile } from '../types';
import {
  localProfile,
  localProjects,
  localExperience,
  localEducation,
  localSkills,
  localActivities,
} from './portfolioData';

const localContacts: Contact[] = [];

const sortByCreatedAtDesc = <T extends { created_at: string }>(items: T[]): T[] =>
  [...items].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

const sortByStartDateDesc = <T extends { start_date: string }>(items: T[]): T[] =>
  [...items].sort(
    (a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
  );

const sortByDateDesc = <T extends { date: string }>(items: T[]): T[] =>
  [...items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

const sortByProficiencyDesc = (items: Skill[]): Skill[] =>
  [...items].sort((a, b) => b.proficiency - a.proficiency);

export const portfolioService = {
  async getProjects(): Promise<Project[]> {
    return sortByCreatedAtDesc(localProjects);
  },

  async getFeaturedProjects(): Promise<Project[]> {
    return sortByCreatedAtDesc(localProjects.filter((p) => p.featured)).slice(0, 6);
  },

  async getExperience(): Promise<Experience[]> {
    return sortByStartDateDesc(localExperience);
  },

  async getEducation(): Promise<Education[]> {
    return sortByStartDateDesc(localEducation);
  },

  async getSkills(): Promise<Skill[]> {
    return sortByProficiencyDesc(localSkills);
  },

  async getActivities(): Promise<Activity[]> {
    return sortByDateDesc(localActivities);
  },

  async submitContact(contact: Omit<Contact, 'id' | 'created_at'>): Promise<void> {
    localContacts.push({
      ...contact,
      id: String(localContacts.length + 1),
      created_at: new Date().toISOString(),
    });
  },

  async getProfile(): Promise<Profile[]> {
    return [...localProfile];
  },
};
