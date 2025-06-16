import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Trophy, Heart, Code, Presentation } from 'lucide-react';
import { portfolioService } from '../lib/supabase';
import type { Activity } from '../types';

const Activities: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await portfolioService.getActivities();
        setActivities(data);
      } catch (error) {
        console.error('Error fetching activities:', error);
        // Fallback data for demo
        setActivities([
          {
            id: '1',
            title: 'Global Hackathon Winner',
            description: 'Led a team of 5 developers to win first place at TechGlobal Hackathon 2023 with an innovative AI-powered solution for sustainable agriculture. The project addressed food security challenges using machine learning and IoT sensors.',
            date: '2023-10-15',
            type: 'hackathon',
            created_at: '2023-01-01'
          },
          {
            id: '2',
            title: 'Tech Conference Speaker',
            description: 'Delivered a keynote presentation on "Building Scalable Microservices with Modern JavaScript" at DevCon 2023. Shared insights from real-world implementations and best practices with 500+ attendees.',
            date: '2023-08-22',
            type: 'conference',
            created_at: '2023-01-01'
          },
          {
            id: '3',
            title: 'Open Source Contributor',
            description: 'Active contributor to several open-source projects including React Router, Node.js core modules, and various developer tools. Maintained high code quality standards and mentored new contributors.',
            date: '2023-06-01',
            type: 'project',
            created_at: '2023-01-01'
          },
          {
            id: '4',
            title: 'Code for Good Volunteer',
            description: 'Volunteered 100+ hours developing a web application for a local non-profit organization focused on education accessibility. The platform helped connect 500+ students with learning resources.',
            date: '2023-04-10',
            type: 'volunteer',
            created_at: '2023-01-01'
          },
          {
            id: '5',
            title: 'Tech Mentorship Program',
            description: 'Mentored 12 junior developers through a structured 6-month program, focusing on technical skills, career development, and industry best practices. 90% of mentees received promotions or new opportunities.',
            date: '2023-02-01',
            type: 'other',
            created_at: '2023-01-01'
          },
          {
            id: '6',
            title: 'Startup Weekend Champion',
            description: 'Co-founded and led the technical development of a fintech startup concept during Startup Weekend. The idea advanced to the regional finals and attracted interest from two angel investors.',
            date: '2022-11-18',
            type: 'hackathon',
            created_at: '2023-01-01'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'hackathon':
        return <Trophy className="w-6 h-6" />;
      case 'conference':
        return <Presentation className="w-6 h-6" />;
      case 'volunteer':
        return <Heart className="w-6 h-6" />;
      case 'project':
        return <Code className="w-6 h-6" />;
      default:
        return <Users className="w-6 h-6" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'hackathon':
        return 'from-yellow-500 to-orange-500';
      case 'conference':
        return 'from-blue-500 to-indigo-500';
      case 'volunteer':
        return 'from-pink-500 to-rose-500';
      case 'project':
        return 'from-green-500 to-teal-500';
      default:
        return 'from-purple-500 to-violet-500';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  if (loading) {
    return (
      <section id="activities" className="py-20 bg-gray-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="activities" className="py-20 bg-gray-50 dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Activities & Achievements
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Demonstrating leadership, innovation, and collaborative spirit through community engagement and professional contributions.
          </p>
        </motion.div>

        {activities.length === 0 ? (
          <div className="text-center">
            <div className="bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 rounded-lg p-6">
              <p className="text-blue-800 dark:text-blue-300">
                No activities data found. Please add your activities records.
              </p>
            </div>
          </div>
        ) : (<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-r ${getActivityColor(activity.type)} flex items-center justify-center text-white`}>
                  {getActivityIcon(activity.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {activity.title}
                    </h3>
                    <span className="flex-shrink-0 ml-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium rounded-full capitalize">
                      {activity.type}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300 text-sm mb-3">
                    <Calendar size={14} />
                    <span>{formatDate(activity.date)}</span>
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {activity.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>)}

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          {[
            { number: '15+', label: 'Speaking Engagements', icon: <Presentation className="w-8 h-8" /> },
            { number: '8', label: 'Hackathon Wins', icon: <Trophy className="w-8 h-8" /> },
            { number: '200+', label: 'Volunteer Hours', icon: <Heart className="w-8 h-8" /> },
            { number: '50+', label: 'Developers Mentored', icon: <Users className="w-8 h-8" /> }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="text-center p-6 bg-white dark:bg-slate-900 rounded-xl shadow-lg"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-xl mb-4">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                {stat.number}
              </div>
              <div className="text-slate-600 dark:text-slate-300 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl p-8 text-white"
        >
          <h3 className="text-2xl font-bold mb-4">
            Let's Collaborate on Something Amazing
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            I'm always excited to work on innovative projects, mentor aspiring developers, 
            or contribute to meaningful causes. Let's build something impactful together.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            Get In Touch
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Activities;