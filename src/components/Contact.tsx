import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, CheckCircle, AlertCircle } from 'lucide-react';
import { portfolioService } from '../lib/supabase';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await portfolioService.submitContact(data);
      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: 'Email',
      value: 'hello@yourname.com',
      href: 'mailto:hello@yourname.com'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: 'Location',
      value: 'San Francisco, CA',
      href: 'https://maps.google.com'
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="w-6 h-6" />,
      label: 'GitHub',
      href: 'https://github.com',
      color: 'hover:text-gray-900 dark:hover:text-white'
    },
    {
      icon: <Linkedin className="w-6 h-6" />,
      label: 'LinkedIn',
      href: 'https://linkedin.com',
      color: 'hover:text-blue-600'
    },
    {
      icon: <Twitter className="w-6 h-6" />,
      label: 'Twitter',
      href: 'https://twitter.com',
      color: 'hover:text-blue-400'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Let's Work Together
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Ready to collaborate on innovative projects? Whether you're a startup looking for technical leadership 
            or an enterprise seeking scalable solutions, I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Get In Touch
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                I'm always excited to discuss new opportunities, innovative projects, or potential collaborations. 
                Whether you have a specific project in mind or just want to connect, feel free to reach out.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-200 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-200">
                    {info.icon}
                  </div>
                  <div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {info.label}
                    </div>
                    <div className="text-slate-900 dark:text-white font-medium">
                      {info.value}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-8 border-t border-gray-200 dark:border-slate-700">
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                Follow Me
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-gray-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400 ${social.color} transition-colors duration-200`}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-50 dark:bg-slate-800 rounded-xl p-8"
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Send a Message
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Name *
                </label>
                <input
                  {...register('name', { required: 'Name is required' })}
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  placeholder="Your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Email *
                </label>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Subject *
                </label>
                <input
                  {...register('subject', { required: 'Subject is required' })}
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  placeholder="What's this about?"
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Message *
                </label>
                <textarea
                  {...register('message', { required: 'Message is required' })}
                  id="message"
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 resize-none"
                  placeholder="Tell me about your project or how we can collaborate..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-blue-300 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </motion.button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-green-600 dark:text-green-400"
                >
                  <CheckCircle size={18} />
                  <span>Message sent successfully! I'll get back to you soon.</span>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-red-600 dark:text-red-400"
                >
                  <AlertCircle size={18} />
                  <span>Failed to send message. Please try again or contact me directly.</span>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;