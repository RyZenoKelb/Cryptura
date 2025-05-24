// ============= STEGANOGRAPHY.JS - Techniques de Stéganographie =============
// Moteur de stéganographie avec support multi-formats

class SteganographyEngine {
    constructor() {
        this.supportedTypes = {
            image: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'],
            audio: ['mp3', 'wav', 'ogg', 'flac'],
            video: ['mp4', 'avi', 'mov', 'webm'],
            document: ['pdf', 'docx', 'txt']
        };
        
        this.methods = {
            lsb: 'LSB (Least Significant Bit)',
            metadata: 'Injection Métadonnées',
            'audio-spread': 'Dispersion Audio Spectrale',
            'video-frame': 'Modification Frames Vidéo',
            'document-hidden': 'Texte Invisible Documents'
        };
        
        this.signature = 'OBSCURA_STEGO_2024';
    }

    // ========== INTERFACE PRINCIPALE ==========

    async hideData(carrierFile, secretData, method, options = {}) {
        const fileType = this.detectFileType(carrierFile);
        
        console.log(`🎭 Dissimulation via ${this.methods[method]} dans ${carrierFile.name}`);
        console.log(`📦 Données à cacher: ${secretData.length} octets`);
        
        // Ajout d'en-tête avec informations de récupération
        const dataWithHeader = await this.addStegoHeader(secretData, method, options);
        
        switch (method) {
            case 'lsb':
                return await this.lsbHide(carrierFile, dataWithHeader, fileType);
            case 'metadata':
                return await this.metadataHide(carrierFile, dataWithHeader, fileType);
            case 'audio-spread':
                return await this.audioSpreadHide(carrierFile, dataWithHeader);
            case 'video-frame':
                return await this.videoFrameHide(carrierFile, dataWithHeader);
            case 'document-hidden':
                return await this.documentHide(carrierFile, dataWithHeader);
            default:
                throw new Error(`Méthode de stéganographie non supportée: ${method}`);
        }
    }

    async extractData(carrierFile, method, options = {}) {
        const fileType = this.detectFileType(carrierFile);
        
        console.log(`🔍 Extraction via ${method} depuis ${carrierFile.name}`);
        
        let extractedData;
        
        switch (method) {
            case 'lsb':
                extractedData = await this.lsbExtract(carrierFile, fileType);
                break;
            case 'metadata':
                extractedData = await this.metadataExtract(carrierFile, fileType);
                break;
            case 'audio-spread':
                extractedData = await this.audioSpreadExtract(carrierFile);
                break;
            case 'video-frame':
                extractedData = await this.videoFrameExtract(carrierFile);
                break;
            case 'document-hidden':
                extractedData = await this.documentExtract(carrierFile);
                break;
            case 'auto':
                return await this.autoDetectAndExtract(carrierFile);
            case 'brute':
                return await this.bruteForceExtract(carrierFile);
            default:
                throw new Error(`Méthode d'extraction non supportée: ${method}`);
        }
        
        // Suppression de l'en-tête et validation
        const finalData = await this.removeStegoHeader(extractedData);
        
        console.log(`✅ Extraction réussie: ${finalData.length} octets récupérés`);
        return finalData;
    }

    // ========== DÉTECTION ET CLASSIFICATION ==========

    detectFileType(file) {
        const extension = file.name.split('.').pop().toLowerCase();
        
        for (const [type, extensions] of Object.entries(this.supportedTypes)) {
            if (extensions.includes(extension)) {
                return type;
            }
        }
        
        // Détection par MIME type si extension inconnue
        if (file.type) {
            if (file.type.startsWith('image/')) return 'image';
            if (file.type.startsWith('audio/')) return 'audio';
            if (file.type.startsWith('video/')) return 'video';
            if (file.type.includes('document') || file.type.includes('text')) return 'document';
        }
        
        return 'unknown';
    }

    getCapacity(carrierFile, method) {
        const fileType = this.detectFileType(carrierFile);
        const fileSize = carrierFile.size;
        
        switch (method) {
            case 'lsb':
                // Pour les images: environ 1/8 de la taille (1 bit par pixel RGB)
                return fileType === 'image' ? Math.floor(fileSize / 8) : 0;
            case 'metadata':
                // Métadonnées: limités mais sûrs
                return Math.min(fileSize * 0.1, 10240); // 10KB max
            case 'audio-spread':
                // Audio: capacité variable selon la qualité
                return fileType === 'audio' ? Math.floor(fileSize * 0.01) : 0;
            case 'video-frame':
                // Vidéo: très grande capacité
                return fileType === 'video' ? Math.floor(fileSize * 0.05) : 0;
            case 'document-hidden':
                // Documents: limité par le contenu texte
                return fileType === 'document' ? Math.floor(fileSize * 0.02) : 0;
            default:
                return 0;
        }
    }

    // ========== EN-TÊTES STÉGANOGRAPHIQUES ==========

    async addStegoHeader(data, method, options) {
        const header = {
            signature: this.signature,
            method: method,
            originalSize: data.length,
            timestamp: Date.now(),
            checksum: await this.calculateChecksum(data),
            options: options
        };
        
        const headerJson = JSON.stringify(header);
        const headerBytes = new TextEncoder().encode(headerJson);
        const headerLength = new Uint32Array([headerBytes.length]);
        
        const result = new Uint8Array(4 + headerBytes.length + data.length);
        result.set(new Uint8Array(headerLength.buffer), 0);
        result.set(headerBytes, 4);
        result.set(data, 4 + headerBytes.length);
        
        return result;
    }

    async removeStegoHeader(data) {
        if (data.length < 4) {
            throw new Error('Données insuffisantes pour contenir un en-tête');
        }
        
        try {
            // Lecture de la taille de l'en-tête
            const headerLength = new Uint32Array(data.slice(0, 4).buffer)[0];
            
            if (headerLength > data.length - 4 || headerLength > 1024) {
                throw new Error('En-tête corrompu');
            }
            
            // Extraction et validation de l'en-tête
            const headerBytes = data.slice(4, 4 + headerLength);
            const headerJson = new TextDecoder().decode(headerBytes);
            const header = JSON.parse(headerJson);
            
            if (header.signature !== this.signature) {
                throw new Error('Signature stéganographique invalide');
            }
            
            // Extraction des données principales
            const actualData = data.slice(4 + headerLength);
            
            // Validation de la taille et du checksum
            if (header.originalSize && actualData.length !== header.originalSize) {
                console.warn(`⚠️ Taille inattendue: ${actualData.length} vs ${header.originalSize}`);
            }
            
            if (header.checksum) {
                const calculatedChecksum = await this.calculateChecksum(actualData);
                if (calculatedChecksum !== header.checksum) {
                    console.warn('⚠️ Checksum invalide - données possiblement corrompues');
                }
            }
            
            console.log(`📋 Méthode détectée: ${header.method}`);
            return actualData;
            
        } catch (error) {
            console.warn('❌ Impossible de traiter l\'en-tête, retour des données brutes');
            return data;
        }
    }

    async calculateChecksum(data) {
        const hash = await crypto.subtle.digest('SHA-256', data);
        const hashArray = new Uint8Array(hash);
        return Array.from(hashArray.slice(0, 8)).map(b => b.toString(16).padStart(2, '0')).join('');
    }

    // ========== LSB - LEAST SIGNIFICANT BIT ==========

    async lsbHide(carrierFile, secretData, fileType) {
        if (fileType !== 'image') {
            throw new Error('LSB nécessite un fichier image');
        }

        return new Promise((resolve, reject) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            
            img.onload = () => {
                try {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const pixels = imageData.data;
                    
                    // Conversion des données en bits
                    const secretBits = this.dataToBits(secretData);
                    const maxCapacity = Math.floor(pixels.length / 4) * 3; // RGB seulement
                    
                    if (secretBits.length > maxCapacity) {
                        reject(new Error(`Image trop petite: ${secretBits.length} bits requis, ${maxCapacity} disponibles`));
                        return;
                    }
                    
                    console.log(`🎨 Injection LSB: ${secretBits.length} bits dans ${maxCapacity} pixels disponibles`);
                    
                    // Injection dans les LSB des canaux RGB
                    let bitIndex = 0;
                    for (let i = 0; i < pixels.length && bitIndex < secretBits.length; i += 4) {
                        // Canal Rouge
                        if (bitIndex < secretBits.length) {
                            pixels[i] = (pixels[i] & 0xFE) | secretBits[bitIndex++];
                        }
                        // Canal Vert
                        if (bitIndex < secretBits.length) {
                            pixels[i + 1] = (pixels[i + 1] & 0xFE) | secretBits[bitIndex++];
                        }
                        // Canal Bleu
                        if (bitIndex < secretBits.length) {
                            pixels[i + 2] = (pixels[i + 2] & 0xFE) | secretBits[bitIndex++];
                        }
                        // On évite le canal Alpha (transparence)
                    }
                    
                    ctx.putImageData(imageData, 0, 0);
                    
                    // Conversion en blob avec qualité élevée
                    canvas.toBlob((blob) => {
                        if (blob) {
                            // Copie du nom avec indication
                            const newName = carrierFile.name.replace(/\.(jpg|jpeg|png|gif)$/i, '_hidden.png');
                            Object.defineProperty(blob, 'name', { value: newName });
                            resolve(blob);
                        } else {
                            reject(new Error('Échec de la génération de l\'image'));
                        }
                    }, 'image/png', 0.95);
                    
                } catch (error) {
                    reject(error);
                }
            };
            
            img.onerror = () => reject(new Error('Impossible de charger l\'image'));
            img.src = URL.createObjectURL(carrierFile);
        });
    }

    async lsbExtract(carrierFile, fileType) {
        if (fileType !== 'image') {
            throw new Error('LSB nécessite un fichier image');
        }

        return new Promise((resolve, reject) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            
            img.onload = () => {
                try {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const pixels = imageData.data;
                    
                    // Extraction des LSB
                    const bits = [];
                    for (let i = 0; i < pixels.length; i += 4) {
                        bits.push(pixels[i] & 1);       // Rouge
                        bits.push(pixels[i + 1] & 1);   // Vert
                        bits.push(pixels[i + 2] & 1);   // Bleu
                    }
                    
                    console.log(`🔍 LSB: ${bits.length} bits extraits`);
                    
                    // Conversion des bits en données
                    const extractedData = this.bitsToData(bits);
                    resolve(extractedData);
                    
                } catch (error) {
                    reject(error);
                }
            };
            
            img.onerror = () => reject(new Error('Impossible de charger l\'image'));
            img.src = URL.createObjectURL(carrierFile);
        });
    }

    // ========== INJECTION MÉTADONNÉES ==========

    async metadataHide(carrierFile, secretData, fileType) {
        console.log(`💾 Injection métadonnées dans ${fileType}`);
        
        const reader = new FileReader();
        
        return new Promise((resolve, reject) => {
            reader.onload = (e) => {
                try {
                    const arrayBuffer = e.target.result;
                    const originalData = new Uint8Array(arrayBuffer);
                    
                    // Création du marqueur et des données
                    const marker = new TextEncoder().encode('OBSCURA_META_START');
                    const endMarker = new TextEncoder().encode('OBSCURA_META_END');
                    const dataLength = new Uint32Array([secretData.length]);
                    const lengthBytes = new Uint8Array(dataLength.buffer);
                    
                    // Assemblage: [fichier original][marqueur][taille][données][marqueur fin]
                    const totalSize = originalData.length + marker.length + 4 + secretData.length + endMarker.length;
                    const result = new Uint8Array(totalSize);
                    
                    let offset = 0;
                    result.set(originalData, offset);
                    offset += originalData.length;
                    
                    result.set(marker, offset);
                    offset += marker.length;
                    
                    result.set(lengthBytes, offset);
                    offset += 4;
                    
                    result.set(secretData, offset);
                    offset += secretData.length;
                    
                    result.set(endMarker, offset);
                    
                    console.log(`✅ Métadonnées ajoutées: ${secretData.length} octets`);
                    
                    const blob = new Blob([result], { type: carrierFile.type });
                    const newName = carrierFile.name.replace(/(\.[^.]+)$/, '_with_meta$1');
                    Object.defineProperty(blob, 'name', { value: newName });
                    
                    resolve(blob);
                    
                } catch (error) {
                    reject(error);
                }
            };
            
            reader.onerror = () => reject(new Error('Erreur de lecture du fichier'));
            reader.readAsArrayBuffer(carrierFile);
        });
    }

    async metadataExtract(carrierFile, fileType) {
        console.log(`🔍 Extraction métadonnées depuis ${fileType}`);
        
        const reader = new FileReader();
        
        return new Promise((resolve, reject) => {
            reader.onload = (e) => {
                try {
                    const arrayBuffer = e.target.result;
                    const data = new Uint8Array(arrayBuffer);
                    
                    const startMarker = new TextEncoder().encode('OBSCURA_META_START');
                    const endMarker = new TextEncoder().encode('OBSCURA_META_END');
                    
                    // Recherche du marqueur de début
                    let startIndex = -1;
                    for (let i = 0; i <= data.length - startMarker.length; i++) {
                        if (this.arrayEqual(data.slice(i, i + startMarker.length), startMarker)) {
                            startIndex = i + startMarker.length;
                            break;
                        }
                    }
                    
                    if (startIndex === -1) {
                        reject(new Error('Aucune métadonnée Obscura trouvée'));
                        return;
                    }
                    
                    // Lecture de la taille
                    if (startIndex + 4 > data.length) {
                        reject(new Error('Métadonnées corrompues'));
                        return;
                    }
                    
                    const sizeBytes = data.slice(startIndex, startIndex + 4);
                    const dataSize = new Uint32Array(sizeBytes.buffer)[0];
                    
                    if (dataSize > data.length || dataSize === 0) {
                        reject(new Error('Taille de métadonnées invalide'));
                        return;
                    }
                    
                    // Extraction des données
                    const dataStart = startIndex + 4;
                    const extractedData = data.slice(dataStart, dataStart + dataSize);
                    
                    // Vérification du marqueur de fin
                    const endStart = dataStart + dataSize;
                    if (endStart + endMarker.length <= data.length) {
                        const foundEndMarker = data.slice(endStart, endStart + endMarker.length);
                        if (!this.arrayEqual(foundEndMarker, endMarker)) {
                            console.warn('⚠️ Marqueur de fin manquant ou incorrect');
                        }
                    }
                    
                    console.log(`✅ Métadonnées extraites: ${extractedData.length} octets`);
                    resolve(extractedData);
                    
                } catch (error) {
                    reject(error);
                }
            };
            
            reader.onerror = () => reject(new Error('Erreur de lecture du fichier'));
            reader.readAsArrayBuffer(carrierFile);
        });
    }

    // ========== AUTO-DÉTECTION ==========

    async autoDetectAndExtract(carrierFile) {
        const fileType = this.detectFileType(carrierFile);
        const methods = this.getApplicableMethods(fileType);
        
        console.log(`🤖 Détection automatique sur ${carrierFile.name} (${fileType})`);
        console.log(`🔍 Méthodes à tester: ${methods.join(', ')}`);
        
        for (const method of methods) {
            try {
                console.log(`⏳ Test de ${method}...`);
                const result = await this.extractData(carrierFile, method);
                
                if (result && result.length > 0) {
                    console.log(`✅ Succès avec ${method}: ${result.length} octets`);
                    return { 
                        data: result, 
                        method: method,
                        confidence: this.calculateConfidence(result, method)
                    };
                }
            } catch (error) {
                console.log(`❌ ${method} échoué: ${error.message}`);
                continue;
            }
        }
        
        throw new Error('Aucune donnée cachée détectée avec les méthodes disponibles');
    }

    async bruteForceExtract(carrierFile) {
        const fileType = this.detectFileType(carrierFile);
        const allMethods = Object.keys(this.methods);
        const results = [];
        
        console.log(`🔨 Force brute sur ${carrierFile.name}`);
        
        for (const method of allMethods) {
            if (method === 'auto' || method === 'brute') continue;
            
            try {
                console.log(`🔄 Tentative ${method}...`);
                const result = await this.extractData(carrierFile, method);
                
                if (result && result.length > 0) {
                    const confidence = this.calculateConfidence(result, method);
                    results.push({
                        method: method,
                        data: result,
                        confidence: confidence,
                        entropy: this.calculateEntropy(result)
                    });
                }
            } catch (error) {
                // Continue silencieusement
            }
        }
        
        if (results.length === 0) {
            throw new Error('Aucune donnée trouvée par force brute');
        }
        
        // Tri par confiance
        results.sort((a, b) => b.confidence - a.confidence);
        
        console.log(`🎯 Force brute: ${results.length} résultats trouvés`);
        return results[0]; // Retourne le plus confiant
    }

    // ========== MÉTHODES AUDIO (PLACEHOLDER) ==========

    async audioSpreadHide(carrierFile, secretData) {
        console.log('🎵 Audio spread - En développement');
        // Simulation pour la démo
        return await this.metadataHide(carrierFile, secretData, 'audio');
    }

    async audioSpreadExtract(carrierFile) {
        console.log('🎵 Audio spread extraction - En développement');
        return await this.metadataExtract(carrierFile, 'audio');
    }

    // ========== MÉTHODES VIDÉO (PLACEHOLDER) ==========

    async videoFrameHide(carrierFile, secretData) {
        console.log('🎬 Video frame - En développement');
        return await this.metadataHide(carrierFile, secretData, 'video');
    }

    async videoFrameExtract(carrierFile) {
        console.log('🎬 Video frame extraction - En développement');
        return await this.metadataExtract(carrierFile, 'video');
    }

    // ========== MÉTHODES DOCUMENTS (PLACEHOLDER) ==========

    async documentHide(carrierFile, secretData) {
        console.log('📄 Document hide - En développement');
        return await this.metadataHide(carrierFile, secretData, 'document');
    }

    async documentExtract(carrierFile) {
        console.log('📄 Document extract - En développement');
        return await this.metadataExtract(carrierFile, 'document');
    }

    // ========== UTILITAIRES ==========

    getApplicableMethods(fileType) {
        const methodsByType = {
            image: ['lsb', 'metadata'],
            audio: ['metadata', 'audio-spread'],
            video: ['metadata', 'video-frame'],
            document: ['metadata', 'document-hidden'],
            unknown: ['metadata']
        };
        
        return methodsByType[fileType] || ['metadata'];
    }

    calculateConfidence(data, method) {
        let confidence = 50; // Base
        
        // Bonus pour des données qui semblent valides
        if (data.length > 10) confidence += 20;
        if (data.length < 1000000) confidence += 10; // Taille raisonnable
        
        // Bonus selon la méthode
        if (method === 'lsb') confidence += 15;
        if (method === 'metadata') confidence += 10;
        
        // Malus si entropie trop faible (données vides)
        const entropy = this.calculateEntropy(data);
        if (entropy < 1.0) confidence -= 30;
        if (entropy > 7.0) confidence += 15;
        
        return Math.max(0, Math.min(100, confidence));
    }

    calculateEntropy(data) {
        if (data.length === 0) return 0;
        
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

    dataToBits(data) {
        const bits = [];
        const uint8Array = new Uint8Array(data);
        
        for (const byte of uint8Array) {
            for (let i = 7; i >= 0; i--) {
                bits.push((byte >> i) & 1);
            }
        }
        
        return bits;
    }

    bitsToData(bits) {
        const bytes = [];
        
        for (let i = 0; i < bits.length; i += 8) {
            let byte = 0;
            for (let j = 0; j < 8 && i + j < bits.length; j++) {
                byte = (byte << 1) | bits[i + j];
            }
            bytes.push(byte);
        }
        
        return new Uint8Array(bytes);
    }

    arrayEqual(a, b) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }

    // ========== ANALYSE ET DIAGNOSTIC ==========

    async analyzeFile(file) {
        const analysis = {
            fileName: file.name,
            fileSize: file.size,
            fileType: this.detectFileType(file),
            mimeType: file.type,
            suspiciousPatterns: [],
            steganographyLikelihood: 'Faible',
            detectedMethods: [],
            entropy: 0,
            capacity: {}
        };

        try {
            // Lecture du fichier pour analyse
            const arrayBuffer = await this.fileToArrayBuffer(file);
            const uint8Array = new Uint8Array(arrayBuffer);

            // Recherche de signatures Obscura
            const signatures = [
                'OBSCURA_STEGO',
                'OBSCURA_META',
                'OBSCURA_ULTRA'
            ];
            
            for (const sig of signatures) {
                const sigBytes = new TextEncoder().encode(sig);
                for (let i = 0; i <= uint8Array.length - sigBytes.length; i++) {
                    if (this.arrayEqual(uint8Array.slice(i, i + sigBytes.length), sigBytes)) {
                        analysis.suspiciousPatterns.push(`Signature ${sig} détectée à l'offset ${i}`);
                        analysis.steganographyLikelihood = 'Très élevée';
                        break;
                    }
                }
            }

            // Analyse de l'entropie
            analysis.entropy = this.calculateEntropy(uint8Array);
            
            if (analysis.entropy > 7.5) {
                analysis.suspiciousPatterns.push('Entropie élevée (données chiffrées possibles)');
                if (analysis.steganographyLikelihood === 'Faible') {
                    analysis.steganographyLikelihood = 'Modérée';
                }
            }

            // Calcul des capacités par méthode
            const applicableMethods = this.getApplicableMethods(analysis.fileType);
            for (const method of applicableMethods) {
                analysis.capacity[method] = this.getCapacity(file, method);
            }

            // Détection des méthodes probables
            if (analysis.suspiciousPatterns.some(p => p.includes('META'))) {
                analysis.detectedMethods.push('metadata');
            }
            if (analysis.fileType === 'image' && analysis.entropy > 6.0) {
                analysis.detectedMethods.push('lsb');
            }

        } catch (error) {
            console.error('Erreur d\'analyse:', error);
            analysis.suspiciousPatterns.push(`Erreur d'analyse: ${error.message}`);
        }

        return analysis;
    }

    async fileToArrayBuffer(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });
    }

    // ========== RAPPORTS ET STATISTIQUES ==========

    generateReport(analysis, extraction = null) {
        let report = `RAPPORT D'ANALYSE STÉGANOGRAPHIQUE\n`;
        report += `══════════════════════════════════════\n\n`;
        report += `Fichier: ${analysis.fileName}\n`;
        report += `Taille: ${this.formatFileSize(analysis.fileSize)}\n`;
        report += `Type: ${analysis.fileType} (${analysis.mimeType})\n`;
        report += `Entropie: ${analysis.entropy.toFixed(3)}/8.0\n`;
        report += `Probabilité de stéganographie: ${analysis.steganographyLikelihood}\n\n`;
        
        if (analysis.suspiciousPatterns.length > 0) {
            report += `PATTERNS SUSPECTS DÉTECTÉS:\n`;
            report += `───────────────────────────\n`;
            analysis.suspiciousPatterns.forEach((pattern, index) => {
                report += `${index + 1}. ${pattern}\n`;
            });
            report += `\n`;
        }
        
        if (analysis.detectedMethods.length > 0) {
            report += `MÉTHODES PROBABLES:\n`;
            report += `──────────────────\n`;
            analysis.detectedMethods.forEach(method => {
                report += `• ${this.methods[method]}\n`;
            });
            report += `\n`;
        }
        
        report += `CAPACITÉS THÉORIQUES:\n`;
        report += `────────────────────\n`;
        for (const [method, capacity] of Object.entries(analysis.capacity)) {
            report += `• ${this.methods[method]}: ${this.formatFileSize(capacity)}\n`;
        }
        
        if (extraction) {
            report += `\nRÉSULTAT D'EXTRACTION:\n`;
            report += `─────────────────────\n`;
            report += `Méthode utilisée: ${this.methods[extraction.method]}\n`;
            report += `Données extraites: ${this.formatFileSize(extraction.data.length)}\n`;
            report += `Confiance: ${extraction.confidence}%\n`;
            if (extraction.entropy) {
                report += `Entropie des données: ${extraction.entropy.toFixed(3)}\n`;
            }
        }
        
        return report;
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SteganographyEngine;
}