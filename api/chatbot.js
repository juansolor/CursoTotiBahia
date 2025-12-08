// Vercel Serverless Function - Proxy para Gemini API
// Esto oculta tu API key del lado del cliente

export default async function handler(req, res) {
  // Solo permite POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CORS headers para permitir requests desde tu dominio
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    const { message, conversationHistory } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // API Key está en las variables de entorno de Vercel (seguro)
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY not configured');
      return res.status(500).json({ error: 'API not configured' });
    }

    // Construir el contexto para Gemini
    const systemContext = `Eres un asistente virtual del portfolio de Juan Pablo Solorzano Ojeda, un Desarrollador Full Stack. 

Información sobre Juan Pablo:
- Desarrollador Full Stack con experiencia en React, Node.js, Python y Django
- Especializado en JavaScript, Python, HTML/CSS
- Ha trabajado en proyectos como:
  * PLC Control System: Sistema de control PLC con interfaz web para monitoreo industrial
  * Projeto Final Full Stack: Aplicación web completa desarrollada en equipe
  * Sistema de Análisis de Dados: Proyecto de análisis de datos con data science
- Más de 50 commits en GitHub
- 10+ repositorios públicos
- 5+ proyectos completados
- Skills: React, Node.js, Python, Django, JavaScript, HTML/CSS, Git, Docker, AWS, PostgreSQL, MongoDB
- Disponible para: trabajo remoto, freelance, colaboraciones

Responde de manera amigable, profesional y concisa en máximo 2-3 oraciones.`;

    // Construir contexto con historial
    let fullContext = systemContext + '\n\n';
    
    if (conversationHistory && Array.isArray(conversationHistory)) {
      conversationHistory.slice(-10).forEach(msg => {
        if (msg.role === 'user') {
          fullContext += `Usuario: ${msg.content}\n`;
        } else if (msg.role === 'assistant') {
          fullContext += `Asistente: ${msg.content}\n`;
        }
      });
    }
    
    fullContext += `Usuario: ${message}\nAsistente:`;

    // Llamar a Gemini API
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
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
      }
    );

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.json();
      console.error('Gemini API error:', errorData);
      return res.status(geminiResponse.status).json({ 
        error: 'AI service error',
        details: errorData 
      });
    }

    const data = await geminiResponse.json();
    const botResponse = data.candidates[0].content.parts[0].text;

    return res.status(200).json({ 
      response: botResponse,
      success: true 
    });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}
