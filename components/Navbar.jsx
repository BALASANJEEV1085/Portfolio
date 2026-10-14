'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Home as HomeIcon, User, Briefcase, PlusCircle, Mail, Rocket
} from 'lucide-react';
import './Navbar.css';

const NAV_LINKS = [
  { name: 'Home', href: '#home', Icon: HomeIcon },
  { name: 'About', href: '#about', Icon: User },
  { name: 'Skills', href: '#skills', Icon: Rocket },
  { name: 'Projects', href: '#projects', Icon: Briefcase },
  { name: 'Others', href: '#others', Icon: PlusCircle },
  { name: 'Contact', href: '#contact', Icon: Mail }
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef(null);

  // Scrollspy
  useEffect(() => {
    const sectionIds = NAV_LINKS.map(link => link.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = sectionIds.indexOf(entry.target.id);
            if (index !== -1) {
              setActiveIndex(index);
              // Update URL hash without causing a jump or adding to history
              const newHash = `#${entry.target.id}`;
              if (window.location.hash !== newHash) {
                window.history.replaceState(null, null, newHash);
              }
            }
          }
        });
      },
      { root: null, rootMargin: '-20% 0px -75% 0px', threshold: 0 }
    );

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Hash sync on mount and hashchange
  useEffect(() => {
    const sync = () => {
      const hash = window.location.hash || '#home';
      const index = NAV_LINKS.findIndex(link => link.href === hash);
      if (index !== -1) setActiveIndex(index);
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mobile: keep active item centred
  useEffect(() => {
    if (!listRef.current) return;
    const navItems = listRef.current.querySelectorAll('.nav-item');
    const activeChild = navItems[activeIndex];
    if (!activeChild) return;

    const parent = listRef.current.parentElement;
    if (window.innerWidth <= 768 && parent) {
      const scrollLeft = activeChild.offsetLeft - parent.offsetWidth / 2 + activeChild.offsetWidth / 2;
      parent.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, [activeIndex]);

  return (
    <nav className={`navbar-container ${scrolled ? 'scrolled' : ''}`} aria-label="Primary navigation">
      <div className="navbar-dock">
        <div className="dock-glass" ref={listRef}>
          {NAV_LINKS.map(({ name, href, Icon }, index) => (
            <a
              key={name}
              href={href}
              className={`nav-item ${activeIndex === index ? 'active' : ''}`}
              aria-current={activeIndex === index ? 'location' : undefined}
              onClick={(e) => {
                e.preventDefault();
                setActiveIndex(index);
                const targetId = href.slice(1);
                const el = document.getElementById(targetId);
                const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                if (el) el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
              }}
            >
              <span className="nav-icon" aria-hidden="true"><Icon size={18} /></span>
              <span className="nav-text">{name}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
