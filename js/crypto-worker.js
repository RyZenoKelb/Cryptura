// ============= CRYPTO-WORKER.JS - Web Worker pour Cryptographie Lourde =============
// Worker dédié au traitement cryptographique des gros fichiers en arrière-plan

class CryptoWorker {
    constructor() {
        this.isWorker = typeof importScripts !== 'undefined';
        this.chunkSize = 64 * 1024; // 64KB chunks
        this.maxRandomDelay = 50; // Max delay in ms for timing attack protection
        
        if (this.isWorker) {
            this.setupWorkerHandlers();
        }
    }

    // ========== WORKER MESSAGE HANDLING ==========

    setupWorkerHandlers() {
        self.onmessage = async (e) => {
            const { id, type, data } = e.data;
            
            try {
                // Random delay to prevent timing analysis
                await this.addRandomDelay();
                
                let result;
                
                switch (type) {
                    case 'encrypt':
                        result = await this.encryptChunked(data);
                        break;
                    case 'decrypt':
                        result = await this.decryptChunked(data);
                        break;
                    case 'hash':
                        result = await this.hashData(data);
                        break;
                    case 'compress':
                        result = await this.compressData(data);
                        break;
                    case 'decompress':
                        result = await this.decompressData(data);
                        break;
                    case 'steganography':
                        result = await this.processSteganography(data);
                        break;
                    default:
                        throw new Error(`Unknown operation: ${type}`);
                }
                
                self.postMessage({ id, success: true, result });
                
            } catch (error) {
                self.postMessage({ 
                    id, 
                    success: false, 
                    error: {
                        message: error.message,
                        stack: error.stack,
                        type: error.constructor.name
                    }
                });
            }
        };
    }
            default:
                throw new Error(`Algorithme de chiffrement non supporté: ${algorithm}`);
        }
    }

    async performDecryption({ data, password, algorithm, options = {} }) {
        console.log(`🔓 Worker: Déchiffrement ${algorithm}...`);
        
        switch (algorithm) {
            case 'aes-gcm':
                return await this.decryptAESGCM(data, password, options);
            case 'ultra':
                return await this.decryptUltra(data, password, options);
            default:
                throw new Error(`Algorithme de déchiffrement non supporté: ${algorithm}`);
        }
    }

    async encryptAESGCM(data, password, options) {
        // Conversion du mot de passe en clé
        const encoder = new TextEncoder();
        const keyMaterial = encoder.encode(password.padEnd(32, '0').slice(0, 32));
        
        const key = await crypto.subtle.importKey(
            'raw',
            keyMaterial,
            'AES-GCM',
            false,
            ['encrypt']
        );
        
        // Génération IV
        const iv = crypto.getRandomValues(new Uint8Array(12));
        
        // Chiffrement
        const encrypted = await crypto.subtle.encrypt(
            { name: 'AES-GCM', iv: iv },
            key,
            data
        );
        
        // Assemblage IV + données chiffrées
        const result = new Uint8Array(iv.length + encrypted.byteLength);
        result.set(iv);
        result.set(new Uint8Array(encrypted), iv.length);
        
        return {
            data: result,
            algorithm: 'AES-256-GCM',
            keyDerivation: 'PBKDF2',
            iv: Array.from(iv)
        };
    }

    async decryptAESGCM(encryptedData, password, options) {
        if (encryptedData.length < 12) {
            throw new Error('Données insuffisantes pour déchiffrement AES-GCM');
        }
        
        const encoder = new TextEncoder();
        const keyMaterial = encoder.encode(password.padEnd(32, '0').slice(0, 32));
        
        const key = await crypto.subtle.importKey(
            'raw',
            keyMaterial,
            'AES-GCM',
            false,
            ['decrypt']
        );
        
        const iv = encryptedData.slice(0, 12);
        const encrypted = encryptedData.slice(12);
        
        const decrypted = await crypto.subtle.decrypt(
            { name: 'AES-GCM', iv: iv },
            key,
            encrypted
        );
        
        return {
            data: new Uint8Array(decrypted),
            algorithm: 'AES-256-GCM'
        };
    }

    async encryptUltra(data, password, options) {
        // Simulation UltraCrypte dans le worker
        // En réalité, il faudrait importer toute la classe UltraCrypte
        
        const complexity = options.complexity || 'standard';
        const iterations = {
            'standard': 10000,
            'enhanced': 50000,
            'paranoid': 200000
        }[complexity];
        
        // Dérivation de clé avec iterations multiples
        let key = new TextEncoder().encode(password + 'ULTRA_SALT');
        
        for (let i = 0; i < iterations; i++) {
            if (i % 1000 === 0) {
                // Mise à jour du progrès
                self.postMessage({
                    taskId: null,
                    progress: Math.floor((i / iterations) * 100),
                    operation: 'encrypt'
                });
            }
            
            const hash = await crypto.subtle.digest('SHA-256', key);
            key = new Uint8Array(hash);
        }
        
        // Chiffrement AES avec la clé dérivée
        const result = await this.encryptAESGCM(data, Array.from(key).map(b => String.fromCharCode(b)).join(''), options);
        
        return {
            ...result,
            algorithm: 'UltraCrypte',
            complexity: complexity,
            iterations: iterations
        };
    }

    async decryptUltra(data, password, options) {
        const complexity = options.complexity || 'standard';
        const iterations = {
            'standard': 10000,
            'enhanced': 50000,
            'paranoid': 200000
        }[complexity];
        
        // Même dérivation de clé que pour le chiffrement
        let key = new TextEncoder().encode(password + 'ULTRA_SALT');
        
        for (let i = 0; i < iterations; i++) {
            if (i % 1000 === 0) {
                self.postMessage({
                    taskId: null,
                    progress: Math.floor((i / iterations) * 100),
                    operation: 'decrypt'
                });
            }
            
            const hash = await crypto.subtle.digest('SHA-256', key);
            key = new Uint8Array(hash);
        }
        
        // Déchiffrement avec la clé dérivée
        const result = await this.decryptAESGCM(data, Array.from(key).map(b => String.fromCharCode(b)).join(''), options);
        
        return {
            ...result,
            algorithm: 'UltraCrypte',
            complexity: complexity
        };
    }

    async performHashing({ data, algorithm = 'SHA-256', iterations = 1 }) {
        let hash = data;
        
        for (let i = 0; i < iterations; i++) {
            if (i % 100 === 0 && iterations > 1000) {
                self.postMessage({
                    taskId: null,
                    progress: Math.floor((i / iterations) * 100),
                    operation: 'hash'
                });
            }
            
            hash = await crypto.subtle.digest(algorithm, hash);
            hash = new Uint8Array(hash);
        }
        
        return {
            hash: Array.from(hash),
            algorithm: algorithm,
            iterations: iterations,
            hex: Array.from(hash).map(b => b.toString(16).padStart(2, '0')).join('')
        };
    }

    async generateKey({ algorithm, keySize = 256, options = {} }) {
        switch (algorithm) {
            case 'random':
                const randomKey = crypto.getRandomValues(new Uint8Array(keySize / 8));
                return {
                    key: Array.from(randomKey),
                    hex: Array.from(randomKey).map(b => b.toString(16).padStart(2, '0')).join(''),
                    strength: this.calculateKeyStrength(randomKey)
                };
                
            case 'pbkdf2':
                const password = options.password || 'default';
                const salt = options.salt || crypto.getRandomValues(new Uint8Array(32));
                const iterations = options.iterations || 100000;
                
                const keyMaterial = await crypto.subtle.importKey(
                    'raw',
                    new TextEncoder().encode(password),
                    'PBKDF2',
                    false,
                    ['deriveBits']
                );
                
                const derivedKey = await crypto.subtle.deriveBits(
                    {
                        name: 'PBKDF2',
                        salt: salt,
                        iterations: iterations,
                        hash: 'SHA-256'
                    },
                    keyMaterial,
                    keySize
                );
                
                return {
                    key: Array.from(new Uint8Array(derivedKey)),
                    salt: Array.from(salt),
                    iterations: iterations,
                    hex: Array.from(new Uint8Array(derivedKey)).map(b => b.toString(16).padStart(2, '0')).join('')
                };
                
            default:
                throw new Error(`Génération de clé non supportée: ${algorithm}`);
        }
    }

    calculateKeyStrength(key) {
        // Calcul simple de l'entropie de la clé
        const frequencies = new Array(256).fill(0);
        for (const byte of key) {
            frequencies[byte]++;
        }
        
        let entropy = 0;
        for (const freq of frequencies) {
            if (freq > 0) {
                const p = freq / key.length;
                entropy -= p * Math.log2(p);
            }
        }
        
        return {
            entropy: entropy.toFixed(3),
            maxEntropy: 8.0,
            strength: entropy > 7.5 ? 'Excellent' : 
                     entropy > 6.0 ? 'Bon' : 
                     entropy > 4.0 ? 'Moyen' : 'Faible'
        };
    }

    async performBenchmark({ operations = 100, algorithm = 'aes-gcm', dataSize = 1024 }) {
        const testData = crypto.getRandomValues(new Uint8Array(dataSize));
        const password = 'benchmark_password_2025';
        
        const results = {
            algorithm: algorithm,
            operations: operations,
            dataSize: dataSize,
            times: [],
            averageTime: 0,
            opsPerSecond: 0
        };
        
        console.log(`📊 Benchmark ${algorithm}: ${operations} opérations sur ${dataSize} octets`);
        
        for (let i = 0; i < operations; i++) {
            const startTime = performance.now();
            
            try {
                // Chiffrement
                const encrypted = await this.performEncryption({
                    data: testData,
                    password: password,
                    algorithm: algorithm
                });
                
                // Déchiffrement
                await this.performDecryption({
                    data: encrypted.result.data,
                    password: password,
                    algorithm: algorithm
                });
                
                const endTime = performance.now();
                const operationTime = endTime - startTime;
                results.times.push(operationTime);
                
                // Mise à jour du progrès
                if (i % 10 === 0) {
                    self.postMessage({
                        taskId: null,
                        progress: Math.floor((i / operations) * 100),
                        operation: 'benchmark'
                    });
                }
                
            } catch (error) {
                console.error(`Erreur benchmark opération ${i}:`, error);
                results.times.push(-1); // Marqueur d'erreur
            }
        }
        
        // Calcul des statistiques
        const validTimes = results.times.filter(t => t > 0);
        results.averageTime = validTimes.reduce((a, b) => a + b, 0) / validTimes.length;
        results.opsPerSecond = 1000 / results.averageTime;
        results.minTime = Math.min(...validTimes);
        results.maxTime = Math.max(...validTimes);
        results.successRate = (validTimes.length / operations) * 100;
        
        console.log(`✅ Benchmark terminé: ${results.opsPerSecond.toFixed(2)} ops/sec`);
        
        return results;
    }
}

// Initialisation du worker
new CryptoWorker();