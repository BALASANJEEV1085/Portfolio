'use client';

import dynamic from 'next/dynamic';
const Silk = dynamic(() => import('../components/Silk'), { ssr: false });
import Navbar from '../components/Navbar';

import Chatbot from '../components/Chatbot';
import emailjs from '@emailjs/browser';
import { useEffect, useRef, useState, useCallback } from 'react';
import './Home.css';

import {
  FaJava, FaPython, FaHtml5, FaCss3Alt, FaJs, FaReact,
  FaBootstrap, FaGitAlt, FaNodeJs, FaFigma, FaGithub,
  FaProjectDiagram, FaExternalLinkAlt, FaBriefcase,
  FaLinkedin, FaInstagram, FaEnvelope, FaMapMarkerAlt,
  FaFileDownload
} from 'react-icons/fa';
import { SiMongodb, SiMysql, SiExpress, SiJupyter } from 'react-icons/si';

const project1Image = '/assets/project1.png';
const project2Image = '/assets/project2.png';
const project3Image = '/assets/project3.png';
const project4Image = '/assets/project4.png';
const project5Image = '/assets/project5.png';
const astronovaImage = '/assets/astronova.png';
const innovationImage = '/assets/innovation.png';
const internshipPdf = '/assets/internship.pdf';
const resumeFile = '/assets/RESUME.docx';


export default function Home() {
  const revealRefs = useRef([]);
  const formRef = useRef();
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs.sendForm('service_22n6rwk', 'template_e9qn86x', formRef.current, 'bnok1q-2_O6_urEpK')
      .then((result) => {
        setIsSent(true);
        setIsSending(false);
        setShowAlert(true);
        e.target.reset();
        setTimeout(() => {
          setIsSent(false);
          setShowAlert(false);
        }, 5000);
      }, (error) => {
        console.error(error.text);
        setIsSending(false);
        alert("Failed to send message. Please try again.");
      });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('revealed')),
      { threshold: 0.12 }
    );
    revealRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addRef = el => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  const skillCategories = [
    {
      label: 'Languages',
      dir: 'left',
      skills: [
        { name: 'Java', icon: <FaJava /> },
        { name: 'Python', icon: <FaPython /> },
        { name: 'JavaScript', icon: <FaJs /> },
      ],
    },
    {
      label: 'Frontend',
      dir: 'right',
      skills: [
        { name: 'HTML', icon: <FaHtml5 /> },
        { name: 'CSS', icon: <FaCss3Alt /> },
        { name: 'React', icon: <FaReact /> },
        { name: 'Bootstrap', icon: <FaBootstrap /> },
        { name: 'Figma', icon: <FaFigma /> },
      ],
    },
    {
      label: 'Backend & DB',
      dir: 'left',
      skills: [
        { name: 'Node.js', icon: <FaNodeJs /> },
        { name: 'Express.js', icon: <SiExpress /> },
        { name: 'MongoDB', icon: <SiMongodb /> },
        { name: 'MySQL', icon: <SiMysql /> },
      ],
    },
    {
      label: 'Tools',
      dir: 'right',
      skills: [
        { name: 'Git', icon: <FaGitAlt /> },
        { name: 'GitHub', icon: <FaGithub /> },
        { name: 'Jupyter', icon: <SiJupyter /> },
        { name: 'Visual Paradigm', icon: <FaProjectDiagram /> },
      ],
    },
  ];

  const projects = [
    {
      title: "Nandha Notes",
      description: "A study notes-sharing platform that allows students of my college to share and access study materials easily.",
      tags: ["React", "MongoDB", "Node.js", "Express", "Tailwind CSS"],
      image: project1Image,
      liveUrl: "https://nandha-notes.netlify.app",
      githubUrl: "https://github.com/BALASANJEEV1085/NANDHANOTES"
    },
    {
      title: "Sentiment Analysis Dashboard",
      description: "Built a Python-based dashboard to analyze sentiment across large datasets and visualize results in a unified interface.",
      tags: ["Python", "Flask", "Streamlit", "VADER"],
      image: project2Image,
      liveUrl: null,
      githubUrl: "https://github.com/BALASANJEEV1085/Sentiment_analysis_sih"
    },
    {
      title: "SocialPlanet",
      description: "Built a responsive full-stack social media web application with real-time features like posting, liking, and commenting.",
      tags: ["React", "MongoDB", "Node.js", "Express.js"],
      image: project3Image,
      liveUrl: "https://socialsplanet.netlify.app/",
      githubUrl: "https://github.com/BALASANJEEV1085/SocialPlanet"
    },
    {
      title: "Silkworm Classification",
      description: "YOLOv8-based computer vision model to classify silkworms into healthy and grasserie-infected categories, enabling automated disease detection.",
      tags: ["Python", "YOLOv8", "Computer Vision", "PyTorch"],
      image: project4Image,
      isCurrentlyWorking: true,
      githubUrl: "https://github.com/BALASANJEEV1085"
    },
    {
      title: "Thiraimini",
      description: "Modern website for seeking information about movies, TV shows, and ratings.",
      tags: ["HTML", "CSS", "JavaScript"],
      image: project5Image,
      liveUrl: "https://thiraimini.netlify.app/",
      githubUrl: "https://github.com/BALASANJEEV1085/THIRAIMINI"
    }
  ];

  const others = [
    {
      title: "Data Analyst Internship",
      description: "Completed an internship at elrafact technology solutions specializing in Web Scraping and AI Chat Bot development.",
      image: internshipPdf,
      type: "Internship",
      badge: "Completed",
      tags: ["Web Scraping", "AI Bot", "Data Analysis"],
      details: "June 20, 2025 - July 6, 2025",
      link: "https://drive.google.com/file/d/1RlT_1GupqnJUc9WNdJdhyI8XkhiCuvuo/view?usp=sharing",
      label: "View Certificate"
    },
    {
      title: "ASTRANOVA 2K26 Participation",
      description: "Participated in the Webinar event at ASTRANOVA 2K26, a National Level Technical Symposium at CIT Coimbatore.",
      image: astronovaImage,
      type: "Symposium",
      badge: "Jan 2026",
      tags: ["Technical Symposium", "National Level", "CIT"],
      link: "https://drive.google.com/file/d/1_Q12VyhGAJUUrpURRF_mtdOgZtqTua-D/view?usp=sharing",
      label: "View Certificate"
    },
    {
      title: "Nandha's Innovation Day '26",
      description: "Demonstrated 'Sentiment Analysis of comments using VADER Model'.",
      image: innovationImage,
      type: "Award",
      badge: "Feb 2026",
      tags: ["Sentiment Analysis", "VADER", "NLP"],
      link: "https://drive.google.com/file/d/1J10jT11yDA-u_8uMQd0lXupZQXSIuwuT/view?usp=sharing",
      label: "View Award"
    }
  ];

  return (
    <main className="home">
      <Navbar />

      <div className="silk-bg">
        <Silk speed={1.5} scale={0.8} color="#7B7481" noiseIntensity={1.1} rotation={0} />
      </div>

      <div className="home-overlay" />

      <div className="home-content">

        {/* ── HERO ── */}
        <section id="home" className="section-viewport hero-section">
          <div className="hero-inner" ref={addRef}>
            <p className="hero-eyebrow">Hi, I'm</p>
            <h1 className="hero-name">BALASANJEEV C</h1>
            <div className="hero-title-row">
              <span className="title-chip">Full Stack Developer</span>
              <span className="title-sep" />
              <span className="title-chip">ML Engineer</span>
            </div>
            <p className="hero-tagline">
              I craft beautiful, functional, and user‑centered digital experiences.
              Passionate about turning ideas into elegant solutions that make a difference.
            </p>
            <div className="hero-actions">
              <a href="#projects" className="btn-primary">View My Work</a>
              <a href={resumeFile} download="Balasanjeev_Resume.docx" className="btn-ghost">
                <FaFileDownload style={{ marginRight: '8px' }} /> Resume
              </a>
              <a href="#contact" className="btn-ghost">Get in Touch</a>
            </div>

            <div className="hero-socials-row">
              <a href="https://github.com/BALASANJEEV1085" target="_blank" rel="noopener noreferrer" className="hero-social-btn" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/balasanjeev-c-00258b298/" target="_blank" rel="noopener noreferrer" className="hero-social-btn" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
              <a href="https://www.instagram.com/bal_1085" target="_blank" rel="noopener noreferrer" className="hero-social-btn" aria-label="Instagram">
                <FaInstagram />
              </a>
            </div>
          </div>

          <div className="hero-card glass-card" ref={addRef}>
            <div className="stat-row">
              <div className="stat">
                <span className="stat-num">Fresher</span>
                <span className="stat-label">Experience</span>
              </div>
              <div className="stat-divider" />
              <div className="stat">
                <span className="stat-num">10+</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat-divider" />
              <div className="stat">
                <span className="stat-num">16+</span>
                <span className="stat-label">Technologies</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" className="section-viewport content-section">
          <div className="section-inner reveal-block" ref={addRef}>
            <div className="section-heading" style={{ marginBottom: '1.5rem' }}>
              <p className="section-body large-body">Who I am</p>
            </div>
            <p className="section-body">
              I'm a passionate Full Stack Developer and ML Engineer with expertise in building
              modern web applications and machine learning solutions.
            </p>
            <p className="section-body">
              I specialize in developing full-stack applications using MongoDB, Express.js, React,
              and Node.js, while also exploring the frontiers of machine learning and artificial intelligence.
            </p>
            <div className="about-grid-simple">
              <div className="about-row">
                <span className="about-key">Role</span>
                <span className="about-val">Developer</span>
              </div>
              <div className="about-row">
                <span className="about-key">Expertise</span>
                <span className="about-val">Full-Stack & ML</span>
              </div>
              <div className="about-row">
                <span className="about-key">Degree</span>
                <span className="about-val">B.E Computer Science & Engineering</span>
              </div>
              <div className="about-row">
                <span className="about-key">College</span>
                <span className="about-val">Nandha Engineering College</span>
              </div>
              <div className="about-row">
                <span className="about-key">Location</span>
                <span className="about-val">Palani, Tamil Nadu</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section id="skills" className="section-viewport content-section skills-section">
          <div className="skills-container">

            <div className="skills-heading reveal-block" ref={addRef}>
              <p className="section-body large-body">Technical Expertise</p>
            </div>

            {skillCategories.map((cat, ci) => (
              <div className="skill-category reveal-block" key={cat.label} ref={addRef}>
                <span className="category-label">{cat.label}</span>
                <div className="marquee-track">
                  <div className={`marquee-row ${cat.dir === 'left' ? 'marquee-left' : 'marquee-right'}`}>
                    {[...cat.skills, ...cat.skills, ...cat.skills, ...cat.skills].map((skill, i) => (
                      <div key={`${ci}-${i}`} className="skill-capsule">
                        <span className="skill-icon">{skill.icon}</span>
                        <span className="skill-name">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

          </div>
        </section>

        {/* ── PROJECTS (Carousel) ── */}
        <ProjectsCarousel projects={projects} addRef={addRef} />

        {/* ── OTHERS ── */}
        <section id="others" className="section-viewport content-section">
          <div className="section-inner reveal-block" ref={addRef}>
            <p className="section-body large-body">Beyond the code</p>
            <p className="section-body">
              Certifications, symposiums, and professional growth experiences.
            </p>
          </div>
          <OthersCarousel items={others} addRef={addRef} />
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="section-viewport content-section contact-section">
          <div className="contact-wrapper reveal-block" ref={addRef}>

            {/* Left — Info Panel */}
            <div className="contact-info-panel">
              <div className="contact-panel-header">
                <p className="contact-eyebrow">Get In Touch</p>
                <h2 className="contact-heading">Let's build something<br />amazing together</h2>
                <p className="contact-subtext">
                  Ready for collaborations, internship opportunities, or just a friendly hello. Drop me a message and I'll get back to you soon.
                </p>
              </div>

              <div className="contact-response-badge">
                <span className="response-dot" />
                <span>Usually responds within <strong>24 hours</strong></span>
              </div>

              <div className="contact-info-cards">
                <a href="mailto:balasnjeev1085@gmail.com" className="contact-info-card">
                  <div className="info-card-icon"><FaEnvelope /></div>
                  <div className="info-card-text">
                    <span className="info-card-label">Email</span>
                    <p className="info-card-value">balasnjeev1085@gmail.com</p>
                  </div>
                </a>
                <div className="contact-info-card non-link">
                  <div className="info-card-icon"><FaMapMarkerAlt /></div>
                  <div className="info-card-text">
                    <span className="info-card-label">Location</span>
                    <p className="info-card-value">Palani, Tamil Nadu, India</p>
                  </div>
                </div>
              </div>


            </div>

            {/* Right — Form Panel */}
            <div className="contact-form-panel">
              <div className="form-panel-header">
                <p className="form-panel-title">Send a Message</p>
                <p className="form-panel-sub">I read every message personally.</p>
              </div>
              <form onSubmit={sendEmail} className="contact-form-new" ref={(el) => {
                if (el) { addRef(el); formRef.current = el; }
              }}>
                <div className="form-row">
                  <div className="form-field">
                    <label className="form-label">Your Name</label>
                    <input type="text" name="name" placeholder="John Doe" required className="form-input" />
                  </div>
                  <div className="form-field">
                    <label className="form-label">Email Address</label>
                    <input type="email" name="email" placeholder="you@example.com" required className="form-input" />
                  </div>
                </div>
                <div className="form-field">
                  <label className="form-label">Message</label>
                  <textarea name="message" placeholder="Tell me about your project or just say hi..." required className="form-input textarea" rows="6"></textarea>
                </div>
                <button type="submit" disabled={isSending} className="form-submit-btn">
                  {isSending ? (
                    <><span className="spinner" /> Sending...</>
                  ) : isSent ? (
                    <><span>✓</span> Message Sent!</>
                  ) : (
                    <>Send Message <FaEnvelope /></>
                  )}
                </button>
              </form>
            </div>

          </div>
        </section>

        {showAlert && (
          <div className="form-alert">
            <span className="alert-icon">✓</span>
            <div className="alert-content">
              <p className="alert-title">Success!</p>
              <p className="alert-message">Your message has been sent successfully.</p>
            </div>
          </div>
        )}

        {/* ── FOOTER ── */}
        <footer className="home-footer">
          <div className="footer-content">
            <p className="footer-credit">Designed & Built by <span>BALASANJEEV C</span></p>
            <p className="footer-sub">© 2026 All Rights Reserved</p>
          </div>
        </footer>

      </div>
      <Chatbot />
    </main>
  );
}

/* ── Projects Carousel sub-component ──────────────────── */
function ProjectsCarousel({ projects, addRef }) {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState('next'); // 'next' | 'prev'
  const [animating, setAnimating] = useState(false);
  const total = projects.length;

  const goTo = useCallback((next, direction) => {
    if (animating) return;
    setDir(direction);
    setAnimating(true);
    setTimeout(() => {
      setCurrent(next);
      setAnimating(false);
    }, 420);
  }, [animating]);

  const prev = () => goTo((current - 1 + total) % total, 'prev');
  const next = () => goTo((current + 1) % total, 'next');

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const project = projects[current];

  return (
    <section id="projects" className="section-viewport content-section projects-carousel-section">
      <div className="carousel-wrapper reveal-block" ref={addRef}>

        {/* Heading */}
        <div className="projects-heading">
          <p className="section-body large-body">Work I'm proud of</p>
          <p className="carousel-counter">{current + 1} / {total}</p>
        </div>

        {/* Main card area */}
        <div className="carousel-stage">

          {/* Prev arrow */}
          <button className="carousel-arrow carousel-arrow--prev" onClick={prev} aria-label="Previous project">
            <span>&#8249;</span>
          </button>

          {/* Card */}
          <div className={`carousel-card-slot ${animating ? `exit-${dir}` : 'enter'}`}>
            <div className="project-card glass-card">
              <div className="project-image-container">
                <img src={project.image} alt={project.title} className="project-image" />
              </div>
              <div className="project-details">
                <div className="project-info">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                  {project.isCurrentlyWorking && (
                    <span className="work-badge">Currently working on it</span>
                  )}
                  <div className="project-tags">
                    {project.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="project-links">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                  )}
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                    <FaGithub /> GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Next arrow */}
          <button className="carousel-arrow carousel-arrow--next" onClick={next} aria-label="Next project">
            <span>&#8250;</span>
          </button>

        </div>

        {/* Dot indicators */}
        <div className="carousel-dots">
          {projects.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot ${i === current ? 'active' : ''}`}
              onClick={() => goTo(i, i > current ? 'next' : 'prev')}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
/* ── Others Carousel Component ────────────────────────── */
function OthersCarousel({ items, addRef }) {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState('next');
  const [animating, setAnimating] = useState(false);
  const total = items.length;

  const goTo = (nextIdx, direction) => {
    if (animating) return;
    setDir(direction);
    setAnimating(true);
    setTimeout(() => {
      setCurrent(nextIdx);
      setAnimating(false);
    }, 420);
  };

  const prev = () => goTo((current - 1 + total) % total, 'prev');
  const next = () => goTo((current + 1) % total, 'next');

  const item = items[current];

  return (
    <div className="carousel-wrapper reveal-block" ref={addRef} style={{ marginTop: '2rem' }}>
      <div className="projects-heading">
        <p className="carousel-counter">{current + 1} / {total}</p>
      </div>
      <div className="carousel-stage">
        <button className="carousel-arrow carousel-arrow--prev" onClick={prev} aria-label="Previous item">
          <span>&#8249;</span>
        </button>
        <div className={`carousel-card-slot ${animating ? `exit-${dir}` : 'enter'}`}>
          <div className="project-card glass-card">
            <div className="project-image-container">
              {item.link && item.link.includes('drive.google.com') && (item.type === "Internship" || item.title.includes("Engineering")) ? (
                /* Google Drive Embed for live preview for specific multi-page documents */
                <iframe
                  src={item.link.replace('/view', '/preview').replace('/edit', '/preview')}
                  width="100%"
                  height="100%"
                  style={{ border: 'none' }}
                  title={item.title}
                  allow="autoplay"
                />
              ) : (
                <img src={item.image} alt={item.title} className="project-image" />
              )}
            </div>
            <div className="project-details">
              <div className="project-info">
                <h3 className="project-title">{item.title}</h3>
                <p className="project-desc">{item.description}</p>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                  <span className="work-badge" style={{ margin: 0 }}>{item.badge}</span>
                  {item.details && <span className="work-badge" style={{ margin: 0, background: 'rgba(255,255,255,0.05)', color: 'var(--white-55)' }}>{item.details}</span>}
                </div>
                <div className="project-tags">
                  {item.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                </div>
              </div>
              <div className="project-links">
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="project-link">
                  <FaExternalLinkAlt /> {item.label}
                </a>
              </div>
            </div>
          </div>
        </div>
        <button className="carousel-arrow carousel-arrow--next" onClick={next} aria-label="Next item">
          <span>&#8250;</span>
        </button>
      </div>
      <div className="carousel-dots">
        {items.map((_, i) => (
          <button key={i} className={`carousel-dot ${i === current ? 'active' : ''}`} onClick={() => goTo(i, i > current ? 'next' : 'prev')} />
        ))}
      </div>
    </div>
  );
}
