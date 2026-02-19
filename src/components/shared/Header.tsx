'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { NAV_LINKS } from '@/lib/constants';

// Register GSAP Plugins safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(CustomEase);
  try {
    CustomEase.create('main', '0.65, 0.01, 0.05, 0.99');
    gsap.defaults({ ease: 'main', duration: 0.7 });
  } catch {
    gsap.defaults({ ease: 'power2.out', duration: 0.7 });
  }
}

export default function Header() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeShapeRef = useRef<number>(0);
  const isHoveringRef = useRef<boolean>(false);
  const idleIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Scroll detection — switch header bg when past hero
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ─── Shape animation helper ───
  const showShape = useCallback((idx: number) => {
    if (!shapesRef.current) return;
    const allShapes = shapesRef.current.querySelectorAll('.bg-shape');
    if (!allShapes.length) return;

    allShapes.forEach((s, i) => {
      const els = s.querySelectorAll('.shape-element');
      if (i === idx) {
        s.classList.add('active');
        gsap.killTweensOf(els);
        gsap.fromTo(els,
          { scale: 0.3, opacity: 0, rotation: gsap.utils.random(-20, 20) },
          { scale: 1, opacity: 1, rotation: 0, duration: 0.7, stagger: 0.05, ease: 'back.out(1.7)', overwrite: 'auto' }
        );
        gsap.to(els, {
          y: gsap.utils.random(-6, 6), x: gsap.utils.random(-5, 5),
          duration: 2.5, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: 0.1, delay: 0.4,
        });
      } else {
        gsap.killTweensOf(els);
        gsap.to(els, { scale: 0.5, opacity: 0, duration: 0.3, ease: 'power2.in', overwrite: 'auto' });
        s.classList.remove('active');
      }
    });
    activeShapeRef.current = idx;
  }, []);

  // ─── Start/stop idle cycle ───
  const startIdleCycle = useCallback(() => {
    if (idleIntervalRef.current) return;
    idleIntervalRef.current = setInterval(() => {
      if (isHoveringRef.current) return;
      activeShapeRef.current = (activeShapeRef.current + 1) % 5;
      showShape(activeShapeRef.current);
    }, 3500);
  }, [showShape]);

  const stopIdleCycle = useCallback(() => {
    if (idleIntervalRef.current) {
      clearInterval(idleIntervalRef.current);
      idleIntervalRef.current = null;
    }
  }, []);

  // ─── Initialize shapes when menu opens ───
  useEffect(() => {
    if (!isMenuOpen) {
      stopIdleCycle();
      activeShapeRef.current = 0;
      isHoveringRef.current = false;
      return;
    }

    // Wait for menu animation to complete before starting
    const timer = setTimeout(() => {
      showShape(0);
      startIdleCycle();
    }, 600);

    return () => {
      clearTimeout(timer);
      stopIdleCycle();
    };
  }, [isMenuOpen, showShape, startIdleCycle, stopIdleCycle]);

  // ─── Interaction handlers ───
  const handleNavHover = useCallback((shapeIdx: number) => {
    isHoveringRef.current = true;
    showShape(shapeIdx);
  }, [showShape]);

  const handleNavLeave = useCallback(() => {
    isHoveringRef.current = false;
    // Shape stays visible, idle cycle will continue from here
  }, []);

  const handleNavClick = useCallback((shapeIdx: number) => {
    // On click, show the shape and pause briefly before resuming idle
    isHoveringRef.current = true;
    showShape(shapeIdx);
    setTimeout(() => {
      isHoveringRef.current = false;
    }, 2000);
  }, [showShape]);

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
                {NAV_LINKS.map((link) => (
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
                {/* Join Now CTA - Desktop only */}
                <Link
                  href="/join"
                  className="hidden lg:flex items-center gap-1.5 px-4 py-1.5 rounded-md text-white text-[11px] xl:text-[12px] font-bold bg-[#008751] hover:bg-[#006d41] transition-all duration-300 group whitespace-nowrap shadow-sm shadow-[#008751]/20 hover:shadow-[#008751]/30"
                >
                  Join Now
                  <svg className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

              {/* Abstract shapes container */}
              <div ref={shapesRef} className="ambient-background-shapes">
                {/* Shape 1: Floating circles */}
                <svg className="bg-shape bg-shape-1" viewBox="0 0 400 400" fill="none">
                  <circle className="shape-element" cx="80" cy="120" r="40" fill="rgba(0,208,132,0.15)" />
                  <circle className="shape-element" cx="300" cy="80" r="60" fill="rgba(0,184,114,0.12)" />
                  <circle className="shape-element" cx="200" cy="300" r="80" fill="rgba(0,135,81,0.10)" />
                  <circle className="shape-element" cx="350" cy="280" r="30" fill="rgba(0,208,132,0.15)" />
                </svg>

                {/* Shape 2: Wave pattern */}
                <svg className="bg-shape bg-shape-2" viewBox="0 0 400 400" fill="none">
                  <path
                    className="shape-element"
                    d="M0 200 Q100 100, 200 200 T 400 200"
                    stroke="rgba(0,208,132,0.2)"
                    strokeWidth="60"
                    fill="none"
                  />
                  <path
                    className="shape-element"
                    d="M0 280 Q100 180, 200 280 T 400 280"
                    stroke="rgba(0,135,81,0.15)"
                    strokeWidth="40"
                    fill="none"
                  />
                </svg>

                {/* Shape 3: Grid dots */}
                <svg className="bg-shape bg-shape-3" viewBox="0 0 400 400" fill="none">
                  <circle className="shape-element" cx="50" cy="50" r="8" fill="rgba(0,208,132,0.3)" />
                  <circle className="shape-element" cx="150" cy="50" r="8" fill="rgba(0,184,114,0.3)" />
                  <circle className="shape-element" cx="250" cy="50" r="8" fill="rgba(0,135,81,0.3)" />
                  <circle className="shape-element" cx="350" cy="50" r="8" fill="rgba(0,208,132,0.3)" />
                  <circle className="shape-element" cx="100" cy="150" r="12" fill="rgba(0,184,114,0.25)" />
                  <circle className="shape-element" cx="200" cy="150" r="12" fill="rgba(0,135,81,0.25)" />
                  <circle className="shape-element" cx="300" cy="150" r="12" fill="rgba(0,208,132,0.25)" />
                  <circle className="shape-element" cx="50" cy="250" r="10" fill="rgba(0,135,81,0.3)" />
                  <circle className="shape-element" cx="150" cy="250" r="10" fill="rgba(0,208,132,0.3)" />
                  <circle className="shape-element" cx="250" cy="250" r="10" fill="rgba(0,184,114,0.3)" />
                  <circle className="shape-element" cx="350" cy="250" r="10" fill="rgba(0,135,81,0.3)" />
                  <circle className="shape-element" cx="100" cy="350" r="6" fill="rgba(0,208,132,0.3)" />
                  <circle className="shape-element" cx="200" cy="350" r="6" fill="rgba(0,184,114,0.3)" />
                  <circle className="shape-element" cx="300" cy="350" r="6" fill="rgba(0,135,81,0.3)" />
                </svg>

                {/* Shape 4: Organic blobs */}
                <svg className="bg-shape bg-shape-4" viewBox="0 0 400 400" fill="none">
                  <path
                    className="shape-element"
                    d="M100 100 Q150 50, 200 100 Q250 150, 200 200 Q150 250, 100 200 Q50 150, 100 100"
                    fill="rgba(0,208,132,0.12)"
                  />
                  <path
                    className="shape-element"
                    d="M250 200 Q300 150, 350 200 Q400 250, 350 300 Q300 350, 250 300 Q200 250, 250 200"
                    fill="rgba(0,135,81,0.10)"
                  />
                </svg>

                {/* Shape 5: Diagonal lines */}
                <svg className="bg-shape bg-shape-5" viewBox="0 0 400 400" fill="none">
                  <line className="shape-element" x1="0" y1="100" x2="300" y2="400" stroke="rgba(0,208,132,0.15)" strokeWidth="30" />
                  <line className="shape-element" x1="100" y1="0" x2="400" y2="300" stroke="rgba(0,184,114,0.12)" strokeWidth="25" />
                  <line className="shape-element" x1="200" y1="0" x2="400" y2="200" stroke="rgba(0,135,81,0.10)" strokeWidth="20" />
                </svg>
              </div>
            </div>

            <div className="menu-content-wrapper">
              <ul className="menu-list">
                {NAV_LINKS.map((link, idx) => {
                  const shapeIdx = (idx % 5);
                  return (
                    <li key={link.href} className="menu-list-item" data-shape={(shapeIdx + 1).toString()}>
                      <button
                        type="button"
                        className="nav-link w-full text-left"
                        style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent', userSelect: 'none' }}
                        onMouseEnter={() => handleNavHover(shapeIdx)}
                        onMouseLeave={handleNavLeave}
                        onClick={() => handleNavClick(shapeIdx)}
                      >
                        <p className="nav-link-text">{link.label}</p>
                        <div className="nav-link-hover-bg"></div>
                      </button>
                    </li>
                  );
                })}
              </ul>
              {/* Mobile Log In CTA — below nav links */}
              <div className="px-6 pt-6 pb-4 lg:hidden">
                <Link
                  href="/portal"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-md bg-[#008751] text-white text-[13px] font-bold tracking-wide hover:bg-[#006d41] active:scale-[0.97] transition-all duration-300"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  Log In to Portal
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8h10m0 0L9 4m4 4L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </section>
    </div>
  );
}
