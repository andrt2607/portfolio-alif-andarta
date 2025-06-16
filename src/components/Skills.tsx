import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Server, PenTool as Tool } from 'lucide-react';
import { portfolioService } from '../lib/supabase';
import type { Skill } from '../types';

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await portfolioService.getSkills();
        setSkills(data);
      } catch (error) {
        console.error('Error fetching skills:', error);
        // Fallback data for demo
        setSkills([
          // Languages
          { id: '1', name: 'JavaScript', category: 'language', proficiency: 95, created_at: '2023-01-01' },
          { id: '2', name: 'TypeScript', category: 'language', proficiency: 90, created_at: '2023-01-01' },
          { id: '3', name: 'Python', category: 'language', proficiency: 88, created_at: '2023-01-01' },
          { id: '4', name: 'Java', category: 'language', proficiency: 85, created_at: '2023-01-01' },
          { id: '5', name: 'Go', category: 'language', proficiency: 80, created_at: '2023-01-01' },
          
          // Frameworks
          { id: '6', name: 'React', category: 'framework', proficiency: 95, created_at: '2023-01-01' },
          { id: '7', name: 'Next.js', category: 'framework', proficiency: 90, created_at: '2023-01-01' },
          { id: '8', name: 'Node.js', category: 'framework', proficiency: 92, created_at: '2023-01-01' },
          { id: '9', name: 'Vue.js', category: 'framework', proficiency: 85, created_at: '2023-01-01' },
          { id: '10', name: 'Django', category: 'framework', proficiency: 82, created_at: '2023-01-01' },
          
          // Tools
          { id: '11', name: 'Docker', category: 'tool', proficiency: 88, created_at: '2023-01-01' },
          { id: '12', name: 'Kubernetes', category: 'tool', proficiency: 85, created_at: '2023-01-01' },
          { id: '13', name: 'AWS', category: 'tool', proficiency: 90, created_at: '2023-01-01' },
          { id: '14', name: 'Git', category: 'tool', proficiency: 95, created_at: '2023-01-01' },
          { id: '15', name: 'Jenkins', category: 'tool', proficiency: 80, created_at: '2023-01-01' },
          
          // Databases
          { id: '16', name: 'PostgreSQL', category: 'database', proficiency: 88, created_at: '2023-01-01' },
          { id: '17', name: 'MongoDB', category: 'database', proficiency: 85, created_at: '2023-01-01' },
          { id: '18', name: 'Redis', category: 'database', proficiency: 82, created_at: '2023-01-01' },
          { id: '19', name: 'MySQL', category: 'database', proficiency: 80, created_at: '2023-01-01' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'language':
        return <Code className="w-6 h-6" />;
      case 'framework':
        return <Server className="w-6 h-6" />;
      case 'database':
        return <Database className="w-6 h-6" />;
      case 'tool':
        return <Tool className="w-6 h-6" />;
      default:
        return <Code className="w-6 h-6" />;
    }
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'language':
        return 'Programming Languages';
      case 'framework':
        return 'Frameworks & Libraries';
      case 'database':
        return 'Databases';
      case 'tool':
        return 'Tools & Technologies';
      default:
        return 'Skills';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'language':
        return 'from-blue-500 to-blue-600';
      case 'framework':
        return 'from-teal-500 to-teal-600';
      case 'database':
        return 'from-purple-500 to-purple-600';
      case 'tool':
        return 'from-orange-500 to-orange-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  if (loading) {
    return (
      <section id="skills" className="py-20 bg-gray-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Technical Skills
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            A comprehensive toolkit of modern technologies and frameworks that enable innovative solution development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {Object.entries(skillsByCategory).map(([category, categorySkills], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="bg-white dark:bg-slate-900 rounded-xl p-8 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${getCategoryColor(category)} text-white`}>
                  {getCategoryIcon(category)}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {getCategoryTitle(category)}
                </h3>
              </div>

              <div className="space-y-6">
                {categorySkills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: skillIndex * 0.1 }}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-900 dark:text-white font-medium">
                        {skill.name}
                      </span>
                      <span className="text-slate-600 dark:text-slate-300 text-sm">
                        {skill.proficiency}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: skillIndex * 0.1 }}
                        className={`h-2 rounded-full bg-gradient-to-r ${getCategoryColor(category)}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
            Core Competencies
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Agile Development',
              'Test-Driven Development',
              'CI/CD Pipelines',
              'Microservices Architecture',
              'RESTful APIs',
              'GraphQL',
              'WebSockets',
              'Performance Optimization',
              'Security Best Practices',
              'Code Review',
              'Technical Leadership',
              'Mentoring'
            ].map((competency, index) => (
              <motion.span
                key={competency}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-full font-medium hover:shadow-lg transition-shadow duration-200"
              >
                {competency}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;