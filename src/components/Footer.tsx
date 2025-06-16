import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 dark:bg-black text-white py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Let's Build Something Amazing</h3>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Passionate software engineer dedicated to creating innovative solutions through 
              collaborative teamwork and cutting-edge technologies. Always ready for the next challenge.
            </p>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:hello@yourname.com"
                className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors duration-200"
                aria-label="Email"
              >
                <Mail size={20} />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'About', href: '#about' },
                { label: 'Experience', href: '#experience' },
                { label: 'Skills', href: '#skills' },
                { label: 'Portfolio', href: '#portfolio' },
                { label: 'Contact', href: '#contact' }
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById(link.href.substring(1));
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="text-slate-300 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
            <div className="space-y-3 text-slate-300">
              <div>
                <p className="text-sm">Email</p>
                <a 
                  href="mailto:hello@yourname.com"
                  className="hover:text-white transition-colors duration-200"
                >
                  hello@yourname.com
                </a>
              </div>
              <div>
                <p className="text-sm">Phone</p>
                <a 
                  href="tel:+15551234567"
                  className="hover:text-white transition-colors duration-200"
                >
                  +1 (555) 123-4567
                </a>
              </div>
              <div>
                <p className="text-sm">Location</p>
                <p>San Francisco, CA</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 text-slate-300 mb-4 md:mb-0">
            <span>© {currentYear} Your Name. Made with</span>
            <Heart size={16} className="text-red-500" />
            <span>and lots of ☕</span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-slate-400 text-sm">
              Built with React, TypeScript & Supabase
            </span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors duration-200"
              aria-label="Scroll to top"
            >
              <ArrowUp size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;