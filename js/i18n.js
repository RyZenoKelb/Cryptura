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
                'theme.dark': 'Sombre',
                'theme.light': 'Clair',
                
                // Navigation
                'nav.encode': 'Encoder',
                'nav.decode': 'Décoder',
                'nav.ultracrypte': 'UltraCrypte',
                'nav.help': 'Documentation',
                
                // Panel Titles
                'panel.encode.title': 'Encodage Sécurisé',
                'panel.encode.subtitle': 'Dissimulation avancée de messages dans vos fichiers multimédias avec chiffrement de niveau militaire',
                'panel.decode.title': 'Extraction & Analyse',
                'panel.decode.subtitle': 'Détection et extraction intelligente de données cachées avec déchiffrement automatique',
                'panel.help.title': 'Documentation',
                'panel.help.subtitle': 'Guide complet d\'utilisation d\'Obscura et meilleures pratiques de sécurité',
                
                // Upload Areas
                'upload.carrier.title': 'Fichier Porteur',
                'upload.carrier.desc': 'Glissez votre média ou cliquez pour sélectionner',
                'upload.carrier.types': 'Images • Audio • Vidéo • Documents',
                'upload.secret.title': 'Message Secret',
                'upload.secret.desc': 'Saisissez votre message confidentiel',
                'upload.secret.placeholder': 'Votre message secret...',
                'upload.decode.title': 'Fichier à Analyser',
                'upload.decode.desc': 'Sélectionnez le fichier suspect ou encodé',
                'upload.decode.types': 'Tous formats supportés',
                
                // Options
                'options.stego.method': 'Méthode de Stéganographie',
                'options.crypto.level': 'Niveau de Chiffrement',
                'options.password': 'Mot de passe de chiffrement',
                'options.advanced': 'Options Avancées',
                'options.detection.mode': 'Mode de détection',
                'options.decode.password': 'Mot de passe de déchiffrement',
                
                // Buttons
                'btn.encode': 'Lancer l\'encodage',
                'btn.decode': 'Extraire les données',
                'btn.analyze': 'Analyse forensique',
                'btn.reset': 'Réinitialiser',
                'btn.download': 'Télécharger le résultat',
                'btn.copy': 'Copier le texte',
                'btn.save.file': 'Télécharger le fichier',
                
                // Progress Messages
                'progress.encoding': 'Encodage en cours...',
                'progress.decoding': 'Décodage en cours...',
                'progress.analyzing': 'Analyse en cours...',
                'progress.encrypting': 'Chiffrement en cours...',
                'progress.decrypting': 'Déchiffrement en cours...',
                'progress.processing': 'Traitement en cours...',
                'progress.loading': 'Chargement...',
                'progress.chunk': 'Traitement du bloc {current}/{total}',
                
                // Results
                'result.encode.success': 'Encodage Réussi',
                'result.decode.success': 'Données Extraites',
                'result.file.generated': 'Fichier généré :',
                'result.file.size': 'Taille finale :',
                'result.method.used': 'Méthode utilisée :',
                'result.method.detected': 'Méthode détectée :',
                'result.size.extracted': 'Taille extraite :',
                'result.encryption': 'Chiffrement :',
                'result.confidence': 'Confiance :',
                
                // Methods
                'method.auto': 'Auto-détection',
                'method.lsb': 'LSB (Bit de Poids Faible)',
                'method.metadata': 'Métadonnées',
                'method.audio.spread': 'Dispersion Audio',
                'method.document.hidden': 'Document Caché',
                'method.distributed': 'Distribution Avancée',
                
                // Crypto Levels
                'crypto.none': 'Aucun chiffrement',
                'crypto.aes': 'AES-256-GCM',
                'crypto.ultra': 'UltraCrypte™',
                'crypto.detected.none': 'Non chiffré',
                'crypto.detected.basic': 'Chiffrement basique',
                'crypto.detected.advanced': 'Chiffrement avancé',
                
                // Detection Modes
                'detection.auto': 'Détection automatique',
                'detection.lsb.only': 'LSB uniquement',
                'detection.metadata.only': 'Métadonnées uniquement',
                'detection.brute': 'Force brute',
                
                // Advanced Options
                'advanced.compress': 'Compression des données',
                'advanced.noise': 'Ajout de bruit',
                'advanced.multilayer': 'Multi-couches',
                'advanced.stealth': 'Mode furtif',
                'advanced.deniable': 'Déni plausible',
                
                // UltraCrypte
                'ultra.title': 'UltraCrypte™',
                'ultra.subtitle': 'Chiffrement post-quantique de niveau militaire pour vos données ultra-sensibles',
                'ultra.file.title': 'Sélectionner le fichier à chiffrer',
                'ultra.file.desc': 'Glissez-déposez ou cliquez pour sélectionner',
                'ultra.file.types': 'Tous types de fichiers • Max 500MB',
                'ultra.text.label': 'Message texte à chiffrer',
                'ultra.text.placeholder': 'Votre message ultra-confidentiel...',
                'ultra.key.label': 'Clé Maître UltraCrypte',
                'ultra.key.placeholder': 'Clé maître ultra-sécurisée...',
                'ultra.key.tooltip': 'Clé principale de dérivation cryptographique. Minimum 12 caractères recommandés pour une sécurité optimale.',
                'ultra.security.label': 'Niveau de Sécurité',
                'ultra.security.tooltip': 'Standard: Rapide, sécurisé pour usage général. Militaire: Chiffrement renforcé. Post-Quantique: Résistant aux ordinateurs quantiques.',
                'ultra.security.standard': 'Standard',
                'ultra.security.standard.desc': 'AES-256 + ChaCha20',
                'ultra.security.military': 'Militaire',
                'ultra.security.military.desc': 'Triple cascade + OTP',
                'ultra.security.quantum': 'Post-Quantique',
                'ultra.security.quantum.desc': 'Lattice + Hash chains',
                'ultra.options.label': 'Options Avancées',
                'ultra.compress.title': 'Compression LZMA',
                'ultra.compress.desc': 'Réduit la taille des données',
                'ultra.compress.tooltip': 'Compression avancée LZMA pour réduire la taille des fichiers avant chiffrement.',
                'ultra.stealth.title': 'Mode Furtif',
                'ultra.stealth.desc': 'Masque les signatures',
                'ultra.stealth.tooltip': 'Ajoute du bruit aléatoire pour masquer les signatures cryptographiques et rendre la détection plus difficile.',
                'ultra.deniable.title': 'Déni Plausible',
                'ultra.deniable.desc': 'Double chiffrement',
                'ultra.deniable.tooltip': 'Crée deux niveaux de chiffrement avec des clés différentes pour permettre un déni plausible du contenu réel.',
                'ultra.btn.encrypt': 'Chiffrer avec UltraCrypte™',
                'ultra.btn.decrypt': 'Déchiffrer',
                
                // Key Strength
                'key.strength.weak': 'Faible',
                'key.strength.fair': 'Correct',
                'key.strength.good': 'Bon',
                'key.strength.strong': 'Fort',
                'key.strength.excellent': 'Excellent',
                'key.entropy': '{bits} bits d\'entropie',
                
                // Messages
                'message.file.required': 'Veuillez sélectionner un fichier porteur',
                'message.secret.required': 'Veuillez saisir un message secret',
                'message.password.required': 'Un mot de passe est requis pour ce niveau de chiffrement',
                'message.file.too.large': 'Le fichier est trop volumineux (max {max})',
                'message.unsupported.format': 'Format de fichier non supporté',
                'message.invalid.password': 'Mot de passe incorrect',
                'message.extraction.failed': 'Aucune donnée cachée détectée',
                'message.processing.error': 'Erreur lors du traitement',
                'message.success.copy': 'Texte copié dans le presse-papiers',
                'message.success.save': 'Fichier sauvegardé avec succès',
                
                // Footer
                'footer.copyright': '© 2025 Obscura',
                'footer.tagline': 'Stéganographie Professionnelle',
                'footer.mode': 'Mode Hors-ligne',
                'footer.processed': 'fichiers traités',
                
                // Help Content
                'help.encode.title': 'Guide d\'Encodage',
                'help.encode.desc': 'La stéganographie permet de dissimuler des informations sensibles dans des fichiers ordinaires.',
                'help.decode.title': 'Guide d\'Extraction',
                'help.decode.desc': 'L\'extraction automatisée détecte et récupère les données cachées intelligemment.',
                'help.ultra.title': 'UltraCrypte™ Advanced',
                'help.ultra.desc': 'Notre technologie propriétaire offre une protection inégalée contre toutes formes d\'attaques.',
                'help.practices.title': 'Meilleures Pratiques',
                
                // File Types
                'file.type.image': 'Image',
                'file.type.audio': 'Audio',
                'file.type.video': 'Vidéo',
                'file.type.document': 'Document',
                'file.type.archive': 'Archive',
                'file.type.unknown': 'Inconnu',
                
                // Analysis
                'analysis.entropy': 'Entropie',
                'analysis.signatures': 'Signatures',
                'analysis.patterns': 'Motifs suspects',
                'analysis.metadata': 'Métadonnées',
                'analysis.likelihood': 'Probabilité de stéganographie',
                'analysis.confidence.high': 'Élevée',
                'analysis.confidence.medium': 'Moyenne',
                'analysis.confidence.low': 'Faible'
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
                'nav.ultracrypte': 'UltraCrypte',
                'nav.help': 'Documentation',
                
                // Panel Titles
                'panel.encode.title': 'Secure Encoding',
                'panel.encode.subtitle': 'Advanced message concealment in your multimedia files with military-grade encryption',
                'panel.decode.title': 'Extraction & Analysis',
                'panel.decode.subtitle': 'Intelligent detection and extraction of hidden data with automatic decryption',
                'panel.help.title': 'Documentation',
                'panel.help.subtitle': 'Complete Obscura usage guide and security best practices',
                
                // Upload Areas
                'upload.carrier.title': 'Carrier File',
                'upload.carrier.desc': 'Drag your media or click to select',
                'upload.carrier.types': 'Images • Audio • Video • Documents',
                'upload.secret.title': 'Secret Message',
                'upload.secret.desc': 'Enter your confidential message',
                'upload.secret.placeholder': 'Your secret message...',
                'upload.decode.title': 'File to Analyze',
                'upload.decode.desc': 'Select the suspicious or encoded file',
                'upload.decode.types': 'All supported formats',
                
                // Options
                'options.stego.method': 'Steganography Method',
                'options.crypto.level': 'Encryption Level',
                'options.password': 'Encryption password',
                'options.advanced': 'Advanced Options',
                'options.detection.mode': 'Detection mode',
                'options.decode.password': 'Decryption password',
                
                // Buttons
                'btn.encode': 'Start encoding',
                'btn.decode': 'Extract data',
                'btn.analyze': 'Forensic analysis',
                'btn.reset': 'Reset',
                'btn.download': 'Download result',
                'btn.copy': 'Copy text',
                'btn.save.file': 'Download file',
                
                // Progress Messages
                'progress.encoding': 'Encoding in progress...',
                'progress.decoding': 'Decoding in progress...',
                'progress.analyzing': 'Analysis in progress...',
                'progress.encrypting': 'Encrypting in progress...',
                'progress.decrypting': 'Decrypting in progress...',
                'progress.processing': 'Processing in progress...',
                'progress.loading': 'Loading...',
                'progress.chunk': 'Processing chunk {current}/{total}',
                
                // Results
                'result.encode.success': 'Encoding Successful',
                'result.decode.success': 'Data Extracted',
                'result.file.generated': 'Generated file:',
                'result.file.size': 'Final size:',
                'result.method.used': 'Method used:',
                'result.method.detected': 'Detected method:',
                'result.size.extracted': 'Extracted size:',
                'result.encryption': 'Encryption:',
                'result.confidence': 'Confidence:',
                
                // Methods
                'method.auto': 'Auto-detection',
                'method.lsb': 'LSB (Least Significant Bit)',
                'method.metadata': 'Metadata',
                'method.audio.spread': 'Audio Spread',
                'method.document.hidden': 'Hidden Document',
                'method.distributed': 'Advanced Distribution',
                
                // Crypto Levels
                'crypto.none': 'No encryption',
                'crypto.aes': 'AES-256-GCM',
                'crypto.ultra': 'UltraCrypte™',
                'crypto.detected.none': 'Not encrypted',
                'crypto.detected.basic': 'Basic encryption',
                'crypto.detected.advanced': 'Advanced encryption',
                
                // Detection Modes
                'detection.auto': 'Automatic detection',
                'detection.lsb.only': 'LSB only',
                'detection.metadata.only': 'Metadata only',
                'detection.brute': 'Brute force',
                
                // Advanced Options
                'advanced.compress': 'Data compression',
                'advanced.noise': 'Add noise',
                'advanced.multilayer': 'Multi-layer',
                'advanced.stealth': 'Stealth mode',
                'advanced.deniable': 'Plausible deniability',
                
                // UltraCrypte
                'ultra.title': 'UltraCrypte™',
                'ultra.subtitle': 'Military-grade post-quantum encryption for your ultra-sensitive data',
                'ultra.file.title': 'Select file to encrypt',
                'ultra.file.desc': 'Drag and drop or click to select',
                'ultra.file.types': 'All file types • Max 500MB',
                'ultra.text.label': 'Text message to encrypt',
                'ultra.text.placeholder': 'Your ultra-confidential message...',
                'ultra.key.label': 'UltraCrypte Master Key',
                'ultra.key.placeholder': 'Ultra-secure master key...',
                'ultra.key.tooltip': 'Main cryptographic derivation key. Minimum 12 characters recommended for optimal security.',
                'ultra.security.label': 'Security Level',
                'ultra.security.tooltip': 'Standard: Fast, secure for general use. Military: Enhanced encryption. Post-Quantum: Resistant to quantum computers.',
                'ultra.security.standard': 'Standard',
                'ultra.security.standard.desc': 'AES-256 + ChaCha20',
                'ultra.security.military': 'Military',
                'ultra.security.military.desc': 'Triple cascade + OTP',
                'ultra.security.quantum': 'Post-Quantum',
                'ultra.security.quantum.desc': 'Lattice + Hash chains',
                'ultra.options.label': 'Advanced Options',
                'ultra.compress.title': 'LZMA Compression',
                'ultra.compress.desc': 'Reduces data size',
                'ultra.compress.tooltip': 'Advanced LZMA compression to reduce file size before encryption.',
                'ultra.stealth.title': 'Stealth Mode',
                'ultra.stealth.desc': 'Masks signatures',
                'ultra.stealth.tooltip': 'Adds random noise to mask cryptographic signatures and make detection more difficult.',
                'ultra.deniable.title': 'Plausible Deniability',
                'ultra.deniable.desc': 'Double encryption',
                'ultra.deniable.tooltip': 'Creates two encryption levels with different keys to allow plausible deniability of real content.',
                'ultra.btn.encrypt': 'Encrypt with UltraCrypte™',
                'ultra.btn.decrypt': 'Decrypt',
                
                // Key Strength
                'key.strength.weak': 'Weak',
                'key.strength.fair': 'Fair',
                'key.strength.good': 'Good',
                'key.strength.strong': 'Strong',
                'key.strength.excellent': 'Excellent',
                'key.entropy': '{bits} bits of entropy',
                
                // Messages
                'message.file.required': 'Please select a carrier file',
                'message.secret.required': 'Please enter a secret message',
                'message.password.required': 'A password is required for this encryption level',
                'message.file.too.large': 'File is too large (max {max})',
                'message.unsupported.format': 'Unsupported file format',
                'message.invalid.password': 'Incorrect password',
                'message.extraction.failed': 'No hidden data detected',
                'message.processing.error': 'Processing error',
                'message.success.copy': 'Text copied to clipboard',
                'message.success.save': 'File saved successfully',
                
                // Footer
                'footer.copyright': '© 2025 Obscura',
                'footer.tagline': 'Professional Steganography',
                'footer.mode': 'Offline Mode',
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
