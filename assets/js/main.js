// =========================
// FUNCIONALIDAD PRINCIPAL DEL SITIO
// =========================

document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
    initializeNavigation();
    initializeLazyLoading();
    initializeUtterances();
});

// =========================
// BÚSQUEDA
// =========================
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    
    if (searchInput && searchButton) {
        // Búsqueda en tiempo real
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                performSearch(this.value.trim());
            }, 300);
        });
        
        // Búsqueda al hacer clic
        searchButton.addEventListener('click', function() {
            performSearch(searchInput.value.trim());
        });
        
        // Búsqueda al presionar Enter
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch(this.value.trim());
            }
        });
    }
}

function performSearch(query) {
    if (!query || query.length < 2) {
        hideSearchResults();
        return;
    }
    
    // Buscar en el contenido de los posts
    const posts = document.querySelectorAll('.post-card');
    const results = [];
    
    posts.forEach(post => {
        const title = post.querySelector('.post-title')?.textContent || '';
        const series = post.querySelector('.post-series')?.textContent || '';
        const tags = Array.from(post.querySelectorAll('.tag')).map(tag => tag.textContent).join(' ');
        
        const searchText = `${title} ${series} ${tags}`.toLowerCase();
        if (searchText.includes(query.toLowerCase())) {
            results.push(post);
        }
    });
    
    showSearchResults(results, query);
}

function showSearchResults(results, query) {
    // Ocultar posts que no coinciden
    const allPosts = document.querySelectorAll('.post-card');
    allPosts.forEach(post => {
        if (results.includes(post)) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
    
    // Mostrar mensaje de resultados
    showSearchMessage(`${results.length} resultado(s) para "${query}"`);
}

function hideSearchResults() {
    const allPosts = document.querySelectorAll('.post-card');
    allPosts.forEach(post => {
        post.style.display = 'block';
    });
    hideSearchMessage();
}

function showSearchMessage(message) {
    let messageEl = document.getElementById('search-message');
    if (!messageEl) {
        messageEl = document.createElement('div');
        messageEl.id = 'search-message';
        messageEl.style.cssText = `
            background: rgba(123, 44, 191, 0.1);
            border: 1px solid rgba(123, 44, 191, 0.3);
            color: #fff;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 2rem;
            text-align: center;
        `;
        
        const postsGrid = document.querySelector('.posts-grid');
        if (postsGrid) {
            postsGrid.parentNode.insertBefore(messageEl, postsGrid);
        }
    }
    
    messageEl.textContent = message;
    messageEl.style.display = 'block';
}

function hideSearchMessage() {
    const messageEl = document.getElementById('search-message');
    if (messageEl) {
        messageEl.style.display = 'none';
    }
}

// =========================
// NAVEGACIÓN
// =========================
function initializeNavigation() {
    // Navegación móvil
    const mobileToggle = document.getElementById('mobile-nav-toggle');
    const navigation = document.querySelector('.site-navigation');
    
    if (mobileToggle && navigation) {
        mobileToggle.addEventListener('click', function() {
            navigation.classList.toggle('visible');
            this.setAttribute('aria-expanded', navigation.classList.contains('visible'));
        });
    }
    
    // Cerrar navegación móvil al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (navigation && !navigation.contains(e.target) && !mobileToggle?.contains(e.target)) {
            navigation.classList.remove('visible');
            if (mobileToggle) {
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });
    
    // Smooth scrolling para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// =========================
// LAZY LOADING DE IMÁGENES
// =========================
function initializeLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// =========================
// UTTERANCES (COMENTARIOS)
// =========================
function initializeUtterances() {
    const commentsContainer = document.getElementById('comments');
    if (commentsContainer && !commentsContainer.querySelector('.utterances')) {
        // Crear script de Utterances
        const script = document.createElement('script');
        script.src = 'https://utteranc.es/client.js';
        script.setAttribute('repo', 'Jav2525/blogmangash');
        script.setAttribute('issue-term', 'pathname');
        script.setAttribute('label', 'comentarios');
        script.setAttribute('theme', 'github-dark');
        script.setAttribute('crossorigin', 'anonymous');
        script.async = true;
        
        commentsContainer.appendChild(script);
    }
}

// =========================
// UTILIDADES
// =========================

// Formatear fechas
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Copiar al portapapeles
function copyToClipboard(text) {
    navigator.clipboard.writeTest(text).then(() => {
        showNotification('Copiado al portapapeles');
    }).catch(() => {
        // Fallback para navegadores más antiguos
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showNotification('Copiado al portapapeles');
    });
}

// Mostrar notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--color-principal);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: var(--sombra);
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-remove después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Detectar modo oscuro del sistema
function detectDarkMode() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Manejar cambios en el modo oscuro
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        // Aquí puedes añadir lógica adicional si necesitas reaccionar a cambios del modo oscuro
        console.log('Modo oscuro:', e.matches);
    });
}

// =========================
// ANALYTICS Y SEGUIMIENTO
// =========================

// Seguimiento de eventos (placeholder para Google Analytics u otros)
function trackEvent(category, action, label = null, value = null) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value
        });
    }
}

// Seguimiento de lectura de manga
function trackMangaReading(title, chapter, page) {
    trackEvent('Manga', 'page_read', `${title} - ${chapter}`, page);
}

// Seguimiento de búsquedas
function trackSearch(query, results) {
    trackEvent('Search', 'search', query, results);
}

// =========================
// PWA SUPPORT
// =========================

// Registrar Service Worker (si existe)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registrado:', registration.scope);
            })
            .catch(registrationError => {
                console.log('SW falló:', registrationError);
            });
    });
}

// Manejar instalación de PWA
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    deferredPrompt = e;
    // Mostrar botón de instalación personalizado si es necesario
});

// =========================
// MANEJO DE ERRORES
// =========================

window.addEventListener('error', (e) => {
    console.error('Error global:', e.error);
    // Aquí puedes enviar errores a un servicio de monitoreo
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Promise rechazada:', e.reason);
    // Aquí puedes enviar errores de promesas a un servicio de monitoreo
});

// =========================
// EXPORT PARA USAR EN OTROS SCRIPTS
// =========================
window.siteUtils = {
    formatDate,
    copyToClipboard,
    showNotification,
    trackEvent,
    trackMangaReading,
    trackSearch
};