/**
 * Ardence - Website JavaScript
 * Handles navigation, smooth scrolling, and form interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // Theme Toggle (Light / Dark)
    // =============================================
    const themeToggle = document.querySelector('.theme-toggle');
    const root = document.documentElement;
    const isEnglishPage = document.documentElement.lang === 'en';

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
        if (themeToggle) {
            themeToggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
            themeToggle.textContent = theme === 'dark' ? '☀' : '☾';
            themeToggle.setAttribute(
                'aria-label',
                theme === 'dark'
                    ? (isEnglishPage ? 'Enable light mode' : 'Activer le mode clair')
                    : (isEnglishPage ? 'Enable dark mode' : 'Activer le mode sombre')
            );
            themeToggle.setAttribute(
                'title',
                theme === 'dark'
                    ? (isEnglishPage ? 'Light mode' : 'Mode clair')
                    : (isEnglishPage ? 'Dark mode' : 'Mode sombre')
            );
        }
    }

    const savedTheme = localStorage.getItem('ardence-theme');
    const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(savedTheme || (systemDark ? 'dark' : 'light'));

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
            const next = current === 'dark' ? 'light' : 'dark';
            applyTheme(next);
            localStorage.setItem('ardence-theme', next);
        });
    }

    // =============================================
    // Nav dropdown (language + theme)
    // =============================================
    const navActions = document.querySelector('.nav-actions');
    const navMoreToggle = document.querySelector('.nav-more-toggle');

    function closeNavDropdown() {
        if (!navActions || !navMoreToggle) return;
        navActions.classList.remove('open');
        navMoreToggle.setAttribute('aria-expanded', 'false');
    }

    if (navActions && navMoreToggle) {
        navMoreToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const willOpen = !navActions.classList.contains('open');
            navActions.classList.toggle('open', willOpen);
            navMoreToggle.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
        });

        navActions.querySelectorAll('.nav-dropdown-item').forEach(item => {
            item.addEventListener('click', closeNavDropdown);
        });

        document.addEventListener('click', function(e) {
            if (!navActions.contains(e.target)) {
                closeNavDropdown();
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeNavDropdown();
            }
        });
    }

    
    // =============================================
    // Mobile Navigation Toggle
    // =============================================
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Toggle aria-expanded for accessibility
            const isExpanded = navMenu.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
        });
        
        // Close mobile menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // =============================================
    // Navbar Background on Scroll
    // =============================================
    const navbar = document.querySelector('.navbar');
    
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    
    // =============================================
    // Active Navigation Link on Scroll
    // =============================================
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink, { passive: true });
    
    // =============================================
    // Smooth Scroll for Anchor Links
    // =============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // =============================================
    // Form Handling removed - using inline onsubmit
    // Google Forms submission happens via hidden iframe
    // =============================================
    
    // =============================================
    // Intersection Observer for Animations
    // =============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe key content blocks with subtle staggered reveal
    const revealGroups = [
        { selector: '.section-title', step: 0.06 },
        { selector: '.section-subtitle', step: 0.08 },
        { selector: '.service-card', step: 0.08 },
        { selector: '.about-member', step: 0.10 },
        { selector: '.pricing-table-wrapper, .pricing-notes, .service-page-copy, .contact-form, .footer-content', step: 0.06 },
        { selector: '.service-gallery-item', step: 0.07 }
    ];

    revealGroups.forEach(group => {
        document.querySelectorAll(group.selector).forEach((el, index) => {
            if (el.classList.contains('animate-on-scroll')) return;
            el.classList.add('animate-on-scroll');
            el.style.transitionDelay = `${Math.min(index * group.step, 0.42)}s`;
            observer.observe(el);
        });
    });

    // =============================================
    // Align pricing notes with actual table width
    // =============================================
    function syncPricingNotesAlignment() {
        document.querySelectorAll('.pricing').forEach(section => {
            const table = section.querySelector('.pricing-table');
            const notes = section.querySelector('.pricing-notes');
            if (!table || !notes) return;

            const tableWidth = Math.round(table.getBoundingClientRect().width);
            if (tableWidth > 0) {
                notes.style.width = `${tableWidth}px`;
                notes.style.maxWidth = '100%';
            }
        });
    }

    syncPricingNotesAlignment();
    window.addEventListener('resize', syncPricingNotesAlignment, { passive: true });

    // =============================================
    // Pricing table targeted highlight behavior
    // =============================================
    document.querySelectorAll('.pricing-table').forEach(table => {
        const bodyRows = Array.from(table.querySelectorAll('tbody tr'));

        function clearActiveCells() {
            table.querySelectorAll('td.pricing-active').forEach(cell => {
                cell.classList.remove('pricing-active');
            });
        }

        function highlightColumn(colIndex) {
            bodyRows.forEach(row => {
                const cell = row.cells[colIndex];
                if (cell && !cell.classList.contains('row-header')) {
                    cell.classList.add('pricing-active');
                }
            });
        }

        function highlightRow(row) {
            Array.from(row.cells).forEach(cell => {
                if (!cell.classList.contains('row-header')) {
                    cell.classList.add('pricing-active');
                }
            });
        }

        table.addEventListener('mouseover', function(e) {
            const cell = e.target.closest('th, td');
            if (!cell || !table.contains(cell)) return;
            clearActiveCells();

            // Hovering people columns in header (4/5/6/7)
            if (cell.tagName === 'TH' && cell.parentElement.parentElement.tagName === 'THEAD' && cell.cellIndex > 0) {
                highlightColumn(cell.cellIndex);
                return;
            }

            // Hovering service-range row header (4 à 6 / 7 à 9 / 10 à 12)
            if (cell.tagName === 'TD' && cell.classList.contains('row-header')) {
                highlightRow(cell.parentElement);
                return;
            }
        });

        table.addEventListener('mouseleave', clearActiveCells);
    });

    // =============================================
    // Gallery lightbox popout
    // =============================================
    const galleryImages = document.querySelectorAll('.service-gallery-item img');
    if (galleryImages.length) {
        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.innerHTML = `
            <button class="lightbox-close" aria-label="${isEnglishPage ? 'Close image' : "Fermer l'image"}">&times;</button>
            <div class="lightbox-content">
                <img class="lightbox-image" alt="">
            </div>
        `;
        document.body.appendChild(overlay);

        const lightboxImg = overlay.querySelector('.lightbox-image');
        const closeBtn = overlay.querySelector('.lightbox-close');

        function closeLightbox() {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }

        function openLightbox(src, alt) {
            lightboxImg.src = src;
            lightboxImg.alt = alt || (isEnglishPage ? 'Gallery image' : 'Image galerie');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        galleryImages.forEach(img => {
            img.tabIndex = 0;
            img.setAttribute('role', 'button');
            img.setAttribute('aria-label', isEnglishPage ? 'Open full image' : 'Ouvrir l’image en grand');

            img.addEventListener('click', () => openLightbox(img.currentSrc || img.src, img.alt));
            img.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(img.currentSrc || img.src, img.alt);
                }
            });
        });

        closeBtn.addEventListener('click', closeLightbox);
        overlay.addEventListener('click', e => {
            if (e.target === overlay) closeLightbox();
        });
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && overlay.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    // =============================================
    // Google Form Date Field Handler
    // =============================================
    const dateInput = document.getElementById('date');
    if (dateInput) {
        dateInput.addEventListener('change', function() {
            if (this.value) {
                const dateParts = this.value.split('-');
                document.getElementById('date_year').value = dateParts[0];
                document.getElementById('date_month').value = parseInt(dateParts[1], 10);
                document.getElementById('date_day').value = parseInt(dateParts[2], 10);
            }
        });
    }
    
});

// Add CSS for scroll animations dynamically
const style = document.createElement('style');
style.textContent = `
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(22px) scale(0.995);
        transition: opacity 0.65s ease, transform 0.65s ease;
        will-change: opacity, transform;
    }
    
    .animate-on-scroll.visible {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
    
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #c0392b;
    }
    
    .nav-link.active {
        color: var(--color-burgundy);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
    
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(5px, -5px);
    }
`;
document.head.appendChild(style);

// =============================================
// Google Form Submission Confirmation
// =============================================
function showConfirmation() {
    // Ensure date fields are populated before submit
    const dateInput = document.getElementById('date');
    if (dateInput && dateInput.value) {
        const dateParts = dateInput.value.split('-');
        document.getElementById('date_year').value = dateParts[0];
        document.getElementById('date_month').value = parseInt(dateParts[1], 10);
        document.getElementById('date_day').value = parseInt(dateParts[2], 10);
    }
    
    // Small delay to allow form submission
    setTimeout(function() {
        document.getElementById('contactForm').style.display = 'none';
        document.getElementById('formConfirmation').style.display = 'block';
        
        // Scroll to confirmation
        document.getElementById('formConfirmation').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }, 500);
}