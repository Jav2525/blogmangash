// =========================
// LECTOR DE MANGA - JAVASCRIPT
// =========================

class MangaReader {
    constructor() {
        this.currentPage = 0;
        this.pages = [];
        this.viewMode = 'single'; // single, double
        this.readingDirection = 'ltr'; // ltr, rtl
        this.zoomLevel = 1;
        this.isFullscreen = false;
        this.isZoomed = false;
        
        this.init();
    }
    
    init() {
        this.loadPages();
        this.setupControls();
        this.setupKeyboardNavigation();
        this.setupProgressIndicator();
        this.loadUserPreferences();
    }
    
    loadPages() {
        const pagesData = document.getElementById('manga-pages-data');
        if (pagesData) {
            try {
                this.pages = JSON.parse(pagesData.textContent);
                this.renderPages();
            } catch (error) {
                console.error('Error loading pages:', error);
                this.showError('Error al cargar las páginas del manga');
            }
        }
    }
    
    setupControls() {
        // Botones de control
        const prevBtn = document.getElementById('prev-page');
        const nextBtn = document.getElementById('next-page');
        const fullscreenBtn = document.getElementById('fullscreen-btn');
        const settingsBtn = document.getElementById('settings-btn');
        
        if (prevBtn) prevBtn.addEventListener('click', () => this.previousPage());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextPage());
        if (fullscreenBtn) fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
        if (settingsBtn) settingsBtn.addEventListener('click', () => this.toggleSettings());
        
        // Configuraciones
        const viewModeButtons = document.querySelectorAll('[data-view-mode]');
        viewModeButtons.forEach(btn => {
            btn.addEventListener('click', () => this.setViewMode(btn.dataset.viewMode));
        });
        
        const directionButtons = document.querySelectorAll('[data-direction]');
        directionButtons.forEach(btn => {
            btn.addEventListener('click', () => this.setDirection(btn.dataset.direction));
        });
        
        const zoomRange = document.getElementById('zoom-range');
        if (zoomRange) {
            zoomRange.addEventListener('input', (e) => this.setZoom(e.target.value));
        }
    }
    
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.readingDirection === 'ltr' ? this.previousPage() : this.nextPage();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.readingDirection === 'ltr' ? this.nextPage() : this.previousPage();
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    this.scrollPage(-100);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    this.scrollPage(100);
                    break;
                case ' ':
                    e.preventDefault();
                    this.nextPage();
                    break;
                case 'f':
                case 'F11':
                    e.preventDefault();
                    this.toggleFullscreen();
                    break;
                case 'Escape':
                    if (this.isFullscreen) {
                        this.toggleFullscreen();
                    }
                    if (this.isZoomed) {
                        this.resetZoom();
                    }
                    break;
            }
        });
    }
    
    setupProgressIndicator() {
        const progressBar = document.querySelector('.progress-indicator');
        if (progressBar) {
            this.updateProgress();
        }
    }
    
    renderPages() {
        const container = document.getElementById('pages-container');
        if (!container || this.pages.length === 0) return;
        
        container.innerHTML = '';
        container.className = `pages-container ${this.viewMode}-page`;
        
        if (this.viewMode === 'single') {
            this.renderSinglePage();
        } else {
            this.renderDoublePage();
        }
        
        this.updateNavigation();
        this.updateProgress();
    }
    
    renderSinglePage() {
        const container = document.getElementById('pages-container');
        const page = this.pages[this.currentPage];
        
        if (page) {
            const img = this.createPageImage(page, this.currentPage);
            container.appendChild(img);
        }
    }
    
    renderDoublePage() {
        const container = document.getElementById('pages-container');
        const leftPageIndex = this.readingDirection === 'ltr' ? this.currentPage : this.currentPage + 1;
        const rightPageIndex = this.readingDirection === 'ltr' ? this.currentPage + 1 : this.currentPage;
        
        const leftPage = this.pages[leftPageIndex];
        const rightPage = this.pages[rightPageIndex];
        
        if (this.readingDirection === 'rtl') {
            if (rightPage) container.appendChild(this.createPageImage(rightPage, rightPageIndex));
            if (leftPage) container.appendChild(this.createPageImage(leftPage, leftPageIndex));
        } else {
            if (leftPage) container.appendChild(this.createPageImage(leftPage, leftPageIndex));
            if (rightPage) container.appendChild(this.createPageImage(rightPage, rightPageIndex));
        }
    }
    
    createPageImage(page, index) {
        const img = document.createElement('img');
        img.src = page.url;
        img.alt = `Página ${index + 1}`;
        img.className = 'manga-page';
        img.dataset.pageIndex = index;
        
        // Lazy loading
        img.loading = 'lazy';
        
        // Click para zoom
        img.addEventListener('click', (e) => {
            this.toggleImageZoom(e.target);
        });
        
        // Manejo de errores
        img.addEventListener('error', () => {
            img.alt = 'Error al cargar la imagen';
            img.style.background = '#333';
            img.style.color = '#fff';
            img.style.display = 'flex';
            img.style.alignItems = 'center';
            img.style.justifyContent = 'center';
            img.style.height = '400px';
        });
        
        return img;
    }
    
    previousPage() {
        if (this.viewMode === 'double') {
            this.currentPage = Math.max(0, this.currentPage - 2);
        } else {
            this.currentPage = Math.max(0, this.currentPage - 1);
        }
        this.renderPages();
        this.saveUserPreferences();
    }
    
    nextPage() {
        const maxPage = this.pages.length - 1;
        if (this.viewMode === 'double') {
            this.currentPage = Math.min(maxPage, this.currentPage + 2);
        } else {
            this.currentPage = Math.min(maxPage, this.currentPage + 1);
        }
        this.renderPages();
        this.saveUserPreferences();
    }
    
    goToPage(pageNumber) {
        const page = Math.max(0, Math.min(this.pages.length - 1, pageNumber - 1));
        this.currentPage = page;
        this.renderPages();
        this.saveUserPreferences();
    }
    
    setViewMode(mode) {
        this.viewMode = mode;
        this.updateActiveButton('[data-view-mode]', `[data-view-mode="${mode}"]`);
        this.renderPages();
        this.saveUserPreferences();
    }
    
    setDirection(direction) {
        this.readingDirection = direction;
        this.updateActiveButton('[data-direction]', `[data-direction="${direction}"]`);
        this.renderPages();
        this.saveUserPreferences();
    }
    
    setZoom(level) {
        this.zoomLevel = parseFloat(level);
        const container = document.getElementById('pages-container');
        if (container) {
            container.style.transform = `scale(${this.zoomLevel})`;
            container.style.transformOrigin = 'center top';
        }
        this.saveUserPreferences();
    }
    
    toggleImageZoom(img) {
        if (img.classList.contains('zoomed')) {
            this.resetZoom();
        } else {
            this.zoomImage(img);
        }
    }
    
    zoomImage(img) {
        // Crear overlay
        const overlay = document.querySelector('.zoom-overlay') || this.createZoomOverlay();
        
        // Clonar imagen
        const zoomedImg = img.cloneNode();
        zoomedImg.classList.add('zoomed');
        
        overlay.innerHTML = '';
        overlay.appendChild(zoomedImg);
        overlay.classList.add('visible');
        
        this.isZoomed = true;
        
        // Click para cerrar
        overlay.addEventListener('click', () => this.resetZoom());
    }
    
    createZoomOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'zoom-overlay';
        document.body.appendChild(overlay);
        return overlay;
    }
    
    resetZoom() {
        const overlay = document.querySelector('.zoom-overlay');
        if (overlay) {
            overlay.classList.remove('visible');
        }
        this.isZoomed = false;
    }
    
    toggleFullscreen() {
        const reader = document.querySelector('.manga-reader');
        
        if (!this.isFullscreen) {
            if (reader.requestFullscreen) {
                reader.requestFullscreen();
            } else if (reader.webkitRequestFullscreen) {
                reader.webkitRequestFullscreen();
            } else if (reader.msRequestFullscreen) {
                reader.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }
    
    toggleSettings() {
        const settings = document.querySelector('.reader-settings');
        if (settings) {
            settings.classList.toggle('visible');
        }
    }
    
    updateNavigation() {
        const prevBtn = document.getElementById('prev-page');
        const nextBtn = document.getElementById('next-page');
        const pageCounter = document.querySelector('.page-counter');
        
        if (prevBtn) {
            prevBtn.disabled = this.currentPage === 0;
        }
        
        if (nextBtn) {
            const isLastPage = this.viewMode === 'double' 
                ? this.currentPage >= this.pages.length - 1
                : this.currentPage === this.pages.length - 1;
            nextBtn.disabled = isLastPage;
        }
        
        if (pageCounter) {
            const currentDisplay = this.currentPage + 1;
            const totalPages = this.pages.length;
            pageCounter.textContent = `${currentDisplay} / ${totalPages}`;
        }
    }
    
    updateProgress() {
        const progressBar = document.querySelector('.progress-indicator');
        if (progressBar && this.pages.length > 0) {
            const progress = ((this.currentPage + 1) / this.pages.length) * 100;
            progressBar.style.width = `${progress}%`;
        }
    }
    
    updateActiveButton(selector, activeSelector) {
        const buttons = document.querySelectorAll(selector);
        buttons.forEach(btn => btn.classList.remove('active'));
        
        const activeButton = document.querySelector(activeSelector);
        if (activeButton) {
            activeButton.classList.add('active');
        }
    }
    
    scrollPage(amount) {
        window.scrollBy({
            top: amount,
            behavior: 'smooth'
        });
    }
    
    showError(message) {
        const container = document.getElementById('pages-container');
        if (container) {
            container.innerHTML = `
                <div class="error-message" style="
                    color: #fff;
                    text-align: center;
                    padding: 2rem;
                    font-size: 1.1rem;
                ">
                    <p>${message}</p>
                    <button onclick="location.reload()" style="
                        background: var(--color-principal);
                        color: #fff;
                        border: none;
                        padding: 0.5rem 1rem;
                        border-radius: 6px;
                        margin-top: 1rem;
                        cursor: pointer;
                    ">Recargar</button>
                </div>
            `;
        }
    }
    
    saveUserPreferences() {
        const preferences = {
            currentPage: this.currentPage,
            viewMode: this.viewMode,
            readingDirection: this.readingDirection,
            zoomLevel: this.zoomLevel
        };
        
        const postUrl = window.location.pathname;
        localStorage.setItem(`manga-reader-${postUrl}`, JSON.stringify(preferences));
    }
    
    loadUserPreferences() {
        const postUrl = window.location.pathname;
        const saved = localStorage.getItem(`manga-reader-${postUrl}`);
        
        if (saved) {
            try {
                const preferences = JSON.parse(saved);
                this.currentPage = preferences.currentPage || 0;
                this.viewMode = preferences.viewMode || 'single';
                this.readingDirection = preferences.readingDirection || 'ltr';
                this.zoomLevel = preferences.zoomLevel || 1;
                
                // Actualizar controles
                this.updateActiveButton('[data-view-mode]', `[data-view-mode="${this.viewMode}"]`);
                this.updateActiveButton('[data-direction]', `[data-direction="${this.readingDirection}"]`);
                
                const zoomRange = document.getElementById('zoom-range');
                if (zoomRange) {
                    zoomRange.value = this.zoomLevel;
                }
            } catch (error) {
                console.error('Error loading preferences:', error);
            }
        }
    }
}

// Manejo de fullscreen
document.addEventListener('fullscreenchange', () => {
    const reader = window.mangaReader;
    if (reader) {
        reader.isFullscreen = !!document.fullscreenElement;
        const fullscreenBtn = document.getElementById('fullscreen-btn');
        if (fullscreenBtn) {
            fullscreenBtn.textContent = reader.isFullscreen ? '🗗 Salir' : '🗖 Pantalla completa';
        }
    }
});

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.manga-reader')) {
        window.mangaReader = new MangaReader();
    }
});