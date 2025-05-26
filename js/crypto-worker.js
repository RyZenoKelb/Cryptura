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

    // ========== TIMING ATTACK PROTECTION ==========

    async addRandomDelay() {
        const delay = Math.floor(Math.random() * this.maxRandomDelay);
        if (delay > 0) {
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }

    // Add noise to execution patterns
    addExecutionNoise() {
        // Perform dummy operations to mask real computation patterns
        const dummyOps = Math.floor(Math.random() * 100);
        let dummy = 0;
        for (let i = 0; i < dummyOps; i++) {
            dummy += Math.sin(i) * Math.cos(i);
        }
        return dummy; // Return to prevent optimization
    }

    // ========== CHUNKED ENCRYPTION ==========

    async encryptChunked(data) {
        const { buffer, password, algorithm = 'AES-GCM', options = {} } = data;
        const chunks = this.splitIntoChunks(buffer);
        const encryptedChunks = [];
        const salt = crypto.getRandomValues(new Uint8Array(16));
        
        // Derive key from password
        const key = await this.deriveKey(password, salt, algorithm);
        
        let progress = 0;
        const totalChunks = chunks.length;
        
        for (let i = 0; i < chunks.length; i++) {
            // Add execution noise
            this.addExecutionNoise();
            
            const chunk = chunks[i];
            const iv = crypto.getRandomValues(new Uint8Array(12));
            
            const encryptedChunk = await crypto.subtle.encrypt(
                { name: algorithm, iv },
                key,
                chunk
            );
            
            encryptedChunks.push({
                data: new Uint8Array(encryptedChunk),
                iv: iv,
                index: i
            });
            
            // Report progress
            progress = Math.floor(((i + 1) / totalChunks) * 100);
            self.postMessage({
                type: 'progress',
                progress,
                message: `Encrypting chunk ${i + 1}/${totalChunks}`
            });
            
            // Random micro-delay between chunks
            await this.addRandomDelay();
        }
        
        return {
            chunks: encryptedChunks,
            salt: salt,
            algorithm,
            metadata: {
                originalSize: buffer.byteLength,
                chunkCount: totalChunks,
                timestamp: Date.now()
            }
        };
    }

    async decryptChunked(data) {
        const { encryptedData, password } = data;
        const { chunks, salt, algorithm, metadata } = encryptedData;
        
        // Derive key
        const key = await this.deriveKey(password, salt, algorithm);
        const decryptedChunks = new Array(chunks.length);
        
        let progress = 0;
        const totalChunks = chunks.length;
        
        for (const chunk of chunks) {
            // Add execution noise
            this.addExecutionNoise();
            
            try {
                const decryptedData = await crypto.subtle.decrypt(
                    { name: algorithm, iv: chunk.iv },
                    key,
                    chunk.data
                );
                
                decryptedChunks[chunk.index] = new Uint8Array(decryptedData);
                
                progress = Math.floor(((chunk.index + 1) / totalChunks) * 100);
                self.postMessage({
                    type: 'progress',
                    progress,
                    message: `Decrypting chunk ${chunk.index + 1}/${totalChunks}`
                });
                
                await this.addRandomDelay();
                
            } catch (error) {
                throw new Error(`Decryption failed at chunk ${chunk.index}: ${error.message}`);
            }
        }
        
        // Combine chunks back into single buffer
        const totalLength = decryptedChunks.reduce((sum, chunk) => sum + chunk.length, 0);
        const result = new Uint8Array(totalLength);
        let offset = 0;
        
        for (const chunk of decryptedChunks) {
            result.set(chunk, offset);
            offset += chunk.length;
        }
        
        return result.buffer;
    }

    // ========== KEY DERIVATION ==========

    async deriveKey(password, salt, algorithm) {
        const encoder = new TextEncoder();
        const passwordBuffer = encoder.encode(password);
        
        // Import password as key material
        const keyMaterial = await crypto.subtle.importKey(
            'raw',
            passwordBuffer,
            'PBKDF2',
            false,
            ['deriveKey']
        );
        
        // Derive actual key
        const key = await crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: salt,
                iterations: 100000, // High iteration count for security
                hash: 'SHA-256'
            },
            keyMaterial,
            { name: algorithm, length: 256 },
            false,
            ['encrypt', 'decrypt']
        );
        
        return key;
    }

    // ========== COMPRESSION ==========

    async compressData(data) {
        const { buffer } = data;
        
        // Simple LZ-style compression
        return this.simpleLZCompress(new Uint8Array(buffer));
    }

    async decompressData(data) {
        const { compressedBuffer } = data;
        
        return this.simpleLZDecompress(new Uint8Array(compressedBuffer));
    }

    simpleLZCompress(data) {
        // Simplified compression algorithm
        const compressed = [];
        const dictionary = new Map();
        let dictSize = 256;
        
        // Initialize dictionary with single bytes
        for (let i = 0; i < 256; i++) {
            dictionary.set(String.fromCharCode(i), i);
        }
        
        let w = '';
        for (let i = 0; i < data.length; i++) {
            const c = String.fromCharCode(data[i]);
            const wc = w + c;
            
            if (dictionary.has(wc)) {
                w = wc;
            } else {
                compressed.push(dictionary.get(w));
                dictionary.set(wc, dictSize++);
                w = c;
            }
        }
        
        if (w !== '') {
            compressed.push(dictionary.get(w));
        }
        
        return new Uint8Array(compressed).buffer;
    }

    simpleLZDecompress(compressedData) {
        // Simplified decompression
        const dictionary = [];
        let dictSize = 256;
        
        // Initialize dictionary
        for (let i = 0; i < 256; i++) {
            dictionary[i] = String.fromCharCode(i);
        }
        
        const result = [];
        let w = String.fromCharCode(compressedData[0]);
        result.push(w);
        
        for (let i = 1; i < compressedData.length; i++) {
            const k = compressedData[i];
            let entry;
            
            if (dictionary[k]) {
                entry = dictionary[k];
            } else if (k === dictSize) {
                entry = w + w.charAt(0);
            } else {
                throw new Error('Invalid compressed data');
            }
            
            result.push(entry);
            dictionary[dictSize++] = w + entry.charAt(0);
            w = entry;
        }
        
        const resultString = result.join('');
        const resultBuffer = new Uint8Array(resultString.length);
        
        for (let i = 0; i < resultString.length; i++) {
            resultBuffer[i] = resultString.charCodeAt(i);
        }
        
        return resultBuffer.buffer;
    }

    // ========== STEGANOGRAPHY PROCESSING ==========

    async processSteganography(data) {
        const { operation, carrierBuffer, secretData, method } = data;
        
        if (operation === 'embed') {
            return await this.embedData(carrierBuffer, secretData, method);
        } else if (operation === 'extract') {
            return await this.extractData(carrierBuffer, method);
        }
        
        throw new Error('Invalid steganography operation');
    }

    async embedData(carrierBuffer, secretData, method) {
        const carrier = new Uint8Array(carrierBuffer);
        const secret = new Uint8Array(secretData);
        
        // Add noise patterns to mask the embedding
        this.addEmbeddingNoise(carrier);
        
        switch (method) {
            case 'lsb':
                return this.embedLSB(carrier, secret);
            case 'distributed':
                return this.embedDistributed(carrier, secret);
            default:
                throw new Error(`Unsupported embedding method: ${method}`);
        }
    }

    addEmbeddingNoise(carrier) {
        // Add subtle noise to mask embedding patterns
        const noiseLevel = 0.001; // Very low noise
        const noiseCount = Math.floor(carrier.length * noiseLevel);
        
        for (let i = 0; i < noiseCount; i++) {
            const pos = Math.floor(Math.random() * carrier.length);
            const bit = Math.random() > 0.5 ? 1 : 0;
            carrier[pos] = (carrier[pos] & 0xFE) | bit;
        }
    }

    embedLSB(carrier, secret) {
        // Embed secret in LSBs with noise
        const secretBits = this.bytesToBits(secret);
        const headerBits = this.createHeader(secret.length);
        const allBits = [...headerBits, ...secretBits];
        
        if (allBits.length > carrier.length) {
            throw new Error('Secret data too large for carrier');
        }
        
        const result = new Uint8Array(carrier);
        
        // Scramble bit positions to avoid sequential patterns
        const positions = this.generateScrambledPositions(allBits.length, carrier.length);
        
        for (let i = 0; i < allBits.length; i++) {
            const pos = positions[i];
            result[pos] = (result[pos] & 0xFE) | allBits[i];
        }
        
        return result.buffer;
    }

    generateScrambledPositions(needed, available) {
        // Generate pseudo-random positions for bit embedding
        const positions = [];
        const used = new Set();
        let seed = 0x12345; // Fixed seed for reproducibility
        
        while (positions.length < needed) {
            seed = (seed * 1103515245 + 12345) & 0x7fffffff;
            const pos = seed % available;
            
            if (!used.has(pos)) {
                used.add(pos);
                positions.push(pos);
            }
        }
        
        return positions;
    }

    // ========== UTILITY METHODS ==========

    splitIntoChunks(buffer) {
        const chunks = [];
        const uint8Array = new Uint8Array(buffer);
        
        for (let i = 0; i < uint8Array.length; i += this.chunkSize) {
            const chunk = uint8Array.slice(i, i + this.chunkSize);
            chunks.push(chunk.buffer);
        }
        
        return chunks;
    }

    bytesToBits(bytes) {
        const bits = [];
        for (const byte of bytes) {
            for (let i = 7; i >= 0; i--) {
                bits.push((byte >> i) & 1);
            }
        }
        return bits;
    }

    createHeader(length) {
        // Create 32-bit length header
        const header = [];
        for (let i = 31; i >= 0; i--) {
            header.push((length >> i) & 1);
        }
        return header;
    }

    async hashData(data) {
        const { buffer, algorithm = 'SHA-256' } = data;
        const hashBuffer = await crypto.subtle.digest(algorithm, buffer);
        return new Uint8Array(hashBuffer);
    }
}

// Initialize worker if running in worker context
if (typeof importScripts !== 'undefined') {
    new CryptoWorker();
}

// Export for main thread usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CryptoWorker;
}