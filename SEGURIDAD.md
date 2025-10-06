# 🔒 PRIVACIDAD Y SEGURIDAD DEL BLOG

## ¿Qué pueden ver los usuarios?

### ✅ **Público (Visible para todos):**
- Código fuente del repositorio en GitHub
- HTML/CSS/JavaScript generado
- Estructura de archivos
- Configuraciones (excepto secretos)
- Todo el contenido publicado

### ❌ **Lo que NO pueden ver:**
- Claves privadas (si no las incluyes)
- Repositorios privados (con GitHub Pro)
- Imágenes protegidas externamente

## 🛡️ **PROTECCIONES IMPLEMENTADAS:**

### **1. Protección básica de imágenes:**
```javascript
// Deshabilitado:
- Clic derecho en imágenes del manga
- Arrastrar imágenes
- Seleccionar texto/imágenes en el lector
- Guardar imágenes fácilmente
```

### **2. Opciones adicionales de protección:**

#### **Opción A: Repositorio privado**
```yaml
Costo: $4/mes (GitHub Pro)
Beneficio: Código fuente privado
Limitación: Las imágenes siguen siendo accesibles por URL
```

#### **Opción B: Hosting externo de imágenes**
```yaml
Servicios recomendados:
- Cloudinary (con transformaciones)
- ImageKit (con watermarks)
- Firebase Storage (con reglas)
```

#### **Opción C: Watermarks en imágenes**
```yaml
Herramientas:
- Photoshop/GIMP: Añadir marca de agua
- Batch Image Watermark: Automatizado
- Online: watermark.ws
```

## 🔧 **CONFIGURACIÓN ADICIONAL DE SEGURIDAD:**

### **1. Variables de entorno (para secretos):**
Si necesitas claves API, usa GitHub Secrets:
```yaml
# En GitHub: Settings > Secrets > Actions
# Nunca pongas claves en el código
```

### **2. Robots.txt personalizado:**
Crear `/robots.txt`:
```txt
User-agent: *
Disallow: /assets/images/
Disallow: /admin/
Allow: /

Sitemap: https://tu-usuario.github.io/sitemap.xml
```

### **3. Headers de seguridad:**
En `_config.yml`:
```yaml
plugins:
  - jekyll-seo-tag

defaults:
  - scope:
      path: "assets/images"
    values:
      sitemap: false
```

## ⚖️ **CONSIDERACIONES LEGALES:**

### **Derechos de autor del manga:**
```txt
⚠️ IMPORTANTE:
- El manga tiene derechos de autor
- Uso educativo/personal puede estar permitido
- Considera añadir disclaimers
- Respeta las políticas de GitHub
```

### **Disclaimer sugerido:**
```html
<!-- Añadir en _layouts/default.html -->
<div class="disclaimer">
  <p>Este sitio es solo para fines educativos. 
     Todos los derechos pertenecen a sus respectivos autores.</p>
</div>
```

## 🌐 **ALTERNATIVAS PARA MÁS PRIVACIDAD:**

### **1. Netlify (Gratis con repositorio privado):**
```yaml
Ventajas:
- Repositorio puede ser privado
- Mejor control de headers
- Funciones serverless
```

### **2. Vercel (Similar a Netlify):**
```yaml
Ventajas:
- Deploy desde repositorio privado
- Edge functions
- Analytics incluido
```

### **3. Tu propio servidor:**
```yaml
Opciones:
- VPS (Digital Ocean, Vultr)
- Shared hosting con Jekyll
- Control total sobre privacidad
```

## 📋 **RESUMEN DE TU SITUACIÓN:**

```txt
✅ Código fuente será público (normal en GitHub Pages)
✅ Protección básica de imágenes añadida
✅ Los usuarios no pueden descargar fácilmente
⚠️ Los técnicos aún pueden acceder a las imágenes
💡 Para más seguridad, considera hosting privado
```

## 🚀 **RECOMENDACIÓN:**

Para un blog de manga personal/educativo:
1. **Usa GitHub Pages** (es perfecto para empezar)
2. **Añade watermarks** a las imágenes importantes
3. **Incluye disclaimers** legales
4. **Si crece el sitio**, migra a Netlify/Vercel

¿Te preocupa algún aspecto específico de la privacidad o quieres implementar alguna protección adicional?