import { motion } from "framer-motion";
import { ChevronDown, Mail } from "lucide-react";
import React from "react";
import Typewriter from "typewriter-effect";
import SplitText from "./core/SplitText";

const Hero: React.FC = () => {
  // const { profile, loading, error } = useProfile();
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // console.log("Profile data fullname : ", profile?.fullname);

  // if (loading) {
  //   return <div className="text-center py-20">Loading...</div>;
  // }
  // if (error) {
  //   return (
  //     <div className="text-center py-20 text-red-500">
  //       Failed to load profile.
  //     </div>
  //   );
  // }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full mb-16">
        <div className="text-center overflow-x-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SplitText
              // text={`Hi, I'm ${profile?.fullname || "[Your Name]"}`}
              text={`Hi, I'm Alif Andarta`}
              className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6"
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
              // onLetterAnimationComplete={handleAnimationComplete}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ minHeight: "130" }} // Adjust height as needed
          >
            <Typewriter
              options={{
                loop: true,
                delay: 40,
                cursor: "",
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString(
                    `<p class="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
              Turning creative ideas into reality through code full of innovation, creating solutions that are not only functional, but also attractive.
            </p>`
            //   onInit={(typewriter) => {
            //     typewriter
            //       .typeString(
            //         `<p class="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
            //   ${profile?.description_hero}
            // </p>`
                  )
                  .pauseFor(700)
                  .start();
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("portfolio")}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              View My Work
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("contact")}
              className="px-8 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white font-medium rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <Mail size={18} />
              Get In Touch
            </motion.button>

            {/* <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/resume.pdf"
              download
              className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              <Download size={18} />
              Resume
            </motion.a> */}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-15 max-w-4xl mx-auto"
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                3+
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Years Experience
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                5+
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Projects Completed
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                100%
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Client Satisfaction
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        onClick={() => scrollToSection("about")}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors duration-200"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default Hero;
