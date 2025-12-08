/**
 * Auto Contrast Fixer - Repara automáticamente problemas de contraste
 * Detecta texto con bajo contraste y lo corrige automáticamente
 */

class ContrastFixer {
  constructor(options = {}) {
    this.minContrastRatio = options.minContrastRatio || 4.5; // WCAG AA standard
    this.fixedElements = new Set();
    this.debug = options.debug || false;
  }

  // Convertir color RGB a luminancia relativa
  getLuminance(r, g, b) {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }

  // Calcular ratio de contraste entre dos colores
  getContrastRatio(rgb1, rgb2) {
    const lum1 = this.getLuminance(rgb1[0], rgb1[1], rgb1[2]);
    const lum2 = this.getLuminance(rgb2[0], rgb2[1], rgb2[2]);
    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);
    return (lighter + 0.05) / (darker + 0.05);
  }

  // Convertir string de color a RGB
  parseColor(color) {
    // Crear elemento temporal para obtener color computado
    const div = document.createElement('div');
    div.style.color = color;
    document.body.appendChild(div);
    const computed = window.getComputedStyle(div).color;
    document.body.removeChild(div);

    // Extraer valores RGB
    const match = computed.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (match) {
      return [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])];
    }

    // Si es rgba
    const matchA = computed.match(/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*[\d.]+\)$/);
    if (matchA) {
      return [parseInt(matchA[1]), parseInt(matchA[2]), parseInt(matchA[3])];
    }

    return [0, 0, 0]; // Default negro
  }

  // Obtener color de fondo efectivo (considerando transparencias y herencia)
  getEffectiveBackgroundColor(element) {
    let current = element;
    
    while (current && current !== document.body.parentElement) {
      const bgColor = window.getComputedStyle(current).backgroundColor;
      
      if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
        return this.parseColor(bgColor);
      }
      
      current = current.parentElement;
    }
    
    return [255, 255, 255]; // Default blanco
  }

  // Determinar si un color es claro u oscuro
  isLightColor(rgb) {
    const luminance = this.getLuminance(rgb[0], rgb[1], rgb[2]);
    return luminance > 0.5;
  }

  // Corregir color de texto basado en el fondo
  fixTextColor(element, backgroundColor) {
    const isLightBg = this.isLightColor(backgroundColor);
    
    if (isLightBg) {
      // Fondo claro -> texto oscuro
      element.style.setProperty('color', '#000000', 'important');
      return '#000000';
    } else {
      // Fondo oscuro -> texto claro
      element.style.setProperty('color', '#ffffff', 'important');
      return '#ffffff';
    }
  }

  // Verificar y corregir un elemento
  checkAndFix(element) {
    // Ignorar elementos ocultos o sin texto
    if (!element.offsetParent || !element.textContent.trim()) {
      return false;
    }

    // Ignorar la sección de contacto completa
    if (element.closest('.contact-section')) {
      return false;
    }

    // Ignorar inputs y textareas
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      return false;
    }

    // Ignorar elementos ya corregidos
    if (this.fixedElements.has(element)) {
      return false;
    }

    const style = window.getComputedStyle(element);
    const textColor = this.parseColor(style.color);
    const backgroundColor = this.getEffectiveBackgroundColor(element);

    const contrast = this.getContrastRatio(textColor, backgroundColor);

    // Si el contraste es insuficiente, corregir
    if (contrast < this.minContrastRatio) {
      const newColor = this.fixTextColor(element, backgroundColor);
      this.fixedElements.add(element);

      if (this.debug) {
        console.log(`✓ Corregido:`, {
          element: element.tagName + (element.className ? '.' + element.className.split(' ')[0] : ''),
          textoBefore: `rgb(${textColor.join(',')})`,
          textoAfter: newColor,
          fondo: `rgb(${backgroundColor.join(',')})`,
          contrasteAntes: contrast.toFixed(2),
          contrasteDespues: this.getContrastRatio(
            this.parseColor(newColor),
            backgroundColor
          ).toFixed(2)
        });
      }

      return true;
    }

    return false;
  }

  // Escanear y corregir toda la página
  scanAndFix() {
    const textElements = document.querySelectorAll('*');
    let fixedCount = 0;

    textElements.forEach(element => {
      // Solo procesar elementos de texto directo
      const hasDirectText = Array.from(element.childNodes).some(
        node => node.nodeType === Node.TEXT_NODE && node.textContent.trim()
      );

      if (hasDirectText || element.tagName === 'BUTTON' || element.tagName === 'A') {
        if (this.checkAndFix(element)) {
          fixedCount++;
        }
      }
    });

    if (this.debug) {
      console.log(`\n📊 Resumen: ${fixedCount} elementos corregidos`);
    }

    return fixedCount;
  }

  // Corregir problemas específicos conocidos
  fixKnownIssues() {
    const fixes = [
      // Fondo blanco con texto blanco
      {
        selector: '[style*="background: white"], [style*="background: #fff"], [style*="background: #ffffff"]',
        fix: (el) => {
          const color = window.getComputedStyle(el).color;
          if (color.includes('255, 255, 255') || color.includes('white')) {
            el.style.setProperty('color', '#000000', 'important');
            return true;
          }
          return false;
        }
      },
      // Fondo negro con texto negro
      {
        selector: '[style*="background: black"], [style*="background: #000"]',
        fix: (el) => {
          const color = window.getComputedStyle(el).color;
          if (color.includes('0, 0, 0') || color.includes('black')) {
            el.style.setProperty('color', '#ffffff', 'important');
            return true;
          }
          return false;
        }
      },
      // Clases con problemas conocidos
      {
        selector: '.text-white',
        fix: (el) => {
          const bg = this.getEffectiveBackgroundColor(el);
          if (this.isLightColor(bg)) {
            el.style.setProperty('color', '#000000', 'important');
            return true;
          }
          return false;
        }
      },
      {
        selector: '.text-black',
        fix: (el) => {
          const bg = this.getEffectiveBackgroundColor(el);
          if (!this.isLightColor(bg)) {
            el.style.setProperty('color', '#ffffff', 'important');
            return true;
          }
          return false;
        }
      }
    ];

    let totalFixed = 0;
    fixes.forEach(({ selector, fix }) => {
      document.querySelectorAll(selector).forEach(el => {
        if (fix(el)) {
          totalFixed++;
          this.fixedElements.add(el);
        }
      });
    });

    return totalFixed;
  }

  // Iniciar el fixer
  init() {
    if (this.debug) {
      console.log('🔧 Iniciando Auto Contrast Fixer...\n');
    }

    // Corregir problemas conocidos primero
    const knownFixed = this.fixKnownIssues();
    
    // Escanear y corregir toda la página
    const scanFixed = this.scanAndFix();

    const total = knownFixed + scanFixed;

    if (this.debug) {
      console.log(`\n✅ Contrast Fixer completado: ${total} elementos corregidos en total`);
    }

    // Observar cambios dinámicos
    this.observeChanges();

    return total;
  }

  // Observar cambios en el DOM
  observeChanges() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            this.checkAndFix(node);
            node.querySelectorAll('*').forEach(child => this.checkAndFix(child));
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
}

// Auto-inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.contrastFixer = new ContrastFixer({ debug: true });
    window.contrastFixer.init();
  });
} else {
  window.contrastFixer = new ContrastFixer({ debug: true });
  window.contrastFixer.init();
}
