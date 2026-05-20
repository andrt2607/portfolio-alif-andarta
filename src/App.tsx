import React, { lazy, Suspense, useEffect } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ProfileProvider } from "./contexts/ProfileContext";
import { ScrollProvider } from "./contexts/ScrollContext";
import Hero from "./components/Hero";
import HeaderNavCard from "./components/HeaderNavCard";
import FloatingActionButton from "./components/FloatingActionButton";

const About = lazy(() => import("./components/About"));
const Experience = lazy(() => import("./components/Experience"));
const Education = lazy(() => import("./components/Education"));
const Skills = lazy(() => import("./components/Skills"));
const Portfolio = lazy(() => import("./components/Portfolio"));
const Activities = lazy(() => import("./components/Activities"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

const SectionFallback = () => (
  <div className="py-20 flex justify-center" aria-hidden="true">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent" />
  </div>
);

const prefetchSections = () => {
  void import("./components/About");
  void import("./components/Experience");
  void import("./components/Education");
  void import("./components/Skills");
  void import("./components/Portfolio");
  void import("./components/Activities");
  void import("./components/Contact");
  void import("./components/Footer");
};

function App() {
  useEffect(() => {
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(prefetchSections);
      return () => window.cancelIdleCallback(id);
    }

    const timer = window.setTimeout(prefetchSections, 500);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <ProfileProvider>
        <ScrollProvider>
          <div className="min-h-screen bg-white dark:bg-slate-900">
            <HeaderNavCard />
            <main>
              <Hero />
              <Suspense fallback={<SectionFallback />}>
                <About />
                <Experience />
                <Education />
                <Skills />
                <Portfolio />
                <Activities />
                <Contact />
              </Suspense>
            </main>
            <Suspense fallback={null}>
              <Footer />
            </Suspense>
            <FloatingActionButton />
          </div>
        </ScrollProvider>
      </ProfileProvider>
    </ThemeProvider>
  );
}

export default App;
