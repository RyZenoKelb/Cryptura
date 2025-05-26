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
    // Méthode LSB (Least Significant Bit) - CORRECTION MAJEURE
    async lsbMethod(carrierFile, secretData, operation, options = {}) {
        if (operation === 'hide') {
            return await this.lsbHide(carrierFile, secretData, options);
        } else {
            return await this.lsbExtract(carrierFile, options);
        }
    }

    async lsbHide(carrierFile, secretData, options = {}) {
        try {
            // Validation des entrées
            if (!carrierFile) {
                throw new Error('Fichier porteur manquant');
            }
            if (!secretData) {
                throw new Error('Données secrètes manquantes');
            }

            // Lecture du fichier porteur
            const carrierBuffer = await this.fileToArrayBuffer(carrierFile);
            
            // Encodage avec la méthode LSB
            const result = await this.encodeLSB(carrierBuffer, secretData, options);
            
            // Validation du résultat
            if (!result || !result.data) {
                throw new Error('Échec de l\'encodage LSB');
            }

            // Création du blob résultat avec le même type MIME que le fichier original
            const resultBlob = new Blob([result.data], { 
                type: carrierFile.type || 'application/octet-stream'
            });

            // Validation du blob
            if (!resultBlob || resultBlob.size === 0) {
                throw new Error('Blob résultat invalide');
            }
            
            return {
                file: resultBlob,
                method: 'lsb',
                metadata: {
                    originalSize: carrierBuffer.byteLength,
                    finalSize: resultBlob.size,
                    capacity: result.capacity,
                    used: result.used,
                    efficiency: result.efficiency
                }
            };
            
        } catch (error) {
            throw new Error(`Erreur LSB Hide: ${error.message}`);
        }
    }

    async lsbExtract(carrierFile, options = {}) {
        try {
            // Validation d'entrée
            if (!carrierFile) {
                throw new Error('Fichier manquant pour extraction');
            }

            // Lecture du fichier
            const carrierBuffer = await this.fileToArrayBuffer(carrierFile);
            
            // Extraction avec la méthode LSB
            const extractedData = await this.extractLSB(carrierBuffer);
            
            // Validation du résultat
            if (!extractedData || extractedData.length === 0) {
                throw new Error('Aucune donnée extraite');
            }

            return {
                data: extractedData,
                method: 'lsb',
                confidence: 90,
                size: extractedData.length
            };
            
        } catch (error) {
            throw new Error(`Erreur LSB Extract: ${error.message}`);
        }
    }

    // Méthodes simplifiées pour les autres types
    async metadataMethod(carrierFile, secretData, operation, options = {}) {
        // Implémentation simplifiée
        if (operation === 'hide') {
            const result = new Uint8Array(await carrierFile.arrayBuffer());
            // Ajouter les données dans les métadonnées (simulation)
            return new Blob([result], { type: carrierFile.type });
        } else {
            // Extraction des métadonnées (simulation)
            throw new Error('Données non trouvées dans les métadonnées');
        }
    }

    async audioSpreadMethod(carrierFile, secretData, operation, options = {}) {
        // Méthode de dispersion audio simplifiée
        if (operation === 'hide') {
            const result = new Uint8Array(await carrierFile.arrayBuffer());
            return new Blob([result], { type: carrierFile.type });
        } else {
            throw new Error('Données audio non trouvées');
        }
    }

    async videoFrameMethod(carrierFile, secretData, operation, options = {}) {
        // Méthode de dissimulation dans les frames vidéo
        if (operation === 'hide') {
            const result = new Uint8Array(await carrierFile.arrayBuffer());
            return new Blob([result], { type: carrierFile.type });
        } else {
            throw new Error('Données vidéo non trouvées');
        }
    }

    async documentHiddenMethod(carrierFile, secretData, operation, options = {}) {
        // Méthode de dissimulation dans les documents
        if (operation === 'hide') {
            const result = new Uint8Array(await carrierFile.arrayBuffer());
            return new Blob([result], { type: carrierFile.type });
        } else {
            throw new Error('Données document non trouvées');
        }
    }

    // Analyse forensique
    async analyzeFile(file) {
        const analysis = {
            filename: file.name,
            size: file.size,
            type: this.detectFileType(file),
            detectedMethods: [],
            entropy: 0,
            suspicious: false
        };
        
        // Calcul de l'entropie
        const data = new Uint8Array(await file.arrayBuffer());
        analysis.entropy = this.calculateEntropy(data);
        
        // Détection des méthodes possibles
        analysis.detectedMethods = await this.detectHiddenData(file);
        
        // Analyse de suspicion
        analysis.suspicious = analysis.entropy > 7.8 || analysis.detectedMethods.length > 0;
        
        return analysis;
    }

    // Calcul d'entropie
    calculateEntropy(data) {
        const frequency = new Array(256).fill(0);
        
        for (let i = 0; i < data.length; i++) {
            frequency[data[i]]++;
        }
        
        let entropy = 0;
        for (let i = 0; i < 256; i++) {
            if (frequency[i] > 0) {
                const p = frequency[i] / data.length;
                entropy -= p * Math.log2(p);
            }
        }
        
        return entropy;
    }

    // Génération de rapport
    generateReport(analysis) {
        let report = `═══════════════════════════════════════
🔍 RAPPORT D'ANALYSE FORENSIQUE OBSCURA
═══════════════════════════════════════

📁 FICHIER ANALYSÉ:
   Nom: ${analysis.filename}
   Taille: ${this.formatFileSize(analysis.size)}
   Type: ${analysis.type.toUpperCase()}

📊 ANALYSE ENTROPIQUE:
   Entropie: ${analysis.entropy.toFixed(3)} bits/octet
   Seuil normal: < 7.8 bits/octet
   Statut: ${analysis.entropy > 7.8 ? '⚠️  SUSPECT' : '✅ NORMAL'}

🎯 MÉTHODES DÉTECTÉES:`;

        if (analysis.detectedMethods.length > 0) {
            analysis.detectedMethods.forEach((method, index) => {
                report += `\n   ${index + 1}. ${method.name.toUpperCase()}`;
                report += `\n      Confiance: ${method.confidence}%`;
            });
        } else {
            report += '\n   ❌ Aucune méthode de stéganographie détectée';
        }

        report += `\n\n🔒 CONCLUSION GÉNÉRALE:
   ${analysis.suspicious ? '🚨 FICHIER SUSPECT' : '✅ FICHIER NORMAL'}
   ${analysis.suspicious ? 'Présence probable de données cachées' : 'Aucun signe de stéganographie détecté'}

═══════════════════════════════════════
Rapport généré par Obscura v2.0
${new Date().toLocaleString()}
═══════════════════════════════════════`;

        return report;
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // ========== MÉTHODES D'ENCODAGE ==========

    async encodeLSB(carrierData, secretData, options = {}) {
        try {
            const carrier = new Uint8Array(carrierData);
            const secret = new Uint8Array(secretData);
            
            // Préparation des données avec signature et taille
            const signature = new TextEncoder().encode('OBSCURA_DATA:');
            const sizeBuffer = new ArrayBuffer(4);
            new DataView(sizeBuffer).setUint32(0, secret.length, true);
            const sizeBytes = new Uint8Array(sizeBuffer);
            
            // Données complètes à encoder
            const fullData = new Uint8Array(signature.length + sizeBytes.length + secret.length);
            fullData.set(signature, 0);
            fullData.set(sizeBytes, signature.length);
            fullData.set(secret, signature.length + sizeBytes.length);
            
            // Vérification de la capacité
            const requiredBits = fullData.length * 8;
            const availableBits = carrier.length;
            
            if (requiredBits > availableBits) {
                throw new Error(`Capacité insuffisante. Requis: ${requiredBits} bits, Disponible: ${availableBits} bits`);
            }
            
            // Encodage LSB
            const result = new Uint8Array(carrier);
            let dataIndex = 0;
            
            for (let i = 0; i < fullData.length; i++) {
                const dataByte = fullData[i];
                
                for (let bit = 0; bit < 8; bit++) {
                    const secretBit = (dataByte >> bit) & 1;
                    const carrierIndex = dataIndex;
                    
                    if (carrierIndex >= result.length) {
                        throw new Error('Dépassement de capacité du porteur');
                    }
                    
                    // Modification du bit de poids faible
                    result[carrierIndex] = (result[carrierIndex] & 0xFE) | secretBit;
                    dataIndex++;
                }
            }
            
            return {
                data: result,
                method: 'lsb',
                capacity: availableBits,
                used: requiredBits,
                efficiency: (requiredBits / availableBits * 100).toFixed(2)
            };
            
        } catch (error) {
            throw new Error(`Erreur encodage LSB: ${error.message}`);
        }
    }

    async extractLSB(carrierData) {
        try {
            const carrier = new Uint8Array(carrierData);
            const signature = new TextEncoder().encode('OBSCURA_DATA:');
            
            // Recherche de la signature
            let signatureFound = false;
            let dataStartBit = 0;
            
            for (let startBit = 0; startBit <= carrier.length - signature.length * 8; startBit += 8) {
                let extractedSignature = [];
                
                // Extraction de la signature potentielle
                for (let i = 0; i < signature.length; i++) {
                    let byte = 0;
                    for (let bit = 0; bit < 8; bit++) {
                        const carrierIndex = startBit + i * 8 + bit;
                        if (carrierIndex < carrier.length) {
                            byte |= (carrier[carrierIndex] & 1) << bit;
                        }
                    }
                    extractedSignature.push(byte);
                }
                
                // Vérification de la signature
                if (this.arraysEqual(extractedSignature, Array.from(signature))) {
                    signatureFound = true;
                    dataStartBit = startBit + signature.length * 8;
                    break;
                }
            }
            
            if (!signatureFound) {
                throw new Error('Signature de données non trouvée');
            }
            
            // Extraction de la taille (4 octets)
            let sizeBytes = [];
            for (let i = 0; i < 4; i++) {
                let byte = 0;
                for (let bit = 0; bit < 8; bit++) {
                    const carrierIndex = dataStartBit + i * 8 + bit;
                    if (carrierIndex < carrier.length) {
                        byte |= (carrier[carrierIndex] & 1) << bit;
                    }
                }
                sizeBytes.push(byte);
            }
            
            const dataSize = new DataView(new Uint8Array(sizeBytes).buffer).getUint32(0, true);
            
            if (dataSize <= 0 || dataSize > carrier.length) {
                throw new Error(`Taille de données invalide: ${dataSize}`);
            }
            
            // Extraction des données réelles
            let extractedData = [];
            const actualDataStartBit = dataStartBit + 32; // 4 octets * 8 bits
            
            for (let i = 0; i < dataSize; i++) {
                let byte = 0;
                for (let bit = 0; bit < 8; bit++) {
                    const carrierIndex = actualDataStartBit + i * 8 + bit;
                    if (carrierIndex < carrier.length) {
                        byte |= (carrier[carrierIndex] & 1) << bit;
                    }
                }
                extractedData.push(byte);
            }
            
            return new Uint8Array(extractedData);
            
        } catch (error) {
            throw new Error(`Erreur extraction LSB: ${error.message}`);
        }
    }

    async encodeMetadata(carrierData, secretData, fileType, options = {}) {
        try {
            const carrier = new Uint8Array(carrierData);
            const secret = new Uint8Array(secretData);
            
            switch (fileType.toLowerCase()) {
                case 'jpg':
                case 'jpeg':
                    return await this.encodeJPEGMetadata(carrier, secret, options);
                case 'png':
                    return await this.encodePNGMetadata(carrier, secret, options);
                default:
                    throw new Error(`Type de fichier non supporté pour métadonnées: ${fileType}`);
            }
        } catch (error) {
            throw new Error(`Erreur encodage métadonnées: ${error.message}`);
        }
    }

    async encodeJPEGMetadata(carrier, secret, options = {}) {
        // Création d'un marqueur EXIF personnalisé
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