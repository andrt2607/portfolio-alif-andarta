import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import { portfolioService } from '../lib/supabase';
import type { Experience as ExperienceType } from '../types';

const Experience: React.FC = () => {
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const data = await portfolioService.getExperience();
        setExperiences(data);
      } catch (error) {
        console.error('Error fetching experiences:', error);
        // Fallback data for demo
        setExperiences([
          {
            id: '1',
            company: 'Tech Startup Inc.',
            position: 'Senior Software Engineer',
            description: 'Led development of microservices architecture serving 1M+ users. Collaborated with cross-functional teams to deliver high-impact features. Mentored junior developers and established coding standards.',
            technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
            start_date: '2022-01-01',
            end_date: null,
            location: 'San Francisco, CA',
            created_at: '2023-01-01'
          },
          {
            id: '2',
            company: 'Corporate Solutions Ltd.',
            position: 'Full Stack Developer',
            description: 'Built and maintained enterprise web applications. Implemented automated testing strategies that reduced bugs by 40%. Worked closely with product managers to translate requirements into technical solutions.',
            technologies: ['Vue.js', 'Python', 'MongoDB', 'Azure', 'Jenkins'],
            start_date: '2020-03-01',
            end_date: '2021-12-31',
            location: 'New York, NY',
            created_at: '2023-01-01'
          },
          {
            id: '3',
            company: 'Innovation Labs',
            position: 'Software Developer',
            description: 'Developed mobile-first web applications for startup clients. Participated in agile development processes and daily standups. Contributed to open-source projects and internal tools.',
            technologies: ['React Native', 'JavaScript', 'Firebase', 'GraphQL'],
            start_date: '2019-06-01',
            end_date: '2020-02-28',
            location: 'Austin, TX',
            created_at: '2023-01-01'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  if (loading) {
    return (
      <section id="experience" className="py-20 bg-gray-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Professional Experience
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            A journey of continuous learning, innovation, and collaborative success across diverse technical environments.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-800"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } flex-col md:flex-row`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-slate-800 z-10"></div>

                {/* Content */}
                <div className={`w-full md:w-5/12 ml-12 md:ml-0 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                          {exp.position}
                        </h3>
                        <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
                          {exp.company}
                        </h4>
                      </div>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="text-blue-600 dark:text-blue-400"
                      >
                        <ExternalLink size={20} />
                      </motion.div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        <span>
                          {formatDate(exp.start_date)} - {exp.end_date ? formatDate(exp.end_date) : 'Present'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={16} />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;