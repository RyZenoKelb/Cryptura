class PluginManager {
    constructor() {
        this.plugins = new Map();
        this.hooks = new Map();
        this.loadedPlugins = new Set();
        
        console.log('🔌 Plugin Manager initialisé');
        this.initializeCore();
    }

    initializeCore() {
        // Hooks de base disponibles
        this.registerHook('beforeEncode', []);
        this.registerHook('afterEncode', []);
        this.registerHook('beforeDecode', []);
        this.registerHook('afterDecode', []);
        this.registerHook('onFileSelect', []);
        this.registerHook('onMethodSelect', []);
        this.registerHook('onProgress', []);
        this.registerHook('onError', []);
    }

    // ========== GESTION DES PLUGINS ==========

    registerPlugin(name, plugin) {
        if (this.plugins.has(name)) {
            console.warn(`⚠️ Plugin '${name}' déjà enregistré, remplacement...`);
        }

        // Validation du plugin
        if (!this.validatePlugin(plugin)) {
            throw new Error(`Plugin '${name}' invalide`);
        }

        this.plugins.set(name, plugin);
        console.log(`✅ Plugin '${name}' enregistré`);

        // Initialisation du plugin si possible
        if (plugin.init && typeof plugin.init === 'function') {
            try {
                plugin.init(this);
                this.loadedPlugins.add(name);
                console.log(`🚀 Plugin '${name}' initialisé`);
            } catch (error) {
                console.error(`❌ Erreur initialisation plugin '${name}':`, error);
            }
        }

        return true;
    }

    unregisterPlugin(name) {
        const plugin = this.plugins.get(name);
        if (!plugin) {
            console.warn(`⚠️ Plugin '${name}' non trouvé`);
            return false;
        }

        // Nettoyage du plugin
        if (plugin.cleanup && typeof plugin.cleanup === 'function') {
            try {
                plugin.cleanup();
            } catch (error) {
                console.error(`❌ Erreur nettoyage plugin '${name}':`, error);
            }
        }

        this.plugins.delete(name);
        this.loadedPlugins.delete(name);
        console.log(`🗑️ Plugin '${name}' supprimé`);
        return true;
    }

    validatePlugin(plugin) {
        // Validation de base
        if (!plugin || typeof plugin !== 'object') {
            return false;
        }

        // Propriétés requises
        const required = ['name', 'version', 'type'];
        for (const prop of required) {
            if (!plugin[prop]) {
                console.error(`❌ Plugin invalide: propriété '${prop}' manquante`);
                return false;
            }
        }

        // Types de plugins supportés
        const supportedTypes = ['steganography', 'crypto', 'ui', 'utility'];
        if (!supportedTypes.includes(plugin.type)) {
            console.error(`❌ Type de plugin non supporté: ${plugin.type}`);
            return false;
        }

        return true;
    }

    // ========== SYSTÈME DE HOOKS ==========

    registerHook(hookName, callbacks = []) {
        if (!this.hooks.has(hookName)) {
            this.hooks.set(hookName, []);
        }
        
        if (callbacks.length > 0) {
            this.hooks.get(hookName).push(...callbacks);
        }
    }

    addHook(hookName, callback) {
        if (!this.hooks.has(hookName)) {
            this.registerHook(hookName);
        }
        
        this.hooks.get(hookName).push(callback);
        console.log(`🪝 Hook ajouté: ${hookName}`);
    }

    async executeHook(hookName, data = {}) {
        const callbacks = this.hooks.get(hookName) || [];
        let result = data;

        for (const callback of callbacks) {
            try {
                const hookResult = await callback(result);
                if (hookResult !== undefined) {
                    result = hookResult;
                }
            } catch (error) {
                console.error(`❌ Erreur hook '${hookName}':`, error);
            }
        }

        return result;
    }

    // ========== GESTION DES MÉTHODES ==========

    registerSteganographyMethod(name, method) {
        const plugin = {
            name: `stego-${name}`,
            version: '1.0.0',
            type: 'steganography',
            method: method,
            init: (pluginManager) => {
                // Ajout de la méthode au moteur de stéganographie
                if (window.app && window.app.steganography) {
                    window.app.steganography.methods[name] = method.displayName || name;
                    console.log(`📐 Méthode stéganographique '${name}' ajoutée`);
                }
            },
            cleanup: () => {
                if (window.app && window.app.steganography) {
                    delete window.app.steganography.methods[name];
                }
            }
        };

        // Validation spécifique aux méthodes stéganographiques
        if (!method.hide || !method.extract) {
            throw new Error(`Méthode stéganographique '${name}' incomplète`);
        }

        return this.registerPlugin(plugin.name, plugin);
    }

    registerCryptoMethod(name, method) {
        const plugin = {
            name: `crypto-${name}`,
            version: '1.0.0',
            type: 'crypto',
            method: method,
            init: (pluginManager) => {
                console.log(`🔐 Méthode cryptographique '${name}' ajoutée`);
            }
        };

        if (!method.encrypt || !method.decrypt) {
            throw new Error(`Méthode cryptographique '${name}' incomplète`);
        }

        return this.registerPlugin(plugin.name, plugin);
    }

    // ========== UTILITAIRES ==========

    getPlugin(name) {
        return this.plugins.get(name);
    }

    listPlugins() {
        return Array.from(this.plugins.keys());
    }

    getPluginsByType(type) {
        return Array.from(this.plugins.values()).filter(plugin => plugin.type === type);
    }

    isPluginLoaded(name) {
        return this.loadedPlugins.has(name);
    }

    getPluginInfo(name) {
        const plugin = this.plugins.get(name);
        if (!plugin) return null;

        return {
            name: plugin.name,
            version: plugin.version,
            type: plugin.type,
            loaded: this.isPluginLoaded(name),
            description: plugin.description || 'Aucune description',
            author: plugin.author || 'Inconnu'
        };
    }

    // ========== CHARGEMENT DYNAMIQUE ==========

    async loadPluginFromURL(url) {
        try {
            console.log(`📥 Chargement plugin depuis: ${url}`);
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            
            const pluginCode = await response.text();
            
            // Évaluation sécurisée du code du plugin
            const plugin = this.evaluatePluginCode(pluginCode);
            
            if (plugin) {
                return this.registerPlugin(plugin.name, plugin);
            }
            
            return false;
            
        } catch (error) {
            console.error(`❌ Erreur chargement plugin:`, error);
            return false;
        }
    }

    evaluatePluginCode(code) {
        try {
            // Sandbox basique pour l'évaluation
            const sandbox = {
                console: console,
                PluginManager: PluginManager,
                window: {
                    app: window.app
                }
            };
            
            // Création d'une fonction avec le code du plugin
            const pluginFunction = new Function('sandbox', `
                with (sandbox) {
                    ${code}
                    return typeof plugin !== 'undefined' ? plugin : null;
                }
            `);
            
            return pluginFunction(sandbox);
            
        } catch (error) {
            console.error('❌ Erreur évaluation plugin:', error);
            return null;
        }
    }

    // ========== SÉRIALISATION ==========

    exportConfiguration() {
        const config = {
            plugins: [],
            hooks: {}
        };

        // Export des plugins (sans le code)
        for (const [name, plugin] of this.plugins) {
            config.plugins.push({
                name: plugin.name,
                version: plugin.version,
                type: plugin.type,
                loaded: this.isPluginLoaded(name)
            });
        }

        // Export des hooks (sans les callbacks)
        for (const [hookName, callbacks] of this.hooks) {
            config.hooks[hookName] = callbacks.length;
        }

        return config;
    }

    generateReport() {
        const report = {
            totalPlugins: this.plugins.size,
            loadedPlugins: this.loadedPlugins.size,
            availableHooks: this.hooks.size,
            pluginsByType: {},
            details: []
        };

        // Statistiques par type
        for (const plugin of this.plugins.values()) {
            report.pluginsByType[plugin.type] = (report.pluginsByType[plugin.type] || 0) + 1;
        }

        // Détails des plugins
        for (const [name, plugin] of this.plugins) {
            report.details.push(this.getPluginInfo(name));
        }

        return report;
    }
}

// ========== PLUGINS DE BASE ==========

// Plugin exemple : Méthode de stéganographie personnalisée
const ExampleSteganographyPlugin = {
    name: 'example-stego',
    version: '1.0.0',
    type: 'steganography',
    description: 'Méthode de stéganographie d\'exemple',
    author: 'Obscura Team',
    
    async hide(carrierFile, secretData, options = {}) {
        // Implémentation d'exemple : simple concaténation
        const carrierData = await this.fileToArrayBuffer(carrierFile);
        const marker = new TextEncoder().encode('EXAMPLE_STEGO_START');
        const endMarker = new TextEncoder().encode('EXAMPLE_STEGO_END');
        
        const result = new Uint8Array(carrierData.byteLength + marker.length + secretData.length + endMarker.length);
        let offset = 0;
        
        result.set(new Uint8Array(carrierData), offset);
        offset += carrierData.byteLength;
        
        result.set(marker, offset);
        offset += marker.length;
        
        result.set(secretData, offset);
        offset += secretData.length;
        
        result.set(endMarker, offset);
        
        return new Blob([result], { type: carrierFile.type });
    },
    
    async extract(carrierFile, options = {}) {
        const data = await this.fileToArrayBuffer(carrierFile);
        const uint8Data = new Uint8Array(data);
        
        const marker = new TextEncoder().encode('EXAMPLE_STEGO_START');
        const endMarker = new TextEncoder().encode('EXAMPLE_STEGO_END');
        
        // Recherche des marqueurs
        let startIndex = -1;
        let endIndex = -1;
        
        for (let i = 0; i <= uint8Data.length - marker.length; i++) {
            if (this.arrayEqual(uint8Data.slice(i, i + marker.length), marker)) {
                startIndex = i + marker.length;
                break;
            }
        }
        
        if (startIndex === -1) {
            throw new Error('Marqueur de début non trouvé');
        }
        
        for (let i = startIndex; i <= uint8Data.length - endMarker.length; i++) {
            if (this.arrayEqual(uint8Data.slice(i, i + endMarker.length), endMarker)) {
                endIndex = i;
                break;
            }
        }
        
        if (endIndex === -1) {
            throw new Error('Marqueur de fin non trouvé');
        }
        
        return uint8Data.slice(startIndex, endIndex);
    },
    
    // Utilitaires
    async fileToArrayBuffer(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });
    },
    
    arrayEqual(a, b) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    },
    
    init(pluginManager) {
        console.log('🔌 Plugin exemple initialisé');
        
        // Ajout de hooks d'exemple
        pluginManager.addHook('beforeEncode', async (data) => {
            console.log('🪝 Before encode hook - Example plugin');
            return data;
        });
        
        pluginManager.addHook('afterDecode', async (data) => {
            console.log('🪝 After decode hook - Example plugin');
            return data;
        });
    },
    
    cleanup() {
        console.log('🧹 Plugin exemple nettoyé');
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PluginManager, ExampleSteganographyPlugin };
}