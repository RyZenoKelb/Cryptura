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
        // Implement encryption logic here
        return data;
    }

    async decryptData(data, password) {
        // Implement decryption logic here
        return data;
    }

    async decompressData(data) {
        // Implement decompression logic here
        return data;
    }

    calculateConfidence(data, method) {
        // Implement confidence calculation logic here
        return 100;
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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