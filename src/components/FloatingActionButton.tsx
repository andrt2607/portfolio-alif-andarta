import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScroll } from "../contexts/ScrollContext";
import {
  ChevronUp,
  Menu,
  X,
  User,
  Briefcase,
  Code,
  Mail,
  School,
  CalendarCheck,
} from "lucide-react";

interface Section {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const sections: Section[] = [
  { id: "home", label: "Home", icon: <ChevronUp size={20} /> },
  { id: "about", label: "About", icon: <User size={20} /> },
  { id: "education", label: "Education", icon: <School size={20} /> },
  { id: "skills", label: "Skills", icon: <Code size={20} /> },
  { id: "experience", label: "Experience", icon: <Briefcase size={20} /> },
  { id: "portfolio", label: "Portfolio", icon: <Briefcase size={20} /> },
  { id: "activities", label: "Activities", icon: <CalendarCheck size={20} /> },
  { id: "contact", label: "Contact", icon: <Mail size={20} /> },
];

const FloatingActionButton: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { scrollY } = useScroll();
  
  // Show FAB when scrolled down 300px
  const isVisible = scrollY > 300;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setIsExpanded(false);
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Backdrop */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Section Buttons */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            className="absolute bottom-16 right-0 flex flex-col gap-3 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {sections.map((section, index) => (
              <motion.button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="group flex items-center gap-3 bg-white dark:bg-slate-800 text-slate-800 dark:text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-slate-200 dark:border-slate-700"
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-blue-500 dark:text-blue-400">
                  {section.icon}
                </div>
                <span className="font-medium text-sm whitespace-nowrap">
                  {section.label}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        onClick={toggleExpanded}
        className={`w-14 h-14 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center will-change-[transform,opacity] ${
          isExpanded
            ? "bg-red-500 hover:bg-red-600"
            : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isExpanded ? 180 : 0 }}
        transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
      >
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isExpanded ? (
            <X size={24} className="text-white" />
          ) : (
            <Menu size={24} className="text-white" />
          )}
        </motion.div>
      </motion.button>

    </div>
  );
};

export default FloatingActionButton;
