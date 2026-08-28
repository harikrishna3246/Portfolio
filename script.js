/* ==========================================================================
   Interactive JavaScript Logic
   Siva Subramani Bharathi Hari Krishna (SB Hari Krishna) - Portfolio
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });
  }

  // Close mobile nav when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        if (mobileToggle) {
          const icon = mobileToggle.querySelector('i');
          if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-xmark');
          }
        }
      }
    });
  });

  // Sticky Navbar on Scroll & Active Section Link Highlight
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  });

  // Skills Tabs Filtering
  const skillTabs = document.querySelectorAll('.skills-tabs .tab-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');

  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      skillTabs.forEach(btn => btn.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      skillCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Projects Category Filtering
  const projectFilters = document.querySelectorAll('.projects-filter .filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  projectFilters.forEach(filter => {
    filter.addEventListener('click', () => {
      projectFilters.forEach(btn => btn.classList.remove('active'));
      filter.classList.add('active');

      const category = filter.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Modal Dialog System
  const modalBackdrop = document.getElementById('projectModal');
  const modalBox = document.getElementById('modalBoxContent');

  // Open Project Details Modal
  window.openProjectModal = function(projectId) {
    if (!modalBackdrop || !modalBox) return;

    let contentHtml = '';

    if (projectId === 'project-ai') {
      contentHtml = `
        <button class="modal-close-btn" onclick="closeModal()"><i class="fa-solid fa-xmark"></i></button>
        <div class="modal-header" style="margin-bottom: 1.5rem;">
          <span class="project-category-tag" style="position:static; display:inline-block; margin-bottom:0.5rem;">AI • NLP • Full Stack</span>
          <h2 style="font-size: 1.8rem; margin-bottom: 0.5rem;">🤖 AI Based Knowledge Analytics System</h2>
          <p style="color: var(--text-muted); font-size: 0.95rem;">Natural Language Processing, RAG Chatbot & Automated Assessment Module</p>
        </div>
        <div style="border-radius:12px; overflow:hidden; margin-bottom:1.5rem; height: 260px;">
          <img src="./assets/project-ai.jpg" alt="AI Knowledge System" style="width:100%; height:100%; object-fit:cover;">
        </div>
        <h4 style="margin-bottom:0.5rem; font-size: 1.1rem;">Detailed Description</h4>
        <p style="margin-bottom:1.25rem; font-size:0.95rem; color: var(--text-body); line-height:1.6;">
          Developed an AI-powered platform that extracts and analyzes content from uploaded documents using NLP techniques. Built an interactive RAG-based chatbot for contextual Q&A and an automated assessment engine generating dynamic MCQs and coding questions.
        </p>
        <h4 style="margin-bottom:0.5rem; font-size: 1.1rem;">Key Feature Breakdown</h4>
        <ul style="margin-bottom:1.5rem; padding-left:1.2rem; font-size:0.95rem; color: var(--text-body); display:flex; flex-direction:column; gap:0.4rem;">
          <li><strong>Document NLP Extraction:</strong> Implemented topic extraction, phrase merging (sliding window), and priority classification (High/Medium/Low).</li>
          <li><strong>RAG AI Chatbot:</strong> Built an interactive dashboard with RAG LLM integration for contextual explanations and instant document Q&A.</li>
          <li><strong>Dynamic Assessment Engine:</strong> Generates automated MCQs and coding evaluation tests.</li>
          <li><strong>Scalable Cloud Storage:</strong> Integrated MongoDB Atlas with React.js and Node.js REST APIs for full-stack data flow.</li>
        </ul>
        <h4 style="margin-bottom:0.75rem; font-size: 1.1rem;">Tech Stack Used</h4>
        <div style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-bottom:2rem;">
          <span class="tech-pill">React.js</span>
          <span class="tech-pill">Node.js</span>
          <span class="tech-pill">Python</span>
          <span class="tech-pill">NLP</span>
          <span class="tech-pill">MongoDB Atlas</span>
          <span class="tech-pill">LLM / RAG</span>
        </div>
        <div style="display:flex; gap:1rem;">
          <a href="https://knowledge-analytics-frontend.vercel.app/login" target="_blank" class="btn btn-primary btn-sm"><i class="fa-solid fa-rocket"></i> Launch Live Demo</a>
          <a href="https://github.com/harikrishna3246/Knowledge_analytics_System.git" target="_blank" class="btn btn-secondary btn-sm"><i class="fa-brands fa-github"></i> GitHub Source</a>
        </div>
      `;
    } else if (projectId === 'project-growth') {
      contentHtml = `
        <button class="modal-close-btn" onclick="closeModal()"><i class="fa-solid fa-xmark"></i></button>
        <div class="modal-header" style="margin-bottom: 1.5rem;">
          <span class="project-category-tag" style="position:static; display:inline-block; margin-bottom:0.5rem;">Full Stack Web Application</span>
          <h2 style="font-size: 1.8rem; margin-bottom: 0.5rem;">💼 Empowering Employee Growth</h2>
          <p style="color: var(--text-muted); font-size: 0.95rem;">Employee Training & Resource Management Platform</p>
        </div>
        <div style="border-radius:12px; overflow:hidden; margin-bottom:1.5rem; height: 260px;">
          <img src="./assets/project-growth.jpg" alt="Empowering Employee Growth" style="width:100%; height:100%; object-fit:cover;">
        </div>
        <h4 style="margin-bottom:0.5rem; font-size: 1.1rem;">Detailed Description</h4>
        <p style="margin-bottom:1.25rem; font-size:0.95rem; color: var(--text-body); line-height:1.6;">
          Designed and developed the frontend interface of an employee training management platform using React.js, HTML, and CSS. The system provides intuitive manager dashboards to assign learning materials and enables employees to track training progress.
        </p>
        <h4 style="margin-bottom:0.5rem; font-size: 1.1rem;">Key Feature Breakdown</h4>
        <ul style="margin-bottom:1.5rem; padding-left:1.2rem; font-size:0.95rem; color: var(--text-body); display:flex; flex-direction:column; gap:0.4rem;">
          <li><strong>Manager Resource Portal:</strong> Allows managers to curate learning materials and assign training modules to team members.</li>
          <li><strong>Employee Progress Dashboard:</strong> Interactive progress bars and completion status tracking for assigned tasks.</li>
          <li><strong>UI/UX Prototyping:</strong> Designed in Figma and built using responsive React components and custom CSS.</li>
        </ul>
        <h4 style="margin-bottom:0.75rem; font-size: 1.1rem;">Tech Stack Used</h4>
        <div style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-bottom:2rem;">
          <span class="tech-pill">React.js</span>
          <span class="tech-pill">HTML5</span>
          <span class="tech-pill">CSS3</span>
          <span class="tech-pill">Node.js</span>
          <span class="tech-pill">MongoDB</span>
          <span class="tech-pill">Figma</span>
        </div>
        <div style="display:flex; gap:1rem;">
          <a href="https://github.com/harikrishna3246" target="_blank" class="btn btn-primary btn-sm"><i class="fa-brands fa-github"></i> View GitHub Code</a>
        </div>
      `;
    } else if (projectId === 'project-agri') {
      contentHtml = `
        <button class="modal-close-btn" onclick="closeModal()"><i class="fa-solid fa-xmark"></i></button>
        <div class="modal-header" style="margin-bottom: 1.5rem;">
          <span class="project-category-tag" style="position:static; display:inline-block; margin-bottom:0.5rem;">Java • MySQL • Web Application</span>
          <h2 style="font-size: 1.8rem; margin-bottom: 0.5rem;">🚜 Agricultural Equipment Rental System</h2>
          <p style="color: var(--text-muted); font-size: 0.95rem;">Cooperative Farm Machinery Management & Booking Portal</p>
        </div>
        <div style="border-radius:12px; overflow:hidden; margin-bottom:1.5rem; height: 260px;">
          <img src="./assets/project-agri.jpg" alt="Agricultural Equipment Rental" style="width:100%; height:100%; object-fit:cover;">
        </div>
        <h4 style="margin-bottom:0.5rem; font-size: 1.1rem;">Detailed Description</h4>
        <p style="margin-bottom:1.25rem; font-size:0.95rem; color: var(--text-body); line-height:1.6;">
          A dedicated web application enabling farmers to rent agricultural equipment easily from cooperatives. Manages farmer registrations, machinery listings, booking requests, approvals, and user reviews.
        </p>
        <h4 style="margin-bottom:0.5rem; font-size: 1.1rem;">Key Feature Breakdown</h4>
        <ul style="margin-bottom:1.5rem; padding-left:1.2rem; font-size:0.95rem; color: var(--text-body); display:flex; flex-direction:column; gap:0.4rem;">
          <li><strong>Role-Based Portals:</strong> Specialized views for Farmers and Cooperative Administrative Staff.</li>
          <li><strong>Booking Management:</strong> Equipment rental workflow with approval tracking and availability status.</li>
          <li><strong>Feedback System:</strong> Rating and review management for equipment quality assurance.</li>
        </ul>
        <h4 style="margin-bottom:0.75rem; font-size: 1.1rem;">Tech Stack Used</h4>
        <div style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-bottom:2rem;">
          <span class="tech-pill">Java</span>
          <span class="tech-pill">HTML5</span>
          <span class="tech-pill">CSS3</span>
          <span class="tech-pill">JavaScript</span>
          <span class="tech-pill">MySQL</span>
        </div>
        <div style="display:flex; gap:1rem;">
          <a href="https://github.com/harikrishna3246/smart-agri-equipment-rental.git" target="_blank" class="btn btn-primary btn-sm"><i class="fa-brands fa-github"></i> View GitHub Code</a>
        </div>
      `;
    }

    modalBox.innerHTML = contentHtml;
    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeModal = function() {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  };

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });
  }

  // Resume Download Handler
  window.handleResumeDownload = function() {
    showToast('Opening Siva Subramani Bharathi Hari Krishna Resume...');
    window.open('./assets/Hari Krishna_Resume.pdf', '_blank');
  };

  // Stat Card Clockwise Roll & Link Opener Handler
  window.handleStatCardClick = function(element, url) {
    if (element.classList.contains('rolling')) return;

    element.classList.add('rolling');

    if (url.includes('leetcode')) {
      showToast('Opening LeetCode Profile...');
    } else if (url.includes('github')) {
      showToast('Opening GitHub Profile...');
    } else if (url.includes('Python_Certificate')) {
      showToast('Opening NPTEL Certificate...');
    }

    setTimeout(() => {
      element.classList.remove('rolling');
      window.open(url, '_blank');
    }, 550);
  };

  // Copy to Clipboard Utility
  window.copyToClipboard = function(text, typeName) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`${typeName} copied to clipboard!`);
    }).catch(err => {
      showToast(`Copy failed. ${typeName}: ${text}`);
    });
  };

  // Toast Notification System
  function showToast(message) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast toast-success';
    toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3500);
  }

  // Contact Form Handling (Sends email to harikrishnasb3246@gmail.com)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      const name = document.getElementById('formName').value.trim();
      const email = document.getElementById('formEmail').value.trim();
      const message = document.getElementById('formMessage').value.trim();

      if (!name || !email || !message) {
        e.preventDefault();
        showToast('Please fill in all required fields.');
        return;
      }

      // If opening as local HTML file (file://), allow standard HTML form POST to FormSubmit
      if (window.location.protocol === 'file:') {
        return; // Standard submit triggers FormSubmit activation & delivery
      }

      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

      try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        const data = await response.json().catch(() => ({}));

        if (response.ok || data.success === 'true' || data.success === true) {
          showToast(`Thank you, ${name}! Your message was sent successfully.`);
          contactForm.reset();
        } else {
          contactForm.submit();
        }
      } catch (err) {
        console.error('Email send error:', err);
        contactForm.submit();
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;
      }
    });
  }
});
