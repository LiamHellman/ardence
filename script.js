/**
 * Ardence - Website JavaScript
 * Handles navigation, smooth scrolling, and form interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    
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
    
    // Observe service cards and about members for animation
    document.querySelectorAll('.service-card, .about-member').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
    
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
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-on-scroll.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .service-card.animate-on-scroll:nth-child(2) {
        transition-delay: 0.1s;
    }
    
    .service-card.animate-on-scroll:nth-child(3) {
        transition-delay: 0.2s;
    }
    
    .about-member.animate-on-scroll:nth-child(2) {
        transition-delay: 0.15s;
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