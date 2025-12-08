# 🤖 Configuración del Chatbot con IA

## Resumen
El chatbot está completamente implementado y funcional. Solo necesitas agregar tu API key para activar la inteligencia artificial.

## ¿Qué hace el chatbot?

✅ **Funcionalidades:**
- Responde preguntas sobre tu experiencia profesional
- Informa sobre tus proyectos y tecnologías
- Proporciona información de contacto
- Mantiene conversaciones naturales usando IA
- Tiene respuestas de fallback si la API no está disponible
- Diseño moderno y responsivo
- Animaciones suaves

## Opciones de API

### Opción 1: OpenAI GPT-3.5 Turbo (Recomendado)

**Ventajas:**
- Respuestas muy naturales y coherentes
- Excelente comprensión del contexto
- API estable y confiable

**Costo:**
- $0.0005 por cada 1000 tokens (~750 palabras)
- Aproximadamente $0.02 USD por 30 conversaciones

**Pasos:**
1. Ve a: https://platform.openai.com/api-keys
2. Crea una cuenta o inicia sesión
3. Click en "Create new secret key"
4. Copia la key (empieza con `sk-...`)
5. En `esqueleto.html` línea 458, descomenta y pega:
   ```javascript
   window.portfolioChatbot.setApiKey('sk-tu-key-aqui');
   ```

### Opción 2: Google Gemini (Más económico)

**Ventajas:**
- MÁS BARATO (gratis hasta 60 requests/minuto)
- Buena calidad de respuestas
- Límite generoso

**Costo:**
- GRATIS hasta cierto límite
- Ideal para portfolios personales

**Pasos:**
1. Ve a: https://makersuite.google.com/app/apikey
2. Inicia sesión con tu cuenta Google
3. Click en "Get API Key"
4. Copia la key (empieza con `AIza...`)
5. En `esqueleto.html` línea 462, descomenta y pega:
   ```javascript
   window.portfolioChatbot.setApiKey('AIza-tu-key-aqui');
   ```

**IMPORTANTE para Gemini:**
También necesitas cambiar el endpoint. En `chatbot.js` línea 88, reemplaza la función `callOpenAI` por `callGemini`.

## Configuración Paso a Paso

### 1. Obtén tu API Key
- Elige una opción (OpenAI o Gemini)
- Sigue los pasos anteriores para obtener la key

### 2. Configura la Key en el HTML
Abre `esqueleto.html` y busca la línea ~458:

```javascript
// Antes (comentado)
// window.portfolioChatbot.setApiKey('TU_API_KEY_AQUI');

// Después (descomentado con tu key)
window.portfolioChatbot.setApiKey('sk-proj-...');  // Para OpenAI
// O
window.portfolioChatbot.setApiKey('AIza...');      // Para Gemini
```

### 3. Guarda y Prueba
1. Guarda el archivo
2. Recarga la página (Ctrl + Shift + R)
3. Click en el botón del chatbot (esquina inferior derecha)
4. Escribe un mensaje de prueba

## Respuestas de Fallback

El chatbot tiene respuestas predefinidas que funcionan SIN API key para:
- Experiencia profesional
- Tecnologías y skills
- Proyectos destacados
- Información de contacto

Estas se activan automáticamente si:
- No hay API key configurada
- La API falla o no responde
- Se alcanza el límite de requests

## Seguridad de la API Key

⚠️ **IMPORTANTE:**

### Para GitHub Pages (público):
NO pongas tu API key directamente en el código si vas a subir a GitHub. En su lugar:

1. **Opción A: Variables de entorno (backend)**
   - Crea un backend simple en Vercel/Netlify
   - El backend tiene la key
   - El frontend llama a tu backend

2. **Opción B: Netlify/Vercel Functions**
   - Usa serverless functions
   - La key está en variables de entorno
   - Más seguro para producción

3. **Opción C: Solo localmente**
   - Usa el chatbot solo en tu versión local
   - No subas `esqueleto.html` con la key

### Para desarrollo local:
Puedes usar la key directamente sin problema.

## Personalización

### Cambiar el contexto del bot
En `chatbot.js` línea 11-28, edita `systemContext` para:
- Agregar más información sobre ti
- Cambiar el tono de las respuestas
- Agregar enlaces específicos

### Cambiar los colores
En `chatbot.css`:
- Línea 17: Color del botón principal
- Línea 79: Color del header
- Línea 337: Color de los mensajes del usuario

### Agregar más sugerencias
En `chatbot.js` línea 45-48, agrega más botones:
```html
<button class="suggestion-btn" data-message="Tu pregunta">🎯 Texto</button>
```

## Límites y Costos

### OpenAI GPT-3.5:
- $0.0005 por 1K tokens (entrada)
- $0.0015 por 1K tokens (salida)
- 300 tokens max por respuesta = ~$0.0005 por mensaje
- 1000 conversaciones = ~$0.50 USD

### Google Gemini:
- 60 requests/minuto GRATIS
- Después: $0.00025 por 1K chars
- Mucho más económico para portfolios

## Solución de Problemas

### El chatbot no responde
1. ✅ Verifica que la API key esté correctamente pegada
2. ✅ Abre la consola (F12) y revisa errores
3. ✅ Verifica que no haya comillas mal cerradas
4. ✅ Prueba con una key nueva

### Error 401 (Unauthorized)
- La API key es incorrecta o expiró
- Genera una nueva key

### Error 429 (Rate Limit)
- Has excedido el límite de requests
- Espera unos minutos o actualiza tu plan

### Error de CORS
- Estás usando la API desde `file://`
- Usa un servidor local (Live Server, Five Server, etc.)

## Comandos Útiles

### Probar el chatbot sin API:
El chatbot funcionará con respuestas predefinidas automáticamente.

### Ver logs en consola:
```javascript
// En chatbot.js, agrega console.log en línea 127
console.log('API Response:', data);
```

### Resetear conversación:
```javascript
// En la consola del navegador
window.portfolioChatbot.conversationHistory = [];
```

## Archivos del Chatbot

- `chatbot.js` - Lógica principal (384 líneas)
- `chatbot.css` - Estilos completos (480 líneas)
- `esqueleto.html` - Integración y configuración

## Próximos Pasos

1. ✅ Obtener API key (OpenAI o Gemini)
2. ✅ Configurar key en esqueleto.html
3. ✅ Probar el chatbot localmente
4. ⏳ Personalizar mensajes y contexto
5. ⏳ Decidir estrategia para producción (backend/serverless)
6. ⏳ Deployar y probar en GitHub Pages

## Recursos

- [OpenAI API Docs](https://platform.openai.com/docs)
- [Google Gemini API](https://ai.google.dev/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/concepts/functions/serverless-functions)
- [Netlify Functions](https://docs.netlify.com/functions/overview/)

---

¿Necesitas ayuda con la configuración? 
¡El chatbot está listo para usar! 🚀
