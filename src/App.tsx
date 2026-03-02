import { ThemeProvider } from "./contexts/ThemeContext";
import { ProfileProvider } from "./contexts/ProfileContext";
import { ScrollProvider } from "./contexts/ScrollContext";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Portfolio from "./components/Portfolio";
import Activities from "./components/Activities";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import HeaderNavCard from "./components/HeaderNavCard";
import FloatingActionButton from "./components/FloatingActionButton";

function App() {
  return (
    <ThemeProvider>
      {/* <TargetCursor spinDuration={2} hideDefaultCursor={true} /> */}
      {/* <SplashCursor /> */}
      <ProfileProvider>
        <ScrollProvider>
          <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
            {/* <Header /> */}
            <HeaderNavCard />
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
            <FloatingActionButton />
          </div>
        </ScrollProvider>
      </ProfileProvider>
    </ThemeProvider>
  );
}

export default App;
