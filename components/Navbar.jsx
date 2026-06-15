'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Home as HomeIcon, User, Briefcase, PlusCircle, Mail, Rocket
} from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef(null);

  const navLinks = [
    { name: 'Home', href: '#', icon: <HomeIcon size={18} /> },
    { name: 'About', href: '#about', icon: <User size={18} /> },
    { name: 'Skills', href: '#skills', icon: <Rocket size={18} /> },
    { name: 'Projects', href: '#projects', icon: <Briefcase size={18} /> },
    { name: 'Others', href: '#others', icon: <PlusCircle size={18} /> },
    { name: 'Contact', href: '#contact', icon: <Mail size={18} /> }
  ];

  // Scrollspy
  useEffect(() => {
    const sectionIds = navLinks.map(link => link.href.replace('#', '') || 'home');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = sectionIds.indexOf(entry.target.id);
            if (index !== -1) {
              setActiveIndex(index);
              // Update URL hash without causing a jump or adding to history
              const newHash = index === 0 ? '#' : `#${entry.target.id}`;
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
  }, [navLinks]);

  // Hash sync on mount and hashchange
  useEffect(() => {
    const sync = () => {
      const hash = window.location.hash || '#';
      const index = navLinks.findIndex(l => l.href === hash || (hash === '#' && l.href === '#'));
      if (index !== -1) setActiveIndex(index);
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, [navLinks]);

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
    <nav className={`navbar-container ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-dock">
        <div className="dock-glass" ref={listRef}>
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              className={`nav-item ${activeIndex === index ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveIndex(index);
                const targetId = link.href === '#' ? 'home' : link.href.replace('#', '');
                const el = document.getElementById(targetId);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              <span className="nav-icon">{link.icon}</span>
              <span className="nav-text">{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
