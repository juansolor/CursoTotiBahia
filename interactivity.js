// ========================
// FUNCIONALIDAD INTERACTIVA
// ========================

// Intersection Observer para animaciones al scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Aplicar animaciones a elementos
document.addEventListener('DOMContentLoaded', () => {
  // Añadir clase fade-in a elementos
  const elementsToAnimate = document.querySelectorAll('.section, .project-card, .skill-category');
  elementsToAnimate.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // Animación de conteo para logros
  initializeAchievementCounters();

  // Smooth scrolling para navegación
  const navLinks = document.querySelectorAll('nav.main a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Indicador de navegación activa
  const sections = document.querySelectorAll('.section, .hero');
  const navItems = document.querySelectorAll('nav.main a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const sectionHeight = section.offsetHeight;
      if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  });

  // Formulario de contacto
  const contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }

  // Modal functionality
  initializeModals();

  // Lazy loading para imágenes de GitHub stats
  initializeLazyLoading();

  // Tooltips
  initializeTooltips();

  // Progress bars animadas
  animateSkillBars();
});

// Manejo del formulario de contacto
function handleFormSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const formInputs = e.target.querySelectorAll('input, textarea');
  const submitBtn = e.target.querySelector('.btn-submit');
  
  // Validación
  let isValid = true;
  formInputs.forEach(input => {
    const formGroup = input.closest('.form-group');
    formGroup.classList.remove('error', 'success');
    
    if (!input.value.trim()) {
      formGroup.classList.add('error');
      isValid = false;
    } else if (input.type === 'email' && !isValidEmail(input.value)) {
      formGroup.classList.add('error');
      isValid = false;
    } else {
      formGroup.classList.add('success');
    }
  });
  
  if (!isValid) return;
  
  // Simular envío
  submitBtn.textContent = 'ENVIANDO...';
  submitBtn.disabled = true;
  
  setTimeout(() => {
    submitBtn.textContent = 'ENVIAR MENSAJE';
    submitBtn.disabled = false;
    
    // Mostrar mensaje de éxito
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message show';
    successMessage.textContent = '¡Mensaje enviado correctamente! Te contactaré pronto.';
    e.target.insertBefore(successMessage, submitBtn);
    
    // Limpiar formulario
    e.target.reset();
    formInputs.forEach(input => {
      input.closest('.form-group').classList.remove('success');
    });
    
    setTimeout(() => {
      successMessage.remove();
    }, 5000);
  }, 2000);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Sistema de modales para proyectos
function initializeModals() {
  const projectCards = document.querySelectorAll('.project-card h3');
  projectCards.forEach(title => {
    title.style.cursor = 'pointer';
    title.addEventListener('click', () => {
      const projectCard = title.closest('.project-card');
      const projectTitle = title.textContent;
      const projectDescription = projectCard.querySelector('p').textContent;
      const techUsed = Array.from(projectCard.querySelectorAll('.tech-used span')).map(span => span.textContent);
      
      showModal(projectTitle, projectDescription, techUsed);
    });
  });
}

function showModal(title, description, technologies) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="modal-close">&times;</span>
      <h2>${title}</h2>
      <p>${description}</p>
      <h3>Tecnologías utilizadas:</h3>
      <div class="tech-stack">
        ${technologies.map(tech => `<span class="tech-item">${tech}</span>`).join('')}
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  modal.style.display = 'block';
  
  // Cerrar modal
  const closeBtn = modal.querySelector('.modal-close');
  closeBtn.addEventListener('click', () => {
    modal.remove();
  });
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });
  
  // Cerrar con ESC
  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape') {
      modal.remove();
      document.removeEventListener('keydown', escHandler);
    }
  });
}

// Lazy loading para imágenes
function initializeLazyLoading() {
  const images = document.querySelectorAll('img[src*="github"]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const placeholder = img.parentElement;
        
        // Añadir loading spinner
        placeholder.classList.add('image-placeholder');
        
        img.addEventListener('load', () => {
          placeholder.classList.remove('image-placeholder');
        });
        
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// Sistema de tooltips
function initializeTooltips() {
  const techItems = document.querySelectorAll('.tech-item');
  const socialIcons = document.querySelectorAll('.social-icon');
  
  // Añadir tooltips a tecnologías
  const techTooltips = {
    'HTML5 & CSS3': 'Lenguajes fundamentales para desarrollo web',
    'JavaScript': 'Lenguaje de programación versátil',
    'React.js': 'Librería de JavaScript para interfaces',
    'Vue.js': 'Framework progresivo de JavaScript',
    'Node.js': 'Runtime de JavaScript para servidor',
    'Python': 'Lenguaje de programación de alto nivel',
    'MongoDB & MySQL': 'Bases de datos NoSQL y SQL',
    'REST APIs': 'Servicios web RESTful',
    'Git & GitHub': 'Control de versiones y colaboración',
    'Docker': 'Plataforma de contenedores',
    'AWS': 'Servicios de computación en la nube',
    'Metodologías Ágiles': 'Frameworks de desarrollo iterativo'
  };
  
  techItems.forEach(item => {
    const tooltip = techTooltips[item.textContent];
    if (tooltip) {
      item.classList.add('tooltip');
      item.setAttribute('data-tooltip', tooltip);
    }
  });
  
  // Tooltips para iconos sociales
  socialIcons.forEach(icon => {
    if (icon.classList.contains('linkedin')) {
      icon.setAttribute('data-tooltip', 'Conectar en LinkedIn');
    } else if (icon.classList.contains('github')) {
      icon.setAttribute('data-tooltip', 'Ver repositorios en GitHub');
    } else if (icon.classList.contains('email')) {
      icon.setAttribute('data-tooltip', 'Enviar email');
    }
    icon.classList.add('tooltip');
  });
}

// Animaciones de barras de progreso para skills
function animateSkillBars() {
  // Esta función se puede expandir para mostrar niveles de skill
  const skillCategories = document.querySelectorAll('.skill-category');
  
  skillCategories.forEach(category => {
    const progressBar = document.createElement('div');
    progressBar.className = 'skill-progress';
    
    const progressFill = document.createElement('div');
    progressFill.className = 'skill-progress-fill';
    
    progressBar.appendChild(progressFill);
    category.appendChild(progressBar);
    
    // Animar cuando sea visible
    const progressObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            progressFill.classList.add('animate');
          }, 300);
          progressObserver.unobserve(entry.target);
        }
      });
    });
    
    progressObserver.observe(category);
  });
}

// Utilidades
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Optimizar scroll events
const optimizedScroll = debounce(() => {
  // Aquí se pueden añadir más funciones de scroll
}, 10);

window.addEventListener('scroll', optimizedScroll);

// Theme switcher (para futuras mejoras)
function initThemeSwitcher() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  
  function handleThemeChange(e) {
    if (e.matches) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
  
  prefersDark.addEventListener('change', handleThemeChange);
  handleThemeChange(prefersDark);
}

// ========================
// ACHIEVEMENT COUNTERS
// ========================
function initializeAchievementCounters() {
  const achievementNumbers = document.querySelectorAll('.achievement-number');
  let hasAnimated = false;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        achievementNumbers.forEach(number => {
          animateCounter(number);
        });
      }
    });
  }, {
    threshold: 0.5
  });

  const achievementsSection = document.querySelector('.achievements-section');
  if (achievementsSection) {
    counterObserver.observe(achievementsSection);
  }
}

function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-target'));
  const duration = 2000; // 2 segundos
  const increment = target / (duration / 16); // 60fps
  let current = 0;

  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };

  updateCounter();
}

// GitHub Stats Image Retry Mechanism
function setupGitHubStatsRetry() {
  const statImages = document.querySelectorAll('.stat-card img[src*="github"], .stat-card img[src*="vercel"], .stat-card img[src*="herokuapp"]');
  
  statImages.forEach(img => {
    let retryCount = 0;
    const maxRetries = 3;
    
    img.addEventListener('error', function retryLoad() {
      if (retryCount < maxRetries) {
        retryCount++;
        console.log(`Reintentando cargar imagen (intento ${retryCount}/${maxRetries})...`);
        
        // Agregar timestamp para evitar cache
        const url = new URL(this.src);
        url.searchParams.set('retry', Date.now());
        
        setTimeout(() => {
          this.src = url.toString();
        }, 1000 * retryCount); // Esperar más tiempo en cada reintento
      } else {
        console.error('No se pudo cargar la imagen después de', maxRetries, 'intentos');
        const placeholder = this.parentElement.querySelector('.loading-placeholder');
        if (placeholder) {
          placeholder.textContent = '⚠️ Error al cargar. Actualiza la página.';
          placeholder.style.color = '#dc2626';
        }
      }
    });
  });
}

// Inicializar retry mechanism cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', setupGitHubStatsRetry);