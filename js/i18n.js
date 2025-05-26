// ============= I18N.JS - Système de Traduction Complet =============
// Gestion multilingue avancée pour l'interface utilisateur

class I18nSystem {
    constructor() {
        this.currentLanguage = 'fr';
        this.fallbackLanguage = 'fr';
        this.translations = new Map();
        this.observers = [];
        
        this.initTranslations();
        this.detectLanguage();
    }

    // ========== INITIALISATION ==========

    initTranslations() {
        // Traductions françaises
        this.translations.set('fr', {
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
            'upload.secret.placeholder': 'Votre message confidentiel...',
            'upload.decode.title': 'Fichier à Analyser',
            'upload.decode.desc': 'Sélectionnez le fichier suspect ou encodé',
            'upload.decode.types': 'Tous formats supportés',

            // Options
            'options.stego.method': 'Méthode de Stéganographie',
            'options.crypto.level': 'Niveau de Chiffrement',
            'options.password': 'Mot de passe de chiffrement',
            'options.advanced': 'Options Avancées',

            // Buttons
            'btn.encode': 'Lancer l\'encodage',
            'btn.decode': 'Extraire les données',
            'btn.analyze': 'Analyse forensique',
            'btn.download': 'Télécharger le résultat',
            'btn.reset': 'Réinitialiser',

            // Messages
            'message.file.required': 'Un fichier est requis',
            'message.secret.required': 'Le contenu secret ne peut pas être vide',
            'message.file.too.large': 'Fichier trop volumineux (max: {max})',
            'message.encoding.success': 'Encodage réussi avec succès',
            'message.decoding.success': 'Données extraites avec succès',
            'message.extraction.failed': 'Aucune donnée cachée détectée',
            'message.invalid.password': 'Mot de passe incorrect',
            'message.analysis.complete': 'Analyse forensique terminée',

            // Footer
            'footer.copyright': '© 2025 Obscura',
            'footer.tagline': 'Stéganographie Professionnelle',
            'footer.mode': 'Mode Hors-ligne',
            'footer.processed': 'fichiers traités',

            // Progress
            'progress.encoding': 'Encodage en cours...',
            'progress.decoding': 'Extraction en cours...',
            'progress.analyzing': 'Analyse en cours...',
            'progress.encrypting': 'Chiffrement en cours...',
            'progress.complete': 'Terminé',

            // File types
            'file.type.text': 'Message texte',
            'file.type.image': 'Image',
            'file.type.audio': 'Audio',
            'file.type.video': 'Vidéo',
            'file.type.document': 'Document',
            'file.type.archive': 'Archive',
            'file.type.unknown': 'Type inconnu',

            // Security levels
            'security.standard': 'Standard',
            'security.military': 'Militaire',
            'security.quantum': 'Quantique',

            // UltraCrypte
            'ultra.master.key': 'Clé maître ultra-sécurisée',
            'ultra.security.level': 'Niveau de sécurité',
            'ultra.advanced.options': 'Options avancées',
            'ultra.encrypt': 'Chiffrer avec UltraCrypte™',
            'ultra.decrypt': 'Déchiffrer',

            // Errors
            'error.generic': 'Une erreur est survenue',
            'error.file.read': 'Impossible de lire le fichier',
            'error.encoding.failed': 'Échec de l\'encodage',
            'error.decoding.failed': 'Échec du décodage',
            'error.encryption.failed': 'Échec du chiffrement',
            'error.decryption.failed': 'Échec du déchiffrement',

            // Admin
            'admin.panel.title': 'Panneau Administrateur',
            'admin.crack.title': 'Crackage Avancé',
            'admin.analysis.title': 'Analyse Forensique',
            'admin.tools.title': 'Outils Système'
        });

        // Traductions anglaises
        this.translations.set('en', {
            // Header
            'header.tagline': 'Advanced Steganography',
            'header.status': 'System active',
            'theme.dark': 'Dark',
            'theme.light': 'Light',

            // Navigation
            'nav.encode': 'Encode',
            'nav.decode': 'Decode',
            'nav.ultracrypte': 'UltraCrypt',
            'nav.help': 'Documentation',

            // Panels
            'panel.encode.title': 'Secure Encoding',
            'panel.encode.subtitle': 'Advanced data concealment in multimedia files with military-grade encryption',
            'panel.decode.title': 'Extraction & Analysis',
            'panel.decode.subtitle': 'Intelligent detection and extraction of hidden data with automatic decryption',
            'panel.help.title': 'Documentation',
            'panel.help.subtitle': 'Complete Obscura usage guide and security best practices',

            // Upload zones
            'upload.carrier.title': 'Carrier File',
            'upload.carrier.desc': 'Drag your media or click to select',
            'upload.carrier.types': 'Images • Audio • Video • Documents',
            'upload.secret.title': 'Secret Content',
            'upload.secret.placeholder': 'Your confidential message...',
            'upload.decode.title': 'File to Analyze',
            'upload.decode.desc': 'Select the suspect or encoded file',
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
            'btn.download': 'Download result',
            'btn.reset': 'Reset',

            // Messages
            'message.file.required': 'A file is required',
            'message.secret.required': 'Secret content cannot be empty',
            'message.file.too.large': 'File too large (max: {max})',
            'message.encoding.success': 'Encoding completed successfully',
            'message.decoding.success': 'Data extracted successfully',
            'message.extraction.failed': 'No hidden data detected',
            'message.invalid.password': 'Incorrect password',
            'message.analysis.complete': 'Forensic analysis completed',

            // Footer
            'footer.copyright': '© 2025 Obscura',
            'footer.tagline': 'Professional Steganography',
            'footer.mode': 'Offline Mode',
            'footer.processed': 'files processed',

            // Progress
            'progress.encoding': 'Encoding in progress...',
            'progress.decoding': 'Extraction in progress...',
            'progress.analyzing': 'Analysis in progress...',
            'progress.encrypting': 'Encryption in progress...',
            'progress.complete': 'Complete',

            // File types
            'file.type.text': 'Text message',
            'file.type.image': 'Image',
            'file.type.audio': 'Audio',
            'file.type.video': 'Video',
            'file.type.document': 'Document',
            'file.type.archive': 'Archive',
            'file.type.unknown': 'Unknown type',

            // Security levels
            'security.standard': 'Standard',
            'security.military': 'Military',
            'security.quantum': 'Quantum',

            // UltraCrypte
            'ultra.master.key': 'Ultra-secure master key',
            'ultra.security.level': 'Security level',
            'ultra.advanced.options': 'Advanced options',
            'ultra.encrypt': 'Encrypt with UltraCrypt™',
            'ultra.decrypt': 'Decrypt',

            // Errors
            'error.generic': 'An error occurred',
            'error.file.read': 'Unable to read file',
            'error.encoding.failed': 'Encoding failed',
            'error.decoding.failed': 'Decoding failed',
            'error.encryption.failed': 'Encryption failed',
            'error.decryption.failed': 'Decryption failed',

            // Admin
            'admin.panel.title': 'Administrator Panel',
            'admin.crack.title': 'Advanced Cracking',
            'admin.analysis.title': 'Forensic Analysis',
            'admin.tools.title': 'System Tools'
        });
    }

    // ========== DÉTECTION DE LANGUE ==========

    detectLanguage() {
        // Priorité : localStorage > URL > navigateur > défaut
        let detectedLang = this.fallbackLanguage;

        // 1. Vérifier localStorage
        const savedLang = localStorage.getItem('obscura_language');
        if (savedLang && this.translations.has(savedLang)) {
            detectedLang = savedLang;
        }
        // 2. Vérifier l'URL
        else if (window.location.search.includes('lang=')) {
            const urlParams = new URLSearchParams(window.location.search);
            const urlLang = urlParams.get('lang');
            if (urlLang && this.translations.has(urlLang)) {
                detectedLang = urlLang;
            }
        }
        // 3. Détecter depuis le navigateur
        else {
            const browserLang = navigator.language.substring(0, 2);
            if (this.translations.has(browserLang)) {
                detectedLang = browserLang;
            }
        }

        this.setLanguage(detectedLang);
    }

    // ========== GESTION DES LANGUES ==========

    setLanguage(lang) {
        if (!this.translations.has(lang)) {
            console.warn(`Language '${lang}' not supported, falling back to '${this.fallbackLanguage}'`);
            lang = this.fallbackLanguage;
        }

        const oldLang = this.currentLanguage;
        this.currentLanguage = lang;

        // Sauvegarder la préférence
        localStorage.setItem('obscura_language', lang);

        // Appliquer les traductions
        this.applyLanguage();

        // Notifier les observateurs
        this.notifyObservers(oldLang, lang);
    }

    getCurrentLanguage() {
        return this.currentLanguage;
    }

    getSupportedLanguages() {
        return Array.from(this.translations.keys());
    }

    // ========== TRADUCTIONS ==========

    t(key, params = {}) {
        const translations = this.translations.get(this.currentLanguage);
        let translation = translations[key];

        // Fallback vers la langue par défaut
        if (!translation) {
            const fallbackTranslations = this.translations.get(this.fallbackLanguage);
            translation = fallbackTranslations[key];
        }

        // Si toujours pas trouvé, retourner la clé
        if (!translation) {
            console.warn(`Translation missing for key: ${key}`);
            return key;
        }

        // Remplacer les paramètres
        return this.interpolate(translation, params);
    }

    interpolate(text, params) {
        return text.replace(/\{(\w+)\}/g, (match, key) => {
            return params[key] !== undefined ? params[key] : match;
        });
    }

    // ========== APPLICATION DES TRADUCTIONS ==========

    applyLanguage() {
        // Traduire tous les éléments avec data-i18n
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            element.textContent = this.t(key);
        });

        // Traduire les placeholders
        const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
        placeholderElements.forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = this.t(key);
        });

        // Traduire les titres
        const titleElements = document.querySelectorAll('[data-i18n-title]');
        titleElements.forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            element.title = this.t(key);
        });

        // Mettre à jour le sélecteur de langue
        this.updateLanguageSelector();

        // Mettre à jour l'attribut lang du document
        document.documentElement.lang = this.currentLanguage;
    }

    updateLanguageSelector() {
        const currentLangElement = document.getElementById('current-language');
        if (currentLangElement) {
            currentLangElement.textContent = this.currentLanguage.toUpperCase();
        }

        // Mettre à jour les options actives
        const languageOptions = document.querySelectorAll('.language-option');
        languageOptions.forEach(option => {
            const lang = option.getAttribute('data-lang');
            option.classList.toggle('active', lang === this.currentLanguage);
        });
    }

    // ========== OBSERVATEURS ==========

    addObserver(callback) {
        this.observers.push(callback);
    }
                'footer.processed': 'files processed',
                
                // Help Content
                'help.encode.title': 'Encoding Guide',
                'help.encode.desc': 'Steganography allows hiding sensitive information in ordinary files.',
                'help.decode.title': 'Extraction Guide',
                'help.decode.desc': 'Automated extraction intelligently detects and recovers hidden data.',
                'help.ultra.title': 'UltraCrypte™ Advanced',
                'help.ultra.desc': 'Our proprietary technology offers unmatched protection against all forms of attacks.',
                'help.practices.title': 'Best Practices',
                
                // File Types
                'file.type.image': 'Image',
                'file.type.audio': 'Audio',
                'file.type.video': 'Video',
                'file.type.document': 'Document',
                'file.type.archive': 'Archive',
                'file.type.unknown': 'Unknown',
                
                // Analysis
                'analysis.entropy': 'Entropy',
                'analysis.signatures': 'Signatures',
                'analysis.patterns': 'Suspicious patterns',
                'analysis.metadata': 'Metadata',
                'analysis.likelihood': 'Steganography likelihood',
                'analysis.confidence.high': 'High',
                'analysis.confidence.medium': 'Medium',
                'analysis.confidence.low': 'Low'
            }
        };
        
        this.loadedLanguages.add('fr');
        this.loadedLanguages.add('en');
    }

    // ========== LANGUAGE DETECTION ==========

    detectLanguage() {
        // Try to get language from storage first
        const stored = localStorage.getItem('obscura_language');
        if (stored && this.translations[stored]) {
            this.currentLanguage = stored;
            return;
        }
        
        // Detect from browser
        const browserLang = navigator.language.substring(0, 2);
        if (this.translations[browserLang]) {
            this.currentLanguage = browserLang;
        } else {
            this.currentLanguage = this.fallbackLanguage;
        }
        
        localStorage.setItem('obscura_language', this.currentLanguage);
    }

    // ========== TRANSLATION METHODS ==========

    t(key, params = {}) {
        const translation = this.getTranslation(key);
        
        if (!translation) {
            console.warn(`Missing translation for key: ${key}`);
            return key;
        }
        
        return this.interpolate(translation, params);
    }

    getTranslation(key) {
        const lang = this.translations[this.currentLanguage];
        if (lang && lang[key]) {
            return lang[key];
        }
        
        // Fallback to default language
        const fallback = this.translations[this.fallbackLanguage];
        if (fallback && fallback[key]) {
            return fallback[key];
        }
        
        return null;
    }

    interpolate(text, params) {
        return text.replace(/\{(\w+)\}/g, (match, key) => {
            return params[key] !== undefined ? params[key] : match;
        });
    }

    // ========== LANGUAGE SWITCHING ==========

    switchLanguage(lang) {
        if (!this.translations[lang]) {
            console.error(`Language ${lang} not supported`);
            return false;
        }
        
        this.currentLanguage = lang;
        localStorage.setItem('obscura_language', lang);
        
        this.updateUI();
        this.updateLanguageToggle();
        
        // Dispatch event for other components
        window.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: lang }
        }));
        
        return true;
    }

    getCurrentLanguage() {
        return this.currentLanguage;
    }

    // ========== UI UPDATE ==========

    updateUI() {
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            
            if (translation) {
                if (element.tagName === 'INPUT' && element.type === 'text') {
                    element.placeholder = translation;
                } else if (element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
        
        // Update placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            const translation = this.t(key);
            
            if (translation) {
                element.placeholder = translation;
            }
        });
        
        // Update titles and tooltips
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            const translation = this.t(key);
            
            if (translation) {
                element.title = translation;
            }
        });
    }

    setupLanguageToggle() {
        const toggle = document.getElementById('language-toggle');
        const dropdown = document.getElementById('language-dropdown');
        const currentLang = document.getElementById('current-language');
        
        if (!toggle || !dropdown) return;
        
        // Update current language display
        this.updateLanguageToggle();
        
        // Toggle dropdown
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            dropdown.classList.remove('active');
        });
        
        // Language selection
        dropdown.addEventListener('click', (e) => {
            e.stopPropagation();
            const option = e.target.closest('.language-option');
            if (option) {
                const lang = option.getAttribute('data-lang');
                if (lang && lang !== this.currentLanguage) {
                    this.switchLanguage(lang);
                }
                dropdown.classList.remove('active');
            }
        });
    }

    updateLanguageToggle() {
        const currentLang = document.getElementById('current-language');
        const options = document.querySelectorAll('.language-option');
        
        if (currentLang) {
            currentLang.textContent = this.currentLanguage.toUpperCase();
        }
        
        // Update active state
        options.forEach(option => {
            const lang = option.getAttribute('data-lang');
            option.classList.toggle('active', lang === this.currentLanguage);
        });
    }

    // ========== FORMATTING HELPERS ==========

    formatFileSize(bytes) {
        const units = this.currentLanguage === 'fr' ? 
            ['octets', 'Ko', 'Mo', 'Go'] : 
            ['bytes', 'KB', 'MB', 'GB'];
        
        let size = bytes;
        let unitIndex = 0;
        
        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024;
            unitIndex++;
        }
        
        return `${size.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
    }

    formatPercentage(value) {
        return `${Math.round(value)}%`;
    }

    formatNumber(value) {
        return new Intl.NumberFormat(this.currentLanguage).format(value);
    }

    // ========== UTILITIES ==========

    addLanguage(lang, translations) {
        if (!this.translations[lang]) {
            this.translations[lang] = {};
        }
        
        Object.assign(this.translations[lang], translations);
        this.loadedLanguages.add(lang);
    }

    getAvailableLanguages() {
        return Array.from(this.loadedLanguages);
    }
}

// ========== GLOBAL INITIALIZATION ==========

// Initialize the i18n system
window.i18n = new I18nSystem();

// Helper function for easy access
window.t = (key, params) => window.i18n.t(key, params);

// Auto-update UI when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.i18n.updateUI();
    });
} else {
    window.i18n.updateUI();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = I18nSystem;
}
