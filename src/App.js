import React, { useState, useEffect } from "react";
import {
  Mail,
  Github,
  Linkedin,
  Menu,
  X,
  ExternalLink,
  Sun,
  Moon,
  Code,
  ShoppingCart,
  Server,
  PenTool,
  MessageCircle,
} from "lucide-react";

// --- Main App Component ---
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // Effect for setting the color theme
  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches &&
      localStorage.getItem("theme") === null
    ) {
      setDarkMode(true);
    } else if (localStorage.getItem("theme") === "dark") {
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, []);

  // Effect for applying the color theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Effect for Google Analytics
  useEffect(() => {
    const scriptId = "google-analytics-script";
    const inlineScriptId = "google-analytics-inline-script";

    // Avoid adding script if it already exists
    if (
      document.getElementById(scriptId) ||
      document.getElementById(inlineScriptId)
    ) {
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = `https://www.googletagmanager.com/gtag/js?id=G-6F70ZE4KD6`;
    script.async = true;
    document.head.appendChild(script);

    const inlineScript = document.createElement("script");
    inlineScript.id = inlineScriptId;
    inlineScript.innerHTML = `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-6F70ZE4KD6');
        `;
    document.head.appendChild(inlineScript);

    return () => {
      const scriptElement = document.getElementById(scriptId);
      if (scriptElement) document.head.removeChild(scriptElement);
      const inlineScriptElement = document.getElementById(inlineScriptId);
      if (inlineScriptElement) document.head.removeChild(inlineScriptElement);
    };
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#services", label: "Services" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      {/* Add custom animation and smooth scrolling styles */}
      <style>{`
                html {
                    scroll-behavior: smooth;
                }
                @keyframes gradient-animation {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animated-gradient {
                    background-size: 200% 200%;
                    animation: gradient-animation 15s ease infinite;
                }
            `}</style>
      <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans leading-normal tracking-tight transition-colors duration-300">
        {/* --- Header --- */}
        <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 shadow-sm">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <a
              href="#home"
              className="text-2xl font-bold text-indigo-600 dark:text-indigo-400"
            >
              Dizaraj Dey
            </a>
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </nav>
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 mr-2"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="z-50"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
          {/* --- Mobile Menu --- */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-0 left-0 w-full h-screen bg-white dark:bg-gray-900 flex flex-col items-center justify-center space-y-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-2xl"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </header>

        <main>
          {/* --- Hero Section --- */}
          <section
            id="home"
            className="min-h-screen flex items-center pt-20 md:pt-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white animated-gradient"
          >
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between z-10">
              <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
                  Hi, I'm <span className="text-yellow-300">Dizaraj Dey</span>
                </h1>
                <p className="text-xl md:text-2xl text-indigo-100 mb-8">
                  A passionate Web Developer & E-commerce Specialist
                  transforming ideas into digital realities.
                </p>
                <div className="flex justify-center md:justify-start space-x-4">
                  <a
                    href="https://github.com/dizaraj"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/20 rounded-full hover:bg-white/40 transition-all duration-300 transform hover:scale-110"
                  >
                    <Github size={24} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/dizaraj-dey/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/20 rounded-full hover:bg-white/40 transition-all duration-300 transform hover:scale-110"
                  >
                    <Linkedin size={24} />
                  </a>
                  <a
                    href="https://wa.me/8801717035081"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/20 rounded-full hover:bg-white/40 transition-all duration-300 transform hover:scale-110"
                  >
                    <MessageCircle size={24} />
                  </a>
                  <a
                    href="mailto:dizaraj@gmail.com"
                    className="p-3 bg-white/20 rounded-full hover:bg-white/40 transition-all duration-300 transform hover:scale-110"
                  >
                    <Mail size={24} />
                  </a>
                </div>
              </div>
              <div className="md:w-1/3">
                <div className="w-64 h-64 md:w-80 md:h-80 mx-auto bg-white/20 rounded-full overflow-hidden shadow-2xl p-2 backdrop-blur-sm">
                  <img
                    src="https://avatars.githubusercontent.com/u/10292716?v=4"
                    alt="Dizaraj Dey"
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://placehold.co/320x320/7c3aed/ffffff?text=DD";
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* --- About Section --- */}
          <section id="about" className="py-20 bg-white dark:bg-gray-800">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold text-center mb-12">About Me</h2>
              <div className="max-w-3xl mx-auto text-center text-lg text-gray-600 dark:text-gray-400 space-y-6">
                <p>
                  I'm a results-driven Manager in E-commerce with a deep passion
                  for web development. My journey in the tech world is fueled by
                  a constant desire to learn and build innovative solutions. I
                  specialize in front-end technologies and love bringing
                  beautiful, functional, and user-friendly websites to life.
                </p>
                <p>
                  Currently, I manage the e-commerce wing for CS Agro Industries
                  Ltd. (brand: Adimela), where I blend my technical skills with
                  business acumen to drive online growth. When I'm not
                  optimizing online stores, I'm diving into code, exploring new
                  frameworks, and building exciting personal projects.
                </p>
              </div>
            </div>
          </section>

          {/* --- Skills Section --- */}
          <SkillsSection />

          {/* --- Services Section --- */}
          <ServicesSection />

          {/* --- Projects Section --- */}
          <ProjectSection />

          {/* --- Contact Section --- */}
          <ContactSection />
        </main>

        {/* --- WhatsApp Chat Button --- */}
        <a
          href="https://wa.me/8801717035081"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-green-500 text-white flex items-center gap-2 px-5 py-3 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-110 z-40"
          aria-label="Chat on WhatsApp"
        >
          <span className="font-semibold">Chat with Me</span>
          <MessageCircle size={24} />
        </a>

        {/* --- Footer --- */}
        <footer className="bg-white dark:bg-gray-800 py-6">
          <div className="container mx-auto px-6 text-center text-gray-600 dark:text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Dizaraj Dey. All Rights
              Reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

// --- Skills Section Component ---
function SkillsSection() {
  const skills = {
    Frontend: [
      "React",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Responsive Design",
    ],
    Backend: ["Node.js", "Express", "REST APIs"],
    "E-commerce": [
      "Platform Management",
      "Digital Marketing",
      "SEO Basics",
      "Analytics",
    ],
    "Tools & Others": ["Git", "GitHub", "VS Code", "npm", "API Integration"],
  };

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">My Skills</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(skills).map(([category, list]) => (
            <div
              key={category}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {list.map((skill) => (
                  <span
                    key={skill}
                    className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Services Section Component ---
function ServicesSection() {
  const services = [
    {
      icon: <Code size={32} className="mb-4 text-indigo-500" />,
      title: "Custom Web Development",
      description:
        "Building responsive, high-performance websites from scratch tailored to your specific needs.",
    },
    {
      icon: <ShoppingCart size={32} className="mb-4 text-indigo-500" />,
      title: "E-commerce Solutions",
      description:
        "Developing and managing online stores to boost your sales and digital presence.",
    },
    {
      icon: <Server size={32} className="mb-4 text-indigo-500" />,
      title: "Website Maintenance",
      description:
        "Providing ongoing support, updates, and optimizations to keep your site running smoothly.",
    },
    {
      icon: <PenTool size={32} className="mb-4 text-indigo-500" />,
      title: "UI/UX & Accessibility",
      description:
        "Focusing on creating intuitive user interfaces and ensuring web accessibility for all users.",
    },
  ];

  return (
    <section id="services" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">What I Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-lg shadow-lg transform hover:-translate-y-2 transition-transform duration-300 flex flex-col items-center"
            >
              {service.icon}
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Project Section Component ---
function ProjectSection() {
  const projects = [
    {
      title: "WhatsApp Chat Pro",
      description:
        "A professional tool to enhance WhatsApp chat functionalities, offering advanced features for power users and businesses.",
      tags: ["React", "Node.js", "Web App"],
      liveUrl: "https://whatsapp-chat-pro.obvoy.com/",
      githubUrl: "https://github.com/dizaraj/whatsapp-chat-pro",
    },
    {
      title: "Color Contrast Analyzer",
      description:
        "An accessibility tool that helps developers and designers ensure their color combinations meet WCAG standards.",
      tags: ["JavaScript", "HTML", "CSS", "Accessibility"],
      liveUrl: "https://dizaraj.github.io/color-contrast-analyzer/",
      githubUrl: "https://github.com/dizaraj/color-contrast-analyzer",
    },
    {
      title: "PixEngine Studio",
      description:
        "A creative agency website showcasing a portfolio of design, branding, and digital marketing services.",
      tags: ["Portfolio", "Agency", "UI/UX"],
      liveUrl: "https://pixengine.studio",
      githubUrl: "",
    },
    {
      title: "Pro2 Interactive",
      description:
        "A corporate site for a digital interactive agency, highlighting their services in marketing and technology.",
      tags: ["Corporate", "Digital Agency", "Marketing"],
      liveUrl: "https://pro2interactive.com",
      githubUrl: "",
    },
    {
      title: "Aaknan",
      description:
        "An e-commerce platform specializing in fashion and apparel, featuring a clean user interface and shopping cart.",
      tags: ["E-commerce", "Fashion", "Retail"],
      liveUrl: "http://aaknan.com",
      githubUrl: "",
    },
    {
      title: "Adimela E-commerce",
      description:
        "The official e-commerce platform for CS Agro Industries Ltd., showcasing a range of food and agricultural products.",
      tags: ["E-commerce", "Business", "Management"],
      liveUrl: "https://csagroind.com/",
      githubUrl: "",
    },
  ];

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">My Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="p-6 flex flex-col h-full">
                <h3 className="text-xl font-bold mb-2 text-indigo-600 dark:text-indigo-400">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                  {project.description}
                </p>
                <div className="mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-300 mr-2 mb-2"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex items-center space-x-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      Live Demo <ExternalLink size={16} className="ml-1" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                    >
                      <Github size={24} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Contact Section Component ---
function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: "", message: "" });

    // MOCK API CALL
    console.log("Form data submitted:", formData);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // This is a simulation. Replace with your actual API endpoint call.
    const mockSuccess = true;

    if (mockSuccess) {
      setStatus({
        type: "success",
        message: "Thank you! Your message has been sent.",
      });
      setFormData({ name: "", email: "", message: "" });
    } else {
      setStatus({
        type: "error",
        message: "Oops! Something went wrong. Please try again.",
      });
    }

    setIsLoading(false);
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Get In Touch</h2>
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:ring-indigo-500 focus:border-indigo-500 transition"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows="5"
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:ring-indigo-500 focus:border-indigo-500 transition"
              ></textarea>
            </div>
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 dark:disabled:bg-indigo-800 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
          {status.message && (
            <div
              className={`mt-4 text-center p-3 rounded-md ${
                status.type === "success"
                  ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                  : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
              }`}
            >
              {status.message}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}