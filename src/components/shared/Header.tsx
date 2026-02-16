'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { NAV_LINKS } from '@/lib/constants';

// Register GSAP Plugins safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(CustomEase);
}

export default function Header() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Scroll detection — switch header bg when past hero
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Initial Setup & Hover Effects
  useEffect(() => {
    if (!containerRef.current) return;

    // Create custom easing
    try {
      if (!gsap.parseEase('main')) {
        CustomEase.create('main', '0.65, 0.01, 0.05, 0.99');
        gsap.defaults({ ease: 'main', duration: 0.7 });
      }
    } catch (e) {
      console.warn('CustomEase failed to load, falling back to default.', e);
      gsap.defaults({ ease: 'power2.out', duration: 0.7 });
    }

    const ctx = gsap.context(() => {
      // Shape Hover
      const menuItems = containerRef.current!.querySelectorAll('.menu-list-item[data-shape]');
      const shapesContainer = containerRef.current!.querySelector('.ambient-background-shapes');

      menuItems.forEach((item) => {
        const shapeIndex = item.getAttribute('data-shape');
        const shape = shapesContainer ? shapesContainer.querySelector(`.bg-shape-${shapeIndex}`) : null;

        if (!shape) return;

        const shapeEls = shape.querySelectorAll('.shape-element');

        const onEnter = () => {
          if (shapesContainer) {
            shapesContainer.querySelectorAll('.bg-shape').forEach((s) => s.classList.remove('active'));
          }
          shape.classList.add('active');

          gsap.fromTo(
            shapeEls,
            { scale: 0.3, opacity: 0, rotation: -15 },
            { scale: 1, opacity: 1, rotation: 0, duration: 0.7, stagger: 0.06, ease: 'back.out(1.7)', overwrite: 'auto' }
          );
        };

        const onLeave = () => {
          gsap.to(shapeEls, {
            scale: 0.6,
            opacity: 0,
            duration: 0.35,
            ease: 'power2.in',
            onComplete: () => shape.classList.remove('active'),
            overwrite: 'auto',
          });
        };

        // Click also triggers the shape (for mobile tap / nav selection)
        const onClick = () => {
          if (shapesContainer) {
            shapesContainer.querySelectorAll('.bg-shape').forEach((s) => s.classList.remove('active'));
          }
          shape.classList.add('active');

          gsap.fromTo(
            shapeEls,
            { scale: 0, opacity: 0, rotation: -25 },
            { scale: 1, opacity: 1, rotation: 0, duration: 0.85, stagger: 0.05, ease: 'back.out(2)', overwrite: 'auto' }
          );
        };

        item.addEventListener('mouseenter', onEnter);
        item.addEventListener('mouseleave', onLeave);
        item.addEventListener('click', onClick);

        (item as any)._cleanup = () => {
          item.removeEventListener('mouseenter', onEnter);
          item.removeEventListener('mouseleave', onLeave);
          item.removeEventListener('click', onClick);
        };
      });
    }, containerRef);

    return () => {
      ctx.revert();
      if (containerRef.current) {
        const items = containerRef.current.querySelectorAll('.menu-list-item[data-shape]');
        items.forEach((item: any) => item._cleanup && item._cleanup());
      }
    };
  }, []);

  // Menu Open/Close Animation Effect
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const navWrap = containerRef.current!.querySelector('.nav-overlay-wrapper');
      const menu = containerRef.current!.querySelector('.menu-content');
      const overlay = containerRef.current!.querySelector('.overlay');
      const bgPanels = containerRef.current!.querySelectorAll('.backdrop-layer');
      const menuLinks = containerRef.current!.querySelectorAll('.nav-link');
      const fadeTargets = containerRef.current!.querySelectorAll('[data-menu-fade]');

      const menuButton = containerRef.current!.querySelector('.nav-close-btn');
      const menuButtonTexts = menuButton?.querySelectorAll('p');
      const menuButtonIcon = menuButton?.querySelector('.menu-button-icon');

      const tl = gsap.timeline();

      if (isMenuOpen) {
        // OPEN
        if (navWrap) navWrap.setAttribute('data-nav', 'open');

        tl.set(navWrap, { display: 'block' })
          .set(menu, { xPercent: 0 }, '<');
        
        if (menuButtonTexts && menuButtonTexts.length > 0) {
          tl.fromTo(menuButtonTexts, { yPercent: 0 }, { yPercent: -100, stagger: 0.2 });
        }
        if (menuButtonIcon) {
          tl.fromTo(menuButtonIcon, { rotate: 0 }, { rotate: 315 }, '<');
        }
        
        tl.fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, '<')
          .fromTo(bgPanels, { xPercent: 101 }, { xPercent: 0, stagger: 0.12, duration: 0.575 }, '<')
          .fromTo(menuLinks, { opacity: 0, yPercent: 30 }, { opacity: 1, yPercent: 0, stagger: 0.05, duration: 0.7, ease: 'power2.out' }, '<+=0.35');

        if (fadeTargets.length) {
          tl.fromTo(fadeTargets, { autoAlpha: 0, yPercent: 50 }, { autoAlpha: 1, yPercent: 0, stagger: 0.04, clearProps: 'all' }, '<+=0.2');
        }
      } else {
        // CLOSE
        if (navWrap) navWrap.setAttribute('data-nav', 'closed');

        tl.to(overlay, { autoAlpha: 0 })
          .to(menu, { xPercent: 120 }, '<');
        
        if (menuButtonTexts && menuButtonTexts.length > 0) {
          tl.to(menuButtonTexts, { yPercent: 0 }, '<');
        }
        if (menuButtonIcon) {
          tl.to(menuButtonIcon, { rotate: 0 }, '<');
        }
        
        tl.set(navWrap, { display: 'none' });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isMenuOpen]);

  // keydown Escape handling
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div ref={containerRef}>
      <div className="site-header-wrapper">
        <header 
          className="header"
          style={{
            background: scrolled
              ? 'rgba(0, 50, 30, 0.92)'
              : 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(25px)',
            borderBottom: scrolled
              ? '1px solid rgba(0,208,132,0.15)'
              : '1px solid rgba(255,255,255,0.2)',
            transition: 'all 0.5s cubic-bezier(0.65, 0.01, 0.05, 0.99)',
            boxShadow: scrolled ? '0 4px 30px rgba(0,50,30,0.12)' : 'none',
          }}
        >
          <div className="container is--full">
            <nav className="nav-row">
              <Link href="/" aria-label="home" className="nav-logo-row">
                <Image
                  src="/logo.png"
                  alt="NAAKIMS Logo"
                  width={48}
                  height={48}
                  priority
                  className="w-12 h-12"
                />
              </Link>

              {/* Desktop Nav Links - Hidden on mobile, visible on lg and up */}
              <div className="hidden lg:flex items-center gap-5 xl:gap-6 flex-1 justify-center">
                {NAV_LINKS.slice(0, -1).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-white/90 text-[12px] xl:text-[13px] font-medium hover:text-[#00D084] transition-all duration-300 relative group whitespace-nowrap"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#00D084] group-hover:w-full transition-all duration-300"></span>
                  </Link>
                ))}
              </div>

              <div className="nav-row__right">
                {/* Contact CTA - Desktop only */}
                <Link
                  href={NAV_LINKS[NAV_LINKS.length - 1].href}
                  className="hidden lg:flex items-center gap-1 px-3.5 py-1 text-white text-[11px] xl:text-[12px] font-medium rounded-full border border-white/30 hover:border-[#00D084] hover:text-[#00D084] transition-all duration-300 group whitespace-nowrap"
                >
                  {NAV_LINKS[NAV_LINKS.length - 1].label}
                  <svg className="w-2.5 h-2.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>

                {/* Mobile Menu Button - Only visible on mobile (lg:hidden) */}
                <button
                  role="button"
                  className="nav-close-btn lg:hidden"
                  onClick={toggleMenu}
                  style={{ pointerEvents: 'auto' }}
                >
                  <div className="menu-button-text">
                    <p className="p-large">Menu</p>
                    <p className="p-large">Close</p>
                  </div>
                  <div className="icon-wrap">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="menu-button-icon"
                    >
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <line x1="3" y1="12" x2="21" y2="12"></line>
                      <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                  </div>
                </button>
              </div>
            </nav>
          </div>
        </header>
      </div>

      <section className="fullscreen-menu-container">
        <div data-nav="closed" className="nav-overlay-wrapper">
          <div className="overlay" onClick={closeMenu}></div>
          <nav className="menu-content">
            <div className="menu-bg">
              <div className="backdrop-layer first"></div>
              <div className="backdrop-layer second"></div>
              <div className="backdrop-layer"></div>

              {/* Abstract shapes container — cute bubble/round designs per nav link */}
              <div className="ambient-background-shapes">
                {/* Shape 1: Floating soap bubbles */}
                <svg className="bg-shape bg-shape-1" viewBox="0 0 400 400" fill="none">
                  <circle className="shape-element" cx="80" cy="100" r="55" fill="rgba(0,208,132,0.12)" stroke="rgba(0,208,132,0.25)" strokeWidth="1.5" />
                  <circle className="shape-element" cx="290" cy="70" r="75" fill="rgba(0,135,81,0.10)" stroke="rgba(0,135,81,0.20)" strokeWidth="1.5" />
                  <circle className="shape-element" cx="200" cy="280" r="95" fill="rgba(0,184,114,0.08)" stroke="rgba(0,184,114,0.18)" strokeWidth="1.5" />
                  <circle className="shape-element" cx="340" cy="300" r="35" fill="rgba(0,208,132,0.18)" stroke="rgba(0,208,132,0.30)" strokeWidth="1" />
                  <circle className="shape-element" cx="50" cy="300" r="25" fill="rgba(0,208,132,0.22)" stroke="rgba(0,208,132,0.35)" strokeWidth="1" />
                  <circle className="shape-element" cx="160" cy="160" r="15" fill="rgba(0,208,132,0.40)" />
                  <circle className="shape-element" cx="350" cy="180" r="12" fill="rgba(0,184,114,0.35)" />
                  <circle className="shape-element" cx="120" cy="220" r="8" fill="rgba(0,208,132,0.50)" />
                </svg>

                {/* Shape 2: Orbiting rings / planetary system */}
                <svg className="bg-shape bg-shape-2" viewBox="0 0 400 400" fill="none">
                  <circle className="shape-element" cx="200" cy="200" r="140" fill="none" stroke="rgba(0,208,132,0.15)" strokeWidth="1.5" />
                  <circle className="shape-element" cx="200" cy="200" r="100" fill="none" stroke="rgba(0,135,81,0.12)" strokeWidth="1.5" />
                  <circle className="shape-element" cx="200" cy="200" r="55" fill="none" stroke="rgba(0,184,114,0.18)" strokeWidth="1.5" />
                  <circle className="shape-element" cx="200" cy="200" r="22" fill="rgba(0,208,132,0.25)" />
                  <circle className="shape-element" cx="340" cy="200" r="14" fill="rgba(0,208,132,0.45)" />
                  <circle className="shape-element" cx="200" cy="60" r="12" fill="rgba(0,135,81,0.40)" />
                  <circle className="shape-element" cx="100" cy="260" r="10" fill="rgba(0,184,114,0.45)" />
                  <circle className="shape-element" cx="300" cy="300" r="8" fill="rgba(0,208,132,0.50)" />
                </svg>

                {/* Shape 3: Scattered pearls / confetti dots */}
                <svg className="bg-shape bg-shape-3" viewBox="0 0 400 400" fill="none">
                  <circle className="shape-element" cx="60" cy="80" r="20" fill="rgba(0,208,132,0.30)" />
                  <circle className="shape-element" cx="180" cy="50" r="28" fill="rgba(0,135,81,0.22)" />
                  <circle className="shape-element" cx="320" cy="100" r="35" fill="rgba(0,184,114,0.15)" stroke="rgba(0,184,114,0.25)" strokeWidth="1.5" />
                  <circle className="shape-element" cx="100" cy="200" r="45" fill="rgba(0,208,132,0.10)" stroke="rgba(0,208,132,0.20)" strokeWidth="1.5" />
                  <circle className="shape-element" cx="300" cy="230" r="55" fill="rgba(0,135,81,0.08)" stroke="rgba(0,135,81,0.18)" strokeWidth="1.5" />
                  <circle className="shape-element" cx="200" cy="330" r="40" fill="rgba(0,208,132,0.12)" stroke="rgba(0,208,132,0.22)" strokeWidth="1.5" />
                  <circle className="shape-element" cx="70" cy="340" r="16" fill="rgba(0,184,114,0.35)" />
                  <circle className="shape-element" cx="350" cy="350" r="12" fill="rgba(0,208,132,0.45)" />
                  <circle className="shape-element" cx="240" cy="160" r="10" fill="rgba(0,208,132,0.50)" />
                </svg>

                {/* Shape 4: Bubbly cluster / molecular grouping */}
                <svg className="bg-shape bg-shape-4" viewBox="0 0 400 400" fill="none">
                  <circle className="shape-element" cx="160" cy="140" r="65" fill="rgba(0,208,132,0.10)" stroke="rgba(0,208,132,0.18)" strokeWidth="1.5" />
                  <circle className="shape-element" cx="260" cy="120" r="50" fill="rgba(0,135,81,0.12)" stroke="rgba(0,135,81,0.20)" strokeWidth="1.5" />
                  <circle className="shape-element" cx="200" cy="240" r="80" fill="rgba(0,184,114,0.07)" stroke="rgba(0,184,114,0.15)" strokeWidth="1.5" />
                  <circle className="shape-element" cx="120" cy="300" r="45" fill="rgba(0,208,132,0.12)" stroke="rgba(0,208,132,0.22)" strokeWidth="1.5" />
                  <circle className="shape-element" cx="320" cy="280" r="35" fill="rgba(0,135,81,0.15)" stroke="rgba(0,135,81,0.25)" strokeWidth="1" />
                  <circle className="shape-element" cx="210" cy="170" r="18" fill="rgba(0,208,132,0.35)" />
                  <circle className="shape-element" cx="300" cy="180" r="10" fill="rgba(0,184,114,0.45)" />
                  <circle className="shape-element" cx="80" cy="200" r="8" fill="rgba(0,208,132,0.50)" />
                </svg>

                {/* Shape 5: Galaxy spiral dots */}
                <svg className="bg-shape bg-shape-5" viewBox="0 0 400 400" fill="none">
                  <circle className="shape-element" cx="200" cy="200" r="110" fill="none" stroke="rgba(0,208,132,0.10)" strokeWidth="1" strokeDasharray="6 8" />
                  <circle className="shape-element" cx="200" cy="200" r="70" fill="none" stroke="rgba(0,135,81,0.12)" strokeWidth="1" strokeDasharray="4 6" />
                  <circle className="shape-element" cx="200" cy="200" r="30" fill="rgba(0,208,132,0.20)" />
                  <circle className="shape-element" cx="310" cy="200" r="22" fill="rgba(0,208,132,0.30)" />
                  <circle className="shape-element" cx="200" cy="90" r="18" fill="rgba(0,184,114,0.28)" />
                  <circle className="shape-element" cx="90" cy="200" r="16" fill="rgba(0,135,81,0.32)" />
                  <circle className="shape-element" cx="200" cy="310" r="20" fill="rgba(0,208,132,0.25)" />
                  <circle className="shape-element" cx="270" cy="130" r="13" fill="rgba(0,184,114,0.40)" />
                  <circle className="shape-element" cx="130" cy="270" r="11" fill="rgba(0,208,132,0.42)" />
                  <circle className="shape-element" cx="280" cy="280" r="9" fill="rgba(0,135,81,0.48)" />
                  <circle className="shape-element" cx="120" cy="130" r="7" fill="rgba(0,208,132,0.50)" />
                </svg>
              </div>
            </div>

            <div className="menu-content-wrapper">
              <ul className="menu-list">
                {NAV_LINKS.map((link, idx) => (
                  <li key={link.href} className="menu-list-item" data-shape={((idx % 5) + 1).toString()}>
                    <a
                      href="#"
                      className={`nav-link w-inline-block ${activeLink === link.href ? 'active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveLink(link.href);
                        closeMenu();
                      }}
                    >
                      <p className="nav-link-text">{link.label}</p>
                      <div className="nav-link-hover-bg"></div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </section>
    </div>
  );
}
