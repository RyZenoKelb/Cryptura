// ============= THEME.JS - Système de gestion des thèmes =============

class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('obscura-theme') || 'dark';
        this.init();
        
        console.log('🎨 Gestionnaire de thème initialisé:', this.currentTheme);
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.setupThemeToggle();
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        localStorage.setItem('obscura-theme', theme);
        
        // Update theme toggle icon
        this.updateThemeToggleIcon();
        
        // Trigger theme change event
        document.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { theme: theme }
        }));
        
        console.log('🎨 Thème appliqué:', theme);
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
    }

    getCurrentTheme() {
        return this.currentTheme;
    }

    isDark() {
        return this.currentTheme === 'dark';
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }

    updateThemeToggleIcon() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            const text = themeToggle.querySelector('.toggle-text');
            
            if (this.currentTheme === 'dark') {
                icon.className = 'fas fa-sun';
                if (text) text.textContent = window.i18n ? window.i18n.t('settings.theme.light') : 'Mode clair';
            } else {
                icon.className = 'fas fa-moon';
                if (text) text.textContent = window.i18n ? window.i18n.t('settings.theme.dark') : 'Mode sombre';
            }
        }
    }

    // Get appropriate colors for current theme
    getThemeColors() {
        const isDark = this.isDark();
        
        return {
            primary: isDark ? '#3b82f6' : '#2563eb',
            secondary: isDark ? '#64748b' : '#475569',
            background: isDark ? '#0f172a' : '#ffffff',
            surface: isDark ? '#1e293b' : '#f8fafc',
            text: isDark ? '#f1f5f9' : '#0f172a',
            textSecondary: isDark ? '#94a3b8' : '#64748b',
            border: isDark ? '#334155' : '#e2e8f0',
            success: '#10b981',
            warning: '#f59e0b',
            error: '#ef4444'
        };
    }
}

// Export for global use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeManager;
}
