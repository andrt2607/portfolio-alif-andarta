import React from "react";
import { Code, Users, Lightbulb, Target } from "lucide-react";
import AccentRevealText from "./core/AccentRevealText";
import Reveal from "./core/Reveal";
import PixelTransition from "./animation/PixelTransition";
const About: React.FC = () => {
  const traits = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Technical Excellence",
      description:
        "Passionate about writing clean, efficient code and staying updated with the latest technologies and best practices.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Collaborative Spirit",
      description:
        "Thrive in team environments, believing that the best solutions come from diverse perspectives and shared knowledge.",
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Innovation Mindset",
      description:
        "Always looking for creative solutions to complex problems and ways to improve existing processes and systems.",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Results Driven",
      description:
        "Focused on delivering high-quality solutions that meet business objectives and exceed client expectations.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            About Me
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            A passionate software engineer with a drive for innovation and a
            commitment to collaborative excellence.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <PixelTransition
              firstContent={
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-blue-500 to-teal-500 p-1">
                  <div className="w-full h-full rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center">
                    <div className="text-center w-full h-full flex flex-col items-center justify-center">
                      <div className="w-full h-full aspect-square mx-auto bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center overflow-hidden rounded-2xl">
                        <img
                          src="/assets/my_image.jpg"
                          alt="Profile"
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover scale-110"
                        />
                        {/* <imgUrl/> */}
                      </div>
                    </div>
                  </div>
                </div>
              }
              secondContent={
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "grid",
                    placeItems: "center",
                    backgroundColor: "#111",
                  }}
                >
                  <p
                    style={{
                      fontWeight: 900,
                      fontSize: "3rem",
                      color: "#ffffff",
                    }}
                  >
                    <span>You can call me Alif!</span>
                  </p>
                </div>
              }
              gridSize={6}
              pixelColor="#ffffff"
              animationStepDuration={0.4}
              className="custom-pixel-card"
            />
          </div>

          <div className="space-y-6">
            <AccentRevealText
              text="I'm a dedicated software engineer with over 3 years of experience building scalable applications and leading cross-functional teams. My passion lies in creating innovative solutions that solve real-world problems while fostering collaborative environments where teams can thrive."
              highlights={[
                "software engineer",
                "3 years of experience",
                "innovative solutions",
              ]}
            />

            <AccentRevealText
              text="Throughout my career, I've had the opportunity to work with startups and established corporations, helping them leverage technology to achieve their business goals. I believe in the power of teamwork and continuous learning to drive innovation and deliver exceptional results."
              highlights={[
                "startups and established corporations",
                "teamwork and continuous learning",
              ]}
              delayMs={150}
            />

            <div className="flex flex-wrap gap-3">
              {[
                "Problem Solving",
                "Leadership",
                "Agile Methodologies",
                "Code Review",
                "Mentoring",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {traits.map((trait) => (
            <div
              key={trait.title}
              className="text-center p-6 rounded-xl bg-gray-50 dark:bg-slate-800 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl mb-4">
                {trait.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                {trait.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                {trait.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
