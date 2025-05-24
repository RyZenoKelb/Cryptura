// ============= I18N.JS - Système de traduction internationalization =============

class InternationalizationManager {
    constructor() {
        this.currentLanguage = localStorage.getItem('obscura-language') || 'fr';
        this.translations = {};
        this.loadTranslations();
        
        console.log('🌍 Système i18n initialisé:', this.currentLanguage);
    }

    loadTranslations() {
        this.translations = {
            fr: {
                // Header & Navigation
                'app.title': 'Obscura - Stéganographie Ultra-Sécurisée',
                'header.tagline': 'Stéganographie Avancée',
                'header.status': 'Système actif',
                'nav.encode': 'Encoder',
                'nav.decode': 'Décoder',
                'nav.ultracrypte': 'UltraCrypte',
                'nav.help': 'Documentation',

                // Encode Panel
                'encode.title': 'Encodage Sécurisé',
                'encode.subtitle': 'Dissimulation avancée de données dans vos fichiers multimédias avec chiffrement de niveau militaire',
                'encode.carrier.title': 'Fichier Porteur',
                'encode.carrier.description': 'Glissez votre média ou cliquez pour sélectionner',
                'encode.carrier.types': 'Images • Audio • Vidéo • Documents',
                'encode.secret.title': 'Contenu Secret',
                'encode.secret.description': 'Message ou fichier à dissimuler',
                'encode.secret.placeholder': 'Votre message confidentiel...',
                'encode.secret.file': 'Ou sélectionner un fichier :',
                'encode.method.label': 'Méthode de Stéganographie',
                'encode.crypto.label': 'Niveau de Chiffrement',
                'encode.crypto.none': 'Aucun chiffrement',
                'encode.password.label': 'Mot de passe de chiffrement',
                'encode.password.placeholder': 'Phrase de passe sécurisée',
                'encode.options.label': 'Options Avancées',
                'encode.options.compress': 'Compression des données',
                'encode.options.noise': 'Ajout de bruit cryptographique',
                'encode.options.multilayer': 'Protection multi-couches',
                'encode.button.start': 'Lancer l\'encodage',
                'encode.button.reset': 'Réinitialiser',
                'encode.result.title': 'Encodage Réussi',
                'encode.result.filename': 'Fichier généré :',
                'encode.result.size': 'Taille finale :',
                'encode.result.method': 'Méthode utilisée :',
                'encode.button.download': 'Télécharger le résultat',

                // Decode Panel
                'decode.title': 'Extraction & Analyse',
                'decode.subtitle': 'Détection et extraction intelligente de données cachées avec déchiffrement automatique',
                'decode.upload.title': 'Fichier à Analyser',
                'decode.upload.description': 'Sélectionnez le fichier suspect ou encodé',
                'decode.upload.types': 'Tous formats supportés',
                'decode.password.label': 'Mot de passe de déchiffrement',
                'decode.password.placeholder': 'Phrase de passe (si chiffré)',
                'decode.detection.label': 'Mode de Détection',
                'decode.detection.auto': 'Détection Automatique',
                'decode.detection.force.lsb': 'Forcer LSB',
                'decode.detection.force.metadata': 'Forcer Métadonnées',
                'decode.detection.force.audio': 'Forcer Audio',
                'decode.detection.brute': 'Force Brute (exhaustif)',
                'decode.button.extract': 'Extraire les données',
                'decode.button.analyze': 'Analyse forensique',
                'decode.result.title': 'Données Extraites',
                'decode.result.method': 'Méthode détectée :',
                'decode.result.size': 'Taille extraite :',
                'decode.result.crypto': 'Type de chiffrement :',
                'decode.button.save': 'Sauvegarder l\'extraction',

                // UltraCrypte Panel
                'ultra.title': 'UltraCrypte™',
                'ultra.subtitle': 'Chiffrement de niveau militaire avec résistance post-quantique',
                'ultra.features.title': 'Technologies Avancées',
                'ultra.features.postquantum': 'Chiffrement post-quantique certifié',
                'ultra.features.chaos': 'Algorithmes chaotiques propriétaires',
                'ultra.features.differential': 'Protection contre l\'analyse différentielle',
                'ultra.features.sidechannel': 'Résistance aux attaques par canaux cachés',
                'ultra.features.noise': 'Masquage par bruit cryptographique',
                'ultra.features.deniable': 'Déni plausible intégré',
                'ultra.complexity.label': 'Niveau de Complexité',
                'ultra.complexity.standard': 'Standard (Rapide)',
                'ultra.complexity.enhanced': 'Renforcé (Équilibré)',
                'ultra.complexity.paranoid': 'Paranoïaque (Maximum)',
                'ultra.masterkey.label': 'Phrase de passe maîtresse',
                'ultra.masterkey.placeholder': 'Phrase longue et complexe requise...',
                'ultra.options.stealth': 'Mode furtif maximum',
                'ultra.options.deniable': 'Déni plausible activé',
                'ultra.options.volatile': 'Protection anti-dump mémoire',

                // Help Panel
                'help.title': 'Documentation',
                'help.subtitle': 'Guide complet d\'utilisation d\'Obscura et meilleures pratiques de sécurité',
                'help.encode.title': 'Guide d\'Encodage',
                'help.decode.title': 'Guide d\'Extraction',
                'help.ultra.title': 'UltraCrypte™ Advanced',
                'help.practices.title': 'Meilleures Pratiques',

                // Footer
                'footer.copyright': '© 2024 Obscura',
                'footer.subtitle': 'Stéganographie Professionnelle',
                'footer.mode': 'Mode Hors-ligne',
                'footer.files': 'fichiers traités',

                // Messages & States
                'message.welcome': 'Bienvenue dans Obscura - Stéganographie Ultra-Sécurisée',
                'message.encoding': 'Encodage en cours...',
                'message.decoding': 'Analyse en cours...',
                'message.loading': 'Traitement en cours...',
                'message.success.download': 'Fichier téléchargé avec succès!',
                'message.success.save': 'Données extraites sauvegardées!',
                'message.error.nocarrier': 'Veuillez sélectionner un fichier porteur',
                'message.error.nosecret': 'Veuillez entrer un message ou sélectionner un fichier secret',
                'message.error.nopassword': 'Un mot de passe est requis pour le chiffrement',
                'message.error.nofile': 'Veuillez sélectionner un fichier à décoder',

                // Theme & Settings
                'settings.theme.light': 'Mode clair',
                'settings.theme.dark': 'Mode sombre',
                'settings.language': 'Langue',
                'settings.language.fr': 'Français',
                'settings.language.en': 'English'
            },
            
            en: {
                // Header & Navigation
                'app.title': 'Obscura - Ultra-Secure Steganography',
                'header.tagline': 'Advanced Steganography',
                'header.status': 'System active',
                'nav.encode': 'Encode',
                'nav.decode': 'Decode',
                'nav.ultracrypte': 'UltraCrypt',
                'nav.help': 'Documentation',

                // Encode Panel
                'encode.title': 'Secure Encoding',
                'encode.subtitle': 'Advanced data concealment in your multimedia files with military-grade encryption',
                'encode.carrier.title': 'Carrier File',
                'encode.carrier.description': 'Drag your media or click to select',
                'encode.carrier.types': 'Images • Audio • Video • Documents',
                'encode.secret.title': 'Secret Content',
                'encode.secret.description': 'Message or file to hide',
                'encode.secret.placeholder': 'Your confidential message...',
                'encode.secret.file': 'Or select a file:',
                'encode.method.label': 'Steganography Method',
                'encode.crypto.label': 'Encryption Level',
                'encode.crypto.none': 'No encryption',
                'encode.password.label': 'Encryption password',
                'encode.password.placeholder': 'Secure passphrase',
                'encode.options.label': 'Advanced Options',
                'encode.options.compress': 'Data compression',
                'encode.options.noise': 'Add cryptographic noise',
                'encode.options.multilayer': 'Multi-layer protection',
                'encode.button.start': 'Start encoding',
                'encode.button.reset': 'Reset',
                'encode.result.title': 'Encoding Successful',
                'encode.result.filename': 'Generated file:',
                'encode.result.size': 'Final size:',
                'encode.result.method': 'Method used:',
                'encode.button.download': 'Download result',

                // Decode Panel
                'decode.title': 'Extraction & Analysis',
                'decode.subtitle': 'Intelligent detection and extraction of hidden data with automatic decryption',
                'decode.upload.title': 'File to Analyze',
                'decode.upload.description': 'Select the suspect or encoded file',
                'decode.upload.types': 'All formats supported',
                'decode.password.label': 'Decryption password',
                'decode.password.placeholder': 'Passphrase (if encrypted)',
                'decode.detection.label': 'Detection Mode',
                'decode.detection.auto': 'Automatic Detection',
                'decode.detection.force.lsb': 'Force LSB',
                'decode.detection.force.metadata': 'Force Metadata',
                'decode.detection.force.audio': 'Force Audio',
                'decode.detection.brute': 'Brute Force (exhaustive)',
                'decode.button.extract': 'Extract data',
                'decode.button.analyze': 'Forensic analysis',
                'decode.result.title': 'Extracted Data',
                'decode.result.method': 'Detected method:',
                'decode.result.size': 'Extracted size:',
                'decode.result.crypto': 'Encryption type:',
                'decode.button.save': 'Save extraction',

                // UltraCrypte Panel
                'ultra.title': 'UltraCrypt™',
                'ultra.subtitle': 'Military-grade encryption with post-quantum resistance',
                'ultra.features.title': 'Advanced Technologies',
                'ultra.features.postquantum': 'Certified post-quantum encryption',
                'ultra.features.chaos': 'Proprietary chaotic algorithms',
                'ultra.features.differential': 'Protection against differential analysis',
                'ultra.features.sidechannel': 'Resistance to side-channel attacks',
                'ultra.features.noise': 'Cryptographic noise masking',
                'ultra.features.deniable': 'Integrated plausible deniability',
                'ultra.complexity.label': 'Complexity Level',
                'ultra.complexity.standard': 'Standard (Fast)',
                'ultra.complexity.enhanced': 'Enhanced (Balanced)',
                'ultra.complexity.paranoid': 'Paranoid (Maximum)',
                'ultra.masterkey.label': 'Master passphrase',
                'ultra.masterkey.placeholder': 'Long and complex phrase required...',
                'ultra.options.stealth': 'Maximum stealth mode',
                'ultra.options.deniable': 'Plausible deniability enabled',
                'ultra.options.volatile': 'Anti-memory dump protection',

                // Help Panel
                'help.title': 'Documentation',
                'help.subtitle': 'Complete guide to using Obscura and security best practices',
                'help.encode.title': 'Encoding Guide',
                'help.decode.title': 'Extraction Guide',
                'help.ultra.title': 'UltraCrypt™ Advanced',
                'help.practices.title': 'Best Practices',

                // Footer
                'footer.copyright': '© 2024 Obscura',
                'footer.subtitle': 'Professional Steganography',
                'footer.mode': 'Offline Mode',
                'footer.files': 'files processed',

                // Messages & States
                'message.welcome': 'Welcome to Obscura - Ultra-Secure Steganography',
                'message.encoding': 'Encoding in progress...',
                'message.decoding': 'Analysis in progress...',
                'message.loading': 'Processing...',
                'message.success.download': 'File downloaded successfully!',
                'message.success.save': 'Extracted data saved!',
                'message.error.nocarrier': 'Please select a carrier file',
                'message.error.nosecret': 'Please enter a message or select a secret file',
                'message.error.nopassword': 'A password is required for encryption',
                'message.error.nofile': 'Please select a file to decode',

                // Theme & Settings
                'settings.theme.light': 'Light mode',
                'settings.theme.dark': 'Dark mode',
                'settings.language': 'Language',
                'settings.language.fr': 'Français',
                'settings.language.en': 'English'
            }
        };
    }

    t(key, params = {}) {
        let translation = this.translations[this.currentLanguage]?.[key] || key;
        
        // Simple parameter replacement
        Object.keys(params).forEach(param => {
            translation = translation.replace(`{${param}}`, params[param]);
        });
        
        return translation;
    }

    setLanguage(language) {
        if (this.translations[language]) {
            this.currentLanguage = language;
            localStorage.setItem('obscura-language', language);
            this.updateInterface();
            console.log('🌍 Langue changée:', language);
        }
    }

    getCurrentLanguage() {
        return this.currentLanguage;
    }

    getSupportedLanguages() {
        return Object.keys(this.translations);
    }

    updateInterface() {
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.t(key);
            
            if (element.tagName === 'INPUT' && (element.type === 'text' || element.type === 'password')) {
                element.placeholder = translation;
            } else if (element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        });

        // Update title
        document.title = this.t('app.title');

        // Update select options
        document.querySelectorAll('[data-i18n-options]').forEach(select => {
            const options = select.querySelectorAll('option[data-i18n]');
            options.forEach(option => {
                const key = option.getAttribute('data-i18n');
                option.textContent = this.t(key);
            });
        });

        // Trigger custom event for complex components
        document.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: this.currentLanguage }
        }));
    }
}

// Export for global use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = InternationalizationManager;
}
