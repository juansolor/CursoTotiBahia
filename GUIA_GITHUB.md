# 📋 GUÍA: Crear y Subir el Portafolio a GitHub

## Paso 1: Configurar Git (Primera vez)

Si es la primera vez que usas Git, configura tu información:

```bash
git config --global user.name "Juan Pablo Solorzano"
git config --global user.email "juanpablo.solorzanoojeda@gmail.com"
```

## Paso 2: Inicializar el Repositorio Local

Navega a la carpeta del portafolio y ejecuta:

```bash
cd "c:\Users\PE-10Note\OneDrive\Documentos\ccstoti"
git init
git add .
git commit -m "Initial commit: Portfolio de Juan Pablo Solorzano"
```

## Paso 3: Crear el Repositorio en GitHub

1. Ve a https://github.com/new
2. **Repository name**: `portfolio` (o el nombre que prefieras)
3. **Description**: "Portfolio profesional - Desarrollador Full Stack"
4. Selecciona **Public** para que sea visible
5. NO inicialices con README, .gitignore o LICENSE (ya tenemos estos archivos)
6. Haz clic en **Create repository**

## Paso 4: Conectar el Repositorio Local con GitHub

Después de crear el repo en GitHub, verás instrucciones. Ejecuta en PowerShell:

```bash
git branch -M main
git remote add origin https://github.com/juansolor/portfolio.git
git push -u origin main
```

**Nota**: Reemplaza `juansolor` con tu usuario de GitHub.

## Paso 5: Usar Token de Autenticación (Recomendado)

GitHub ahora requiere autenticación. Usa un Personal Access Token:

1. Ve a https://github.com/settings/tokens
2. Click en **Generate new token (classic)**
3. Dale un nombre descriptivo (ej: "Portfolio Push")
4. Selecciona el scope `repo`
5. Click **Generate token**
6. **Copia el token** (aparecerá solo una vez)

## Paso 6: Hacer el Push (Primera vez con Token)

```bash
git push -u origin main
```

Cuando te pida contraseña, pega el token que generaste.

## Paso 7: Configurar GitHub Pages (Opcional)

Para que el portafolio sea accesible en una URL:

1. Ve a tu repositorio en GitHub
2. **Settings** → **Pages**
3. En "Source" selecciona **main branch**
4. Haz clic en **Save**
5. Tu portafolio estará en: `https://juansolor.github.io/portfolio`

## Paso 8: Hacer Cambios Locales y Sincronizar

Después de hacer cambios:

```bash
git add .
git commit -m "Descripción de los cambios"
git push origin main
```

## Comandos Útiles

| Comando | Descripción |
|---------|-------------|
| `git status` | Ver archivos modificados |
| `git log` | Ver historial de commits |
| `git diff` | Ver diferencias en archivos |
| `git pull origin main` | Descargar cambios remotos |
| `git reset --hard HEAD~1` | Deshacer último commit |

## 🔒 Guardar Token en PowerShell (Opcional)

Para no escribir el token cada vez:

```bash
# En PowerShell como administrador:
git config --global credential.helper wincred
```

La próxima vez que hagas push, Windows te permitirá guardar las credenciales.

## ✅ Verificar que Todo Funciona

```bash
# Ver remote configurado
git remote -v

# Ver rama actual
git branch

# Ver estado
git status
```

## 📝 Notas Importantes

- El archivo `.gitignore` evita subir archivos innecesarios
- Los cambios se suben a `main` (rama por defecto)
- GitHub Pages actualizará automáticamente en 1-2 minutos
- El portafolio será público en GitHub

## 🆘 Solucionar Problemas

**Error: "origin already exists"**
```bash
git remote remove origin
git remote add origin https://github.com/juansolor/portfolio.git
```

**Error: "Permission denied"**
- Verifica que uses el token correcto
- O genera un nuevo token con permisos `repo`

**Cambios no aparecen en GitHub Pages**
- Espera 2-3 minutos
- Verifica en Settings → Pages que esté activado
- Revisa que estés en la rama correcta

---

¡Listo! Tu portafolio estará en GitHub y visible en Internet. 🚀
