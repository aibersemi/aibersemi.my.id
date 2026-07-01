/**
 * AiBersemi — IT Systems, Automation & Software Portfolio
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

    const SKILLS = [
        { name: 'JavaScript', icon: '⚡' },
        { name: 'Python', icon: '🐍' },
        { name: 'HTML', icon: '🌐' },
        { name: 'CSS', icon: '🎨' },
        { name: 'Web Development', icon: '💻' },
        { name: 'Backend Development', icon: '🔗' },
        { name: 'API Integration', icon: '🔗' },
        { name: 'Automation', icon: '⚙️' },
        { name: 'Workflow Optimization', icon: '📊' },
        { name: 'AI Tools', icon: '🤖' },
        { name: 'AI Workflow Integration', icon: '✨' },
        { name: 'GitHub', icon: '🐙' },
        { name: 'Linux', icon: '🐧' },
        { name: 'Docker', icon: '📦' },
        { name: 'VPS Management', icon: '🖥️' },
        { name: 'Deployment', icon: '🚀' },
        { name: 'DevOps Workflow', icon: '🛠️' },
        { name: 'Developer Tools', icon: '🧩' },
    ];

    const PROFILE_CONFIG = {
        githubUsername: 'aibersemi',
        openVsxNamespace: 'aibersemi',
        cacheTtlMs: 1000 * 60 * 30,
        projectLimit: 6,
        extensionLimit: 6,
    };

    const API_CACHE_KEYS = {
        projects: 'aibersemi.github-projects.v2',
        extensions: 'aibersemi.open-vsx-extensions.v2',
    };

    const LANGUAGE_COLORS = {
        JavaScript: '#f1e05a',
        TypeScript: '#3178c6',
        Python: '#3572a5',
        Shell: '#89e051',
        HTML: '#e34c26',
        CSS: '#563d7c',
        Vue: '#41b883',
        Svelte: '#ff3e00',
        PHP: '#4f5d95',
        Go: '#00add8',
        Rust: '#dea584',
        Java: '#b07219',
    };

    const PROJECT_DISPLAY_OVERRIDES = {
        'manufacturing-information-system': {
            name: 'Manufacturing Information System',
            description:
                'A practical information system for managing production, inventory, and operational workflows.',
        },
        'open-quota-antigravity': {
            name: 'Quota Monitoring Extension',
            description:
                'A status bar extension that provides a quick view of quota usage for a development environment.',
        },
        'aibersemi.my.id': {
            name: 'AiBersemi Portfolio Website',
            description:
                'A static professional portfolio website built to present technical work, services, and public developer profiles.',
        },
        'git-auto-commit-ollama': {
            name: 'AI-Assisted Git Commit Helper',
            description:
                'A shell-based workflow helper for generating structured Git commits with AI-assisted local tooling.',
        },
    };

    const EXTENSION_DISPLAY_OVERRIDES = {
        'open-quota-antigravity': {
            name: 'Quota Monitoring Extension',
            description:
                'A lightweight editor extension that shows quota usage from the status bar for a development workflow.',
        },
    };

    /**
     * GitHub project data — sourced from the AiBersemi GitHub API.
     * Used as fallback when the API is unavailable.
     */
    const PROJECTS = [
        {
            name: 'Manufacturing Information System',
            description:
                'A practical information system for managing production, inventory, and operational workflows.',
            language: 'PHP',
            languageColor: '#4f5d95',
            url: 'https://github.com/aibersemi/manufacturing-information-system',
        },
        {
            name: 'Quota Monitoring Extension',
            description:
                'A status bar extension that provides a quick view of quota usage for a development environment.',
            language: 'JavaScript',
            languageColor: '#f1e05a',
            url: 'https://github.com/aibersemi/open-quota-antigravity',
        },
        {
            name: 'AiBersemi Portfolio Website',
            description:
                'A static professional portfolio website built to present technical work, services, and public developer profiles.',
            language: 'HTML',
            languageColor: '#e34c26',
            url: 'https://github.com/aibersemi/aibersemi.my.id',
        },
        {
            name: 'AI-Assisted Git Commit Helper',
            description:
                'A shell-based workflow helper for generating structured Git commits with AI-assisted local tooling.',
            language: 'Shell',
            languageColor: '#89e051',
            url: 'https://github.com/aibersemi/git-auto-commit-ollama',
        },
    ];

    /**
     * Open VSX extensions — sourced from the Open VSX API.
     * Used as fallback when the API is unavailable.
     */
    const EXTENSIONS = [
        {
            name: 'Quota Monitoring Extension',
            slug: 'open-quota-antigravity',
            description:
                'A lightweight editor extension that shows quota usage from the status bar for a development workflow.',
            version: '1.1.5',
            publisher: 'aibersemi',
            url: 'https://open-vsx.org/extension/aibersemi/open-quota-antigravity',
        },
    ];

    /**
     * Services data — professional capabilities.
     */
    const SERVICES = [
        {
            icon: '🧭',
            title: 'IT Systems Implementation',
            desc: 'Designing and implementing practical digital systems that support operational workflows and business processes.',
        },
        {
            icon: '🌐',
            title: 'Web Application Development',
            desc: 'Building responsive, maintainable web applications using modern web standards and clean implementation practices.',
        },
        {
            icon: '⚙️',
            title: 'Automation & Workflow Optimization',
            desc: 'Creating automation scripts and workflow tools that reduce repetitive tasks, improve speed, and minimize manual errors.',
        },
        {
            icon: '🔗',
            title: 'Backend & API Integration',
            desc: 'Developing backend logic, API connections, and system integrations that allow tools and platforms to work together.',
        },
        {
            icon: '🚀',
            title: 'Infrastructure & Deployment',
            desc: 'Setting up Linux-based servers, VPS environments, Docker services, reverse proxy workflows, and deployment processes.',
        },
        {
            icon: '🤖',
            title: 'AI Workflow Integration',
            desc: 'Applying AI-assisted tools to improve productivity, documentation, coding workflows, and operational decision support.',
        },
        {
            icon: '🛠️',
            title: 'Developer Tooling',
            desc: 'Building utilities, extensions, and productivity tools that support software development and technical operations.',
        },
        {
            icon: '🔍',
            title: 'Technical Problem Solving',
            desc: 'Analyzing technical problems, identifying root causes, and implementing practical, well-documented solutions.',
        },
    ];

    /**
     * Professional highlights data.
     */
    const HIGHLIGHTS = [
        {
            icon: '🔧',
            title: 'Practical Systems Builder',
            desc: 'Builds digital tools and systems that solve real operational and technical problems.',
        },
        {
            icon: '⚡',
            title: 'Automation-Focused',
            desc: 'Improves workflows through automation, integration, and structured process design.',
        },
        {
            icon: '🖥️',
            title: 'Infrastructure-Aware',
            desc: 'Understands server environments, deployment workflows, and maintainable service operations.',
        },
        {
            icon: '🔗',
            title: 'API & Integration Mindset',
            desc: 'Connects systems through APIs and structured data flows to reduce fragmented work.',
        },
        {
            icon: '📈',
            title: 'Continuous Improvement',
            desc: 'Learns, iterates, documents, and improves systems based on real usage.',
        },
    ];

    /**
     * Typing effect phrases for the hero subtitle.
     */
    const TYPING_PHRASES = [
        'IT Professional',
        'Software Developer',
        'Automation Practitioner',
        'Web Development',
        'API Integration Builder',
        'AI Workflow Builder',
        'DevOps & Deployment',
        'Extension Developer',
        'Tool Builder',
        'Network & Infrastructure',
        'VPS Deployment & Configuration',
        'Email Server Builder',
        'Open Source Contributor',
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

    function getGitHubProjectsApiUrl() {
        return (
            'https://api.github.com/users/' +
            encodeURIComponent(PROFILE_CONFIG.githubUsername) +
            '/repos?type=owner&sort=pushed&direction=desc&per_page=100'
        );
    }

    function getOpenVsxNamespaceApiUrl() {
        return 'https://open-vsx.org/api/' + encodeURIComponent(PROFILE_CONFIG.openVsxNamespace);
    }

    function getOpenVsxExtensionUrl(namespace, extensionName) {
        return 'https://open-vsx.org/extension/' + encodeURIComponent(namespace) + '/' + encodeURIComponent(extensionName);
    }

    function readCachedData(key) {
        try {
            var raw = window.localStorage.getItem(key);
            if (!raw) return null;

            var payload = JSON.parse(raw);
            var isFresh =
                payload &&
                Array.isArray(payload.data) &&
                typeof payload.timestamp === 'number' &&
                Date.now() - payload.timestamp < PROFILE_CONFIG.cacheTtlMs;

            return isFresh ? payload.data : null;
        } catch (err) {
            return null;
        }
    }

    function writeCachedData(key, data) {
        try {
            window.localStorage.setItem(
                key,
                JSON.stringify({
                    timestamp: Date.now(),
                    data: data,
                })
            );
        } catch (err) {
            // Local cache is optional; the page still works if browser storage is blocked.
        }
    }

    function getLanguageColor(language) {
        return LANGUAGE_COLORS[language] || '#64748b';
    }

    async function fetchJson(url, options) {
        var response = await fetch(url, options || {});

        if (!response.ok) {
            throw new Error('Request failed with status ' + response.status + ' for ' + url);
        }

        return response.json();
    }

    function normalizeGitHubRepo(repo) {
        var display = PROJECT_DISPLAY_OVERRIDES[repo.name] || {};

        return {
            name: display.name || repo.name,
            description:
                display.description ||
                repo.description ||
                'Public repository from the AiBersemi GitHub profile.',
            language: repo.language || 'Repository',
            languageColor: getLanguageColor(repo.language),
            url: repo.html_url,
        };
    }

    async function fetchGitHubProjects() {
        var repos = await fetchJson(getGitHubProjectsApiUrl(), {
            headers: {
                Accept: 'application/vnd.github+json',
            },
        });

        if (!Array.isArray(repos)) {
            throw new Error('Unexpected GitHub API response');
        }

        return repos
            .filter(function (repo) {
                return repo && !repo.fork && !repo.archived && !repo.disabled && repo.html_url;
            })
            .slice(0, PROFILE_CONFIG.projectLimit)
            .map(normalizeGitHubRepo);
    }

    function normalizeOpenVsxExtension(ext) {
        var display = EXTENSION_DISPLAY_OVERRIDES[ext.name] || {};

        return {
            name: display.name || ext.displayName || ext.name,
            slug: ext.name,
            description:
                display.description ||
                ext.description ||
                'Published developer tool from the AiBersemi Open VSX namespace.',
            version: ext.version,
            publisher: ext.namespaceDisplayName || ext.namespace || PROFILE_CONFIG.openVsxNamespace,
            url: getOpenVsxExtensionUrl(ext.namespace || PROFILE_CONFIG.openVsxNamespace, ext.name),
        };
    }

    async function fetchOpenVsxExtensions() {
        var namespaceData = await fetchJson(getOpenVsxNamespaceApiUrl());
        var extensionMap = namespaceData && namespaceData.extensions;

        if (!extensionMap || typeof extensionMap !== 'object') {
            throw new Error('Unexpected Open VSX namespace response');
        }

        var detailUrls = Object.keys(extensionMap).map(function (slug) {
            return extensionMap[slug];
        });

        var details = await Promise.all(
            detailUrls.map(function (url) {
                return fetchJson(url);
            })
        );

        return details
            .filter(function (ext) {
                return ext && ext.name;
            })
            .sort(function (a, b) {
                return new Date(b.timestamp || 0) - new Date(a.timestamp || 0);
            })
            .slice(0, PROFILE_CONFIG.extensionLimit)
            .map(normalizeOpenVsxExtension);
    }

    async function refreshProjectsFromApi() {
        var cachedProjects = readCachedData(API_CACHE_KEYS.projects);

        if (cachedProjects && cachedProjects.length) {
            renderProjects(cachedProjects);
            return;
        }

        try {
            var liveProjects = await fetchGitHubProjects();
            if (liveProjects.length) {
                writeCachedData(API_CACHE_KEYS.projects, liveProjects);
                renderProjects(liveProjects);
            }
        } catch (err) {
            console.warn('Failed to fetch GitHub projects:', err);
        }
    }

    async function refreshExtensionsFromApi() {
        var cachedExtensions = readCachedData(API_CACHE_KEYS.extensions);

        if (cachedExtensions && cachedExtensions.length) {
            renderExtensions(cachedExtensions);
            return;
        }

        try {
            var liveExtensions = await fetchOpenVsxExtensions();
            if (liveExtensions.length) {
                writeCachedData(API_CACHE_KEYS.extensions, liveExtensions);
                renderExtensions(liveExtensions);
            }
        } catch (err) {
            console.warn('Failed to fetch Open VSX extensions:', err);
        }
    }

    function refreshPortfolioData() {
        refreshProjectsFromApi();
        refreshExtensionsFromApi();
    }

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
    function renderProjects(projects) {
        var grid = document.getElementById('projects-grid');
        if (!grid) return;

        var projectItems = Array.isArray(projects) && projects.length ? projects : PROJECTS;
        grid.replaceChildren();

        projectItems.forEach(function (project) {
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
    function renderExtensions(extensions) {
        var grid = document.getElementById('extensions-grid');
        if (!grid) return;

        var extensionItems = Array.isArray(extensions) && extensions.length ? extensions : EXTENSIONS;
        grid.replaceChildren();

        extensionItems.forEach(function (ext) {
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
            textWrapper.className = 'extension-card-text';

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

            if (ext.version) {
                var version = document.createElement('span');
                version.className = 'extension-version';
                version.textContent = 'v' + ext.version;
                footer.appendChild(version);
            }

            var linkText = document.createElement('span');
            linkText.className = 'extension-card-link';
            linkText.textContent = 'View on Open VSX →';

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
        refreshPortfolioData();
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
