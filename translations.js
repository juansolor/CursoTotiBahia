// ============================================================
// SISTEMA DE TRADUCCIÓN MULTIIDIOMA
// Español (ES), Português (PT), English (EN)
// ============================================================

const translations = {
  es: {
    // Navegación
    'nav.about': 'SOBRE MÍ',
    'nav.skills': 'HABILIDADES',
    'nav.projects': 'PROYECTOS',
    'nav.stats': 'ESTADÍSTICAS',
    'nav.contact': 'CONTACTO',
    
    // Hero Section
    'hero.title': 'Juan Pablo Solorzano Ojeda',
    'hero.subtitle': 'Desarrollador Full Stack | Apasionado por la Tecnología',
    'hero.aboutTitle': 'Sobre Mí',
    'hero.description': 'Soy un desarrollador apasionado por crear soluciones tecnológicas innovadoras. Mi experiencia abarca desde el desarrollo frontend hasta backend, con un enfoque especial en crear experiencias de usuario excepcionales y sistemas escalables.<br><br>Constantemente busco aprender nuevas tecnologías y metodologías para mantenerme actualizado en este mundo tecnológico en constante evolución.',
    'hero.badge1': 'Full Stack Developer',
    'hero.badge2': '2+ Años Experiencia',
    'hero.badge3': 'Disponible Remoto',
    
    // Skills Section
    'skills.title': 'Stack Tecnológico',
    'skills.frontend': 'Frontend',
    'skills.backend': 'Backend',
    'skills.tools': 'Herramientas',
    
    // Projects Section
    'projects.title': 'Proyectos Destacados',
    'projects.viewDemo': 'VER DEMO LIVE',
    'projects.viewCode': 'VER CÓDIGO',
    'projects.sourceCode': 'CÓDIGO FUENTE',
    
    // Contact Section
    'contact.title': 'Contacto',
    'contact.subtitle': '¿Tienes un proyecto en mente?',
    'contact.description': 'Estoy disponible para nuevos proyectos y oportunidades. No dudes en contactarme para discutir cómo podemos trabajar juntos.',
    'contact.name': 'Nombre',
    'contact.email': 'Email',
    'contact.message': 'Mensaje',
    'contact.send': 'ENVIAR MENSAJE',
    'contact.available': 'Disponible para proyectos',
    
    // Footer
    'footer.rights': 'Todos los derechos reservados.',
    'footer.made': 'Hecho con'
  },
  
  pt: {
    // Navegação
    'nav.about': 'SOBRE MIM',
    'nav.skills': 'HABILIDADES',
    'nav.projects': 'PROJETOS',
    'nav.stats': 'ESTATÍSTICAS',
    'nav.contact': 'CONTATO',
    
    // Seção Hero
    'hero.title': 'Juan Pablo Solorzano Ojeda',
    'hero.subtitle': 'Desenvolvedor Full Stack | Apaixonado por Tecnologia',
    'hero.aboutTitle': 'Sobre Mim',
    'hero.description': 'Sou um desenvolvedor apaixonado por criar soluções tecnológicas inovadoras. Minha experiência abrange desde o desenvolvimento frontend até backend, com foco especial em criar experiências de usuário excepcionais e sistemas escaláveis.<br><br>Constantemente busco aprender novas tecnologias e metodologias para me manter atualizado neste mundo tecnológico em constante evolução.',
    'hero.badge1': 'Desenvolvedor Full Stack',
    'hero.badge2': '2+ Anos de Experiência',
    'hero.badge3': 'Disponível Remoto',
    
    // Seção de Habilidades
    'skills.title': 'Stack Tecnológico',
    'skills.frontend': 'Frontend',
    'skills.backend': 'Backend',
    'skills.tools': 'Ferramentas',
    
    // Seção de Projetos
    'projects.title': 'Projetos Destacados',
    'projects.viewDemo': 'VER DEMO AO VIVO',
    'projects.viewCode': 'VER CÓDIGO',
    'projects.sourceCode': 'CÓDIGO FONTE',
    
    // Seção de Contato
    'contact.title': 'Contato',
    'contact.subtitle': 'Tem um projeto em mente?',
    'contact.description': 'Estou disponível para novos projetos e oportunidades. Não hesite em me contatar para discutir como podemos trabalhar juntos.',
    'contact.name': 'Nome',
    'contact.email': 'Email',
    'contact.message': 'Mensagem',
    'contact.send': 'ENVIAR MENSAGEM',
    'contact.available': 'Disponível para projetos',
    
    // Rodapé
    'footer.rights': 'Todos os direitos reservados.',
    'footer.made': 'Feito com'
  },
  
  en: {
    // Navigation
    'nav.about': 'ABOUT ME',
    'nav.skills': 'SKILLS',
    'nav.projects': 'PROJECTS',
    'nav.stats': 'STATISTICS',
    'nav.contact': 'CONTACT',
    
    // Hero Section
    'hero.title': 'Juan Pablo Solorzano Ojeda',
    'hero.subtitle': 'Full Stack Developer | Passionate about Technology',
    'hero.aboutTitle': 'About Me',
    'hero.description': 'I am a developer passionate about creating innovative technological solutions. My experience ranges from frontend to backend development, with a special focus on creating exceptional user experiences and scalable systems.<br><br>I constantly seek to learn new technologies and methodologies to stay updated in this ever-evolving technological world.',
    'hero.badge1': 'Full Stack Developer',
    'hero.badge2': '2+ Years Experience',
    'hero.badge3': 'Remote Available',
    
    // Skills Section
    'skills.title': 'Technology Stack',
    'skills.frontend': 'Frontend',
    'skills.backend': 'Backend',
    'skills.tools': 'Tools',
    
    // Projects Section
    'projects.title': 'Featured Projects',
    'projects.viewDemo': 'VIEW LIVE DEMO',
    'projects.viewCode': 'VIEW CODE',
    'projects.sourceCode': 'SOURCE CODE',
    
    // Contact Section
    'contact.title': 'Contact',
    'contact.subtitle': 'Have a project in mind?',
    'contact.description': 'I am available for new projects and opportunities. Feel free to contact me to discuss how we can work together.',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'SEND MESSAGE',
    'contact.available': 'Available for projects',
    
    // Footer
    'footer.rights': 'All rights reserved.',
    'footer.made': 'Made with'
  }
};

// Función para cambiar el idioma
function changeLanguage(lang) {
  // Guardar preferencia en localStorage
  localStorage.setItem('preferredLanguage', lang);
  
  // Actualizar todos los elementos con data-i18n
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      element.innerHTML = translations[lang][key];
    }
  });
  
  // Actualizar botones de idioma
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    }
  });
  
  // Actualizar atributo lang del HTML
  document.documentElement.lang = lang;
}

// Inicializar el sistema de traducción
document.addEventListener('DOMContentLoaded', () => {
  // Obtener idioma guardado o usar español por defecto
  const savedLang = localStorage.getItem('preferredLanguage') || 'es';
  changeLanguage(savedLang);
  
  // Agregar event listeners a los botones de idioma
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      changeLanguage(lang);
    });
  });
});
