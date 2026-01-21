/*
 * MARK GRAYHAT - CYBERSECURITY WEBSITE
 * Interactive JavaScript Functionality
 */

// ============================================
// Initialize AOS (Animate On Scroll)
// ============================================
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// ============================================
// Navigation Scroll Effect
// ============================================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active navigation link
    updateActiveNavLink();
});

// ============================================
// Mobile Menu Toggle
// ============================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// ============================================
// Smooth Scroll for Navigation Links
// ============================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Update Active Navigation Link on Scroll
// ============================================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('.section, .hero');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ============================================
// Counter Animation for Hero Stats
// ============================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Trigger counter animation when hero section is in view
const heroSection = document.querySelector('.hero');
const statNumbers = document.querySelectorAll('.stat-number');
let countersAnimated = false;

const observerOptions = {
    threshold: 0.5
};

const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            countersAnimated = true;
        }
    });
}, observerOptions);

if (heroSection) {
    heroObserver.observe(heroSection);
}

// ============================================
// Matrix Rain Effect for Hero Background
// ============================================
function createMatrixRain() {
    const matrixRain = document.getElementById('matrixRain');
    if (!matrixRain) return;
    
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const columns = Math.floor(window.innerWidth / 20);
    
    for (let i = 0; i < columns; i++) {
        const span = document.createElement('span');
        span.textContent = characters[Math.floor(Math.random() * characters.length)];
        span.style.position = 'absolute';
        span.style.left = `${i * 20}px`;
        span.style.top = `${Math.random() * -100}px`;
        span.style.color = '#A3FF00';
        span.style.fontSize = '14px';
        span.style.fontFamily = 'monospace';
        span.style.animation = `matrixFall ${5 + Math.random() * 5}s linear infinite`;
        span.style.animationDelay = `${Math.random() * 5}s`;
        matrixRain.appendChild(span);
    }
}

// Add CSS animation for matrix fall
const style = document.createElement('style');
style.textContent = `
    @keyframes matrixFall {
        0% { transform: translateY(0); opacity: 1; }
        100% { transform: translateY(100vh); opacity: 0; }
    }
`;
document.head.appendChild(style);

createMatrixRain();

// ============================================
// FAQ Accordion Functionality
// ============================================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faq => {
            faq.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ============================================
// Contact Form Handling
// ============================================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            company: document.getElementById('company').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value,
            urgent: document.getElementById('urgent').checked
        };
        
        // Validate form
        if (!formData.name || !formData.email || !formData.service || !formData.message) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission (replace with actual API call)
        try {
            // Show loading state
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Success
            showFormMessage('Thank you! Your message has been sent successfully. I\'ll get back to you within 24 hours.', 'success');
            contactForm.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Log form data (for demonstration)
            console.log('Form submitted:', formData);
            
        } catch (error) {
            showFormMessage('Oops! Something went wrong. Please try again or email me directly.', 'error');
            
            // Reset button
            const submitBtn = contactForm.querySelector('.btn-submit');
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            submitBtn.disabled = false;
        }
    });
}

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        formMessage.className = 'form-message';
    }, 5000);
}

// ============================================
// Chat Widget Functionality
// ============================================
const chatWidget = document.getElementById('chatWidget');
const chatWidgetButton = document.getElementById('chatWidgetButton');
const chatWidgetContent = document.getElementById('chatWidgetContent');
const chatClose = document.getElementById('chatClose');
const chatSend = document.getElementById('chatSend');
const chatInput = document.getElementById('chatInput');

if (chatWidgetButton) {
    chatWidgetButton.addEventListener('click', () => {
        chatWidgetContent.classList.add('active');
    });
}

if (chatClose) {
    chatClose.addEventListener('click', () => {
        chatWidgetContent.classList.remove('active');
    });
}

// Quick replies functionality
const quickReplies = document.querySelectorAll('.quick-reply');
quickReplies.forEach(reply => {
    reply.addEventListener('click', () => {
        const message = reply.textContent;
        sendChatMessage(message);
    });
});

// Send chat message
if (chatSend) {
    chatSend.addEventListener('click', () => {
        const message = chatInput.value.trim();
        if (message) {
            sendChatMessage(message);
            chatInput.value = '';
        }
    });
}

// Send message on Enter key
if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const message = chatInput.value.trim();
            if (message) {
                sendChatMessage(message);
                chatInput.value = '';
            }
        }
    });
}

function sendChatMessage(message) {
    const chatBody = document.querySelector('.chat-body');
    
    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'chat-message sent';
    userMessage.innerHTML = `
        <p style="background: var(--primary-color); color: var(--bg-black); padding: 0.75rem; border-radius: 10px 10px 0 10px; text-align: right;">${message}</p>
        <span class="chat-time" style="text-align: right; display: block;">Just now</span>
    `;
    chatBody.appendChild(userMessage);
    
    // Scroll to bottom
    chatBody.scrollTop = chatBody.scrollHeight;
    
    // Simulate response (replace with actual chat integration)
    setTimeout(() => {
        const botMessage = document.createElement('div');
        botMessage.className = 'chat-message received';
        botMessage.innerHTML = `
            <p>Thanks for your message! I'll get back to you shortly. For urgent matters, please call me directly at +1 (234) 567-890.</p>
            <span class="chat-time">Just now</span>
        `;
        chatBody.appendChild(botMessage);
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 1000);
}

// ============================================
// Scroll to Top Button
// ============================================
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// Service Card Hover Effects
// ============================================
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// ============================================
// Portfolio Item Animations
// ============================================
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const overlay = item.querySelector('.portfolio-overlay');
        if (overlay) {
            overlay.style.transform = 'scale(1.2) rotate(10deg)';
        }
    });
    
    item.addEventListener('mouseleave', () => {
        const overlay = item.querySelector('.portfolio-overlay');
        if (overlay) {
            overlay.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// ============================================
// Testimonial Card Parallax Effect
// ============================================
const testimonialCards = document.querySelectorAll('.testimonial-card');

testimonialCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ============================================
// Blog Card Hover Animation
// ============================================
const blogCards = document.querySelectorAll('.blog-card');

blogCards.forEach(card => {
    const blogImage = card.querySelector('.blog-image i');
    
    card.addEventListener('mouseenter', () => {
        if (blogImage) {
            blogImage.style.transform = 'scale(1.2) rotate(10deg)';
            blogImage.style.opacity = '0.5';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        if (blogImage) {
            blogImage.style.transform = 'scale(1) rotate(0deg)';
            blogImage.style.opacity = '0.3';
        }
    });
});

// ============================================
// Loading Animation on Page Load
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// Glitch Effect for Hero Title
// ============================================
const glitchElement = document.querySelector('.glitch');

if (glitchElement) {
    setInterval(() => {
        glitchElement.style.textShadow = `
            ${Math.random() * 4 - 2}px ${Math.random() * 4 - 2}px 0 #A3FF00,
            ${Math.random() * 4 - 2}px ${Math.random() * 4 - 2}px 0 #ff0000
        `;
        
        setTimeout(() => {
            glitchElement.style.textShadow = '0 0 20px rgba(163, 255, 0, 0.3)';
        }, 50);
    }, 3000);
}

// ============================================
// Certification Badge Animation
// ============================================
const certBadges = document.querySelectorAll('.cert-badge');

certBadges.forEach((badge, index) => {
    badge.style.animationDelay = `${index * 0.1}s`;
});

// ============================================
// Security Shield Rotation Animation
// ============================================
const shieldCore = document.querySelector('.shield-core');

if (shieldCore) {
    let rotation = 0;
    setInterval(() => {
        rotation += 0.5;
        shieldCore.style.transform = `translateY(-20px) rotate(${rotation}deg)`;
    }, 50);
}

// ============================================
// Form Field Focus Effects
// ============================================
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'scale(1.02)';
        input.parentElement.style.transition = 'transform 0.2s ease';
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'scale(1)';
    });
});

// ============================================
// Cursor Glow Effect (Optional Enhancement)
// ============================================
const createCursorGlow = () => {
    const glow = document.createElement('div');
    glow.style.position = 'fixed';
    glow.style.width = '30px';
    glow.style.height = '30px';
    glow.style.borderRadius = '50%';
    glow.style.background = 'radial-gradient(circle, rgba(163, 255, 0, 0.3) 0%, transparent 70%)';
    glow.style.pointerEvents = 'none';
    glow.style.zIndex = '9999';
    glow.style.transition = 'transform 0.1s ease';
    document.body.appendChild(glow);
    
    document.addEventListener('mousemove', (e) => {
        glow.style.left = `${e.clientX - 15}px`;
        glow.style.top = `${e.clientY - 15}px`;
    });
};

// Uncomment to enable cursor glow effect
// createCursorGlow();

// ============================================
// Console Security Warning
// ============================================
console.log('%c⚠️ SECURITY WARNING!', 'color: #A3FF00; font-size: 24px; font-weight: bold;');
console.log('%cIf someone told you to copy/paste something here, it might be a scam!', 'color: #ffffff; font-size: 16px;');
console.log('%cThis feature is for developers only. Unauthorized access is monitored.', 'color: #cccccc; font-size: 14px;');
console.log('%cMark Grayhat - Ethical Hacker & Cybersecurity Consultant', 'color: #A3FF00; font-size: 14px; font-weight: bold;');

// ============================================
// Performance Optimization
// ============================================
// Lazy load images when implemented
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// ============================================
// Auto-hide mobile menu on window resize
// ============================================
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
});

// ============================================
// Initialize all functions on DOM ready
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Mark Grayhat Cybersecurity Website - Initialized');
    
    // Add any initialization code here
    updateActiveNavLink();
});

// ============================================
// Export functions for external use (if needed)
// ============================================
window.MarkGrayhatWebsite = {
    showFormMessage,
    sendChatMessage,
    animateCounter
};
