// ============= THEME MANAGER =============
// Gestion des thèmes clair/sombre avec persistance

class ThemeManager {
    constructor() {
        this.currentTheme = this.getStoredTheme() || 'dark';
        this.init();
    }

    init() {
        // Appliquer le thème initial
        this.applyTheme(this.currentTheme);
        
        // Mettre à jour l'interface du bouton
        this.updateThemeButton();
        
        console.log(`🎨 Thème initialisé: ${this.currentTheme}`);
    }

    getStoredTheme() {
        try {
            return localStorage.getItem('obscura-theme');
        } catch (e) {
            console.warn('localStorage non disponible pour les thèmes');
            return null;
        }
    }

    storeTheme(theme) {
        try {
            localStorage.setItem('obscura-theme', theme);
        } catch (e) {
            console.warn('Impossible de sauvegarder le thème');
        }
    }

    applyTheme(theme) {
        // Appliquer le thème au document
        document.documentElement.setAttribute('data-theme', theme);
        
        // Mise à jour de la classe body pour compatibilité
        document.body.className = document.body.className.replace(/theme-\w+/g, '');
        document.body.classList.add(`theme-${theme}`);
        
        this.currentTheme = theme;
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        
        // Animation de transition
        document.documentElement.style.transition = 'color-scheme 0.3s ease, background-color 0.3s ease';
        
        this.applyTheme(newTheme);
        this.updateThemeButton();
        this.storeTheme(newTheme);
        
        // Nettoyer la transition après l'animation
        setTimeout(() => {
            document.documentElement.style.transition = '';
        }, 300);
        
        console.log(`🎨 Thème basculé vers: ${newTheme}`);
        
        // Événement pour les autres composants
        window.dispatchEvent(new CustomEvent('themeChanged', { 
            detail: { theme: newTheme } 
        }));
    }

    updateThemeButton() {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;

        const icon = themeToggle.querySelector('i');
        const text = themeToggle.querySelector('.toggle-text');
        
        if (this.currentTheme === 'dark') {
            icon.className = 'fas fa-sun';
            if (text) text.textContent = window.i18n?.t('settings.theme.light') || 'Mode clair';
            themeToggle.title = 'Basculer vers le mode clair';
        } else {
            icon.className = 'fas fa-moon';
            if (text) text.textContent = window.i18n?.t('settings.theme.dark') || 'Mode sombre';
            themeToggle.title = 'Basculer vers le mode sombre';
        }
    }

    getCurrentTheme() {
        return this.currentTheme;
    }

    setTheme(theme) {
        if (theme === 'light' || theme === 'dark') {
            this.applyTheme(theme);
            this.updateThemeButton();
            this.storeTheme(theme);
        }
    }
}

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeManager;
}
