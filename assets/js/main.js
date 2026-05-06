document.addEventListener('DOMContentLoaded', function () {
    // --- Elements ---
    const html = document.documentElement;
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.querySelector('.menu-icon');
    const xIcon = document.querySelector('.x-icon');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const themeToggleDesktop = document.getElementById('theme-toggle-desktop');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const contactForm = document.getElementById('contact-form');
    const submitButton = document.getElementById('submit-button');
    const statusMessage = document.getElementById('status-message');
    const skillsGrid = document.getElementById('skills-grid');
    const projectsGrid = document.getElementById('projects-grid');
    const faqList = document.getElementById('faq-list');
    const helpWidget = document.getElementById('help-widget');
    const helpToggle = document.getElementById('help-toggle');
    const helpActions = document.getElementById('help-actions');

    // --- State ---
    let isMenuOpen = false;
    let darkMode = true; // Default to dark
    let isHelpWidgetOpen = false;

    // --- Functions ---
    const renderSkills = (skills = []) => {
        if (!skillsGrid) {
            return;
        }

        skillsGrid.innerHTML = skills.map((group) => `
            <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 class="text-xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">${group.category}</h3>
                <div class="flex flex-wrap gap-2">
                    ${group.items.map((item) => `
                        <span class="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium">${item}</span>
                    `).join('')}
                </div>
            </div>
        `).join('');
    };

    const renderProjectLinks = (links = {}) => {
        const linkItems = [];

        if (links.live) {
            linkItems.push(`
                <a href="${links.live}" target="_blank" rel="noopener noreferrer"
                    class="flex items-center text-indigo-600 dark:text-indigo-400 hover:underline">
                    Live Demo <i data-lucide="external-link" class="ml-1" style="width: 16px; height: 16px;"></i>
                </a>
            `);
        }

        if (links.github) {
            linkItems.push(`
                <a href="${links.github}" target="_blank" rel="noopener noreferrer"
                    class="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                    <i data-lucide="github"></i>
                </a>
            `);
        }

        if (links.chrome) {
            linkItems.push(`
                <a href="${links.chrome}" target="_blank" rel="noopener noreferrer"
                    class="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                    <i data-lucide="blocks"></i>
                </a>
            `);
        }

        return linkItems.join('');
    };

    const renderProjects = (projects = []) => {
        if (!projectsGrid) {
            return;
        }

        projectsGrid.innerHTML = projects.map((project) => `
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300">
                <div class="p-6 flex flex-col h-full">
                    <h3 class="text-xl font-bold mb-2 text-indigo-600 dark:text-indigo-400">${project.title}</h3>
                    <p class="text-gray-600 dark:text-gray-400 mb-4 flex-grow">${project.description}</p>
                    <div class="mb-4">
                        ${project.tags.map((tag) => `
                            <span class="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-300 mr-2 mb-2">${tag}</span>
                        `).join('')}
                    </div>
                    <div class="mt-auto flex items-center space-x-4">
                        ${renderProjectLinks(project.links)}
                    </div>
                </div>
            </div>
        `).join('');
    };

    const renderFaqs = (faqs = []) => {
        if (!faqList) {
            return;
        }

        faqList.innerHTML = faqs.map((faq) => `
            <details class="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm">
                <summary class="font-semibold text-lg cursor-pointer list-none flex items-center justify-between">
                    ${faq.question}
                    <span class="text-indigo-500 ml-3">+</span>
                </summary>
                <p class="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">${faq.answer}</p>
            </details>
        `).join('');
    };

    const injectStructuredData = (data) => {
        const seo = data.seo || {};
        const faqs = data.faqs || [];

        const structuredData = [
            {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: `${seo.name || 'Dizaraj Dey'} Portfolio`,
                url: `${seo.siteUrl || 'https://dizaraj.github.io'}/`
            },
            {
                '@context': 'https://schema.org',
                '@type': 'Person',
                name: seo.name || 'Dizaraj Dey',
                jobTitle: seo.jobTitle || 'Web Developer',
                url: `${seo.siteUrl || 'https://dizaraj.github.io'}/`,
                email: seo.email ? `mailto:${seo.email}` : undefined,
                image: `${seo.siteUrl || 'https://dizaraj.github.io'}/assets/images/dizaraj.jpg`,
                sameAs: Array.isArray(seo.sameAs) ? seo.sameAs : undefined
            },
            {
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: faqs.map((faq) => ({
                    '@type': 'Question',
                    name: faq.question,
                    acceptedAnswer: {
                        '@type': 'Answer',
                        text: faq.answer
                    }
                }))
            }
        ];

        const scriptTag = document.createElement('script');
        scriptTag.type = 'application/ld+json';
        scriptTag.textContent = JSON.stringify(structuredData);
        document.head.appendChild(scriptTag);
    };

    const setupScrollEffects = () => {
        const revealTargets = document.querySelectorAll(
            'section h2, #about p, #services .grid > div, #skills-grid > div, #projects-grid > div, #faq-list > details, #contact .contact-grid > div'
        );

        revealTargets.forEach((el, index) => {
            el.classList.add('reveal-on-scroll');
            el.style.setProperty('--reveal-delay', `${Math.min(index * 55, 420)}ms`);
        });

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            revealTargets.forEach((el) => el.classList.add('is-visible'));
            return;
        }

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

        revealTargets.forEach((el) => revealObserver.observe(el));
    };

    const toggleHelpWidget = (isOpen) => {
        if (!helpWidget || !helpToggle || !helpActions) {
            return;
        }

        isHelpWidgetOpen = typeof isOpen === 'boolean' ? isOpen : !isHelpWidgetOpen;
        helpWidget.classList.toggle('is-open', isHelpWidgetOpen);
        helpToggle.setAttribute('aria-expanded', String(isHelpWidgetOpen));
        helpActions.setAttribute('aria-hidden', String(!isHelpWidgetOpen));
    };

    // Function to toggle the mobile menu
    const toggleMenu = () => {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.style.display = 'flex';
            menuIcon.style.display = 'none';
            xIcon.style.display = 'block';
        } else {
            mobileMenu.style.display = 'none';
            menuIcon.style.display = 'block';
            xIcon.style.display = 'none';
        }
    };

    // Function to set the theme
    const applyTheme = () => {
        if (darkMode) {
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            themeToggleDesktop.innerHTML = '<i data-lucide="sun" size="20"></i>';
            themeToggleMobile.innerHTML = '<i data-lucide="sun" size="20"></i>';
        } else {
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            themeToggleDesktop.innerHTML = '<i data-lucide="moon" size="20"></i>';
            themeToggleMobile.innerHTML = '<i data-lucide="moon" size="20"></i>';
        }
        lucide.createIcons(); // Re-render icons
    };

    // Function to toggle the theme
    const toggleTheme = () => {
        darkMode = !darkMode;
        applyTheme();
    };

    // Function to handle form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        statusMessage.style.display = 'none';
        statusMessage.className = 'mt-4 text-center p-3 rounded-md';

        // MOCK API CALL
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        console.log('Form data submitted:', data);

        await new Promise(resolve => setTimeout(resolve, 1500));

        const mockSuccess = true; // Simulate a successful submission

        if (mockSuccess) {
            statusMessage.textContent = 'Thank you! Your message has been sent.';
            statusMessage.classList.add('bg-green-100', 'dark:bg-green-900', 'text-green-800', 'dark:text-green-200');
            contactForm.reset();
        } else {
            statusMessage.textContent = 'Oops! Something went wrong. Please try again.';
            statusMessage.classList.add('bg-red-100', 'dark:bg-red-900', 'text-red-800', 'dark:text-red-200');
        }

        statusMessage.style.display = 'block';
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
    };

    // --- Initial Setup ---

    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Render dynamic sections from data source
    const portfolioData = window.PORTFOLIO_DATA || { skills: [], projects: [] };
    renderSkills(portfolioData.skills);
    renderProjects(portfolioData.projects);
    renderFaqs(portfolioData.faqs);
    injectStructuredData(portfolioData);
    setupScrollEffects();

    // Initialize Lucide icons
    lucide.createIcons();

    // Check for saved theme preference or system preference
    if (localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        darkMode = true;
    } else {
        darkMode = false;
    }
    applyTheme();

    // --- Event Listeners ---
    menuButton.addEventListener('click', toggleMenu);
    themeToggleDesktop.addEventListener('click', toggleTheme);
    themeToggleMobile.addEventListener('click', toggleTheme);
    contactForm.addEventListener('submit', handleFormSubmit);
    if (helpToggle) {
        helpToggle.addEventListener('click', () => toggleHelpWidget());
    }

    document.addEventListener('click', (event) => {
        if (!isHelpWidgetOpen || !helpWidget) {
            return;
        }

        if (!helpWidget.contains(event.target)) {
            toggleHelpWidget(false);
        }
    });

    // Close mobile menu when a link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                toggleMenu();
            }
        });
    });

    // --- 3D Rotation Effect ---
    const heroSection = document.getElementById('home');
    const profileCard = document.getElementById('profile-card');

    if (heroSection && profileCard) {
        let currentRotateX = 0;
        let currentRotateY = 0;
        let targetRotateX = 0;
        let targetRotateY = 0;
        let animationFrameId = null;

        const animateTilt = () => {
            currentRotateX += (targetRotateX - currentRotateX) * 0.12;
            currentRotateY += (targetRotateY - currentRotateY) * 0.12;

            profileCard.style.setProperty('--rotate-x', `${currentRotateX.toFixed(2)}deg`);
            profileCard.style.setProperty('--rotate-y', `${currentRotateY.toFixed(2)}deg`);

            animationFrameId = requestAnimationFrame(animateTilt);
        };

        animationFrameId = requestAnimationFrame(animateTilt);

        heroSection.addEventListener('mousemove', (e) => {
            const rect = profileCard.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const cardCenterY = rect.top + rect.height / 2;

            // Calculate cursor position relative to card center
            const mouseX = e.clientX - cardCenterX;
            const mouseY = e.clientY - cardCenterY;

            // Rotate based on mouse position (adjust multiplier for sensitivity)
            // Max rotation deg
            targetRotateX = (mouseY / 60) * -1; // Invert X axis for natural tilt
            targetRotateY = (mouseX / 60);
        });

        heroSection.addEventListener('mouseleave', () => {
            targetRotateX = 0;
            targetRotateY = 0;
        });

        window.addEventListener('beforeunload', () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        });
    }
});
