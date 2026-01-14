import { useEffect, useState } from "react";
import {
  Menu,
  X,
  Github,
  Linkedin,
  Mail,
  Download,
  Code2,
  MonitorSmartphone,
  Database,
  ExternalLink,
  Sun,
  Moon,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import ParticlesBackground from "./components/ParticlesBackground";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const names = [
    "Salman Raju Makireddy",
    "Mobile App Developer",
    "Full Stack Developer",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % names.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      <header>
        <nav className="container">
          <a href="#home" className="logo">
            Salman <span>Raju</span>
          </a>

          <button onClick={toggleMenu} className="menu-button">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
            <button onClick={toggleTheme} className="theme-toggle">
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
        </nav>

        <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
          <a href="#home" onClick={toggleMenu}>
            Home
          </a>
          <a href="#about" onClick={toggleMenu}>
            About
          </a>
          <a href="#skills" onClick={toggleMenu}>
            Skills
          </a>
          <a href="#projects" onClick={toggleMenu}>
            Projects
          </a>
          <a href="#contact" onClick={toggleMenu}>
            Contact
          </a>
          <button onClick={toggleTheme} className="theme-toggle" style={{ margin: '1rem 0 0 1rem', width: 'fit-content', gap: '8px' }}>
            {theme === "light" ? <><Moon size={18} /> Enable Dark Mode</> : <><Sun size={18} /> Enable Light Mode</>}
          </button>
        </div>
      </header>

      <section
        id="home"
        className="hero"
        style={{ position: "relative", overflow: "hidden" }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <ParticlesBackground />
        </div>

        <div className="hero-content">
          <div className="hero-text">
            <h1>
              Hi, I'm{" "}
              <span style={{ color: "var(--color-primary-light)" }}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={names[index]}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      display: "inline-block",
                      color: "var(--color-primary-light)",
                      textShadow: "0 0 20px rgba(99, 102, 241, 0.4)"
                    }}
                  >
                    {names[index]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>
            <h2>Full Stack Developer & App Developer</h2>
            <p>
              I create beautiful and functional websites that deliver
              exceptional user experiences.
            </p>
            <div className="button-group">
              <a
                href="https://drive.google.com/file/d/1Q1AeEpHSaFCKfXEfvWnOMYNhyeo8R5QN/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="button button-primary"
              >
                <Download size={20} />
                Download CV
              </a>
              <a href="#contact" className="button button-outline">
                Contact Me
              </a>
            </div>
          </div>

          <div className="hero-image">
            <img
              src="https://res.cloudinary.com/dqvaejele/image/upload/v1746000775/1746000360711_ird2nm.jpg"
              alt="Professional headshot"
            />
          </div>
        </div>
      </section>

      <section id="about">
        <div className="container">
          <h2>About Me</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                I am a passionate Full Stack Developer and Mobile App Developer
                with a strong foundation in web technologies.I bring together
                technical expertise and creative design thinking to build
                exceptional digital experiences.
              </p>
              <p>
                With experience in both frontend and backend development, I
                specialize in creating responsive, user-friendly applications
                that solve real-world problems. I'm constantly learning and
                exploring new technologies to stay at the forefront of web
                development.
              </p>
            </div>
            <div className="about-cards">
              <div className="about-card">
                <Code2 size={32} />
                <h3>Frontend Development</h3>
                <p>
                  Creating beautiful, responsive user interfaces with modern
                  frameworks
                </p>
              </div>
              <div className="about-card">
                <Database size={32} />
                <h3>Backend Development</h3>
                <p>Building robust server-side applications and APIs</p>
              </div>
              <div className="about-card">
                <MonitorSmartphone size={32} />
                <h3> App Development</h3>
                <p>Designing intuitive and engaging user experiences</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills">
        <div className="container">
          <h2>Skills</h2>
          <div className="skills-grid">
            {[
              "React.js",
              "React Native",
              "Node.js",
              "JavaScript",
              "TypeScript",
              "Python",
              "React Query",
              "Redux toolkit",
              "Context",
              "Zustand",
              "MySQL",
              "Express.js",
              "HTML/CSS",
              "Git",
              "Figma",
              "CI/CD",
              "RESTful APIs",
              "Firebase",
            ].map((skill) => (
              <div key={skill} className="skill-item">
                <p>{skill}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects">
        <div className="container">
          <h2>Featured Projects</h2>
          <div className="projects-grid">
            {[
              {
                title: "Learning Management System",
                description:
                  "A comprehensive LMS with course management, assignments, and progress tracking",
                image:
                  "https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg",
                // link: "https://github.com/salmanraju",
              },
              {
                title: "Bus Booking App",
                description:
                  "Real-time bus booking system with route tracking and seat selection",
                image:
                  "https://images.pexels.com/photos/2402648/pexels-photo-2402648.jpeg",
                // link: "https://github.com/salmanraju",
              },
              {
                title: "CeleKt",
                description:
                  "E-commerce platform for mobile phones with protection plans",
                image:
                  "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg",
                // link: "https://github.com/salmanraju",
              },
              {
                title: "Parents Who Dates",
                description:
                  "Modern dating application with matching algorithm and real-time chat",
                image:
                  "https://images.pexels.com/photos/5082976/pexels-photo-5082976.jpeg",
                // link: "https://github.com/salmanraju",
              },
              {
                title: "Pet Zai",
                description:
                  "Pet care and Pet Services platform with vet consultation features",
                image:
                  "https://images.pexels.com/photos/1404819/pexels-photo-1404819.jpeg",
                link: "https://www.petzai.com/",
              },
              {
                title: "Health Scanner App",
                description:
                  "AI-powered health monitoring and symptom checking application",
                image:
                  "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg",
                // link: "https://github.com/salmanraju",
              },
            ].map((project, index) => (
              <div key={index} className="project-card">
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    View Project <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="container">
          <h2>Get In Touch</h2>
          <div className="contact-content">
            <p>
              I'm always open to new opportunities and collaborations. Feel free
              to reach out!
            </p>
            <div className="social-links">
              <a
                href="http://github.com/Salman-Raj"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <Github size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/makireddy-salman-raju-3a465021a/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <Linkedin size={24} />
              </a>
              <a href="mailto:salman.makireddy@gmail.com" className="social-link">
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <p>&copy; 2024 Salman Raju. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
