// ============= I18N.JS - Système d'internationalisation =============

class I18nManager {
    constructor() {
        this.currentLanguage = localStorage.getItem('cryptura_language') || 'fr';
        this.translations = this.loadTranslations();
        this.init();
    }

    loadTranslations() {
        return {
            fr: {
                // Application
                'app.title': 'Cryptura - Stéganographie et Chiffrement Avancé',
                'app.tagline': 'STEGANOGRAPHY & ENCRYPTION',
                'app.welcome': 'Bienvenue dans Cryptura!',
                
                // Navigation
                'nav.encode': 'Encoder',
                'nav.decode': 'Décoder',
                'nav.ultracrypte': 'UltraCrypte™',
                'nav.help': 'Aide',
                
                // Upload
                'upload.carrier.title': 'Fichier Porteur',
                'upload.carrier.desc': 'Glissez votre média ou cliquez pour sélectionner',
                'upload.carrier.types': 'Images • Audio • Vidéo • Documents',
                'upload.secret.title': 'Contenu Secret',
                'upload.secret.placeholder': 'Votre message confidentiel...',
                
                // Messages
                'message.welcome': 'Bienvenue dans Cryptura - Solution complète de stéganographie!',
                'message.encode.success': 'Encodage réussi avec Cryptura!',
                'message.decode.success': 'Décodage réussi avec Cryptura!',
                'message.error.nofile': 'Veuillez sélectionner un fichier',
                'message.error.nocontent': 'Veuillez saisir un contenu à cacher',
                
                // Boutons
                'btn.encode': 'Encoder avec Cryptura',
                'btn.decode': 'Décoder',
                'btn.analyze': 'Analyser',
                'btn.reset': 'Réinitialiser',
                'btn.download': 'Télécharger',
                'btn.copy': 'Copier',
                
                // États
                'status.secure': 'Sécurisé',
                'status.processing': 'Traitement en cours...',
                'status.ready': 'Prêt',
                
                // Thème
                'theme.light': 'Light',
                'theme.dark': 'Dark',
                
                // Footer
                'footer.rights': 'Cryptura - Sécurité et Confidentialité',
                'footer.files': 'fichiers traités'
            },
            
            en: {
                // Application
                'app.title': 'Cryptura - Advanced Steganography and Encryption',
                'app.tagline': 'STEGANOGRAPHY & ENCRYPTION',
                'app.welcome': 'Welcome to Cryptura!',
                
                // Navigation
                'nav.encode': 'Encode',
                'nav.decode': 'Decode',
                'nav.ultracrypte': 'UltraCrypte™',
                'nav.help': 'Help',
                
                // Upload
                'upload.carrier.title': 'Carrier File',
                'upload.carrier.desc': 'Drag your media or click to select',
                'upload.carrier.types': 'Images • Audio • Video • Documents',
                'upload.secret.title': 'Secret Content',
                'upload.secret.placeholder': 'Your confidential message...',
                
                // Messages
                'message.welcome': 'Welcome to Cryptura - Complete steganography solution!',
                'message.encode.success': 'Encoding successful with Cryptura!',
                'message.decode.success': 'Decoding successful with Cryptura!',
                'message.error.nofile': 'Please select a file',
                'message.error.nocontent': 'Please enter content to hide',
                
                // Boutons
                'btn.encode': 'Encode with Cryptura',
                'btn.decode': 'Decode',
                'btn.analyze': 'Analyze',
                'btn.reset': 'Reset',
                'btn.download': 'Download',
                'btn.copy': 'Copy',
                
                // États
                'status.secure': 'Secure',
                'status.processing': 'Processing...',
                'status.ready': 'Ready',
                
                // Thème
                'theme.light': 'Light',
                'theme.dark': 'Dark',
                
                // Footer
                'footer.rights': 'Cryptura - Security and Privacy',
                'footer.files': 'files processed'
            }
        };
    }

    init() {
        this.setupLanguageSelector();
        this.applyLanguage(this.currentLanguage);
    }

    setupLanguageSelector() {
        const toggle = document.getElementById('language-toggle');
        const dropdown = document.getElementById('language-dropdown');
        
        if (toggle && dropdown) {
            toggle.addEventListener('click', () => {
                dropdown.classList.toggle('active');
            });
            
            document.addEventListener('click', (e) => {
                if (!toggle.contains(e.target) && !dropdown.contains(e.target)) {
                    dropdown.classList.remove('active');
                }
            });
            
            dropdown.addEventListener('click', (e) => {
                const option = e.target.closest('.language-option');
                if (option) {
                    const lang = option.dataset.lang;
                    this.setLanguage(lang);
                    dropdown.classList.remove('active');
                }
            });
        }
    }

    setLanguage(lang) {
        if (this.translations[lang]) {
            this.currentLanguage = lang;
            localStorage.setItem('cryptura_language', lang);
            this.applyLanguage(lang);
            this.updateLanguageSelector(lang);
        }
    }

    getCurrentLanguage() {
        return this.currentLanguage;
    }

    translate(key) {
        const translation = this.translations[this.currentLanguage];
        return translation && translation[key] ? translation[key] : key;
    }

    applyLanguage(lang) {
        // Mise à jour du titre de la page
        document.title = this.translate('app.title');
        
        // Mise à jour des éléments avec data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.translate(key);
            if (translation !== key) {
                element.textContent = translation;
            }
        });
        
        // Mise à jour des placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            const translation = this.translate(key);
            if (translation !== key) {
                element.placeholder = translation;
            }
        });
        
        // Mise à jour du sélecteur de langue
        this.updateLanguageSelector(lang);
    }

    updateLanguageSelector(lang) {
        const toggle = document.getElementById('language-toggle');
        const options = document.querySelectorAll('.language-option');
        
        if (toggle) {
            const flagElement = toggle.querySelector('.language-flag');
            const textElement = toggle.querySelector('span:not(.language-flag)');
            
            if (flagElement && textElement) {
                flagElement.className = `language-flag ${lang === 'en' ? 'us' : lang}`;
                textElement.textContent = lang.toUpperCase();
            }
        }
        
        options.forEach(option => {
            option.classList.toggle('active', option.dataset.lang === lang);
        });
    }

    // Méthode pour la mise à jour dynamique de l'interface
    updateInterface() {
        this.applyLanguage(this.currentLanguage);
    }
}

// Initialisation globale
window.addEventListener('DOMContentLoaded', () => {
    window.i18n = new I18nManager();
});

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = I18nManager;
}
