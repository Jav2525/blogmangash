# 📚 Blog de Manga - GitHub Pages

¡Bienvenido al repositorio de tu blog de manga! Este sitio está construido con Jekyll y está listo para ser desplegado en GitHub Pages.

## 🚀 Cómo subir el sitio a GitHub Pages

### Paso 1: Preparar el repositorio en GitHub

1. **Crear un nuevo repositorio en GitHub:**
   - Ve a [github.com](https://github.com) e inicia sesión
   - Haz clic en el botón "+" y selecciona "New repository"
   - Nombra tu repositorio (ejemplo: `mi-blog-manga`)
   - Marca la opción "Add a README file"
   - Haz clic en "Create repository"

### Paso 2: Subir los archivos

Tienes dos opciones para subir los archivos:

#### Opción A: Usando Git (Recomendado)

```bash
# Navegar a la carpeta del proyecto
cd "e:\Nueva carpeta\BLOGGER\Git Hub pages"

# Inicializar Git
git init

# Añadir todos los archivos
git add .

# Hacer el primer commit
git commit -m "Initial commit: Jekyll manga blog"

# Conectar con tu repositorio de GitHub
git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git

# Subir los archivos
git push -u origin main
```

#### Opción B: Subida manual por la web

1. Ve a tu repositorio en GitHub
2. Haz clic en "Add file" > "Upload files"
3. Arrastra todos los archivos de la carpeta `Git Hub pages` al navegador
4. Escribe un mensaje de commit como "Add Jekyll blog files"
5. Haz clic en "Commit changes"

### Paso 3: Activar GitHub Pages

1. En tu repositorio de GitHub, ve a "Settings"
2. Busca la sección "Pages" en el menú lateral
3. En "Source", selecciona "Deploy from a branch"
4. Selecciona la rama "main" y la carpeta "/ (root)"
5. Haz clic en "Save"

### Paso 4: Configurar Utterances (Comentarios)

Para que funcionen los comentarios, necesitas:

1. **Instalar Utterances:**
   - Ve a: https://github.com/apps/utterances
   - Haz clic en "Install" e instálalo en tu repositorio

2. **Configurar el script:**
   - Edita el archivo `assets/js/main.js`
   - En la línea 150, cambia `'tu-usuario/tu-repo'` por tu usuario y repositorio real
   - Ejemplo: `'miusuario/mi-blog-manga'`

### Paso 5: Personalizar tu blog

#### Configuración básica (`_config.yml`)
```yaml
# Cambia estos valores por los tuyos
title: "Tu Blog de Manga"
description: "El mejor lugar para leer manga online"
url: "https://tu-usuario.github.io"
baseurl: "/tu-repositorio"

# Tu información
author:
  name: "Tu Nombre"
  email: "tu@email.com"
  social:
    twitter: "tu_twitter"
    github: "tu_github"
```

#### Añadir más capítulos de manga

1. Crea nuevos archivos en la carpeta `_posts` con el formato:
   `YYYY-MM-DD-nombre-del-post.md`

2. Usa la estructura de los posts existentes como ejemplo

3. Añade las imágenes en la carpeta `assets/images/`

## 📁 Estructura del Proyecto

```
Git Hub pages/
├── _config.yml          # Configuración de Jekyll
├── _layouts/            # Plantillas del sitio
├── _posts/              # Posts del blog (capítulos de manga)
├── assets/              # CSS, JS e imágenes
├── Gemfile              # Dependencias de Ruby
└── index.html           # Página principal
```

## 🎨 Características del Blog

- ✅ **Lector de manga integrado** con zoom y navegación
- ✅ **Sistema de comentarios** con Utterances
- ✅ **Diseño responsive** para móviles y desktop
- ✅ **Búsqueda en tiempo real**
- ✅ **Modo página simple y doble**
- ✅ **Navegación por teclado**
- ✅ **Guardado de progreso** en localStorage
- ✅ **SEO optimizado**

## 🔧 Personalización Avanzada

### Colores del sitema
Edita las variables CSS en `assets/css/main.css`:
```css
:root {
  --color-principal: #7b2cbf;    /* Color principal */
  --color-acento: #ff6b6b;       /* Color de acento */
  --color-fondo: #0f0f23;        /* Color de fondo */
}
```

### Añadir Google Analytics
En `_config.yml`:
```yaml
google_analytics: "TU-TRACKING-ID"
```

### Cambiar fuentes
En `assets/css/main.css`, modifica:
```css
--font-base: 'Tu-Fuente', system-ui, sans-serif;
```

## 📱 Funciones del Lector de Manga

### Controles de teclado:
- **Flechas izquierda/derecha:** Navegar páginas
- **Flechas arriba/abajo:** Scroll
- **Espacio:** Siguiente página
- **F o F11:** Pantalla completa
- **Escape:** Salir de zoom/pantalla completa

### Características del lector:
- Modo página simple/doble
- Lectura de izquierda a derecha o derecha a izquierda
- Zoom con click en las imágenes
- Guardado automático del progreso
- Navegación entre capítulos
- Controles táctiles para móviles

## 🆘 Solución de Problemas

### El sitio no aparece
- Verifica que GitHub Pages esté activado en Settings
- Asegúrate de que el archivo `_config.yml` esté en la raíz
- Puede tomar hasta 10 minutos en aparecer la primera vez

### Los comentarios no funcionan
- Instala la app Utterances en tu repositorio
- Verifica que el nombre del repositorio en `main.js` sea correcto
- El repositorio debe ser público

### Las imágenes no cargan
- Verifica que las rutas en los posts sean correctas
- Asegúrate de que las imágenes estén en `assets/images/`
- Usa rutas relativas comenzando con `/assets/`

## 📞 Soporte

Si tienes problemas:
1. Revisa la documentación de [Jekyll](https://jekyllrb.com/)
2. Consulta la guía de [GitHub Pages](https://pages.github.com/)
3. Verifica que todos los archivos se hayan subido correctamente

## 🎉 ¡Listo!

Una vez completados estos pasos, tu blog de manga estará disponible en:
`https://tu-usuario.github.io/tu-repositorio`

¡Disfruta de tu nuevo blog de manga con lector integrado!

---

**Nota:** Recuerda respetar los derechos de autor del manga que publiques. Este proyecto es solo para fines educativos y de demostración.