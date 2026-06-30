/**
 * AiBersemi — Professional IT Portfolio
 * JavaScript — Animations, Typing Effect, Particle Background, Dynamic Content
 *
 * All DOM manipulation uses document.createElement() / textContent
 * for security (no innerHTML with dynamic data).
 */

(function () {
    'use strict';

    /* ==========================================================
       CONFIGURATION & DATA
       ========================================================== */

    /**
     * Skills data — based on AiBersemi's GitHub profile and Open VSX activity.
     * TODO: Update this list as new skills are acquired.
     */
    const SKILLS = [
        { name: 'JavaScript', icon: '⚡' },
        { name: 'Python', icon: '🐍' },
        { name: 'HTML', icon: '🌐' },
        { name: 'CSS', icon: '🎨' },
        { name: 'Web Development', icon: '💻' },
        { name: 'VS Code Extensions', icon: '🧩' },
        { name: 'Open VSX Publishing', icon: '📦' },
        { name: 'GitHub', icon: '🐙' },
        { name: 'Automation', icon: '⚙️' },
        { name: 'API Integration', icon: '🔗' },
        { name: 'AI Tools', icon: '🤖' },
        { name: 'Developer Tools', icon: '🛠️' },
        { name: 'DevOps', icon: '🚀' },
        { name: 'Linux', icon: '🐧' },
        { name: 'Workflow Optimization', icon: '📊' },
    ];

    /**
     * GitHub project data — sourced from the AiBersemi GitHub API.
     * TODO: Add more projects here as new repositories are created.
     */
    const PROJECTS = [
        {
            name: 'open-quota-antigravity',
            description:
                'A simple extension to monitor Google Antigravity IDE quota in real-time from the status bar.',
            language: 'JavaScript',
            languageColor: '#f1e05a',
            url: 'https://github.com/aibersemi/open-quota-antigravity',
        },
        // TODO: Add more repositories here as they become public.
        // Example format:
        // {
        //     name: 'repo-name',
        //     description: 'Short description of the repository.',
        //     language: 'TypeScript',
        //     languageColor: '#3178c6',
        //     url: 'https://github.com/aibersemi/repo-name',
        // },
    ];

    /**
     * Open VSX extensions — sourced from the Open VSX API.
     * TODO: Add more extensions here as they are published.
     */
    const EXTENSIONS = [
        {
            name: 'Open Quota Antigravity',
            slug: 'open-quota-antigravity',
            description:
                'Monitor Google Antigravity IDE quota in real-time from the status bar. Provides a quick visual indicator of remaining quota usage.',
            version: '1.1.5',
            publisher: 'aibersemi',
            url: 'https://open-vsx.org/extension/aibersemi/open-quota-antigravity',
        },
        // TODO: Add more extensions here as they are published.
        // Example format:
        // {
        //     name: 'Extension Display Name',
        //     slug: 'extension-slug',
        //     description: 'Brief description of the extension.',
        //     version: '1.0.0',
        //     publisher: 'aibersemi',
        //     url: 'https://open-vsx.org/extension/aibersemi/extension-slug',
        // },
    ];

    /**
     * Services data — professional capabilities.
     */
    const SERVICES = [
        {
            icon: '🌐',
            title: 'Web Development',
            desc: 'Building clean, responsive, and performant web applications using modern standards and best practices.',
        },
        {
            icon: '⚙️',
            title: 'Automation Tools',
            desc: 'Creating scripts and tools that automate repetitive IT tasks, improving efficiency and reducing manual effort.',
        },
        {
            icon: '🧩',
            title: 'VS Code Extension Development',
            desc: 'Designing and building extensions for VS Code and compatible editors, published through Open VSX.',
        },
        {
            icon: '🤖',
            title: 'AI Workflow Integration',
            desc: 'Integrating AI-powered tools into development workflows to enhance productivity and code quality.',
        },
        {
            icon: '🔗',
            title: 'Backend & API Development',
            desc: 'Developing backend services and RESTful APIs that power web applications and integrations.',
        },
        {
            icon: '🛠️',
            title: 'Developer Tooling',
            desc: 'Building command-line tools, utilities, and productivity aids for software development teams.',
        },
        {
            icon: '🚀',
            title: 'DevOps & Deployment',
            desc: 'Setting up CI/CD pipelines, deployment workflows, and infrastructure automation for smooth delivery.',
        },
        {
            icon: '🔍',
            title: 'Technical Problem Solving',
            desc: 'Analyzing complex technical challenges and implementing practical, well-documented solutions.',
        },
    ];

    /**
     * Professional highlights data.
     */
    const HIGHLIGHTS = [
        {
            icon: '🔧',
            title: 'Practical Tool Builder',
            desc: 'Builds practical tools for developers and IT workflows that solve real problems.',
        },
        {
            icon: '⚡',
            title: 'Automation & Productivity',
            desc: 'Focuses on automation and productivity to streamline development processes.',
        },
        {
            icon: '✨',
            title: 'Clean Code Advocate',
            desc: 'Creates clean, maintainable, and functional web interfaces and developer tools.',
        },
        {
            icon: '🐙',
            title: 'GitHub Workflow Expert',
            desc: 'Works with GitHub-based development workflows including Actions, Issues, and CI/CD.',
        },
        {
            icon: '📦',
            title: 'Open VSX Publisher',
            desc: 'Publishes developer tools and extensions through the Open VSX registry.',
        },
    ];

    /**
     * Typing effect phrases for the hero subtitle.
     */
    const TYPING_PHRASES = [
        'IT Professional',
        'Software Developer',
        'Automation Enthusiast',
        'Extension Developer',
        'Open Source Contributor',
        'Tool Builder',
    ];


    /* ==========================================================
       PRELOADER
       ========================================================== */

    function initPreloader() {
        const preloader = document.getElementById('preloader');
        if (!preloader) return;

        window.addEventListener('load', function () {
            setTimeout(function () {
                preloader.classList.add('hidden');
            }, 600);
        });
    }


    /* ==========================================================
       PARTICLE BACKGROUND (Canvas)
       ========================================================== */

    function initParticles() {
        const canvas = document.getElementById('particle-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationFrameId;
        let width, height;

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }

        function createParticle() {
            return {
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 1.5 + 0.5,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                opacity: Math.random() * 0.5 + 0.1,
            };
        }

        function initParticleArray() {
            const count = Math.min(Math.floor((width * height) / 18000), 80);
            particles = [];
            for (let i = 0; i < count; i++) {
                particles.push(createParticle());
            }
        }

        function drawParticles() {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                // Move
                p.x += p.vx;
                p.y += p.vy;

                // Wrap around edges
                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(56, 189, 248, ' + p.opacity + ')';
                ctx.fill();

                // Draw connections to nearby particles
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle =
                            'rgba(56, 189, 248, ' + (0.06 * (1 - dist / 120)) + ')';
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(drawParticles);
        }

        resize();
        initParticleArray();
        drawParticles();

        window.addEventListener('resize', function () {
            resize();
            initParticleArray();
        });
    }


    /* ==========================================================
       TYPING EFFECT
       ========================================================== */

    function initTypingEffect() {
        const element = document.getElementById('typed-text');
        if (!element) return;

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeed = 80;
        const deletingSpeed = 40;
        const pauseBetween = 2000;

        function type() {
            const currentPhrase = TYPING_PHRASES[phraseIndex];

            if (isDeleting) {
                charIndex--;
                element.textContent = currentPhrase.substring(0, charIndex);

                if (charIndex === 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % TYPING_PHRASES.length;
                    setTimeout(type, 400);
                    return;
                }

                setTimeout(type, deletingSpeed);
            } else {
                charIndex++;
                element.textContent = currentPhrase.substring(0, charIndex);

                if (charIndex === currentPhrase.length) {
                    isDeleting = true;
                    setTimeout(type, pauseBetween);
                    return;
                }

                setTimeout(type, typingSpeed);
            }
        }

        // Start after initial animations finish
        setTimeout(type, 1200);
    }


    /* ==========================================================
       NAVIGATION
       ========================================================== */

    function initNavigation() {
        const header = document.getElementById('header');
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Scroll — sticky header style
        let lastScrollY = 0;
        window.addEventListener('scroll', function () {
            const scrollY = window.scrollY;

            if (scrollY > 80) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScrollY = scrollY;
        });

        // Mobile toggle
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function () {
                const isOpen = navMenu.classList.toggle('open');
                navToggle.classList.toggle('active');
                navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            });
        }

        // Close mobile menu on link click & smooth scroll
        navLinks.forEach(function (link) {
            link.addEventListener('click', function (e) {
                if (navMenu) {
                    navMenu.classList.remove('open');
                    if (navToggle) {
                        navToggle.classList.remove('active');
                        navToggle.setAttribute('aria-expanded', 'false');
                    }
                }
            });
        });

        // Active nav state on scroll
        const sections = document.querySelectorAll('section[id]');

        function highlightNav() {
            const scrollY = window.scrollY + 150;

            sections.forEach(function (section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    navLinks.forEach(function (link) {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + sectionId) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }

        window.addEventListener('scroll', highlightNav);
        highlightNav();
    }


    /* ==========================================================
       REVEAL ON SCROLL (Intersection Observer)
       ========================================================== */

    function initScrollReveal() {
        const reveals = document.querySelectorAll('.reveal');

        if (!('IntersectionObserver' in window)) {
            // Fallback: show all elements immediately
            reveals.forEach(function (el) {
                el.classList.add('visible');
            });
            return;
        }

        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px',
            }
        );

        reveals.forEach(function (el) {
            observer.observe(el);
        });
    }


    /* ==========================================================
       DYNAMIC CONTENT RENDERING
       Uses document.createElement / textContent for security.
       ========================================================== */

    /**
     * Render skill cards into the .skills-grid container.
     */
    function renderSkills() {
        const grid = document.querySelector('.skills-grid');
        if (!grid) return;

        SKILLS.forEach(function (skill) {
            var card = document.createElement('div');
            card.className = 'skill-card';

            var iconSpan = document.createElement('span');
            iconSpan.className = 'skill-icon';
            iconSpan.setAttribute('aria-hidden', 'true');
            iconSpan.textContent = skill.icon;

            var nameSpan = document.createElement('span');
            nameSpan.className = 'skill-name';
            nameSpan.textContent = skill.name;

            card.appendChild(iconSpan);
            card.appendChild(nameSpan);
            grid.appendChild(card);
        });
    }

    /**
     * Create an SVG element for the folder/repo icon.
     * Uses DOMParser to safely parse static SVG markup.
     */
    function createRepoSVG() {
        var svgMarkup =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M3 3a2 2 0 0 1 2-2h9.982a2 2 0 0 1 1.414.586l4.018 4.018A2 2 0 0 1 21 7.018V21a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3zm2-.5a.5.5 0 0 0-.5.5v18a.5.5 0 0 0 .5.5h14a.5.5 0 0 0 .5-.5V8.5h-4a2 2 0 0 1-2-2v-4H5zm10 .72V6.5a.5.5 0 0 0 .5.5h2.78L15 3.22z"/></svg>';
        var doc = new DOMParser().parseFromString(svgMarkup, 'image/svg+xml');
        return doc.documentElement;
    }

    /**
     * Create an SVG element for the extension puzzle icon.
     * Uses DOMParser to safely parse static SVG markup.
     */
    function createExtensionSVG() {
        var svgMarkup =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M10.5 1.5a3.5 3.5 0 0 1 3.5 3.5v.5H17a2 2 0 0 1 2 2v2.5h.5a3.5 3.5 0 1 1 0 7H19V20a2 2 0 0 1-2 2h-3.5v-.5a3.5 3.5 0 1 0-7 0v.5H3a2 2 0 0 1-2-2v-3.5h.5a3.5 3.5 0 1 0 0-7H1V7a2 2 0 0 1 2-2h3v-.5a3.5 3.5 0 0 1 3.5-3.5v0z"/></svg>';
        var doc = new DOMParser().parseFromString(svgMarkup, 'image/svg+xml');
        return doc.documentElement;
    }

    /**
     * Render project cards into the #projects-grid container.
     */
    function renderProjects() {
        var grid = document.getElementById('projects-grid');
        if (!grid) return;

        PROJECTS.forEach(function (project) {
            var card = document.createElement('a');
            card.className = 'project-card';
            card.href = project.url;
            card.target = '_blank';
            card.rel = 'noopener noreferrer';

            // Header
            var header = document.createElement('div');
            header.className = 'project-card-header';

            var iconWrapper = document.createElement('span');
            iconWrapper.className = 'project-card-icon';
            iconWrapper.appendChild(createRepoSVG());

            var name = document.createElement('h3');
            name.className = 'project-card-name';
            name.textContent = project.name;

            header.appendChild(iconWrapper);
            header.appendChild(name);

            // Description
            var desc = document.createElement('p');
            desc.className = 'project-card-desc';
            desc.textContent = project.description;

            // Meta
            var meta = document.createElement('div');
            meta.className = 'project-card-meta';

            if (project.language) {
                var tag = document.createElement('span');
                tag.className = 'project-meta-tag';

                var dot = document.createElement('span');
                dot.className = 'meta-dot';
                dot.style.backgroundColor = project.languageColor || '#64748b';

                tag.appendChild(dot);
                var langText = document.createTextNode(project.language);
                tag.appendChild(langText);
                meta.appendChild(tag);
            }

            var linkText = document.createElement('span');
            linkText.className = 'project-card-link';
            linkText.textContent = 'View on GitHub →';
            meta.appendChild(linkText);

            card.appendChild(header);
            card.appendChild(desc);
            card.appendChild(meta);
            grid.appendChild(card);
        });
    }

    /**
     * Render extension cards into the #extensions-grid container.
     */
    function renderExtensions() {
        var grid = document.getElementById('extensions-grid');
        if (!grid) return;

        EXTENSIONS.forEach(function (ext) {
            var card = document.createElement('a');
            card.className = 'extension-card';
            card.href = ext.url;
            card.target = '_blank';
            card.rel = 'noopener noreferrer';

            // Header
            var header = document.createElement('div');
            header.className = 'extension-card-header';

            var iconWrapper = document.createElement('div');
            iconWrapper.className = 'extension-card-icon';
            iconWrapper.appendChild(createExtensionSVG());

            var textWrapper = document.createElement('div');

            var name = document.createElement('h3');
            name.className = 'extension-card-name';
            name.textContent = ext.name;

            var publisher = document.createElement('span');
            publisher.className = 'extension-card-publisher';
            publisher.textContent = ext.publisher;

            textWrapper.appendChild(name);
            textWrapper.appendChild(publisher);
            header.appendChild(iconWrapper);
            header.appendChild(textWrapper);

            // Description
            var desc = document.createElement('p');
            desc.className = 'extension-card-desc';
            desc.textContent = ext.description;

            // Footer
            var footer = document.createElement('div');
            footer.className = 'extension-card-footer';

            var version = document.createElement('span');
            version.className = 'extension-version';
            version.textContent = 'v' + ext.version;

            var linkText = document.createElement('span');
            linkText.className = 'extension-card-link';
            linkText.textContent = 'View on Open VSX →';

            footer.appendChild(version);
            footer.appendChild(linkText);

            card.appendChild(header);
            card.appendChild(desc);
            card.appendChild(footer);
            grid.appendChild(card);
        });
    }

    /**
     * Render service cards into the .services-grid container.
     */
    function renderServices() {
        var grid = document.querySelector('.services-grid');
        if (!grid) return;

        SERVICES.forEach(function (service) {
            var card = document.createElement('article');
            card.className = 'service-card';

            var icon = document.createElement('span');
            icon.className = 'service-icon';
            icon.setAttribute('aria-hidden', 'true');
            icon.textContent = service.icon;

            var title = document.createElement('h3');
            title.className = 'service-title';
            title.textContent = service.title;

            var desc = document.createElement('p');
            desc.className = 'service-desc';
            desc.textContent = service.desc;

            card.appendChild(icon);
            card.appendChild(title);
            card.appendChild(desc);
            grid.appendChild(card);
        });
    }

    /**
     * Render professional highlight cards into the .highlights-grid container.
     */
    function renderHighlights() {
        var grid = document.querySelector('.highlights-grid');
        if (!grid) return;

        HIGHLIGHTS.forEach(function (highlight) {
            var card = document.createElement('div');
            card.className = 'highlight-card';

            var iconWrapper = document.createElement('div');
            iconWrapper.className = 'highlight-card-icon';
            iconWrapper.setAttribute('aria-hidden', 'true');
            iconWrapper.textContent = highlight.icon;

            var textWrapper = document.createElement('div');

            var title = document.createElement('h3');
            title.className = 'highlight-card-title';
            title.textContent = highlight.title;

            var desc = document.createElement('p');
            desc.className = 'highlight-card-desc';
            desc.textContent = highlight.desc;

            textWrapper.appendChild(title);
            textWrapper.appendChild(desc);

            card.appendChild(iconWrapper);
            card.appendChild(textWrapper);
            grid.appendChild(card);
        });
    }


    /* ==========================================================
       INITIALIZE
       ========================================================== */

    function init() {
        initPreloader();
        initParticles();
        initTypingEffect();
        initNavigation();

        // Render dynamic content using secure DOM methods
        renderSkills();
        renderProjects();
        renderExtensions();
        renderServices();
        renderHighlights();

        // Start scroll reveal after content is in the DOM
        initScrollReveal();
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
