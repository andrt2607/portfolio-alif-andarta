import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Activities from './components/Activities';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
        <Header />
        <main>
          <Hero />
          <About />
          <Experience />
          <Education />
          <Skills />
          <Portfolio />
          <Activities />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;