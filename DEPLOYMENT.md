# 🚀 Guía de Despliegue con IA Segura

Esta guía te muestra cómo desplegar tu portfolio con chatbot IA usando Vercel, manteniendo tu API key segura.

## 📋 Requisitos

- Cuenta en [Vercel](https://vercel.com) (gratis)
- Cuenta en GitHub (ya la tienes)
- API key de Google Gemini

## 🔐 Arquitectura de Seguridad

```
Usuario → Frontend (GitHub Pages)
            ↓
         Chatbot JS
            ↓
    Vercel Proxy API ← (API key oculta aquí)
            ↓
      Google Gemini API
```

**Ventaja**: La API key nunca se expone al público, está segura en el servidor de Vercel.

## 📝 Pasos de Despliegue

### 1. Preparar el repositorio

```bash
# Ya tienes los archivos necesarios:
# - api/chatbot.js (proxy serverless)
# - vercel.json (configuración)
# - .env.example (ejemplo de variables)
```

### 2. Crear proyecto en Vercel

1. Ve a [https://vercel.com](https://vercel.com)
2. Click en **"Add New Project"**
3. Importa tu repositorio: `juansolor/CursoTotiBahia`
4. Vercel detectará automáticamente la configuración

### 3. Configurar Variables de Entorno

En la configuración del proyecto de Vercel:

1. Ve a **Settings** → **Environment Variables**
2. Agrega la variable:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: `tu_nueva_api_key_aqui`
   - **Environment**: Selecciona `Production`, `Preview`, `Development`
3. Click en **Save**

### 4. Desplegar

1. Click en **Deploy**
2. Vercel desplegará automáticamente
3. Obtendrás una URL como: `https://tu-proyecto.vercel.app`

### 5. Actualizar el Frontend

Edita `esqueleto.html` línea 448:

```javascript
// Reemplaza esta línea:
// window.portfolioChatbot.proxyEndpoint = 'https://tu-proyecto.vercel.app/api/chatbot';

// Con tu URL real de Vercel:
window.portfolioChatbot.proxyEndpoint = 'https://curso-toti-bahia.vercel.app/api/chatbot';
window.portfolioChatbot.useProxy = true;
```

### 6. Subir cambios a GitHub

```bash
git add esqueleto.html
git commit -m "feat: Connect chatbot to Vercel proxy"
git push origin main
```

## ✅ Verificación

1. Abre tu portfolio en GitHub Pages
2. Abre la consola del navegador (F12)
3. Abre el chatbot y haz una pregunta
4. Deberías ver respuestas generadas por IA

## 🔍 Debugging

Si el chatbot no funciona:

### Verificar el proxy

```bash
# Prueba el endpoint directamente:
curl -X POST https://tu-proyecto.vercel.app/api/chatbot \
  -H "Content-Type: application/json" \
  -d '{"message":"Hola","conversationHistory":[]}'
```

### Verificar logs de Vercel

1. Ve a tu proyecto en Vercel
2. Click en **"Functions"** → **"Logs"**
3. Verás errores si los hay

### Errores comunes

**Error: "API not configured"**
- Solución: Verifica que `GEMINI_API_KEY` esté en las variables de entorno

**Error: CORS**
- Solución: Verifica que `vercel.json` tenga los headers CORS correctos

**Error: 404**
- Solución: Verifica que el archivo esté en `api/chatbot.js` (no en otra carpeta)

## 🆓 Límites del Plan Gratuito

**Vercel Free Tier:**
- ✅ 100 GB bandwidth/mes
- ✅ Serverless Functions incluidas
- ✅ Dominios personalizados
- ✅ SSL automático

**Google Gemini Free Tier:**
- ✅ 60 requests/minuto
- ✅ 1500 requests/día
- ✅ Suficiente para un portfolio

## 🔄 Actualizaciones Futuras

Cada vez que hagas cambios:

```bash
git add .
git commit -m "Update chatbot"
git push origin main
```

Vercel se actualizará automáticamente.

## 🎯 Ventajas de esta Arquitectura

1. ✅ **Seguridad**: API key nunca expuesta
2. ✅ **Gratis**: Vercel y Gemini tienen planes gratuitos generosos
3. ✅ **Automático**: Despliegue continuo desde Git
4. ✅ **Escalable**: Soporta tráfico real
5. ✅ **Profesional**: Arquitectura de producción

## 📚 Recursos

- [Documentación de Vercel](https://vercel.com/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [Google Gemini API](https://ai.google.dev/docs)

---

¿Problemas? Revisa los logs de Vercel o contacta al equipo de soporte.
