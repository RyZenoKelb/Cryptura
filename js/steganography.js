// ============= STEGANOGRAPHY.JS - Moteur de Stéganographie Avancé =============
// Dissimulation intelligente avec protection anti-analyse

class SteganographyEngine {
    constructor() {
        this.supportedFormats = new Map();
        this.chunkSize = 32 * 1024; // 32KB chunks for streaming
        this.maxFileSize = 500 * 1024 * 1024; // 500MB
        this.antiAnalysisEnabled = true;
        
        this.initSupportedFormats();
        this.setupAntiAnalysisProtection();
    }

    // ========== SUPPORTED FORMATS ==========

    initSupportedFormats() {
        // Images
        this.supportedFormats.set('image/jpeg', {
            type: 'image',
            methods: ['lsb', 'metadata', 'distributed'],
            capacity: 0.125, // 1 bit per 8 bits
            processor: this.processImage.bind(this)
        });
        
        this.supportedFormats.set('image/png', {
            type: 'image',
            methods: ['lsb', 'metadata', 'alpha-channel'],
            capacity: 0.25,
            processor: this.processImage.bind(this)
        });
        
        this.supportedFormats.set('image/bmp', {
            type: 'image',
            methods: ['lsb', 'distributed'],
            capacity: 0.375,
            processor: this.processImage.bind(this)
        });
        
        this.supportedFormats.set('image/gif', {
            type: 'image',
            methods: ['metadata', 'palette'],
            capacity: 0.1,
            processor: this.processImage.bind(this)
        });
        
        // Audio
        this.supportedFormats.set('audio/wav', {
            type: 'audio',
            methods: ['lsb', 'echo-hiding', 'phase-coding'],
            capacity: 0.5,
            processor: this.processAudio.bind(this)
        });
        
        this.supportedFormats.set('audio/mp3', {
            type: 'audio',
            methods: ['metadata', 'unused-bits'],
            capacity: 0.05,
            processor: this.processAudio.bind(this)
        });
        
        this.supportedFormats.set('audio/flac', {
            type: 'audio',
            methods: ['lsb', 'metadata'],
            capacity: 0.25,
            processor: this.processAudio.bind(this)
        });
        
        // Video
        this.supportedFormats.set('video/mp4', {
            type: 'video',
            methods: ['metadata', 'frame-lsb'],
            capacity: 0.01,
            processor: this.processVideo.bind(this)
        });
        
        this.supportedFormats.set('video/avi', {
            type: 'video',
            methods: ['metadata', 'frame-lsb'],
            capacity: 0.02,
            processor: this.processVideo.bind(this)
        });
        
        // Documents
        this.supportedFormats.set('application/pdf', {
            type: 'document',
            methods: ['metadata', 'whitespace', 'font-variation'],
            capacity: 0.1,
            processor: this.processDocument.bind(this)
        });
        
        this.supportedFormats.set('application/msword', {
            type: 'document',
            methods: ['metadata', 'formatting'],
            capacity: 0.05,
            processor: this.processDocument.bind(this)
        });
        
        this.supportedFormats.set('application/vnd.openxmlformats-officedocument.wordprocessingml.document', {
            type: 'document',
            methods: ['metadata', 'xml-injection'],
            capacity: 0.1,
            processor: this.processDocument.bind(this)
        });
        
        // Text
        this.supportedFormats.set('text/plain', {
            type: 'text',
            methods: ['whitespace', 'unicode'],
            capacity: 0.2,
            processor: this.processText.bind(this)
        });
        
        // Archives
        this.supportedFormats.set('application/zip', {
            type: 'archive',
            methods: ['comment', 'extra-field', 'dummy-files'],
            capacity: 0.1,
            processor: this.processArchive.bind(this)
        });
        
        this.supportedFormats.set('application/x-rar-compressed', {
            type: 'archive',
            methods: ['comment', 'recovery-data'],
            capacity: 0.05,
            processor: this.processArchive.bind(this)
        });
    }

    // ========== ANTI-ANALYSIS PROTECTION ==========

    setupAntiAnalysisProtection() {
        this.obfuscationPatterns = [
            'randomizePositions',
            'addDecoyData',
            'mimicNaturalPatterns',
            'disperseAcrossChannels'
        ];
        
        this.timingVariation = {
            minDelay: 10,
            maxDelay: 100,
            jitterRange: 20
        };
    }

    async addAntiAnalysisDelay() {
        if (!this.antiAnalysisEnabled) return;
        
        const baseDelay = Math.random() * 
            (this.timingVariation.maxDelay - this.timingVariation.minDelay) + 
            this.timingVariation.minDelay;
        
        const jitter = (Math.random() - 0.5) * this.timingVariation.jitterRange;
        const totalDelay = Math.max(0, baseDelay + jitter);
        
        await new Promise(resolve => setTimeout(resolve, totalDelay));
    }

    obfuscateEmbeddingPattern(data, method) {
        if (!this.antiAnalysisEnabled) return data;
        
        // Apply multiple obfuscation techniques
        let obfuscated = new Uint8Array(data);
        
        // 1. Randomize embedding positions
        obfuscated = this.randomizeEmbeddingPositions(obfuscated);
        
        // 2. Add decoy patterns
        obfuscated = this.addDecoyPatterns(obfuscated);
        
        // 3. Mimic natural file patterns
        obfuscated = this.mimicNaturalPatterns(obfuscated, method);
        
        return obfuscated;
    }

    randomizeEmbeddingPositions(data) {
        // Create pseudo-random but reproducible position sequence
        const positions = [];
        let seed = 0x2F6E2B1; // Fixed seed for reproducibility
        
        for (let i = 0; i < data.length; i++) {
            seed = (seed * 16807) % 2147483647;
            positions.push({ original: i, scrambled: seed % data.length });
        }
        
        // Sort by scrambled position to create new order
        positions.sort((a, b) => a.scrambled - b.scrambled);
        
        const result = new Uint8Array(data.length);
        positions.forEach((pos, index) => {
            result[index] = data[pos.original];
        });
        
        return result;
    }

    addDecoyPatterns(data) {
        const result = new Uint8Array(data);
        const decoyCount = Math.floor(data.length * 0.001); // 0.1% decoy data
        
        for (let i = 0; i < decoyCount; i++) {
            const pos = Math.floor(Math.random() * result.length);
            const pattern = Math.floor(Math.random() * 256);
            result[pos] = (result[pos] & 0xFE) | (pattern & 1);
        }
        
        return result;
    }

    mimicNaturalPatterns(data, method) {
        const result = new Uint8Array(data);
        
        // Add patterns that mimic natural file compression artifacts
        const noiseLevel = 0.005; // Very subtle noise
        const noiseCount = Math.floor(data.length * noiseLevel);
        
        for (let i = 0; i < noiseCount; i++) {
            const pos = Math.floor(Math.random() * result.length);
            // Mimic JPEG quantization noise or similar
            const noise = Math.sin(pos * 0.1) > 0 ? 1 : 0;
            result[pos] = (result[pos] & 0xFE) | noise;
        }
        
        return result;
    }

    // ========== MAIN EMBEDDING FUNCTIONS ==========

    async embedMessage(carrierFile, secretMessage, options = {}) {
        try {
            await this.addAntiAnalysisDelay();
            
            const {
                method = 'auto',
                encryption = 'none',
                password = '',
                compression = false,
                stealth = false
            } = options;
            
            // Validate inputs
            if (!carrierFile) throw new Error(window.t('message.file.required'));
            if (!secretMessage.trim()) throw new Error(window.t('message.secret.required'));
            
            // Check file size
            if (carrierFile.size > this.maxFileSize) {
                throw new Error(window.t('message.file.too.large', { 
                    max: this.formatFileSize(this.maxFileSize) 
                }));
            }
            
            // Determine format and method
            const format = this.detectFormat(carrierFile);
            const finalMethod = method === 'auto' ? this.selectBestMethod(format) : method;
            
            // Process secret message
            let processedSecret = new TextEncoder().encode(secretMessage);
            
            if (compression) {
                processedSecret = await this.compressData(processedSecret);
            }
            
            if (encryption !== 'none' && password) {
                processedSecret = await this.encryptData(processedSecret, password, encryption);
            }
            
            // Read carrier file in chunks for large files
            const carrierBuffer = await this.readFileInChunks(carrierFile);
            
            // Embed data
            const result = await this.performEmbedding(
                carrierBuffer, 
                processedSecret, 
                finalMethod, 
                format,
                { stealth }
            );
            
            await this.addAntiAnalysisDelay();
            
            return {
                data: result,
                method: finalMethod,
                encrypted: encryption !== 'none',
                compressed: compression,
                originalSize: carrierFile.size,
                finalSize: result.byteLength
            };
            
        } catch (error) {
            throw new Error(`Embedding failed: ${error.message}`);
        }
    }

    async extractMessage(encodedFile, options = {}) {
        try {
            await this.addAntiAnalysisDelay();
            
            const {
                method = 'auto',
                password = '',
                bruteForce = false
            } = options;
            
            if (!encodedFile) throw new Error(window.t('message.file.required'));
            
            // Read file
            const fileBuffer = await this.readFileInChunks(encodedFile);
            
            // Detect format
            const format = this.detectFormat(encodedFile);
            
            // Try extraction methods
            const methods = method === 'auto' ? 
                this.getSupportedMethods(format) : [method];
            
            let lastError = null;
            
            for (const testMethod of methods) {
                try {
                    const extracted = await this.performExtraction(
                        fileBuffer, 
                        testMethod, 
                        format
                    );
                    
                    if (extracted && extracted.length > 0) {
                        let result = extracted;
                        
                        // Try decryption if password provided
                        if (password) {
                            try {
                                result = await this.decryptData(result, password);
                            } catch (decryptError) {
                                // If decryption fails, maybe it wasn't encrypted
                                console.warn('Decryption failed, using raw data');
                            }
                        }
                        
                        // Try decompression
                        try {
                            const decompressed = await this.decompressData(result);
                            if (decompressed.length > 0) {
                                result = decompressed;
                            }
                        } catch (decompError) {
                            // Not compressed, continue with current result
                        }
                        
                        await this.addAntiAnalysisDelay();
                        
                        return {
                            data: result,
                            method: testMethod,
                            confidence: this.calculateConfidence(result, testMethod)
                        };
                    }
                } catch (error) {
                    lastError = error;
                    continue;
                }
            }
            
            throw new Error(lastError?.message || window.t('message.extraction.failed'));
            
        } catch (error) {
            throw new Error(`Extraction failed: ${error.message}`);
        }
    }

    // ========== FILE PROCESSING ==========

    async readFileInChunks(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                resolve(e.target.result);
            };
            
            reader.onerror = () => {
                reject(new Error('Failed to read file'));
            };
            
            reader.readAsArrayBuffer(file);
        });
    }

    // ========== FORMAT-SPECIFIC PROCESSORS ==========

    async processImage(buffer, operation, data, method, options = {}) {
        const imageData = new Uint8Array(buffer);
        
        switch (method) {
            case 'lsb':
                return operation === 'embed' ? 
                    this.embedImageLSB(imageData, data, options) :
                    this.extractImageLSB(imageData, options);
                    
            case 'metadata':
                return this.processImageMetadata(imageData, operation, data);
                
            case 'distributed':
                return operation === 'embed' ?
                    this.embedImageDistributed(imageData, data, options) :
                    this.extractImageDistributed(imageData, options);
                    
            default:
                throw new Error(`Unsupported image method: ${method}`);
        }
    }

    embedImageLSB(imageData, secretData, options) {
        const { stealth = false } = options;
        const result = new Uint8Array(imageData);
        
        // Create header with length information
        const header = this.createDataHeader(secretData.length);
        const allData = new Uint8Array(header.length + secretData.length);
        allData.set(header, 0);
        allData.set(secretData, header.length);
        
        // Convert to bits
        const bits = this.bytesToBits(allData);
        
        if (bits.length > imageData.length) {
            throw new Error('Secret data too large for carrier image');
        }
        
        // Generate embedding positions
        const positions = stealth ? 
            this.generateStealthPositions(bits.length, imageData.length) :
            this.generateSequentialPositions(bits.length);
        
        // Embed bits
        for (let i = 0; i < bits.length; i++) {
            const pos = positions[i];
            result[pos] = (result[pos] & 0xFE) | bits[i];
        }
        
        // Apply anti-analysis obfuscation
        if (stealth) {
            return this.obfuscateEmbeddingPattern(result, 'lsb');
        }
        
        return result.buffer;
    }

    extractImageLSB(imageData, options) {
        const { stealth = false } = options;
        
        // Read header first (32 bits for length)
        const headerPositions = stealth ?
            this.generateStealthPositions(32, imageData.length) :
            this.generateSequentialPositions(32);
        
        const headerBits = [];
        for (const pos of headerPositions) {
            headerBits.push(imageData[pos] & 1);
        }
        
        const dataLength = this.bitsToNumber(headerBits);
        
        if (dataLength <= 0 || dataLength > imageData.length / 8) {
            return null; // Invalid data length
        }
        
        // Extract data bits
        const dataBitCount = dataLength * 8;
        const dataPositions = stealth ?
            this.generateStealthPositions(dataBitCount, imageData.length, 32) :
            this.generateSequentialPositions(dataBitCount, 32);
        
        const dataBits = [];
        for (const pos of dataPositions) {
            dataBits.push(imageData[pos] & 1);
        }
        
        return this.bitsToBytes(dataBits);
    }

    // ========== UTILITIES ==========

    detectFormat(file) {
        const mimeType = file.type;
        return this.supportedFormats.get(mimeType) || null;
    }

    selectBestMethod(format) {
        if (!format) return 'lsb';
        return format.methods[0];
    }

    getSupportedMethods(format) {
        if (!format) return ['lsb'];
        return format.methods;
    }

    createDataHeader(length) {
        const header = new ArrayBuffer(4);
        new DataView(header).setUint32(0, length, true);
        return new Uint8Array(header);
    }

    bytesToBits(bytes) {
        const bits = [];
        for (const byte of bytes) {
            for (let i = 0; i < 8; i++) {
                bits.push((byte >> i) & 1);
            }
        }
        return bits;
    }

    bitsToBytes(bits) {
        const bytes = [];
        for (let i = 0; i < bits.length; i += 8) {
            let byte = 0;
            for (let j = 0; j < 8; j++) {
                byte |= (bits[i + j] << j);
            }
            bytes.push(byte);
        }
        return new Uint8Array(bytes);
    }

    bitsToNumber(bits) {
        let number = 0;
        for (let i = 0; i < bits.length; i++) {
            number |= (bits[i] << i);
        }
        return number;
    }

    generateSequentialPositions(length, offset = 0) {
        const positions = [];
        for (let i = 0; i < length; i++) {
            positions.push(i + offset);
        }
        return positions;
    }

    generateStealthPositions(length, max, offset = 0) {
        const positions = [];
        const step = Math.floor(max / length);
        for (let i = 0; i < length; i++) {
            positions.push((i * step) + offset);
        }
        return positions;
    }

    async compressData(data) {
        // Implement compression logic here
        return data;
    }

    async encryptData(data, password, algorithm) {
        const marker = new TextEncoder().encode('OBSCURA:');
        const sizeBuffer = new ArrayBuffer(4);
        new DataView(sizeBuffer).setUint32(0, secret.length, false);
        const sizeBytes = new Uint8Array(sizeBuffer);
        
        // Construction des données à insérer
        const metadataBlock = new Uint8Array(marker.length + sizeBytes.length + secret.length);
        metadataBlock.set(marker, 0);
        metadataBlock.set(sizeBytes, marker.length);
        metadataBlock.set(secret, marker.length + sizeBytes.length);
        
        // Recherche de l'emplacement d'insertion (après les marqueurs JPEG standards)
        let insertIndex = 2; // Après FF D8
        
        // Recherche du premier marqueur APP ou DQT
        while (insertIndex < carrier.length - 1) {
            if (carrier[insertIndex] === 0xFF && 
                (carrier[insertIndex + 1] >= 0xE0 && carrier[insertIndex + 1] <= 0xEF)) {
                // Trouvé un marqueur APP, insérer après
                const segmentLength = (carrier[insertIndex + 2] << 8) | carrier[insertIndex + 3];
                insertIndex += 2 + segmentLength;
                break;
            }
            insertIndex++;
        }
        
        // Construction du fichier résultat
        const result = new Uint8Array(carrier.length + metadataBlock.length + 4);
        let resultIndex = 0;
        
        // Copie jusqu'au point d'insertion
        result.set(carrier.slice(0, insertIndex), resultIndex);
        resultIndex += insertIndex;
        
        // Insertion du marqueur APP1 personnalisé
        result[resultIndex++] = 0xFF;
        result[resultIndex++] = 0xE1; // APP1
        result[resultIndex++] = (metadataBlock.length + 2) >> 8;
        result[resultIndex++] = (metadataBlock.length + 2) & 0xFF;
        
        // Insertion des données
        result.set(metadataBlock, resultIndex);
        resultIndex += metadataBlock.length;
        
        // Copie du reste du fichier
        result.set(carrier.slice(insertIndex), resultIndex);
        
        return {
            data: result,
            method: 'metadata-jpeg',
            insertedAt: insertIndex,
            dataSize: secret.length
        };
    }

    async encodePNGMetadata(carrier, secret, options = {}) {
        // Recherche de l'emplacement d'insertion (avant IEND)
        let insertIndex = carrier.length - 12; // Position typique d'IEND
        
        // Recherche réelle d'IEND
        for (let i = carrier.length - 12; i >= 0; i--) {
            if (carrier[i] === 0x49 && carrier[i+1] === 0x45 && 
                carrier[i+2] === 0x4E && carrier[i+3] === 0x44) {
                insertIndex = i - 4; // Avant la taille d'IEND
                break;
            }
        }
        
        // Préparation du chunk tEXt personnalisé
        const keyword = new TextEncoder().encode('OBSCURA');
        const separator = new Uint8Array([0x00]); // Null separator
        const chunkData = new Uint8Array(keyword.length + separator.length + secret.length);
        chunkData.set(keyword, 0);
        chunkData.set(separator, keyword.length);
        chunkData.set(secret, keyword.length + separator.length);
        
        // Calcul du CRC
        const crc = this.calculateCRC32(new Uint8Array([0x74, 0x45, 0x58, 0x74, ...chunkData]));
        
        // Construction du chunk complet
        const chunkSize = chunkData.length;
        const chunk = new Uint8Array(12 + chunkSize);
        let chunkIndex = 0;
        
        // Taille du chunk (4 octets, big-endian)
        chunk[chunkIndex++] = (chunkSize >> 24) & 0xFF;
        chunk[chunkIndex++] = (chunkSize >> 16) & 0xFF;
        chunk[chunkIndex++] = (chunkSize >> 8) & 0xFF;
        chunk[chunkIndex++] = chunkSize & 0xFF;
        
        // Type de chunk "tEXt"
        chunk[chunkIndex++] = 0x74;
        chunk[chunkIndex++] = 0x45;
        chunk[chunkIndex++] = 0x58;
        chunk[chunkIndex++] = 0x74;
        
        // Données
        chunk.set(chunkData, chunkIndex);
        chunkIndex += chunkData.length;
        
        // CRC (4 octets, big-endian)
        chunk[chunkIndex++] = (crc >> 24) & 0xFF;
        chunk[chunkIndex++] = (crc >> 16) & 0xFF;
        chunk[chunkIndex++] = (crc >> 8) & 0xFF;
        chunk[chunkIndex++] = crc & 0xFF;
        
        // Construction du fichier résultat
        const result = new Uint8Array(carrier.length + chunk.length);
        result.set(carrier.slice(0, insertIndex), 0);
        result.set(chunk, insertIndex);
        result.set(carrier.slice(insertIndex), insertIndex + chunk.length);
        
        return {
            data: result,
            method: 'metadata-png',
            insertedAt: insertIndex,
            dataSize: secret.length
        };
    }

    calculateCRC32(data) {
        const crcTable = this.makeCRCTable();
        let crc = 0 ^ (-1);
        
        for (let i = 0; i < data.length; i++) {
            crc = (crc >>> 8) ^ crcTable[(crc ^ data[i]) & 0xFF];
        }
        
        return (crc ^ (-1)) >>> 0;
    }

    makeCRCTable() {
        if (this.crcTable) return this.crcTable;
        
        this.crcTable = [];
        for (let n = 0; n < 256; n++) {
            let c = n;
            for (let k = 0; k < 8; k++) {
                c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
            }
            this.crcTable[n] = c;
        }
        return this.crcTable;
    }

    arraysEqual(a, b) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }

    // ========== MÉTHODES UTILITAIRES ==========

    async fileToArrayBuffer(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(new Error('Erreur de lecture du fichier'));
            reader.readAsArrayBuffer(file);
        });
    }
}

// Export pour modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SteganographyEngine;
}

// Export global
if (typeof window !== 'undefined') {
    window.SteganographyEngine = SteganographyEngine;
}