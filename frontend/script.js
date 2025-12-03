document.addEventListener('DOMContentLoaded', () => {
    // --- THEME MANAGEMENT ---
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const mobileThemeToggleBtn = document.getElementById('mobileThemeToggleBtn');

    const setInitialTheme = () => {
        const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        document.body.setAttribute('data-theme', currentTheme);
    };

    const handleThemeToggle = () => {
        const newTheme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    setInitialTheme();
    if (themeToggleBtn) themeToggleBtn.addEventListener('click', handleThemeToggle);
    if (mobileThemeToggleBtn) mobileThemeToggleBtn.addEventListener('click', handleThemeToggle);

    // --- NAVIGATION ---
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

    const toggleMobileMenu = () => {
        hamburgerMenu.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('show');
    };

    const closeMobileMenu = () => {
        hamburgerMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('show');
    };

    if (hamburgerMenu && mobileMenuOverlay) {
        hamburgerMenu.addEventListener('click', toggleMobileMenu);
        mobileMenuOverlay.addEventListener('click', (e) => {
            if (e.target === mobileMenuOverlay) {
                closeMobileMenu();
            }
        });
        document.querySelectorAll('.mobile-menu-link').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    // --- LANGUAGE SWITCHER ---
    const languageSelectorBtn = document.getElementById('language-selector-btn');
    const languageOptions = document.getElementById('language-options');
    const currentLanguageSpan = document.getElementById('current-language');
    const mobileLanguageSelectorBtn = document.getElementById('mobileLanguageSelectorBtn');
    const mobileLanguageOptions = document.getElementById('mobileLanguageOptions');
    const mobileCurrentLanguageSpan = document.getElementById('mobileCurrentLanguage');

    const updateLanguageDisplay = (lang) => {
        const langText = document.querySelector(`#language-options a[data-lang="${lang}"]`)?.textContent || 'English';
        if (currentLanguageSpan) currentLanguageSpan.textContent = langText;
        const mobileLangText = document.querySelector(`#mobileLanguageOptions a[data-lang="${lang}"]`)?.textContent || 'EN';
        if (mobileCurrentLanguageSpan) mobileCurrentLanguageSpan.textContent = mobileLangText.split(' ')[0]; // Show only 'English' not 'English'
    };

    const handleLanguageChange = async (lang) => {
        if (typeof i18n !== 'undefined' && i18n.changeLanguage) {
            await i18n.changeLanguage(lang);
            updateLanguageDisplay(lang);
            localStorage.setItem('language', lang);
        }
    };

    if (languageSelectorBtn && languageOptions) {
        languageSelectorBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            languageOptions.classList.toggle('show')
        });
        languageOptions.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' && e.target.dataset.lang) {
                e.preventDefault();
                handleLanguageChange(e.target.dataset.lang);
                languageOptions.classList.remove('show');
            }
        });
    }

    if (mobileLanguageSelectorBtn && mobileLanguageOptions) {
        mobileLanguageSelectorBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileLanguageOptions.classList.toggle('show')
        });
        mobileLanguageOptions.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' && e.target.dataset.lang) {
                e.preventDefault();
                handleLanguageChange(e.target.dataset.lang);
                mobileLanguageOptions.classList.remove('show');
            }
        });
    }

    // Set initial language on load
    const savedLang = localStorage.getItem('language') || 'en';
    if (typeof i18n !== 'undefined') {
        i18n.on('initialized', () => {
            updateLanguageDisplay(i18n.language);
        });
        if (i18n.isInitialized) {
             updateLanguageDisplay(i18n.language);
        }
    }


    // --- HEADER SCROLL EFFECT ---
    const topNav = document.querySelector('.top-nav');
    if (topNav) {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                topNav.classList.add('scrolled');
            } else {
                topNav.classList.remove('scrolled');
            }
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // --- SITEMAP EXPAND FUNCTIONALITY ---
    const expandButtons = {
        converter: document.getElementById('converterExpandBtn'),
        downloader: document.getElementById('downloaderExpandBtn'),
        generator: document.getElementById('generatorExpandBtn'),
        calculator: document.getElementById('calculatorExpandBtn')
    };

    const navSections = {
        converter: document.querySelector('.category-icons-nav'),
        downloader: document.querySelector('.platform-icons-nav'),
        generator: document.querySelector('.generator-links-nav'), // Assuming these exist or will be added
        calculator: document.querySelector('.calculator-links-nav') // Assuming these exist or will be added
    };

    const conversionCategories = document.querySelector('.supported-conversions');

    const closeAllExpands = (exceptFor = null) => {
        for (const key in expandButtons) {
            if (key !== exceptFor && expandButtons[key]) {
                expandButtons[key].classList.remove('expanded');
            }
        }
        for (const key in navSections) {
            if (key !== exceptFor && navSections[key]) {
                navSections[key].classList.remove('show');
            }
        }
        // Special handling for converter's sub-categories
        if (exceptFor !== 'converter') {
            if (conversionCategories) conversionCategories.style.display = 'none';
            document.querySelectorAll('.conversion-category, .category-icon-btn').forEach(el => el.classList.remove('active', 'show-badges'));
        }
    };
    
    if (expandButtons.converter && navSections.converter) {
        expandButtons.converter.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpening = !navSections.converter.classList.contains('show');
            closeAllExpands('converter');
            navSections.converter.classList.toggle('show');
            expandButtons.converter.classList.toggle('expanded');
            if (conversionCategories) {
                if (isOpening) {
                    conversionCategories.style.display = 'block';
                    // Activate the first category by default
                    const firstCategoryBtn = document.querySelector('.category-icon-btn');
                    if(firstCategoryBtn) firstCategoryBtn.click();
                } else {
                    conversionCategories.style.display = 'none';
                }
            }
        });
    }

    if (expandButtons.downloader && navSections.downloader) {
        expandButtons.downloader.addEventListener('click', (e) => {
            e.stopPropagation();
            closeAllExpands('downloader');
            navSections.downloader.classList.toggle('show');
            expandButtons.downloader.classList.toggle('expanded');
        });
    }

    // Logic for Generator and Calculator (if they get expandable sections)
    if (expandButtons.generator) {
        expandButtons.generator.addEventListener('click', (e) => {
            e.stopPropagation();
            closeAllExpands('generator');
            // Add logic to show generator links if any
        });
    }
    if (expandButtons.calculator) {
        expandButtons.calculator.addEventListener('click', (e) => {
            e.stopPropagation();
            closeAllExpands('calculator');
            // Add logic to show calculator links if any
        });
    }


    // Category icon click inside converter
    const categoryIconBtns = document.querySelectorAll('.category-icon-btn');
    categoryIconBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const category = btn.dataset.category;
            
            categoryIconBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            document.querySelectorAll('.conversion-category').forEach(cat => {
                cat.classList.remove('active', 'show-badges');
            });

            const targetCategory = document.querySelector(`.conversion-category[data-category="${category}"]`);
            if (targetCategory) {
                targetCategory.classList.add('active');
                setTimeout(() => targetCategory.classList.add('show-badges'), 10); // For transition
            }
        });
    });

    // Close menus if clicking outside
    document.addEventListener('click', () => {
        if (languageOptions) languageOptions.classList.remove('show');
        if (mobileLanguageOptions) mobileLanguageOptions.classList.remove('show');
        closeAllExpands();
    });
});