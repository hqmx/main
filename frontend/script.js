/**
 * HQMX Main Page Script
 * Clean, minimal script for main service (sitemap, theme, language, mobile menu)
 */

(function () {
    'use strict';

    // =========================================
    // THEME MANAGEMENT
    // =========================================
    const currentTheme = localStorage.getItem('theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.body.setAttribute('data-theme', currentTheme);

    function handleThemeToggle() {
        const newTheme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    // =========================================
    // MOBILE MENU
    // =========================================
    function toggleMobileMenu() {
        const hamburgerMenu = document.getElementById('hamburgerMenu');
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

        if (hamburgerMenu) hamburgerMenu.classList.toggle('active');
        if (mobileMenuOverlay) mobileMenuOverlay.classList.toggle('show');
    }

    function closeMobileMenu() {
        const hamburgerMenu = document.getElementById('hamburgerMenu');
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

        if (hamburgerMenu) hamburgerMenu.classList.remove('active');
        if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('show');
    }

    // =========================================
    // LANGUAGE SWITCHER
    // =========================================
    function setupLanguageSwitcher() {
        const languageSelectorBtn = document.getElementById('language-selector-btn');
        const languageOptions = document.getElementById('language-options');

        if (languageSelectorBtn && languageOptions) {
            languageSelectorBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                languageOptions.classList.toggle('show');
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!languageSelectorBtn.contains(e.target) && !languageOptions.contains(e.target)) {
                    languageOptions.classList.remove('show');
                }
            });
        }

        // Mobile language switcher
        const mobileLanguageSelectorBtn = document.getElementById('mobileLanguageSelectorBtn');
        const mobileLanguageOptions = document.getElementById('mobileLanguageOptions');

        if (mobileLanguageSelectorBtn && mobileLanguageOptions) {
            mobileLanguageSelectorBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                mobileLanguageOptions.classList.toggle('show');
            });
        }
    }

    // =========================================
    // NAVIGATION SCROLL EFFECT
    // =========================================
    function setupScrollEffect() {
        const topNav = document.querySelector('.top-nav');
        if (!topNav) return;

        function handleScroll() {
            if (window.scrollY > 10) {
                topNav.classList.add('scrolled');
            } else {
                topNav.classList.remove('scrolled');
            }
        }

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // =========================================
    // SITEMAP EXPAND BUTTONS
    // =========================================
    function initSitemap() {
        // Elements
        const converterExpandBtn = document.getElementById('converterExpandBtn');
        const categoryIconsNav = document.querySelector('.category-icons-nav');
        const categoryIconBtns = document.querySelectorAll('.category-icon-btn');
        const supportedConversions = document.querySelector('.supported-conversions');

        const downloaderExpandBtn = document.getElementById('downloaderExpandBtn');
        const platformIconsNav = document.querySelector('.platform-icons-nav');
        const platformIconBtns = document.querySelectorAll('.platform-icon-btn');

        const generatorExpandBtn = document.getElementById('generatorExpandBtn');
        const generatorLinksNav = document.querySelector('.generator-links-nav');

        const calculatorExpandBtn = document.getElementById('calculatorExpandBtn');
        const calculatorLinksNav = document.querySelector('.calculator-links-nav');
        const calculatorIconBtns = document.querySelectorAll('.calculator-links-nav .platform-icon-btn');
        const calculatorBadgesSection = document.querySelector('.calculator-badges-section');

        // Helper: Close all other panels
        function closeOtherPanels(currentPanel) {
            if (currentPanel !== 'converter' && categoryIconsNav && categoryIconsNav.classList.contains('show')) {
                categoryIconsNav.classList.remove('show');
                if (converterExpandBtn) converterExpandBtn.classList.remove('expanded');
                categoryIconBtns.forEach(btn => btn.classList.remove('active'));
                document.querySelectorAll('.conversion-category').forEach(cat => {
                    cat.classList.remove('active', 'show-badges');
                });
                if (supportedConversions) supportedConversions.style.display = 'none';
            }

            if (currentPanel !== 'downloader' && platformIconsNav && platformIconsNav.classList.contains('show')) {
                platformIconsNav.classList.remove('show');
                if (downloaderExpandBtn) downloaderExpandBtn.classList.remove('expanded');
                platformIconBtns.forEach(btn => btn.classList.remove('active'));
            }

            if (currentPanel !== 'generator' && generatorLinksNav && generatorLinksNav.classList.contains('show')) {
                generatorLinksNav.classList.remove('show');
                if (generatorExpandBtn) generatorExpandBtn.classList.remove('expanded');
            }

            if (currentPanel !== 'calculator' && calculatorLinksNav && calculatorLinksNav.classList.contains('show')) {
                calculatorLinksNav.classList.remove('show');
                if (calculatorExpandBtn) calculatorExpandBtn.classList.remove('expanded');
                // Remove active class from calculator icons
                const calcIconBtns = document.querySelectorAll('.calculator-links-nav .platform-icon-link .platform-icon-btn');
                calcIconBtns.forEach(btn => btn.classList.remove('active'));

                // Hide calculator badges sections
                if (calculatorBadgesSection) {
                    calculatorBadgesSection.style.display = 'none';
                    calculatorBadgesSection.querySelectorAll('.conversion-category').forEach(cat => {
                        cat.classList.remove('active', 'show-badges');
                    });
                }
            }
        }

        // Toggle functions
        function toggleCategoryIcons() {
            if (!categoryIconsNav) return;
            closeOtherPanels('converter');
            categoryIconsNav.classList.toggle('show');
            if (converterExpandBtn) converterExpandBtn.classList.toggle('expanded');
            if (supportedConversions) {
                supportedConversions.style.display = categoryIconsNav.classList.contains('show') ? 'block' : 'none';
            }
        }

        function togglePlatformIcons() {
            if (!platformIconsNav) return;
            closeOtherPanels('downloader');
            platformIconsNav.classList.toggle('show');
            if (downloaderExpandBtn) downloaderExpandBtn.classList.toggle('expanded');
        }

        function toggleGeneratorLinks() {
            if (!generatorLinksNav) return;
            closeOtherPanels('generator');
            generatorLinksNav.classList.toggle('show');
            if (generatorExpandBtn) generatorExpandBtn.classList.toggle('expanded');
        }

        function toggleCalculatorLinks() {
            if (!calculatorLinksNav) return;
            closeOtherPanels('calculator');
            calculatorLinksNav.classList.toggle('show');
            if (calculatorExpandBtn) calculatorExpandBtn.classList.toggle('expanded');

            // If opening calculator panel, show badges section if a category was previously active, or hide if closing
            if (calculatorBadgesSection) {
                if (calculatorLinksNav.classList.contains('show')) {
                    // Check if any specific category was active, otherwise maybe show default or none?
                    // For now, let's keep it hidden until a category is clicked, or show if it was open.
                    // Actually, consistent with Converter, we might want to just show the nav first.
                    // But if we want it to behave exactly like Converter where click opens badges:
                    // The toggle button just opens the icons. Clicking icons opens badges.
                    calculatorBadgesSection.style.display = 'none'; // Ensure closed initially or when toggling via + button
                } else {
                    calculatorBadgesSection.style.display = 'none';
                }
            }
        }

        // Event Listeners
        if (converterExpandBtn) {
            converterExpandBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleCategoryIcons();
            });
        }

        if (downloaderExpandBtn) {
            downloaderExpandBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                togglePlatformIcons();
            });
        }

        if (generatorExpandBtn) {
            generatorExpandBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleGeneratorLinks();
            });
        }

        if (calculatorExpandBtn) {
            calculatorExpandBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleCalculatorLinks();
            });
        }

        // Category Icon Buttons (Converter)
        categoryIconBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.category;
                if (!categoryIconsNav.classList.contains('show')) {
                    categoryIconsNav.classList.add('show');
                    if (converterExpandBtn) converterExpandBtn.classList.add('expanded');
                    if (supportedConversions) supportedConversions.style.display = 'block';
                }
                categoryIconBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                document.querySelectorAll('.conversion-category').forEach(cat => {
                    cat.classList.remove('active', 'show-badges');
                });
                const targetCategory = document.querySelector(`.conversion-category[data-category="${category}"]`);
                if (targetCategory) {
                    targetCategory.classList.add('active', 'show-badges');
                }
            });
        });

        // Platform Icon Buttons (Downloader)
        platformIconBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.disabled || btn.classList.contains('disabled')) return;
                if (!platformIconsNav.classList.contains('show')) {
                    platformIconsNav.classList.add('show');
                    if (downloaderExpandBtn) downloaderExpandBtn.classList.add('expanded');
                }
                platformIconBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        // Calculator Icon Buttons
        const calcLinkWrappers = document.querySelectorAll('.calculator-links-nav .platform-icon-link');
        calcLinkWrappers.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent navigation
                const btn = link.querySelector('.platform-icon-btn');
                const category = link.dataset.category;

                if (calculatorBadgesSection) {
                    // If icons nav isn't shown (weird case but good to handle), show it
                    if (!calculatorLinksNav.classList.contains('show')) {
                        calculatorLinksNav.classList.add('show');
                        if (calculatorExpandBtn) calculatorExpandBtn.classList.add('expanded');
                    }

                    calculatorBadgesSection.style.display = 'block';

                    // Update active state for buttons
                    const allCalcBtns = document.querySelectorAll('.calculator-links-nav .platform-icon-link .platform-icon-btn');
                    allCalcBtns.forEach(b => b.classList.remove('active'));
                    if (btn) btn.classList.add('active');

                    // Show specific badge category
                    calculatorBadgesSection.querySelectorAll('.conversion-category').forEach(cat => {
                        cat.classList.remove('active', 'show-badges');
                    });

                    const targetCategory = calculatorBadgesSection.querySelector(`.conversion-category[data-category="${category}"]`);
                    if (targetCategory) {
                        targetCategory.classList.add('active', 'show-badges');
                    }
                }
            });
        });

        console.log('[HQMX] Sitemap initialized successfully');
    }

    // =========================================
    // INITIALIZATION
    // =========================================
    function init() {
        // Theme toggle buttons
        const themeToggleBtn = document.getElementById('themeToggleBtn');
        const mobileThemeToggleBtn = document.getElementById('mobileThemeToggleBtn');

        if (themeToggleBtn) {
            themeToggleBtn.addEventListener('click', handleThemeToggle);
        }
        if (mobileThemeToggleBtn) {
            mobileThemeToggleBtn.addEventListener('click', handleThemeToggle);
        }

        // Hamburger menu
        const hamburgerMenu = document.getElementById('hamburgerMenu');
        if (hamburgerMenu) {
            hamburgerMenu.addEventListener('click', toggleMobileMenu);
        }

        // Close mobile menu on overlay click
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
        if (mobileMenuOverlay) {
            mobileMenuOverlay.addEventListener('click', (e) => {
                if (e.target === mobileMenuOverlay) {
                    closeMobileMenu();
                }
            });
        }

        // Language switcher
        setupLanguageSwitcher();

        // Scroll effect
        setupScrollEffect();

        // Sitemap functionality
        initSitemap();

        console.log('[HQMX] Main page initialized');
    }

    // Run on DOMContentLoaded or immediately if already ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
