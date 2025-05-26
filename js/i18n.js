// ============= I18N.JS - Système d'internationalisation =============
// Support multilingue pour l'interface Obscura

class I18nManager {
    constructor() {
        this.currentLanguage = 'fr';
        this.fallbackLanguage = 'fr';
        this.translations = {};
        this.init();
    }

    init() {
        // Chargement des traductions
        this.loadTranslations();
        
        // Détection de la langue du navigateur
        this.detectBrowserLanguage();
        
        // Application de la langue
        this.applyLanguage(this.currentLanguage);
        
        // Suppression du console.log
        // console.log(`🌍 I18n initialisé - Langue: ${this.currentLanguage}`);
    }

    loadTranslations() {
        this.translations = {
            fr: {
                // Header
                'header.tagline': 'Stéganographie Avancée',
                'header.status': 'Système actif',
                'theme.dark': 'Sombre',
                'theme.light': 'Clair',
                
                // Navigation
                'nav.encode': 'Encoder',
                'nav.decode': 'Décoder',
                'nav.ultracrypte': 'UltraCrypte',
                'nav.help': 'Documentation',
                
                // Panels
                'panel.encode.title': 'Encodage Sécurisé',
                'panel.encode.subtitle': 'Dissimulation avancée de données dans vos fichiers multimédias avec chiffrement de niveau militaire',
                'panel.decode.title': 'Extraction & Analyse',
                'panel.decode.subtitle': 'Détection et extraction intelligente de données cachées avec déchiffrement automatique',
                'panel.help.title': 'Documentation',
                'panel.help.subtitle': 'Guide complet d\'utilisation d\'Obscura et meilleures pratiques de sécurité',
                
                // Upload zones
                'upload.carrier.title': 'Fichier Porteur',
                'upload.carrier.desc': 'Glissez votre média ou cliquez pour sélectionner',
                'upload.carrier.types': 'Images • Audio • Vidéo • Documents',
                'upload.secret.title': 'Contenu Secret',
                'upload.secret.desc': 'Message ou fichier à dissimuler',
                'upload.secret.placeholder': 'Votre message confidentiel...',
                'upload.decode.title': 'Fichier à Analyser',
                'upload.decode.desc': 'Sélectionnez le fichier suspect ou encodé',
                'upload.decode.types': 'Tous formats supportés',
                
                upload: {
                    carrier: {
                        title: "Fichier Porteur",
                        desc: "Glissez votre média ou cliquez pour sélectionner",
                        types: "Images • Audio • Vidéo • Documents"
                    },
                    secret: {
                        title: "Message Secret",
                        desc: "Saisissez votre message confidentiel",
                        placeholder: "Votre message confidentiel..."
                    },
                    decode: {
                        title: "Fichier à Analyser",
                        desc: "Sélectionnez le fichier suspect ou encodé",
                        types: "Tous formats supportés"
                    }
                },
                
                // Options
                
                // Messages
                'message.welcome': 'Bienvenue dans Obscura - Stéganographie professionnelle'
            },
            
            en: {
                // Header
                'header.tagline': 'Advanced Steganography',
                'header.status': 'System Active',
                'theme.dark': 'Dark',
                'theme.light': 'Light',
                
                // Navigation
                'nav.encode': 'Encode',
                'nav.decode': 'Decode',
                'nav.ultracrypte': 'UltraCrypt',
                'nav.help': 'Documentation',
                
                // Panels
                'panel.encode.title': 'Secure Encoding',
                'panel.encode.subtitle': 'Advanced data concealment in your multimedia files with military-grade encryption',
                'panel.decode.title': 'Extraction & Analysis',
                'panel.decode.subtitle': 'Intelligent detection and extraction of hidden data with automatic decryption',
                'panel.help.title': 'Documentation',
                'panel.help.subtitle': 'Complete guide to using Obscura and security best practices',
                
                // Upload zones
                'upload.carrier.title': 'Carrier File',
                'upload.carrier.desc': 'Drag your media or click to select',
                'upload.carrier.types': 'Images • Audio • Video • Documents',
                'upload.secret.title': 'Secret Content',
                'upload.secret.desc': 'Message or file to hide',
                'upload.secret.placeholder': 'Your confidential message...',
                'upload.decode.title': 'File to Analyze',
                'upload.decode.desc': 'Select the suspicious or encoded file',
                'upload.decode.types': 'All supported formats',
                
                // Options
                'options.stego.method': 'Steganography Method',
                'options.crypto.level': 'Encryption Level',
                'options.password': 'Encryption password',
                'options.advanced': 'Advanced Options',
                
                // Buttons
                'btn.encode': 'Start encoding',
                'btn.decode': 'Extract data',
                'btn.analyze': 'Forensic analysis',
                'btn.reset': 'Reset',
                'btn.download': 'Download result',
                'btn.save': 'Save extraction',
                
                // Footer
                'footer.copyright': '© 2025 Obscura',
                'footer.tagline': 'Professional Steganography',
                'footer.mode': 'Offline Mode',
                'footer.processed': 'files processed',
                
                // Messages
                'message.welcome': 'Welcome to Obscura - Professional Steganography'
            }
        };
    }

    detectBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        const langCode = browserLang.split('-')[0].toLowerCase();
        
        if (this.translations[langCode]) {
            this.currentLanguage = langCode;
        }
        
        // Vérifier le localStorage
        const savedLang = localStorage.getItem('obscura_language');
        if (savedLang && this.translations[savedLang]) {
            this.currentLanguage = savedLang;
        }
    }

    setLanguage(language) {
        if (this.translations[language]) {
            this.currentLanguage = language;
            localStorage.setItem('obscura_language', language);
            this.applyLanguage(language);
            
            // Mise à jour du sélecteur de langue
            this.updateLanguageSelector();
            
            // Suppression du console.log
            // console.log(`🌍 Langue changée: ${language}`);
            return true;
        }
        return false;
    }

    applyLanguage(language) {
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.translate(key, language);
            
            if (translation) {
                element.textContent = translation;
            }
        });
        
        // Gestion des placeholders
        const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
        placeholderElements.forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            const translation = this.translate(key, language);
            
            if (translation) {
                element.placeholder = translation;
            }
        });
        
        // Mise à jour de l'attribut lang du document
        document.documentElement.lang = language;
    }

    translate(key, language = null) {
        const lang = language || this.currentLanguage;
        const translations = this.translations[lang] || this.translations[this.fallbackLanguage];
        
        return translations[key] || key;
    }

    getCurrentLanguage() {
        return this.currentLanguage;
    }

    getAvailableLanguages() {
        return Object.keys(this.translations);
    }

    updateLanguageSelector() {
        const currentLangEl = document.getElementById('current-language');
        const dropdown = document.getElementById('language-dropdown');
        
        if (currentLangEl) {
            currentLangEl.textContent = this.currentLanguage.toUpperCase();
        }
        
        if (dropdown) {
            const options = dropdown.querySelectorAll('.language-option');
            options.forEach(option => {
                const lang = option.getAttribute('data-lang');
                option.classList.toggle('active', lang === this.currentLanguage);
            });
        }
    }

    // Formatage de nombres avec localisation
    formatNumber(number) {
        try {
            return new Intl.NumberFormat(this.currentLanguage).format(number);
        } catch {
            return number.toString();
        }
    }

    // Formatage de dates avec localisation
    formatDate(date) {
        try {
            return new Intl.DateTimeFormat(this.currentLanguage, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }).format(date);
        } catch {
            return date.toString();
        }
    }

    // Formatage de taille de fichier avec localisation
    formatFileSize(bytes) {
        const units = this.currentLanguage === 'fr' ? 
            ['o', 'Ko', 'Mo', 'Go'] : 
            ['B', 'KB', 'MB', 'GB'];
        
        let size = bytes;
        let unitIndex = 0;
        
        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }
        
        return `${size.toFixed(1)} ${units[unitIndex]}`;
    }

    // Méthode manquante ajoutée
    updateInterface() {
        this.applyLanguage(this.currentLanguage);
    }

    // Méthode de traduction simplifiée (alias pour translate)
    t(key, language = null) {
        return this.translate(key, language);
    }
}

// Initialisation automatique
let i18n;

if (typeof window !== 'undefined') {
    i18n = new I18nManager();
    
    // Export global
    window.i18n = i18n;
    
    // Event listeners pour le sélecteur de langue
    document.addEventListener('DOMContentLoaded', () => {
        const languageToggle = document.getElementById('language-toggle');
        const languageDropdown = document.getElementById('language-dropdown');
        const languageOptions = document.querySelectorAll('.language-option');
        
        // Toggle dropdown
        if (languageToggle && languageDropdown) {
            languageToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                languageDropdown.classList.toggle('active');
            });
            
            // Fermer dropdown en cliquant ailleurs
            document.addEventListener('click', () => {
                languageDropdown.classList.remove('active');
            });
        }
        
        // Changement de langue
        languageOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const lang = option.getAttribute('data-lang');
                
                if (i18n.setLanguage(lang)) {
                    languageDropdown.classList.remove('active');
                }
            });
        });
        
        // Application initiale de la langue
        i18n.applyLanguage(i18n.getCurrentLanguage());
    });
}

// Export pour modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = I18nManager;
}

// Suppression du console.log final
// console.log('🌍 Système I18n chargé');
