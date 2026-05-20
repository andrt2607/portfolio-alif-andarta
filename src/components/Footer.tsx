import React from "react";
import { Heart, Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { useProfile } from "../contexts/useProfile";
import { scrollToSection, scrollToTop } from "../lib/scrollToSection";

const Footer: React.FC = () => {
  const { profile, loading, error } = useProfile();
  const currentYear = new Date().getFullYear();

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }
  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load profile.
      </div>
    );
  }

  return (
    <footer className="bg-slate-900 dark:bg-black text-white py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">
              Let's Build Something Amazing
            </h3>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Passionate software engineer dedicated to creating innovative
              solutions through collaborative teamwork and cutting-edge
              technologies. Always ready for the next challenge.
            </p>
            <div className="flex gap-4">
              <a
                href={`${profile?.github_account}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href={`${profile?.linkedin_account}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href={`mailto:${profile?.email}`}
                className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors duration-200"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "About", href: "about" },
                { label: "Experience", href: "experience" },
                { label: "Skills", href: "skills" },
                { label: "Portfolio", href: "portfolio" },
                { label: "Contact", href: "contact" },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(link.href)}
                    className="text-slate-300 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
            <div className="space-y-3 text-slate-300">
              <div>
                <p className="text-sm">Email</p>
                <a
                  href={`mailto:${profile?.email}`}
                  className="hover:text-white transition-colors duration-200"
                >
                  {profile?.email}
                </a>
              </div>
              <div>
                <p className="text-sm">Location</p>
                <p>Jakarta, Indonesia</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 text-slate-300 mb-4 md:mb-0">
            <span>© {currentYear} {profile?.fullname}. Made with</span>
            <Heart size={16} className="text-red-500" />
            <span>and lots of ☕</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400 text-sm">
              Built with React Vite & TypeScript
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors duration-200"
              aria-label="Scroll to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
