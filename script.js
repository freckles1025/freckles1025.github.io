document.addEventListener('DOMContentLoaded', () => {

    /* ── 0. GSAP Scroll Transitions ── */
    gsap.registerPlugin(ScrollTrigger);

    const zoomSections = document.querySelectorAll('.zoom-section');

    zoomSections.forEach((section, i) => {
        // Entering: scale up gently from 0.97
        if (i > 0) {
            gsap.fromTo(section,
                { scale: 0.97, borderRadius: '12px' },
                {
                    scale: 1,
                    borderRadius: '0px',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 85%',
                        end: 'top 15%',
                        scrub: 1.5,
                    }
                }
            );
        }

        // Leaving: subtle fade (skip last and story)
        if (i < zoomSections.length - 1 && !section.classList.contains('story')) {
            gsap.to(section, {
                opacity: 0.85,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'bottom 50%',
                    end: 'bottom top',
                    scrub: 1.5,
                }
            });
        }
    });

    // Smooth scroll for anchor links (GSAP)
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const target = document.querySelector(link.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            gsap.to(window, {
                duration: 1.2,
                scrollTo: { y: target, offsetY: 0 },
                ease: 'power2.inOut'
            });
            const navLinks = document.querySelector('.nav-links');
            const navToggle = document.querySelector('.nav-toggle');
            if (navLinks) navLinks.classList.remove('open');
            if (navToggle) navToggle.classList.remove('active');
        });
    });

    /* ── 1. Freckle Background Particles ── */
    const frecklesBg = document.querySelector('.freckles-bg');
    if (frecklesBg) {
        const count = 60;
        for (let i = 0; i < count; i++) {
            const dot = document.createElement('div');
            dot.className = 'freckle-dot';
            const size = Math.random() * 6 + 2;
            dot.style.width = size + 'px';
            dot.style.height = size + 'px';
            dot.style.left = Math.random() * 100 + '%';
            dot.style.top = Math.random() * 100 + '%';
            dot.style.opacity = (Math.random() * 0.08 + 0.03).toFixed(3);
            dot.dataset.speed = (Math.random() * 0.3 + 0.05).toFixed(3);
            frecklesBg.appendChild(dot);
        }

        // Parallax handled by single scroll listener below
    }

    /* ── 2. Mouse Trail ── */
    const trail = [];
    const TRAIL_COUNT = 6;
    for (let i = 0; i < TRAIL_COUNT; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-dot';
        const size = (TRAIL_COUNT - i) * 3 + 2;
        dot.style.width = size + 'px';
        dot.style.height = size + 'px';
        document.body.appendChild(dot);
        trail.push({ el: dot, x: 0, y: 0 });
    }

    let mouseX = -100, mouseY = -100;
    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        trail.forEach(t => { t.el.style.opacity = '0.25'; });
    });

    function animateTrail() {
        let px = mouseX, py = mouseY;
        trail.forEach((t, i) => {
            const lag = 0.25 + i * 0.06;
            t.x += (px - t.x) * lag;
            t.y += (py - t.y) * lag;
            t.el.style.left = t.x + 'px';
            t.el.style.top = t.y + 'px';
            px = t.x;
            py = t.y;
        });
        requestAnimationFrame(animateTrail);
    }
    animateTrail();

    // Hide trail on mobile
    if ('ontouchstart' in window) {
        trail.forEach(t => { t.el.style.display = 'none'; });
    }

    /* ── 3. Hero Typography Animation ── */
    const heroLines = document.querySelectorAll('.hero-line');
    heroLines.forEach((line, i) => {
        line.style.opacity = '0';
        line.style.transform = 'translateY(20px)';
        line.style.transition = `opacity .6s var(--ease) ${0.3 + i * 0.15}s, transform .6s var(--ease) ${0.3 + i * 0.15}s`;
        // trigger
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
            });
        });
    });

    /* ── 4. Scroll Reveal (Intersection Observer) ── */
    // Directional reveals
    document.querySelectorAll('.story-text').forEach(el => el.classList.add('reveal-left'));
    document.querySelectorAll('.story-visual').forEach(el => el.classList.add('reveal-right'));
    document.querySelectorAll('.workroad-header, .potion-header').forEach(el => el.classList.add('reveal'));
    document.querySelectorAll('.contact-inner').forEach(el => el.classList.add('reveal-scale'));

    // Staggered reveals for list items
    document.querySelectorAll('.wr-item').forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = (i * 0.12) + 's';
    });

    document.querySelectorAll('.potion-card').forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = (i * 0.15) + 's';
    });

    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
        revealObserver.observe(el);
    });

    /* ── Potion Accordion ── */
    const potionGrid = document.querySelector('.potion-grid');
    const potionCards = document.querySelectorAll('.potion-card');

    potionCards.forEach(card => {
        card.addEventListener('click', () => {
            if (card.classList.contains('active')) {
                card.classList.remove('active');
                potionGrid.classList.remove('has-active');
                return;
            }
            potionCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            potionGrid.classList.add('has-active');
        });
    });

    /* ── Work Road Accordion ── */
    const wrItems = document.querySelectorAll('.wr-item');

    wrItems.forEach(item => {
        item.addEventListener('click', () => {
            if (item.classList.contains('active')) {
                item.classList.remove('active');
                return;
            }
            wrItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        });
    });

    /* ── 5. Strike-through Animation ── */
    const strikeEl = document.querySelector('.strike');
    if (strikeEl) {
        const strikeObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        strikeEl.classList.add('struck');
                    }, 800);
                    strikeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        strikeObserver.observe(strikeEl);
    }

    /* ── 6. Nav Scroll State ── */
    const nav = document.querySelector('.nav');

    /* ── 7. Mobile Menu ── */
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
        });
    }

    /* ── 8. Smooth Scroll — handled by GSAP above ── */

    /* ── 9. Contact Freckles ── */
    const contactFreckles = document.querySelector('.contact-freckles');
    if (contactFreckles) {
        for (let i = 0; i < 30; i++) {
            const dot = document.createElement('div');
            dot.className = 'freckle-dot';
            const size = Math.random() * 5 + 2;
            dot.style.width = size + 'px';
            dot.style.height = size + 'px';
            dot.style.left = Math.random() * 100 + '%';
            dot.style.top = Math.random() * 100 + '%';
            dot.style.opacity = (Math.random() * 0.06 + 0.02).toFixed(3);
            contactFreckles.appendChild(dot);
        }
    }

    /* ── 10. Story Dots ── */
    const storyDots = document.querySelector('.story-dots');
    if (storyDots) {
        for (let i = 0; i < 20; i++) {
            const dot = document.createElement('div');
            dot.className = 'freckle-dot';
            const size = Math.random() * 8 + 3;
            dot.style.width = size + 'px';
            dot.style.height = size + 'px';
            dot.style.left = Math.random() * 100 + '%';
            dot.style.top = Math.random() * 100 + '%';
            dot.style.opacity = (Math.random() * 0.12 + 0.04).toFixed(3);
            storyDots.appendChild(dot);
        }
    }

    /* ── 11. Consolidated Scroll Listener ── */
    const heroBigText = document.querySelector('.hero-big-text');
    const freckleDots = frecklesBg ? frecklesBg.querySelectorAll('.freckle-dot') : [];

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            const y = window.scrollY;

            // Nav state
            nav.classList.toggle('scrolled', y > 40);

            // Hero watermark parallax
            if (heroBigText) {
                heroBigText.style.transform = `translateX(-50%) translateY(${y * 0.1}px)`;
            }

            // Freckle dots parallax (lightweight)
            freckleDots.forEach(dot => {
                const speed = parseFloat(dot.dataset.speed);
                dot.style.transform = `translateY(${y * speed}px)`;
            });

            ticking = false;
        });
    }, { passive: true });

});
