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

    removeObserver(callback) {
        const index = this.observers.indexOf(callback);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }

    notifyObservers(oldLang, newLang) {
        this.observers.forEach(callback => {
            try {
                callback(oldLang, newLang);
            } catch (error) {
                console.error('Error in i18n observer:', error);
            }
        });
    }

    // ========== UTILITAIRES ==========

    getLanguageInfo(lang) {
        const info = {
            'fr': {
                name: 'Français',
                nativeName: 'Français',
                flag: 'fr'
            },
            'en': {
                name: 'English',
                nativeName: 'English',
                flag: 'us'
            }
        };

        return info[lang] || info[this.fallbackLanguage];
    }

    formatNumber(number, options = {}) {
        try {
            return new Intl.NumberFormat(this.currentLanguage, options).format(number);
        } catch (error) {
            return number.toString();
        }
    }

    formatDate(date, options = {}) {
        try {
            return new Intl.DateTimeFormat(this.currentLanguage, options).format(date);
        } catch (error) {
            return date.toString();
        }
    }

    formatFileSize(bytes) {
        const sizes = this.currentLanguage === 'fr' ? 
            ['octets', 'Ko', 'Mo', 'Go', 'To'] :
            ['bytes', 'KB', 'MB', 'GB', 'TB'];

        if (bytes === 0) return `0 ${sizes[0]}`;

        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        const size = (bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1);

        return `${size} ${sizes[i]}`;
    }

    // ========== PLURALISATION ==========

    plural(count, key, params = {}) {
        const pluralKey = count === 1 ? `${key}.singular` : `${key}.plural`;
        return this.t(pluralKey, { ...params, count });
    }

    // ========== VALIDATION ==========

    validateTranslations() {
        const languages = this.getSupportedLanguages();
        const baseKeys = new Set();
        
        // Collecter toutes les clés de la langue de base
        const baseTranslations = this.translations.get(this.fallbackLanguage);
        Object.keys(baseTranslations).forEach(key => baseKeys.add(key));

        const report = {
            languages: languages.length,
            keys: baseKeys.size,
            missing: []
        };

        // Vérifier chaque langue
        languages.forEach(lang => {
            if (lang === this.fallbackLanguage) return;

            const translations = this.translations.get(lang);
            baseKeys.forEach(key => {
                if (!translations[key]) {
                    report.missing.push({ language: lang, key });
                }
            });
        });

        return report;
    }

    // ========== EXPORT/IMPORT ==========

    exportTranslations(lang = null) {
        if (lang) {
            return this.translations.get(lang);
        }
        
        const exported = {};
        this.translations.forEach((translations, language) => {
            exported[language] = translations;
        });
        
        return exported;
    }

    importTranslations(data, lang = null) {
        if (lang) {
            this.translations.set(lang, data);
        } else {
            Object.entries(data).forEach(([language, translations]) => {
                this.translations.set(language, translations);
            });
        }
    }
}

// ========== INITIALISATION GLOBALE ==========

// Créer l'instance globale
window.i18n = new I18nSystem();

// Fonction globale de traduction
window.t = (key, params) => window.i18n.t(key, params);

// Auto-application quand le DOM est prêt
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.i18n.applyLanguage();
    });
} else {
    window.i18n.applyLanguage();
}

// Export pour modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = I18nSystem;
}
