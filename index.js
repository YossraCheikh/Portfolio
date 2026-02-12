// ==========================================
// PORTFOLIO WEBSITE - JAVASCRIPT
// Elegant Design with Orpheus Pro
// ==========================================

//==========================================
// Smooth Scroll for Navigation Links
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));

    if (target) {
      // Close mobile menu if open
      const navMenu = document.getElementById('navMenu');
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
      }

      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ==========================================
// Navigation Bar Scroll Effect
// ==========================================
const nav = document.getElementById('nav');
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
  // Add scrolled class to nav
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }

  // Update scroll progress bar
  const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (window.pageYOffset / windowHeight);
  scrollProgress.style.transform = `scaleX(${scrolled})`;
});

// ==========================================
// Mobile Navigation Toggle
// ==========================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = navToggle.querySelector('i');

    if (navMenu.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
    const icon = navToggle.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
});

// ==========================================
// Contact Form Handling with Web3Forms
// ==========================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    // Disable button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    try {
      // Get form data
      const formData = new FormData(contactForm);

      // Submit to Web3Forms
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        // Show success message
        showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');

        // Reset form
        contactForm.reset();
      } else {
        // Show error message
        showNotification('Oops! Something went wrong. Please try again.', 'error');
      }
    } catch (error) {
      // Show error message
      showNotification('Oops! Something went wrong. Please try again.', 'error');
      console.error('Form submission error:', error);
    } finally {
      // Re-enable button
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  });
}

// ==========================================
// Notification System
// ==========================================
function showNotification(message, type = 'success') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.style.cssText = `
    position: fixed;
    top: calc(var(--nav-height) + 20px);
    right: 30px;
    background: ${type === 'success' ? '#5C1F1F' : '#E57373'};
    color: #F5EFE3;
    padding: 1.25rem 1.75rem;
    border-radius: 10px;
    box-shadow: 0 8px 24px rgba(92, 31, 31, 0.20);
    z-index: 2000;
    animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    font-family: 'orpheuspro', Georgia, serif;
    font-size: 0.9375rem;
    max-width: 400px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  `;

  notification.textContent = message;
  document.body.appendChild(notification);

  // Add animation keyframes if not already present
  if (!document.querySelector('#notificationStyles')) {
    const style = document.createElement('style');
    style.id = 'notificationStyles';
    style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(450px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(450px);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Remove notification after 4.5 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    setTimeout(() => {
      if (notification.parentNode) {
        document.body.removeChild(notification);
      }
    }, 400);
  }, 4500);
}

// ==========================================
// Intersection Observer for Fade-in Animations
// ==========================================
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements that should fade in
  const animatedElements = document.querySelectorAll('.project-card, .skill-category, .timeline-item');

  animatedElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s, transform 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
    observer.observe(el);
  });
}

// Initialize animations when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
  initScrollAnimations();
}

// ==========================================
// Subtle parallax effect to hero section
// ==========================================
function initParallax() {
  const hero = document.querySelector('.hero');

  if (hero && window.innerWidth > 768) {
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          const parallaxSpeed = 0.4;

          if (scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
          }

          ticking = false;
        });

        ticking = true;
      }
    });
  }
}

initParallax();

// ==========================================
// Dynamic Tech Stack Animation
// ==========================================
function animateTechTags() {
  const techTags = document.querySelectorAll('.tech-tag');

  techTags.forEach((tag, index) => {
    tag.style.opacity = '0';
    tag.style.transform = 'scale(0.85) translateY(10px)';
    tag.style.transition = 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';

    setTimeout(() => {
      tag.style.opacity = '1';
      tag.style.transform = 'scale(1) translateY(0)';
    }, index * 60 + 200);
  });
}

// Check if About section is in view
const aboutSection = document.querySelector('.about');
if (aboutSection) {
  const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateTechTags();
        aboutObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  aboutObserver.observe(aboutSection);
}

// ==========================================
// Active Nav Link Highlight
// ==========================================
function highlightActiveSection() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.pageYOffset >= sectionTop - 150) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

highlightActiveSection();

// ==========================================
// Smooth Page Load Animation
// ==========================================
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.6s ease';
    document.body.style.opacity = '1';
  }, 50);
});

// ==========================================
// Console Message
// ==========================================
console.log('%c✨ Welcome!', 'font-size: 22px; color: #5C1F1F; font-weight: 400;');
console.log('%cThank you for visiting my portfolio.', 'font-size: 15px; color: #6E6A65;');
console.log('%cCrafted with care and attention to detail.', 'font-size: 13px; color: #A89882;');

// ==========================================
// PROJECT MODAL FUNCTIONALITY
// ==========================================
const projectModal = document.getElementById('projectModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalImage = document.getElementById('modalImage');

// Open modal when clicking "View Project"
document.querySelectorAll('[data-open-modal]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    const projectCard = link.closest('.project-card');
    const title = projectCard.dataset.title;
    const imagePath = projectCard.dataset.image;

    // Update modal content
    modalTitle.textContent = title;
    modalImage.src = imagePath;
    modalImage.alt = `${title} - Full page preview`;

    // Show modal
    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  });
});

// Close modal function
function closeModal() {
  projectModal.classList.remove('active');
  document.body.style.overflow = ''; // Restore scrolling
}

// Close on X button click
modalClose.addEventListener('click', closeModal);

// Close when clicking overlay
modalOverlay.addEventListener('click', closeModal);

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && projectModal.classList.contains('active')) {
    closeModal();
  }
});

// Prevent modal content click from closing modal
document.querySelector('.modal-container').addEventListener('click', (e) => {
  e.stopPropagation();
});

