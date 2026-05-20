import React, { useState } from "react";
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
  const { isFabVisible, scrollToSection } = useScroll();

  const handleNavigate = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsExpanded(false);
  };

  if (!isFabVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/20 -z-10"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {isExpanded && (
        <div className="absolute bottom-16 right-0 flex flex-col gap-3 mb-2">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => handleNavigate(section.id)}
              className="group flex items-center gap-3 bg-white dark:bg-slate-800 text-slate-800 dark:text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-[transform,box-shadow] duration-200 hover:scale-105 border border-slate-200 dark:border-slate-700"
            >
              <div className="text-blue-500 dark:text-blue-400">
                {section.icon}
              </div>
              <span className="font-medium text-sm whitespace-nowrap">
                {section.label}
              </span>
            </button>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        className={`w-14 h-14 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-[transform,background-color] duration-200 hover:scale-110 ${
          isExpanded
            ? "bg-red-500 hover:bg-red-600"
            : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        }`}
        aria-label={isExpanded ? "Close navigation menu" : "Open navigation menu"}
      >
        {isExpanded ? (
          <X size={24} className="text-white" />
        ) : (
          <Menu size={24} className="text-white" />
        )}
      </button>
    </div>
  );
};

export default FloatingActionButton;
