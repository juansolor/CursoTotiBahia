// Chatbot con IA para Portfolio
class PortfolioChatbot {
  constructor() {
    this.apiKey = ''; // Se configurará desde el HTML
    this.apiEndpoint = 'https://api.openai.com/v1/chat/completions';
    this.conversationHistory = [];
    this.isOpen = false;
    this.isTyping = false;
    this.useGemini = false; // Flag para usar Gemini en lugar de OpenAI
    
    // Contexto sobre Juan Pablo para el chatbot
    this.systemContext = `Eres un asistente virtual del portfolio de Juan Pablo Solorzano Ojeda, un Desarrollador Full Stack. 

Información sobre Juan Pablo:
- Desarrollador Full Stack con experiencia en React, Node.js, Python y Django
- Especializado en JavaScript, Python, HTML/CSS
- Ha trabajado en proyectos como:
  * PLC Control System: Sistema de control PLC con interfaz web para monitoreo industrial (React, Python, JavaScript)
  * Projeto Final Full Stack: Aplicación web completa desarrollada en equipe (JavaScript, HTML5, CSS3, Node.js)
  * Sistema de Análisis de Dados: Proyecto de análisis de datos con técnicas de data science (Python, Jupyter, Pandas, NumPy, Matplotlib)
- Más de 50 commits en GitHub
- 10+ repositorios públicos
- 5+ proyectos completados
- Skills: React, Node.js, Python, Django, JavaScript, HTML/CSS, Git, Docker, AWS, PostgreSQL, MongoDB
- Disponible para: trabajo remoto, freelance, colaboraciones

Responde de manera amigable, profesional y concisa. Si te preguntan algo que no sabes, sugiere que contacten directamente a Juan Pablo. Siempre menciona que pueden ver más detalles en las secciones del portfolio o contactarlo directamente.`;

    this.init();
  }

  init() {
    this.createChatbotUI();
    this.attachEventListeners();
    this.loadWelcomeMessage();
  }

  createChatbotUI() {
    const chatbotHTML = `
      <div class="chatbot-container" id="chatbot">
        <button class="chatbot-toggle" id="chatbot-toggle" aria-label="Abrir chat">
          <svg class="chat-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <svg class="close-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          <span class="chatbot-badge">AI</span>
        </button>

        <div class="chatbot-window" id="chatbot-window">
          <div class="chatbot-header">
            <div class="chatbot-header-info">
              <div class="chatbot-avatar">🤖</div>
              <div class="chatbot-header-text">
                <h3>Asistente Virtual</h3>
                <span class="chatbot-status">
                  <span class="status-dot"></span>
                  En línea
                </span>
              </div>
            </div>
            <button class="chatbot-close" id="chatbot-close" aria-label="Cerrar chat">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div class="chatbot-messages" id="chatbot-messages">
            <!-- Los mensajes se agregarán aquí dinámicamente -->
          </div>

          <div class="chatbot-suggestions" id="chatbot-suggestions">
            <button class="suggestion-btn" data-message="¿Cuál es tu experiencia?">💼 Experiencia</button>
            <button class="suggestion-btn" data-message="¿Qué tecnologías dominas?">⚡ Tecnologías</button>
            <button class="suggestion-btn" data-message="Háblame de tus proyectos">🚀 Proyectos</button>
            <button class="suggestion-btn" data-message="¿Cómo puedo contactarte?">📧 Contacto</button>
          </div>

          <div class="chatbot-input-area">
            <div class="chatbot-input-wrapper">
              <input 
                type="text" 
                class="chatbot-input" 
                id="chatbot-input" 
                placeholder="Escribe tu pregunta..."
                autocomplete="off"
              />
              <button class="chatbot-send" id="chatbot-send" aria-label="Enviar mensaje">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
            <div class="chatbot-powered">
              <span>Powered by OpenAI GPT</span>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatbotHTML);
  }

  attachEventListeners() {
    const toggle = document.getElementById('chatbot-toggle');
    const closeBtn = document.getElementById('chatbot-close');
    const sendBtn = document.getElementById('chatbot-send');
    const input = document.getElementById('chatbot-input');
    const suggestions = document.querySelectorAll('.suggestion-btn');

    toggle.addEventListener('click', () => this.toggleChat());
    closeBtn.addEventListener('click', () => this.closeChat());
    sendBtn.addEventListener('click', () => this.sendMessage());
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });

    suggestions.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const message = e.target.dataset.message;
        this.sendPredefinedMessage(message);
      });
    });
  }

  loadWelcomeMessage() {
    const welcomeMessage = `¡Hola! 👋 Soy el asistente virtual de Juan Pablo. Estoy aquí para responder tus preguntas sobre su experiencia, proyectos y habilidades. ¿En qué puedo ayudarte?`;
    this.addMessage(welcomeMessage, 'bot');
  }

  toggleChat() {
    const window = document.getElementById('chatbot-window');
    const toggle = document.getElementById('chatbot-toggle');
    
    this.isOpen = !this.isOpen;
    
    if (this.isOpen) {
      window.classList.add('active');
      toggle.classList.add('active');
      document.getElementById('chatbot-input').focus();
    } else {
      window.classList.remove('active');
      toggle.classList.remove('active');
    }
  }

  closeChat() {
    this.isOpen = false;
    document.getElementById('chatbot-window').classList.remove('active');
    document.getElementById('chatbot-toggle').classList.remove('active');
  }

  async sendMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();

    if (!message || this.isTyping) return;

    // Agregar mensaje del usuario
    this.addMessage(message, 'user');
    input.value = '';

    // Ocultar sugerencias después del primer mensaje
    document.getElementById('chatbot-suggestions').style.display = 'none';

    // Mostrar indicador de escritura
    this.showTypingIndicator();

    try {
      // Llamar a la API (Gemini o OpenAI según configuración)
      const response = this.useGemini 
        ? await this.callGemini(message)
        : await this.callOpenAI(message);
      this.hideTypingIndicator();
      this.addMessage(response, 'bot');
    } catch (error) {
      this.hideTypingIndicator();
      console.error('Error en chatbot:', error);
      
      // Respuesta de fallback si falla la API
      const fallbackResponse = this.getFallbackResponse(message);
      this.addMessage(fallbackResponse, 'bot');
    }
  }

  sendPredefinedMessage(message) {
    document.getElementById('chatbot-input').value = message;
    this.sendMessage();
  }

  // Usar Google Gemini API
  async callGemini(userMessage) {
    if (!this.apiKey) {
      throw new Error('API key no configurada');
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${this.apiKey}`;
    
    // Construir el contexto completo con historial
    let fullContext = this.systemContext + '\n\n';
    
    // Agregar historial de conversación
    this.conversationHistory.forEach(msg => {
      if (msg.role === 'user') {
        fullContext += `Usuario: ${msg.content}\n`;
      } else if (msg.role === 'assistant') {
        fullContext += `Asistente: ${msg.content}\n`;
      }
    });
    
    fullContext += `Usuario: ${userMessage}\nAsistente:`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: fullContext
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 300
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API error:', errorData);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const botResponse = data.candidates[0].content.parts[0].text;

    // Agregar al historial
    this.conversationHistory.push({
      role: 'user',
      content: userMessage
    });
    this.conversationHistory.push({
      role: 'assistant',
      content: botResponse
    });

    // Mantener solo los últimos 10 mensajes
    if (this.conversationHistory.length > 10) {
      this.conversationHistory = this.conversationHistory.slice(-10);
    }

    return botResponse;
  }

  // Alternativamente, usar OpenAI
  async callOpenAI(userMessage) {
    if (!this.apiKey) {
      throw new Error('API key no configurada');
    }

    // Agregar mensaje del usuario al historial
    this.conversationHistory.push({
      role: 'user',
      content: userMessage
    });

    const response = await fetch(this.apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: this.systemContext },
          ...this.conversationHistory
        ],
        max_tokens: 300,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const botResponse = data.choices[0].message.content;

    // Agregar respuesta del bot al historial
    this.conversationHistory.push({
      role: 'assistant',
      content: botResponse
    });

    // Mantener solo los últimos 10 mensajes en el historial
    if (this.conversationHistory.length > 10) {
      this.conversationHistory = this.conversationHistory.slice(-10);
    }

    return botResponse;
  }

  getFallbackResponse(message) {
    const lowerMessage = message.toLowerCase();

    // Respuestas predefinidas para cuando la API no esté disponible
    const responses = {
      experiencia: "Juan Pablo es un Desarrollador Full Stack con experiencia en React, Node.js, Python y Django. Ha trabajado en múltiples proyectos industriales y aplicaciones web. Puedes ver más detalles en la sección de Proyectos del portfolio.",
      tecnologias: "Juan Pablo domina: JavaScript, Python, React, Node.js, Django, HTML/CSS, Git, Docker, AWS, PostgreSQL y MongoDB. También tiene experiencia con herramientas de data science como Pandas, NumPy y Matplotlib.",
      proyectos: "Entre los proyectos destacados están: PLC Control System (sistema de control industrial), Projeto Final Full Stack (aplicación web completa), y Sistema de Análisis de Dados (proyecto de data science). Puedes explorar cada proyecto en la sección correspondiente.",
      contacto: "Puedes contactar a Juan Pablo a través del formulario de contacto en la parte inferior de la página, o conectar con él en GitHub. Está disponible para trabajo remoto, freelance y colaboraciones.",
      default: "Esa es una buena pregunta. Te recomiendo explorar las diferentes secciones del portfolio para conocer más sobre la experiencia y proyectos de Juan Pablo. También puedes contactarlo directamente usando el formulario de contacto. ¿Hay algo más específico en lo que pueda ayudarte?"
    };

    if (lowerMessage.includes('experiencia') || lowerMessage.includes('trabajo')) {
      return responses.experiencia;
    } else if (lowerMessage.includes('tecnolog') || lowerMessage.includes('skill') || lowerMessage.includes('herramienta')) {
      return responses.tecnologias;
    } else if (lowerMessage.includes('proyecto')) {
      return responses.proyectos;
    } else if (lowerMessage.includes('contacto') || lowerMessage.includes('email') || lowerMessage.includes('contactar')) {
      return responses.contacto;
    } else {
      return responses.default;
    }
  }

  addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${sender}-message`;

    const avatar = sender === 'bot' ? '🤖' : '👤';
    
    messageDiv.innerHTML = `
      <div class="message-avatar">${avatar}</div>
      <div class="message-content">
        <div class="message-text">${this.formatMessage(text)}</div>
        <div class="message-time">${this.getCurrentTime()}</div>
      </div>
    `;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Animación de entrada
    setTimeout(() => messageDiv.classList.add('show'), 10);
  }

  showTypingIndicator() {
    this.isTyping = true;
    const messagesContainer = document.getElementById('chatbot-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chatbot-message bot-message typing-indicator';
    typingDiv.id = 'typing-indicator';
    
    typingDiv.innerHTML = `
      <div class="message-avatar">🤖</div>
      <div class="message-content">
        <div class="typing-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    `;

    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  hideTypingIndicator() {
    this.isTyping = false;
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
      indicator.remove();
    }
  }

  formatMessage(text) {
    // Convertir URLs en links
    text = text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
    // Convertir saltos de línea
    text = text.replace(/\n/g, '<br>');
    return text;
  }

  getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  }

  // Método público para configurar la API key
  setApiKey(key) {
    this.apiKey = key;
  }
}

// Inicializar el chatbot cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  window.portfolioChatbot = new PortfolioChatbot();
  console.log('💬 Chatbot inicializado. Esperando configuración de API key.');
});
