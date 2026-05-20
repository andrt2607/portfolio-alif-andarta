import type {
  Project,
  Experience,
  Education,
  Skill,
  Activity,
  Profile,
} from '../types';

export const localProfile: Profile[] = [
  {
    id: '1',
    fullname: 'Alif Andarta',
    description_hero:
      'Turning creative ideas into reality through code full of innovation, creating solutions that are not only functional, but also attractive.',
    email: 'hello@alifandarta.com',
    x_account: 'https://x.com/',
    github_account: 'https://github.com/andrt2607',
    linkedin_account: 'https://linkedin.com/in/',
    facebook_account: 'https://facebook.com/',
    instagram_account: 'https://instagram.com/',
    discord_account: 'https://discord.com/',
    location_gmap: 'https://maps.google.com/',
    created_at: '2023-01-01',
    updated_at: '2023-01-01',
  },
];

export const localProjects: Project[] = [
  {
    id: '1',
    title: 'Ad1Falcon',
    description:
      'Aplikasi manajemen aktivitas staff',
    technologies: ["react native","angular","express","javascript","postgresql"],
    github_url: 'https://github.com',
    live_url: 'https://example.com',
    image_url:
      'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: false,
    created_at: '2023-06-01',
  },
  {
    id: '2',
    title: 'DMOVE (Digital Modern Service)',
    description:
      'Aplikasi web untuk onboarding nasabah BRIMO Timor Leste',
    technologies: ["nextjs","typescript","graphql","mysql","dotnet"],
    github_url: 'https://github.com',
    live_url: 'https://example.com',
    image_url:
      'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    created_at: '2023-04-01',
  },
  {
    id: '3',
    title: 'Metrodata Academy',
    description:
      'Aplikasi web untuk mendaftar akademi training dan sertifikasi',
    technologies: ["springboot","java","reactjs","javascript","postgresql"],
    github_url: 'https://github.com',
    live_url: 'https://example.com',
    image_url:
      'https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    created_at: '2023-02-01',
  },
  {
    id: '4',
    title: 'PMIS (Project Management Information System)',
    description:
      'Aplikasi manajemen projek vendor untuk Indosat',
    technologies: ["reactjs","express","javascript","postgresql"],
    github_url: 'https://github.com',
    live_url: 'https://example.com',
    image_url:
      'https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    created_at: '2022-12-01',
  },
  {
    id: '5',
    title: 'AMS (Asset Management System)',
    description:
      'Website untuk manajemen asset fisik perusahaan',
    technologies: ["java","springboot","mysql"],
    github_url: 'https://github.com',
    live_url: 'https://example.com',
    image_url:
      'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    created_at: '2022-10-01',
  },
  {
    id: '6',
    title: 'QPC (Quality Process Control)',
    description:
      'Aplikasi untuk checking fraud nasabah Adira',
    technologies: ["react native","vue js","springboot","javascript","java","postgresql"],
    github_url: 'https://github.com',
    live_url: 'https://example.com',
    image_url:
      'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    created_at: '2022-08-01',
  },
  {
    id: '7',
    title: 'MRP Inoac',
    description:
      'MRP (Material Require Planning) adalah bagian dari sistem ERP pada perusahaan INOAC yang berkaitan dengan perencanaan stok produksi/warehouse factory.',
    technologies: ["express","react","typescript","postgresql","monolithic"],
    github_url: 'https://github.com',
    live_url: 'https://example.com',
    image_url:
      'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=800',
    featured: true,
    created_at: '2022-08-01',
  },
];

export const localExperience: Experience[] = [
  {
    id: '1',
    company: 'PT Mitra Integrasi Informatika',
    position: 'Application Developer',
    description:
      'Project Adira as Fullstack Dev, Jalin as QA, Indosat as Fullstack Dev, BRI as Fullstack Dev',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
    start_date: '2022-11-12',
    location: 'APL Tower, Jl. Letjen S. Parman No.28, Tj. Duren Sel., Kec. Grogol petamburan, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11470',
    created_at: '2025-06-17 02:22:47.147866+00',
  },
  {
    id: '2',
    company: 'PT Prima Karya Sarana Sejahtera',
    position: 'Full Stack Web Developer',
    description:
      'Built and maintained enterprise web applications. Implemented automated testing strategies that reduced bugs by 40%. Worked closely with product managers to translate requirements into technical solutions.',
    technologies: ['React', 'Next.js', 'MySQL', 'SQL Server', '.NET Core'],
    start_date: '2025-11-10',
    end_date: '2026-11-10',
    location: 'Menara Brilian Jakarta Selatan Indonesia',
    created_at: '2026-05-20 19:38:47.147866+00',
  },
];

export const localEducation: Education[] = [
  {
    id: '1',
    institution: 'University of Brawijaya',
    degree: 'Bachelor Degree',
    field: 'Informatics Engineering',
    start_date: '2017-08-14',
    end_date: '2021-09-08',
    description:
      'Activities and societies: Pendamping Informatics Orientation 2018, Wakadiv Perlengkapan PORMABA FILKOM 2019, Kadiv Perlengkapan OSPEK TIF (IF ELSE) 2019. Staff, Staff IT Front End Web Turnamen Catur Raja Brawijaya VII',
    gpa: '3,63',
    created_at: '2025-06-21 20:59:32.212757+00',
  },
];

export const localSkills: Skill[] = [
  { id: '1', name: 'JavaScript', category: 'language', proficiency: 95, created_at: '2023-01-01' },
  { id: '2', name: 'TypeScript', category: 'language', proficiency: 90, created_at: '2023-01-01' },
  { id: '3', name: 'Python', category: 'language', proficiency: 88, created_at: '2023-01-01' },
  { id: '4', name: 'Java', category: 'language', proficiency: 85, created_at: '2023-01-01' },
  { id: '5', name: 'Go', category: 'language', proficiency: 80, created_at: '2023-01-01' },
  { id: '6', name: 'React', category: 'framework', proficiency: 95, created_at: '2023-01-01' },
  { id: '7', name: 'Next.js', category: 'framework', proficiency: 90, created_at: '2023-01-01' },
  { id: '8', name: 'Node.js', category: 'framework', proficiency: 92, created_at: '2023-01-01' },
  { id: '9', name: 'Vue.js', category: 'framework', proficiency: 85, created_at: '2023-01-01' },
  { id: '10', name: 'Django', category: 'framework', proficiency: 82, created_at: '2023-01-01' },
  { id: '11', name: 'Docker', category: 'tool', proficiency: 88, created_at: '2023-01-01' },
  { id: '12', name: 'Kubernetes', category: 'tool', proficiency: 85, created_at: '2023-01-01' },
  { id: '13', name: 'AWS', category: 'tool', proficiency: 90, created_at: '2023-01-01' },
  { id: '14', name: 'Git', category: 'tool', proficiency: 95, created_at: '2023-01-01' },
  { id: '15', name: 'Jenkins', category: 'tool', proficiency: 80, created_at: '2023-01-01' },
  { id: '16', name: 'PostgreSQL', category: 'database', proficiency: 88, created_at: '2023-01-01' },
  { id: '17', name: 'MongoDB', category: 'database', proficiency: 85, created_at: '2023-01-01' },
  { id: '18', name: 'Redis', category: 'database', proficiency: 82, created_at: '2023-01-01' },
  { id: '19', name: 'MySQL', category: 'database', proficiency: 80, created_at: '2023-01-01' },
];

export const localActivities: Activity[] = [
  {
    id: '1',
    title: 'IWD Bogor 2024',
    description:
      'IWD is Women Techmakers’ largest annual event campaign where Ambassador host events all around the world during the months of March and April in celebration of this moment.',
    date: '2024-04-20',
    type: 'other',
    created_at: '2025-06-21 22:10:35.109711+00',
  },
  {
    id: '2',
    title: 'Google I/O Extended Bogor 2025',
    description:
      'This event focus on exploring the latest innovations in AI, machine learning, and cloud technologies that are shaping the future.',
    date: '2025-07-19',
    type: 'other',
    created_at: '2025-08-16 22:45:36.399677+00',
  },
  {
    id: '3',
    title: 'Google I/O Extended Bogor 2024',
    description:
      'This year Google I/O Extended Bogor 2024 will be held on Saturday, 27 July 2024 bring Techtropic Summers Hottest Innovations and presenting more than 15 global expert speakers with 6 topics consisting of UI/UX, Android, Flutter, AI/Machine Learning, Cloud and Web.',
    date: '2024-07-27',
    type: 'other',
    created_at: '2025-06-21 22:11:27.528774+00',
  },
  {
    id: '4',
    title: 'DevFest Bogor 2024',
    description:
      'DevFest is a global developer conference hosted by Google Developer Groups (GDGs) worldwide',
    date: '2024-11-09',
    type: 'other',
    created_at: '2025-06-21 22:12:15.966907+00',
  },
];
