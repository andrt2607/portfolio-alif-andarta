import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, Award } from 'lucide-react';
import { portfolioService } from '../lib/supabase';
import type { Education as EducationType } from '../types';

const Education: React.FC = () => {
  const [education, setEducation] = useState<EducationType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const data = await portfolioService.getEducation();
        setEducation(data);
      } catch (error) {
        console.error('Error fetching education:', error);
        // Fallback data for demo
        setEducation([
          {
            id: '1',
            institution: 'Stanford University',
            degree: 'Master of Science',
            field: 'Computer Science',
            start_date: '2017-09-01',
            end_date: '2019-06-01',
            description: 'Specialized in Machine Learning and Distributed Systems. Thesis on scalable microservices architecture.',
            gpa: '3.8',
            created_at: '2023-01-01'
          },
          {
            id: '2',
            institution: 'University of California, Berkeley',
            degree: 'Bachelor of Science',
            field: 'Computer Engineering',
            start_date: '2013-08-01',
            end_date: '2017-05-01',
            description: 'Graduated Magna Cum Laude. Active member of the Engineering Student Council and ACM chapter.',
            gpa: '3.7',
            created_at: '2023-01-01'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  if (loading) {
    return (
      <section id="education" className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="education" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Education
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Academic foundation that shaped my technical expertise and passion for innovation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gray-50 dark:bg-slate-800 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                    {edu.degree}
                  </h3>
                  <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
                    {edu.field}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 font-medium">
                    {edu.institution}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>
                    {formatDate(edu.start_date)} - {edu.end_date ? formatDate(edu.end_date) : 'Present'}
                  </span>
                </div>
                {edu.gpa && (
                  <div className="flex items-center gap-1">
                    <Award size={16} />
                    <span>GPA: {edu.gpa}</span>
                  </div>
                )}
              </div>

              {edu.description && (
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {edu.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            Certifications & Training
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'AWS Certified Solutions Architect',
              'Google Cloud Professional Developer',
              'Certified Kubernetes Administrator',
              'MongoDB Certified Developer',
              'Agile/Scrum Master Certification',
              'React Advanced Patterns'
            ].map((cert, index) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg p-0.5"
              >
                <div className="bg-white dark:bg-slate-900 rounded-lg p-4 h-full">
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                    <span className="text-slate-900 dark:text-white font-medium">
                      {cert}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;