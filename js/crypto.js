// ============= CRYPTO.JS - Système UltraCrypte =============
// Système de chiffrement ultra-sécurisé avec backdoor admin

class UltraCrypte {
    constructor() {
        this.SIGNATURE = 'OBSCURA_ULTRA_2025';
        this.ADMIN_SIGNATURE = 'ADM_' + btoa(Math.random().toString(36));
        this.VERSION = '1.0';
    }

    // ========== GÉNÉRATION DE CLÉS CHAOTIQUES ==========
    
    async generateChaosKey(password, complexity = 'standard') {
        const encoder = new TextEncoder();
        const baseKey = encoder.encode(password + this.SIGNATURE);
        
        // Hachage multiple avec salage
        let key = await this.multiHash(baseKey, complexity);
        
        // Transformation chaotique
        key = await this.chaosTransform(key, complexity);
        
        // Bruit cryptographique
        key = await this.addCryptographicNoise(key, complexity);
        
        return key;
    }

    async multiHash(data, complexity) {
        const iterations = {
            'standard': 10000,
            'enhanced': 50000,
            'paranoid': 200000
        }[complexity];

        let result = new Uint8Array(data);
        
        for (let i = 0; i < iterations; i++) {
            const hashBuffer = await crypto.subtle.digest('SHA-256', result);
            const newData = new Uint8Array(hashBuffer);
            
            // Mélange avec l'itération précédente et l'index
            const combined = new Uint8Array(newData.length + 4);
            combined.set(newData);
            combined.set(new Uint8Array(new Uint32Array([i]).buffer), newData.length);
            
            result = combined;
        }
        
        return result;
    }

    async chaosTransform(data, complexity) {
        const rounds = {
            'standard': 5,
            'enhanced': 15,
            'paranoid': 50
        }[complexity];

        let result = new Uint8Array(data);
        
        for (let round = 0; round < rounds; round++) {
            // Transformation non-linéaire avec rétroaction
            for (let i = 0; i < result.length; i++) {
                const prev = result[(i + result.length - 1) % result.length];
                const next = result[(i + 1) % result.length];
                const roundFactor = result[(i + round) % result.length];
                
                result[i] = (result[i] ^ prev ^ next) + (roundFactor & 0xFF);
                result[i] = result[i] & 0xFF;
            }
            
            // Permutation chaotique basée sur les données
            result = await this.chaosPermutation(result, round);
        }
        
        return result;
    }

    async chaosPermutation(data, seed) {
        const indices = Array.from({length: data.length}, (_, i) => i);
        const result = new Uint8Array(data.length);
        
        // Génération d'une séquence pseudo-aléatoire basée sur les données
        for (let i = indices.length - 1; i > 0; i--) {
            const randomFactor = (data[i % data.length] + seed) & 0xFF;
            const j = Math.floor((randomFactor / 255) * i);
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }
        
        // Application de la permutation
        for (let i = 0; i < data.length; i++) {
            result[i] = data[indices[i]];
        }
        
        return result;
    }

    async addCryptographicNoise(data, complexity) {
        const noiseLevel = {
            'standard': 0.1,
            'enhanced': 0.3,
            'paranoid': 0.7
        }[complexity];

        const result = new Uint8Array(data.length);
        const noise = crypto.getRandomValues(new Uint8Array(data.length));
        
        for (let i = 0; i < data.length; i++) {
            const noiseFactor = (noise[i] / 255) * noiseLevel;
            const modifiedNoise = Math.floor(noise[i] * noiseFactor);
            result[i] = (data[i] + modifiedNoise) & 0xFF;
        }
        
        return result;
    }

    // ========== CHIFFREMENT PRINCIPAL ==========

    async encrypt(data, password, options = {}) {
        const complexity = options.complexity || 'standard';
        const stealth = options.stealth || false;
        const deniable = options.deniable || false;
        const compress = options.compress || false;
        
        try {
            console.log(`🔐 Démarrage chiffrement UltraCrypte (${complexity})`);
            
            // Génération de la clé ultra-sécurisée
            const ultraKey = await this.generateChaosKey(password, complexity);
            
            // Préparation des données
            let processedData = new Uint8Array(data);
            
            // Compression optionnelle
            if (compress) {
                processedData = await this.compress(processedData);
            }
            
            // Ajout de métadonnées et signature admin (invisible)
            processedData = await this.addMetadata(processedData, {
                version: this.VERSION,
                complexity: complexity,
                timestamp: Date.now(),
                options: options
            });
            
            processedData = await this.addAdminSignature(processedData);
            
            // Chiffrement AES-256-GCM principal
            const aesKey = await crypto.subtle.importKey(
                'raw',
                ultraKey.slice(0, 32),
                'AES-GCM',
                false,
                ['encrypt']
            );
            
            const iv = crypto.getRandomValues(new Uint8Array(12));
            const encrypted = await crypto.subtle.encrypt(
                { name: 'AES-GCM', iv: iv },
                aesKey,
                processedData
            );
            
            // Assemblage : IV + données chiffrées
            let result = new Uint8Array([...iv, ...new Uint8Array(encrypted)]);
            
            // Couches supplémentaires selon la complexité
            if (complexity !== 'standard') {
                result = await this.addExtraLayers(result, ultraKey, complexity);
            }
            
            // Mode furtif : dispersion dans du bruit
            if (stealth) {
                result = await this.stealthMode(result);
            }
            
            // Déni plausible : ajout de données de couverture
            if (deniable) {
                result = await this.addDeniabilityLayer(result);
            }
            
            console.log(`✅ Chiffrement terminé - ${result.length} octets`);
            return result;
            
        } catch (error) {
            console.error('❌ Erreur de chiffrement UltraCrypte:', error);
            throw new Error('Échec du chiffrement ultra-sécurisé');
        }
    }

    async decrypt(encryptedData, password, options = {}) {
        const complexity = options.complexity || 'standard';
        
        try {
            console.log(`🔓 Démarrage déchiffrement UltraCrypte`);
            
            let data = new Uint8Array(encryptedData);
            
            // Retrait des couches dans l'ordre inverse
            
            // Déni plausible
            if (options.deniable) {
                data = await this.removeDeniabilityLayer(data);
            }
            
            // Mode furtif
            if (options.stealth) {
                data = await this.removeStealthMode(data);
            }
            
            // Couches supplémentaires
            if (complexity !== 'standard') {
                // Régénération de la clé pour les couches extra
                const ultraKey = await this.generateChaosKey(password, complexity);
                data = await this.removeExtraLayers(data, ultraKey, complexity);
            }
            
            // Extraction IV et données chiffrées principales
            if (data.length < 12) {
                throw new Error('Données corrompues');
            }
            
            const iv = data.slice(0, 12);
            const encrypted = data.slice(12);
            
            // Déchiffrement AES-GCM principal
            const ultraKey = await this.generateChaosKey(password, complexity);
            const aesKey = await crypto.subtle.importKey(
                'raw',
                ultraKey.slice(0, 32),
                'AES-GCM',
                false,
                ['decrypt']
            );
            
            const decrypted = await crypto.subtle.decrypt(
                { name: 'AES-GCM', iv: iv },
                aesKey,
                encrypted
            );
            
            let finalData = new Uint8Array(decrypted);
            
            // Suppression signature admin et métadonnées
            finalData = await this.removeAdminSignature(finalData);
            finalData = await this.removeMetadata(finalData);
            
            console.log(`✅ Déchiffrement réussi - ${finalData.length} octets`);
            return finalData;
            
        } catch (error) {
            console.error('❌ Erreur de déchiffrement:', error.message);
            // Aucune information ne doit fuiter sur l'échec
            throw new Error('Déchiffrement impossible');
        }
    }

    // ========== MODE ADMIN BACKDOOR ==========

    async adminDecrypt(encryptedData) {
        try {
            console.log('🔧 Tentative d\'accès admin...');
            
            // Recherche de la signature admin dans les données
            const signature = await this.findAdminSignature(encryptedData);
            if (signature === null) {
                throw new Error('Signature admin non trouvée');
            }
            
            console.log(`🎯 Signature trouvée à l'offset ${signature}`);
            
            // Extraction avec la clé maître administrative
            const masterKey = await this.generateMasterKey();
            const extracted = await this.extractWithMasterKey(encryptedData, masterKey, signature);
            
            console.log('✅ Extraction admin réussie');
            return extracted;
            
        } catch (error) {
            console.error('❌ Accès admin refusé:', error.message);
            throw new Error('Accès admin refusé');
        }
    }

    async generateMasterKey() {
        const seed = this.ADMIN_SIGNATURE + 'MASTER_2025' + this.VERSION;
        const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(seed));
        return new Uint8Array(hash);
    }

    async extractWithMasterKey(data, masterKey, signatureOffset) {
        // Stratégie d'extraction simplifiée pour la démo
        // Dans une vraie implémentation, ceci serait beaucoup plus sophistiqué
        
        try {
            // Tentative de localisation des données utiles après la signature
            const afterSignature = data.slice(signatureOffset + this.ADMIN_SIGNATURE.length);
            
            if (afterSignature.length > 0) {
                // Retour des données brutes trouvées après la signature
                return afterSignature.slice(0, Math.min(afterSignature.length, 1000));
            }
            
            // Si pas de données après signature, retour d'un échantillon
            return data.slice(0, Math.min(data.length, 500));
            
        } catch (error) {
            throw new Error('Extraction impossible');
        }
    }

    // ========== GESTION DES SIGNATURES ==========

    async addAdminSignature(data) {
        const signature = new TextEncoder().encode(this.ADMIN_SIGNATURE);
        const result = new Uint8Array(data.length + signature.length);
        result.set(data);
        result.set(signature, data.length);
        return result;
    }

    async removeAdminSignature(data) {
        const signature = new TextEncoder().encode(this.ADMIN_SIGNATURE);
        if (data.length < signature.length) return data;
        
        // Vérification de la signature à la fin
        const potentialSig = data.slice(-signature.length);
        if (this.arrayEqual(potentialSig, signature)) {
            return data.slice(0, -signature.length);
        }
        
        return data;
    }

    async findAdminSignature(data) {
        const signature = new TextEncoder().encode(this.ADMIN_SIGNATURE);
        
        // Recherche dans tout le fichier
        for (let i = 0; i <= data.length - signature.length; i++) {
            if (this.arrayEqual(data.slice(i, i + signature.length), signature)) {
                return i;
            }
        }
        
        // Recherche des signatures génériques OBSCURA
        const genericSigs = ['OBSCURA_ULTRA', 'OBSCURA_META', 'ADM_'];
        for (const sig of genericSigs) {
            const sigBytes = new TextEncoder().encode(sig);
            for (let i = 0; i <= data.length - sigBytes.length; i++) {
                if (this.arrayEqual(data.slice(i, i + sigBytes.length), sigBytes)) {
                    return i;
                }
            }
        }
        
        return null;
    }

    // ========== MÉTADONNÉES ==========

    async addMetadata(data, metadata) {
        const metaString = JSON.stringify(metadata);
        const metaBytes = new TextEncoder().encode(metaString);
        const metaLength = new Uint32Array([metaBytes.length]);
        const lengthBytes = new Uint8Array(metaLength.buffer);
        
        const result = new Uint8Array(data.length + lengthBytes.length + metaBytes.length);
        result.set(data);
        result.set(lengthBytes, data.length);
        result.set(metaBytes, data.length + lengthBytes.length);
        
        return result;
    }

    async removeMetadata(data) {
        if (data.length < 4) return data;
        
        try {
            // Lecture de la taille des métadonnées (4 derniers octets)
            const lengthBytes = data.slice(-4);
            const metaLength = new Uint32Array(lengthBytes.buffer)[0];
            
            if (metaLength > 0 && metaLength < data.length) {
                // Suppression métadonnées + taille
                return data.slice(0, -(metaLength + 4));
            }
        } catch (error) {
            // Si erreur, retourner les données sans modification
        }
        
        return data;
    }

    // ========== COUCHES SUPPLÉMENTAIRES ==========

    async addExtraLayers(data, key, complexity) {
        // Couche XOR avec clé dérivée
        const xorKey = await this.deriveXorKey(key, complexity);
        const xorResult = new Uint8Array(data.length);
        
        for (let i = 0; i < data.length; i++) {
            xorResult[i] = data[i] ^ xorKey[i % xorKey.length];
        }
        
        // Couche de substitution
        const substituted = await this.substitutionLayer(xorResult, complexity);
        
        return substituted;
    }

    async removeExtraLayers(data, key, complexity) {
        // Inverse de addExtraLayers
        const unsubstituted = await this.inverseSubstitutionLayer(data, complexity);
        
        const xorKey = await this.deriveXorKey(key, complexity);
        const result = new Uint8Array(unsubstituted.length);
        
        for (let i = 0; i < unsubstituted.length; i++) {
            result[i] = unsubstituted[i] ^ xorKey[i % xorKey.length];
        }
        
        return result;
    }

    async deriveXorKey(key, complexity) {
        const size = {
            'standard': 256,
            'enhanced': 1024,
            'paranoid': 4096
        }[complexity];
        
        let derivedKey = new Uint8Array(key);
        
        // Extension de la clé par hachage itératif
        while (derivedKey.length < size) {
            const hash = await crypto.subtle.digest('SHA-256', derivedKey);
            const newKey = new Uint8Array(derivedKey.length + hash.byteLength);
            newKey.set(derivedKey);
            newKey.set(new Uint8Array(hash), derivedKey.length);
            derivedKey = newKey;
        }
        
        return derivedKey.slice(0, size);
    }

    async substitutionLayer(data, complexity) {
        // Table de substitution dynamique
        const sbox = await this.generateSBox(complexity);
        const result = new Uint8Array(data.length);
        
        for (let i = 0; i < data.length; i++) {
            result[i] = sbox[data[i]];
        }
        
        return result;
    }

    async inverseSubstitutionLayer(data, complexity) {
        const sbox = await this.generateSBox(complexity);
        const inverseSbox = new Uint8Array(256);
        
        // Création de la table inverse
        for (let i = 0; i < 256; i++) {
            inverseSbox[sbox[i]] = i;
        }
        
        const result = new Uint8Array(data.length);
        for (let i = 0; i < data.length; i++) {
            result[i] = inverseSbox[data[i]];
        }
        
        return result;
    }

    async generateSBox(complexity) {
        const seed = this.SIGNATURE + complexity;
        const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(seed));
        const hashArray = new Uint8Array(hash);
        
        // Génération d'une S-Box pseudo-aléatoire mais déterministe
        const sbox = Array.from({length: 256}, (_, i) => i);
        
        for (let i = 255; i > 0; i--) {
            const j = hashArray[i % hashArray.length] % (i + 1);
            [sbox[i], sbox[j]] = [sbox[j], sbox[i]];
        }
        
        return new Uint8Array(sbox);
    }

    // ========== MODE FURTIF ==========

    async stealthMode(data) {
        // Dispersion des données dans du bruit pseudo-aléatoire
        const noise = crypto.getRandomValues(new Uint8Array(data.length * 3));
        const result = new Uint8Array(data.length * 4);
        
        let dataIndex = 0;
        for (let i = 0; i < result.length; i += 4) {
            if (dataIndex < data.length) {
                // 1 octet de données, 3 octets de bruit
                result[i] = data[dataIndex++];
                result.set(noise.slice(i, i + 3), i + 1);
            } else {
                // Que du bruit
                result.set(noise.slice(i, i + 4), i);
            }
        }
        
        return result;
    }

    async removeStealthMode(data) {
        const result = new Uint8Array(Math.floor(data.length / 4));
        
        for (let i = 0, j = 0; i < data.length && j < result.length; i += 4, j++) {
            result[j] = data[i]; // Récupération du 1er octet de chaque groupe de 4
        }
        
        return result;
    }

    // ========== DÉNI PLAUSIBLE ==========

    async addDeniabilityLayer(data) {
        // Ajout de données de couverture innocentes
        const coverTexts = [
            'Random system cache file. Auto-generated by system processes.',
            'Temporary data storage. Safe to ignore.',
            'System configuration backup. Do not modify.',
            'Application metadata. Used for optimization.'
        ];
        
        const coverText = coverTexts[Math.floor(Math.random() * coverTexts.length)];
        const coverData = new TextEncoder().encode(coverText);
        
        const result = new Uint8Array(coverData.length + data.length + 1);
        result.set(coverData);
        result[coverData.length] = 0x00; // Séparateur null
        result.set(data, coverData.length + 1);
        
        return result;
    }

    async removeDeniabilityLayer(data) {
        // Recherche du premier octet null (séparateur)
        for (let i = 0; i < data.length; i++) {
            if (data[i] === 0x00) {
                return data.slice(i + 1);
            }
        }
        
        // Si pas de séparateur trouvé, retourner les données telles quelles
        return data;
    }

    // ========== UTILITAIRES ==========

    arrayEqual(a, b) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }

    async compress(data) {
        // Compression simple simulée (dans une vraie implémentation, utiliser pako.js)
        // Pour l'instant, on simule juste une réduction
        console.log('💾 Compression activée (simulée)');
        return data;
    }

    // Méthodes de validation et diagnostic
    async validateEncryption(originalData, encryptedData, password, options) {
        try {
            const decrypted = await this.decrypt(encryptedData, password, options);
            return this.arrayEqual(originalData, decrypted);
        } catch (error) {
            return false;
        }
    }

    getStats(data) {
        const entropy = this.calculateEntropy(data);
        const patterns = this.detectPatterns(data);
        
        return {
            size: data.length,
            entropy: entropy.toFixed(3),
            patterns: patterns,
            compressionRatio: this.estimateCompression(data)
        };
    }

    calculateEntropy(data) {
        const frequencies = new Array(256).fill(0);
        for (const byte of data) {
            frequencies[byte]++;
        }
        
        let entropy = 0;
        const length = data.length;
        
        for (const freq of frequencies) {
            if (freq > 0) {
                const probability = freq / length;
                entropy -= probability * Math.log2(probability);
            }
        }
        
        return entropy;
    }

    detectPatterns(data) {
        const patterns = [];
        
        // Détection de répétitions
        for (let len = 2; len <= 8; len++) {
            const seen = new Set();
            for (let i = 0; i <= data.length - len; i++) {
                const pattern = data.slice(i, i + len);
                const patternStr = Array.from(pattern).join(',');
                if (seen.has(patternStr)) {
                    patterns.push(`Répétition de ${len} octets`);
                    break;
                }
                seen.add(patternStr);
            }
        }
        
        return patterns;
    }

    estimateCompression(data) {
        // Estimation grossière du taux de compression possible
        const unique = new Set(data).size;
        return (unique / 256).toFixed(2);
    }
}

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UltraCrypte;
}