import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Eye } from "lucide-react";
import { portfolioService } from "../lib/supabase";
import type { Project } from "../types";

const Portfolio: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "featured">("featured");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data =
          filter === "featured"
            ? await portfolioService.getFeaturedProjects()
            : await portfolioService.getProjects();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
        // Fallback data for demo
        setProjects([
          {
            id: "1",
            title: "E-Commerce Platform",
            description:
              "Full-stack e-commerce solution with real-time inventory management, payment processing, and admin dashboard. Built with microservices architecture for scalability.",
            technologies: [
              "React",
              "Node.js",
              "PostgreSQL",
              "Redis",
              "Stripe",
              "Docker",
            ],
            github_url: "https://github.com",
            live_url: "https://example.com",
            image_url:
              "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
            featured: true,
            created_at: "2023-06-01",
          },
          {
            id: "2",
            title: "Task Management App",
            description:
              "Collaborative project management tool with real-time updates, file sharing, and team communication features. Supports agile workflows and sprint planning.",
            technologies: [
              "Vue.js",
              "Express.js",
              "MongoDB",
              "Socket.io",
              "AWS S3",
            ],
            github_url: "https://github.com",
            live_url: "https://example.com",
            image_url:
              "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800",
            featured: true,
            created_at: "2023-04-01",
          },
          {
            id: "3",
            title: "Analytics Dashboard",
            description:
              "Business intelligence dashboard with interactive charts, data visualization, and automated reporting. Processes millions of data points in real-time.",
            technologies: [
              "React",
              "D3.js",
              "Python",
              "FastAPI",
              "ClickHouse",
              "Kubernetes",
            ],
            github_url: "https://github.com",
            live_url: "https://example.com",
            image_url:
              "https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=800",
            featured: true,
            created_at: "2023-02-01",
          },
          {
            id: "4",
            title: "Mobile Banking App",
            description:
              "Secure mobile banking application with biometric authentication, real-time transactions, and comprehensive financial management tools.",
            technologies: [
              "React Native",
              "Node.js",
              "PostgreSQL",
              "JWT",
              "Plaid API",
            ],
            github_url: "https://github.com",
            live_url: "https://example.com",
            image_url:
              "https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=800",
            featured: true,
            created_at: "2022-12-01",
          },
          {
            id: "5",
            title: "AI Content Generator",
            description:
              "Machine learning-powered content generation platform that creates high-quality articles, social media posts, and marketing copy using natural language processing.",
            technologies: [
              "Python",
              "TensorFlow",
              "React",
              "FastAPI",
              "PostgreSQL",
              "OpenAI API",
            ],
            github_url: "https://github.com",
            live_url: "https://example.com",
            image_url:
              "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
            featured: true,
            created_at: "2022-10-01",
          },
          {
            id: "6",
            title: "DevOps Monitoring Suite",
            description:
              "Comprehensive monitoring and alerting platform for containerized applications with custom metrics, log aggregation, and automated incident response.",
            technologies: [
              "Go",
              "Prometheus",
              "Grafana",
              "Kubernetes",
              "ElasticSearch",
              "Docker",
            ],
            github_url: "https://github.com",
            live_url: "https://example.com",
            image_url:
              "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=800",
            featured: true,
            created_at: "2022-08-01",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [filter]);

  if (loading) {
    return (
      <section id="portfolio" className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
            A showcase of innovative solutions and collaborative achievements
            that demonstrate technical excellence and business impact.
          </p>

          {/* Filter Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setFilter("featured")}
              className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
                filter === "featured"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-gray-300 dark:hover:bg-slate-600"
              }`}
            >
              Featured
            </button>
            <button
              onClick={() => setFilter("all")}
              className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
                filter === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-gray-300 dark:hover:bg-slate-600"
              }`}
            >
              All Projects
            </button>
          </div>
        </motion.div>

        {projects.length === 0 ? (
          <div className="text-center">
            <div className="bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 rounded-lg p-6">
              <p className="text-blue-800 dark:text-blue-300">
                No projects found. Please add your projects to the Supabase
                database.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-gray-50 dark:bg-slate-800 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={
                      project.image_url ||
                      "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800"
                    }
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex gap-4">
                      {project.live_url && (
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200"
                        >
                          <Eye size={20} />
                        </motion.a>
                      )}
                      {project.github_url && (
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200"
                        >
                          <Github size={20} />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-medium rounded-full">
                        Featured
                      </span>
                    )}
                  </div>

                  <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium rounded">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium transition-colors duration-200"
                      >
                        <ExternalLink size={14} />
                        Live Demo
                      </a>
                    )}
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 text-sm font-medium transition-colors duration-200"
                      >
                        <Github size={14} />
                        Source
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-slate-600 dark:text-slate-300 mb-6">
            Interested in seeing more of my work or discussing a potential
            collaboration?
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium rounded-lg hover:bg-slate-800 dark:hover:bg-gray-100 transition-colors duration-200"
          >
            <Github size={18} />
            View All Projects on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
