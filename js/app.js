// ============= APP.JS - Logique principale de l'application =============
// Interface utilisateur et orchestration des fonctionnalités

class ObscuraApp {
    constructor() {
        this.ultraCrypte = new UltraCrypte();
        this.steganography = new SteganographyEngine();
        this.filesProcessed = 0;
        this.currentFiles = {
            carrier: null,
            secret: null,
            decode: null
        };
        
        // Initialize theme and i18n first
        this.initializeCore();
        
        console.log('🚀 Initialisation d\'Obscura v1.0');
        this.init();
    }

    // ========== CORE INITIALIZATION ==========

    initializeCore() {
        // Initialize theme manager
        this.themeManager = new ThemeManager();
        
        // Initialize internationalization
        this.i18n = new InternationalizationManager();
        
        // Make i18n globally available
        window.i18n = this.i18n;
        
        // Setup theme and language event listeners
        this.setupThemeAndLanguageHandlers();
        
        console.log('🎨 Systèmes core initialisés');
    }

    setupThemeAndLanguageHandlers() {
        // Language toggle functionality
        const languageToggle = document.getElementById('language-toggle');
        const languageDropdown = document.getElementById('language-dropdown');
        
        if (languageToggle && languageDropdown) {
            languageToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                languageDropdown.classList.toggle('active');
            });
            
            // Language options
            document.querySelectorAll('.language-option').forEach(option => {
                option.addEventListener('click', (e) => {
                    const lang = e.currentTarget.dataset.lang;
                    this.i18n.setLanguage(lang);
                    languageDropdown.classList.remove('active');
                });
            });
            
            // Close dropdown on outside click
            document.addEventListener('click', () => {
                languageDropdown.classList.remove('active');
            });
        }
        
        // Theme toggle functionality
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.themeManager.toggleTheme();
            });
        }
    }

    // ========== INITIALISATION ==========

    init() {
        this.setupEventListeners();
        this.setupDragAndDrop();
        this.setupKeyboardShortcuts();
        this.updateStats();
        
        // Affichage du panneau initial
        this.showPanel('encode');
        
        // Message de bienvenue
        this.showMessage('Bienvenue dans Obscura - Stéganographie Ultra-Sécurisée', 'success');
        
        console.log('✅ Application initialisée avec succès');
    }

    setupEventListeners() {
        console.log('🔧 Configuration des événements...');
        
        // Navigation entre panneaux
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = e.currentTarget.dataset.tab;
                this.showPanel(tabName);
                console.log(`📱 Basculement vers ${tabName}`);
            });
        });

        // Boutons d'upload de fichiers
        document.getElementById('carrier-upload').addEventListener('click', () => {
            document.getElementById('carrier-file').click();
        });

        document.getElementById('secret-upload').addEventListener('click', () => {
            if (!document.getElementById('secret-text').value) {
                document.getElementById('secret-file').click();
            }
        });

        document.getElementById('decode-upload').addEventListener('click', () => {
            document.getElementById('decode-file').click();
        });

        // Boutons d'action principaux
        document.getElementById('encode-btn').addEventListener('click', () => {
            this.handleEncode();
        });

        document.getElementById('decode-btn').addEventListener('click', () => {
            this.handleDecode();
        });

        document.getElementById('analyze-btn').addEventListener('click', () => {
            this.handleAnalyze();
        });

        document.getElementById('reset-encode').addEventListener('click', () => {
            this.resetEncode();
        });

        // Boutons de téléchargement (ajoutés dynamiquement)
        document.addEventListener('click', (e) => {
            if (e.target.id === 'download-btn') {
                // Géré dans showEncodeResult
            } else if (e.target.id === 'save-extracted') {
                // Géré dans showDecodeResult
            }
        });

        // Toggle visibilité des mots de passe
        document.querySelectorAll('.toggle-password').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.togglePasswordVisibility(e);
            });
        });

        // Vérification force mot de passe UltraCrypte
        const ultraKeyInput = document.getElementById('ultra-master-key');
        if (ultraKeyInput) {
            ultraKeyInput.addEventListener('input', (e) => {
                this.checkPasswordStrength(e.target.value);
            });
        }

        // Gestion des changements de fichiers
        document.getElementById('carrier-file').addEventListener('change', (e) => {
            this.handleFileSelect(e.target, 'carrier');
        });

        document.getElementById('secret-file').addEventListener('change', (e) => {
            this.handleFileSelect(e.target, 'secret');
        });

        document.getElementById('decode-file').addEventListener('change', (e) => {
            this.handleFileSelect(e.target, 'decode');
        });

        // Surveillance des changements de méthode de stéganographie
        document.getElementById('stego-method').addEventListener('change', (e) => {
            this.updateMethodInfo(e.target.value);
        });

        // Surveillance du niveau de chiffrement
        document.getElementById('crypto-level').addEventListener('change', (e) => {
            this.updateCryptoInfo(e.target.value);
        });

        // Surveillance des options avancées
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateOptionsInfo();
            });
        });
    }

    setupDragAndDrop() {
        console.log('🎯 Configuration du drag & drop...');
        
        const dropZones = document.querySelectorAll('.upload-zone');
        
        dropZones.forEach(zone => {
            // Prévention du comportement par défaut
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                zone.addEventListener(eventName, this.preventDefaults, false);
            });

            // Highlight visuel lors du drag
            ['dragenter', 'dragover'].forEach(eventName => {
                zone.addEventListener(eventName, () => {
                    zone.classList.add('dragover');
                }, false);
            });

            ['dragleave', 'drop'].forEach(eventName => {
                zone.addEventListener(eventName, () => {
                    zone.classList.remove('dragover');
                }, false);
            });

            // Gestion du drop
            zone.addEventListener('drop', (e) => {
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    const zoneId = zone.id;
                    let type = '';
                    
                    if (zoneId === 'carrier-upload') type = 'carrier';
                    else if (zoneId === 'secret-upload') type = 'secret';
                    else if (zoneId === 'decode-upload') type = 'decode';
                    
                    if (type) {
                        this.handleFileDrop(files[0], type);
                    }
                }
            });
        });
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+E : Encodage
            if (e.ctrlKey && e.key === 'e') {
                e.preventDefault();
                this.showPanel('encode');
            }
            // Ctrl+D : Décodage  
            else if (e.ctrlKey && e.key === 'd') {
                e.preventDefault();
                this.showPanel('decode');
            }
            // Ctrl+U : UltraCrypte
            else if (e.ctrlKey && e.key === 'u') {
                e.preventDefault();
                this.showPanel('ultracrypte');
            }
            // Ctrl+H : Aide
            else if (e.ctrlKey && e.key === 'h') {
                e.preventDefault();
                this.showPanel('help');
            }
            // Escape : Reset/Annulation
            else if (e.key === 'Escape') {
                this.cancelOperations();
            }
        });
    }

    // ========== GESTION DES FICHIERS ==========

    preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    handleFileSelect(input, type) {
        if (input.files.length > 0) {
            this.handleFileDrop(input.files[0], type);
        }
    }

    handleFileDrop(file, type) {
        const maxSize = 100 * 1024 * 1024; // 100MB
        
        console.log(`📁 Fichier reçu: ${file.name} (${this.formatFileSize(file.size)}) -> ${type}`);
        
        // Validation de la taille
        if (file.size > maxSize) {
            this.showMessage(`Fichier trop volumineux: ${this.formatFileSize(file.size)} (max 100MB)`, 'error');
            return;
        }

        // Validation du type selon l'usage
        if (!this.validateFileType(file, type)) {
            return;
        }

        // Stockage et mise à jour de l'interface
        this.currentFiles[type] = file;
        this.updateUploadZone(type + '-upload', file);
        
        // Actions spécifiques selon le type
        if (type === 'secret') {
            // Effacer le texte secret si un fichier est sélectionné
            document.getElementById('secret-text').value = '';
        }
        
        // Mise à jour des informations contextuelles
        this.updateFileInfo(type, file);
    }

    validateFileType(file, usage) {
        const fileType = this.steganography.detectFileType(file);
        const extension = file.name.split('.').pop().toLowerCase();
        
        // Types supportés selon l'usage
        const supportedTypes = {
            carrier: ['image', 'audio', 'video', 'document'],
            secret: ['any'], // Tout type de fichier peut être caché
            decode: ['any']  // Tout fichier peut potentiellement contenir des données
        };
        
        if (usage === 'carrier' && fileType === 'unknown') {
            this.showMessage(`Type de fichier non supporté pour porteur: .${extension}`, 'warning');
            this.showMessage('Types supportés: Images (jpg, png, gif), Audio (mp3, wav), Vidéo (mp4, avi), Documents (pdf, txt)', 'info');
            return false;
        }
        
        return true;
    }

    updateUploadZone(zoneId, file) {
        const zone = document.getElementById(zoneId);
        const icon = zone.querySelector('i');
        const title = zone.querySelector('h3');
        const description = zone.querySelector('p');
        const small = zone.querySelector('small');
        
        // Mise à jour visuelle
        icon.className = 'fas fa-check-circle';
        icon.style.color = 'var(--success-color)';
        title.textContent = file.name;
        description.textContent = `${this.formatFileSize(file.size)}`;
        
        if (small) {
            const fileType = this.steganography.detectFileType(file);
            small.textContent = `Type: ${fileType} - ${file.type || 'Type MIME inconnu'}`;
        }
        
        // Stockage des métadonnées
        zone.dataset.file = JSON.stringify({
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified
        });
        
        // Animation de succès
        zone.classList.add('fade-in');
    }

    updateFileInfo(type, file) {
        const fileType = this.steganography.detectFileType(file);
        
        if (type === 'carrier') {
            // Calcul des capacités pour chaque méthode
            const methods = ['lsb', 'metadata', 'audio-spread', 'video-frame', 'document-hidden'];
            const capacities = {};
            
            methods.forEach(method => {
                const capacity = this.steganography.getCapacity(file, method);
                if (capacity > 0) {
                    capacities[method] = this.formatFileSize(capacity);
                }
            });
            
            if (Object.keys(capacities).length > 0) {
                let infoText = `💾 Capacités estimées: `;
                const capList = Object.entries(capacities).map(([method, cap]) => 
                    `${method.toUpperCase()}: ${cap}`
                );
                infoText += capList.join(', ');
                
                this.showMessage(infoText, 'info');
            }
        }
    }

    // ========== NAVIGATION ET INTERFACE ==========

    showPanel(panelName) {
        // Mise à jour des onglets
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        const activeTab = document.querySelector(`[data-tab="${panelName}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }

        // Mise à jour des panneaux
        document.querySelectorAll('.panel').forEach(panel => {
            panel.classList.remove('active');
        });
        
        const activePanel = document.getElementById(`${panelName}-panel`);
        if (activePanel) {
            activePanel.classList.add('active');
        }
        
        // Actions spécifiques selon le panneau
        this.onPanelChange(panelName);
    }

    onPanelChange(panelName) {
        // Effacement des messages précédents
        this.clearMessages();
        
        switch (panelName) {
            case 'encode':
                this.updateMethodInfo(document.getElementById('stego-method').value);
                break;
            case 'decode':
                // Préparation interface décodage
                break;
            case 'ultracrypte':
                // Vérification mot de passe s'il y en a un
                const ultraKey = document.getElementById('ultra-master-key').value;
                if (ultraKey) {
                    this.checkPasswordStrength(ultraKey);
                }
                break;
            case 'help':
                // Statistiques d'utilisation
                this.updateHelpStats();
                break;
        }
    }

    // ========== ENCODAGE ==========

    async handleEncode() {
        console.log('🔐 Démarrage de l\'encodage...');
        
        // Récupération des paramètres
        const carrierFile = this.currentFiles.carrier;
        const secretText = document.getElementById('secret-text').value.trim();
        const secretFile = this.currentFiles.secret;
        const stegoMethod = document.getElementById('stego-method').value;
        const cryptoLevel = document.getElementById('crypto-level').value;
        const password = document.getElementById('encode-password').value;
        
        // Validation des entrées
        const validation = this.validateEncodeInputs(carrierFile, secretText, secretFile, cryptoLevel, password);
        if (!validation.valid) {
            this.showMessage(validation.message, 'error');
            return;
        }

        try {
            this.showProgress('encode-progress', 'Préparation de l\'encodage...');
            
            // Préparation des données secrètes
            let secretData;
            if (secretFile) {
                console.log(`📄 Lecture du fichier secret: ${secretFile.name}`);
                secretData = await this.fileToArrayBuffer(secretFile);
            } else {
                console.log(`✏️ Utilisation du texte secret: ${secretText.length} caractères`);
                secretData = new TextEncoder().encode(secretText);
            }
            
            console.log(`📊 Données à encoder: ${secretData.length} octets`);
            
            // Chiffrement si nécessaire
            if (cryptoLevel !== 'none') {
                this.updateProgress('encode-progress', 'Chiffrement des données...');
                
                const options = {
                    complexity: this.mapCryptoComplexity(cryptoLevel),
                    compress: document.getElementById('compress-data').checked,
                    stealth: document.getElementById('add-noise').checked,
                    deniable: document.getElementById('multi-layer').checked
                };
                
                console.log(`🔒 Chiffrement ${cryptoLevel} avec options:`, options);
                
                if (cryptoLevel === 'ultra') {
                    secretData = await this.ultraCrypte.encrypt(secretData, password, options);
                } else {
                    secretData = await this.basicEncrypt(secretData, password);
                }
                
                console.log(`🔐 Données chiffrées: ${secretData.length} octets`);
            }
            
            // Stéganographie
            this.updateProgress('encode-progress', `Dissimulation via ${stegoMethod}...`);
            
            const resultFile = await this.steganography.hideData(carrierFile, secretData, stegoMethod, {
                quality: 'high',
                method: stegoMethod
            });
            
            // Finalisation
            this.hideProgress('encode-progress');
            this.showEncodeResult(resultFile, stegoMethod, cryptoLevel);
            this.filesProcessed++;
            this.updateStats();
            
            console.log('✅ Encodage terminé avec succès');
            
        } catch (error) {
            this.hideProgress('encode-progress');
            console.error('❌ Erreur d\'encodage:', error);
            this.showMessage(`Erreur d'encodage: ${error.message}`, 'error');
        }
    }

    validateEncodeInputs(carrierFile, secretText, secretFile, cryptoLevel, password) {
        if (!carrierFile) {
            return { valid: false, message: 'Veuillez sélectionner un fichier porteur' };
        }
        
        if (!secretText && !secretFile) {
            return { valid: false, message: 'Veuillez entrer un message ou sélectionner un fichier secret' };
        }
        
        if (cryptoLevel !== 'none' && !password) {
            return { valid: false, message: 'Un mot de passe est requis pour le chiffrement' };
        }
        
        if (cryptoLevel === 'ultra' && password.length < 8) {
            return { valid: false, message: 'UltraCrypte nécessite un mot de passe d\'au moins 8 caractères' };
        }
        
        return { valid: true };
    }

    mapCryptoComplexity(cryptoLevel) {
        const mapping = {
            'aes': 'standard',
            'ultra': 'enhanced'
        };
        return mapping[cryptoLevel] || 'standard';
    }

    // ========== DÉCODAGE ==========

    async handleDecode() {
        console.log('🔓 Démarrage du décodage...');
        
        const decodeFile = this.currentFiles.decode;
        const password = document.getElementById('decode-password').value;
        const detectionMode = document.getElementById('detection-mode').value;
        
        if (!decodeFile) {
            this.showMessage('Veuillez sélectionner un fichier à décoder', 'error');
            return;
        }

        try {
            this.showProgress('decode-progress', 'Analyse du fichier...');
            
            // Extraction des données cachées
            let result;
            if (detectionMode === 'auto') {
                this.updateProgress('decode-progress', 'Détection automatique...');
                result = await this.steganography.autoDetectAndExtract(decodeFile);
            } else if (detectionMode === 'brute') {
                this.updateProgress('decode-progress', 'Force brute en cours...');
                result = await this.steganography.bruteForceExtract(decodeFile);
            } else {
                this.updateProgress('decode-progress', `Extraction via ${detectionMode}...`);
                const extractedData = await this.steganography.extractData(decodeFile, detectionMode);
                result = { data: extractedData, method: detectionMode, confidence: 75 };
            }
            
            let extractedData = result.data;
            let detectedMethod = result.method;
            let confidence = result.confidence || 50;
            
            console.log(`📤 Données extraites: ${extractedData.length} octets via ${detectedMethod}`);
            
            // Tentative de déchiffrement si mot de passe fourni
            let finalData = extractedData;
            let cryptoType = 'Aucun';
            
            if (password && password.length > 0) {
                this.updateProgress('decode-progress', 'Tentative de déchiffrement...');
                
                const decryptResults = await this.attemptDecryption(extractedData, password);
                if (decryptResults.success) {
                    finalData = decryptResults.data;
                    cryptoType = decryptResults.type;
                    console.log(`🔓 Déchiffrement réussi: ${cryptoType}`);
                }
            }
            
            this.hideProgress('decode-progress');
            this.showDecodeResult(finalData, detectedMethod, cryptoType, confidence);
            
            console.log('✅ Décodage terminé avec succès');
            
        } catch (error) {
            this.hideProgress('decode-progress');
    async attemptDecryption(data, password) {this.showProgress('decode-progress', 'Analyse forensique en cours...');
        const attempts = [
            { method: 'ultra', type: 'UltraCrypte' },fichier
            { method: 'basic', type: 'AES-256' }analyzeFile(decodeFile);
        ];
        entative d'extraction pour chaque méthode détectée
        for (const attempt of attempts) {
            try {detectedMethods.length > 0) {
                let decryptedData;
                
                if (attempt.method === 'ultra') {detectedMethods) {
                    // Test avec différentes complexités UltraCrypte
                    const complexities = ['standard', 'enhanced', 'paranoid'];eganography.extractData(decodeFile, method);
                    for (const complexity of complexities) {
                        try {ractions.push({
                            decryptedData = await this.ultraCrypte.decrypt(data, password, { complexity });       method: method,
                            return { success: true, data: decryptedData, type: `${attempt.type} (${complexity})` };ize: result.length,
                        } catch (e) {graphy.calculateEntropy(result)
                            continue;       });
                        }       }
                    }       } catch (e) {
                } else {            // Méthode échouée, continuer
                    decryptedData = await this.basicDecrypt(data, password);
                    return { success: true, data: decryptedData, type: attempt.type };
                }}
                
            } catch (error) {this.hideProgress('decode-progress');
                continue; // Essayer la méthode suivanteysisResult(analysis, extractions);
            }
        }
        
        return { success: false }; catch (error) {
    }       this.hideProgress('decode-progress');
            console.error('❌ Erreur d\'analyse:', error);
    // ========== ANALYSE ==========ror.message}`, 'error');
        }
    async handleAnalyze() {
        console.log('🔍 Démarrage de l\'analyse...');
        
        const decodeFile = this.currentFiles.decode;
        
        if (!decodeFile) {
            this.showMessage('Veuillez sélectionner un fichier à analyser', 'error');const filename = document.getElementById('result-filename');
            return;
        }const methodSpan = document.getElementById('result-method');
lementById('download-btn');
        try {
            this.showProgress('decode-progress', 'Analyse forensique en cours...');
            
            // Analyse complète du fichier
            const analysis = await this.steganography.analyzeFile(decodeFile);tFileSize(resultFile.size);
            e(method)} + ${cryptoLevel === 'none' ? 'Non chiffré' : cryptoLevel.toUpperCase()}`;
            // Tentative d'extraction pour chaque méthode détectée
            const extractions = []; Configuration du téléchargement
            if (analysis.detectedMethods.length > 0) {downloadBtn.onclick = () => {
                this.updateProgress('decode-progress', 'Test des méthodes détectées...');inalName);
                argé avec succès!', 'success');
                for (const method of analysis.detectedMethods) {};
                    try {
                        const result = await this.steganography.extractData(decodeFile, method);isplay = 'block';
                        if (result && result.length > 0) {
                            extractions.push({
                                method: method,   // Scroll vers le résultat
                                size: result.length,        setTimeout(() => {
                                entropy: this.steganography.calculateEntropy(result): 'center' });
                            });
                        }
                    } catch (e) {
                        // Méthode échouée, continuer
                    }
                };
            }const detectedType = document.getElementById('detected-type');
            tById('extracted-size');
            this.hideProgress('decode-progress');-crypto');
            this.showAnalysisResult(analysis, extractions);const saveBtn = document.getElementById('save-extracted');
            
            console.log('✅ Analyse terminée');
            
        } catch (error) {
            this.hideProgress('decode-progress');preview.innerHTML = displayContent.html;
            console.error('❌ Erreur d\'analyse:', error);s.getMethodName(method)} (Confiance: ${confidence}%)`;
            this.showMessage(`Erreur d'analyse: ${error.message}`, 'error'); = this.formatFileSize(data.length);
        }
    }

    // ========== AFFICHAGE DES RÉSULTATS ==========
  const filename = this.generateExtractedFilename(data);
    showEncodeResult(resultFile, method, cryptoLevel) {    const blob = new Blob([data], { type: 'application/octet-stream' });
        const resultArea = document.getElementById('encode-result');e);
        const filename = document.getElementById('result-filename');tes sauvegardées!', 'success');
        const size = document.getElementById('result-size');};
        const methodSpan = document.getElementById('result-method');
        const downloadBtn = document.getElementById('download-btn');isplay = 'block';
        
        const finalName = this.generateOutputFilename(resultFile, method);
           // Scroll vers le résultat
        filename.textContent = finalName;        setTimeout(() => {
        size.textContent = this.formatFileSize(resultFile.size);mooth', block: 'center' });
        methodSpan.textContent = `${this.getMethodName(method)} + ${cryptoLevel === 'none' ? 'Non chiffré' : cryptoLevel.toUpperCase()}`;
        
        // Configuration du téléchargement
        downloadBtn.onclick = () => {ns = []) {
            this.downloadFile(resultFile, finalName);;
            this.showMessage('Fichier téléchargé avec succès!', 'success');const preview = document.getElementById('content-preview');
        };
        
        resultArea.style.display = 'block';const report = this.steganography.generateReport(analysis);
        resultArea.classList.add('fade-in');
        
        // Scroll vers le résultat
        setTimeout(() => {
            resultArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    }

    showDecodeResult(data, method, cryptoType, confidence = 50) {ss="extraction-item">`;
        const resultArea = document.getElementById('decode-result'); analysisHtml += `${index + 1}. ${this.getMethodName(ext.method)}: `;
        const preview = document.getElementById('content-preview');is.formatFileSize(ext.size)} `;
        const detectedType = document.getElementById('detected-type');       analysisHtml += `(entropie: ${ext.entropy.toFixed(3)})`;
        const extractedSize = document.getElementById('extracted-size');        analysisHtml += `</div>`;
        const detectedCrypto = document.getElementById('detected-crypto');
        const saveBtn = document.getElementById('save-extracted');    analysisHtml += `</div>`;
        
        // Préparation du contenu pour affichage
        const displayContent = this.prepareContentPreview(data);
        
        preview.innerHTML = displayContent.html;preview.innerHTML = analysisHtml;
        detectedType.textContent = `${this.getMethodName(method)} (Confiance: ${confidence}%)`;
        extractedSize.textContent = this.formatFileSize(data.length);our l'analyse
        detectedCrypto.textContent = cryptoType;   document.getElementById('save-extracted').style.display = 'none';
                
        // Configuration de la sauvegarde= 'block';
        saveBtn.onclick = () => {add('fade-in');
            const filename = this.generateExtractedFilename(data);
            const blob = new Blob([data], { type: 'application/octet-stream' });
            this.downloadFile(blob, filename);ntentPreview(data) {
            this.showMessage('Données extraites sauvegardées!', 'success');
        };
        
        resultArea.style.display = 'block';
        resultArea.classList.add('fade-in');
        extDecoder('utf-8').decode(data);
        // Scroll vers le résultat
        setTimeout(() => {on si c'est du texte lisible
            resultArea.scrollIntoView({ behavior: 'smooth', block: 'center' });.match(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/)) {
        }, 300);       isText = false;
    }    }
) {
    showAnalysisResult(analysis, extractions = []) {
        const resultArea = document.getElementById('decode-result');
        const preview = document.getElementById('content-preview');
        
        // Génération du rapport d'analyse// Affichage hexadécimal pour les données binaires
        const report = this.steganography.generateReport(analysis);
        , maxBytes);
        let analysisHtml = `<div class="analysis-report">`;
        analysisHtml += `<pre>${report}</pre>`;
        
        if (extractions.length > 0) {   const chunk = data.slice(i, i + 16);
            analysisHtml += `<div class="extractions-found">`;    const hex = Array.from(chunk).map(b => b.toString(16).padStart(2, '0')).join(' ');
            analysisHtml += `<h4>🎯 EXTRACTIONS RÉUSSIES:</h4>`;chunk).map(b => b >= 32 && b <= 126 ? String.fromCharCode(b) : '.').join('');
            extractions.forEach((ext, index) => {ascii}`);
                analysisHtml += `<div class="extraction-item">`;
                analysisHtml += `${index + 1}. ${this.getMethodName(ext.method)}: `;
                analysisHtml += `${this.formatFileSize(ext.size)} `;
                analysisHtml += `(entropie: ${ext.entropy.toFixed(3)})`;       hexLines.push(`... et ${data.length - maxBytes} octets supplémentaires`);
                analysisHtml += `</div>`;    }
            });
            analysisHtml += `</div>`;'\n');
        }
        
        analysisHtml += `</div>`;// Limitation de la taille d'affichage
        layText.length > 5000) {
        preview.innerHTML = analysisHtml;.. [contenu tronqué]';
        
        // Masquer le bouton de sauvegarde pour l'analyse
        document.getElementById('save-extracted').style.display = 'none';   return {
                    html: `<pre>${this.escapeHtml(displayText)}</pre>`,
        resultArea.style.display = 'block';
        resultArea.classList.add('fade-in');        };
    }

    prepareContentPreview(data) {
        let displayText = '';
        let isText = true;
        entById(progressId);
        try {const textElement = progressElement.querySelector('.progress-text');
            // Tentative de décodage en UTF-8
            displayText = new TextDecoder('utf-8').decode(data);
            t.style.display = 'block';
            // Vérification si c'est du texte lisible
            if (displayText.match(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/)) {re de progression
                isText = false;ent.querySelector('.progress-fill');
            }0;
        } catch (error) {
            isText = false;
        }   clearInterval(interval);
        se {
        if (!isText) {        width += Math.random() * 15;
            // Affichage hexadécimal pour les données binairesn(width, 90)}%`;
            const maxBytes = 256; // Limite d'affichage       }
            const bytesToShow = Math.min(data.length, maxBytes);        }, 150);
            const hexLines = [];
            
            for (let i = 0; i < bytesToShow; i += 16) {
                const chunk = data.slice(i, i + 16);
                const hex = Array.from(chunk).map(b => b.toString(16).padStart(2, '0')).join(' ');
                const ascii = Array.from(chunk).map(b => b >= 32 && b <= 126 ? String.fromCharCode(b) : '.').join('');ementById(progressId);
                hexLines.push(`${i.toString(16).padStart(4, '0')}: ${hex.padEnd(48)} | ${ascii}`);onst textElement = progressElement.querySelector('.progress-text');
            }   
                    if (progressElement.style.display === 'block') {
            if (data.length > maxBytes) {ntent = message;
                hexLines.push(`... et ${data.length - maxBytes} octets supplémentaires`);
            }
            
            displayText = hexLines.join('\n');ssId) {
        }ment.getElementById(progressId);
        onst interval = progressElement.dataset.interval;
        // Limitation de la taille d'affichage
        if (displayText.length > 5000) {
            displayText = displayText.substring(0, 5000) + '\n... [contenu tronqué]';
        }
        
        return {rre puis masquer
            html: `<pre>${this.escapeHtml(displayText)}</pre>`,lector('.progress-fill');
            isText: isText
        };
    }   setTimeout(() => {
            progressElement.style.display = 'none';
    // ========== UTILITAIRES D'INTERFACE ==========';

    showProgress(progressId, message) {
        const progressElement = document.getElementById(progressId);
        const textElement = progressElement.querySelector('.progress-text');
        
        textElement.textContent = message;
        progressElement.style.display = 'block';
        rror' ? 'exclamation-triangle' : 
        // Animation de la barre de progressioncheck-circle' : 
        const progressBar = progressElement.querySelector('.progress-fill');ng' ? 'exclamation-triangle' : 'info-circle';
        let width = 0;
        const interval = setInterval(() => {messageDiv.innerHTML = `
            if (width >= 90) {
                clearInterval(interval);
            } else {
                width += Math.random() * 15;
                progressBar.style.width = `${Math.min(width, 90)}%`;ontenu principal
            }= document.querySelector('.main-content');
        }, 150);Div, mainContent.firstChild);
        
        progressElement.dataset.interval = interval;ppression automatique
    }
    if (messageDiv.parentNode) {
    updateProgress(progressId, message) {rentNode.removeChild(messageDiv);
        const progressElement = document.getElementById(progressId);
        const textElement = progressElement.querySelector('.progress-text');}, type === 'error' ? 8000 : 5000);
        
        if (progressElement.style.display === 'block') {   // Animation d'entrée
            textElement.textContent = message;        messageDiv.classList.add('fade-in');
        }
    }

    hideProgress(progressId) {
        const progressElement = document.getElementById(progressId);
        const interval = progressElement.dataset.interval; messages = document.querySelectorAll('.message');
        sages.forEach(msg => {
        if (interval) {       if (msg.parentNode) {
            clearInterval(interval);                msg.parentNode.removeChild(msg);
        }
        
        // Compléter la barre puis masquer
        const progressBar = progressElement.querySelector('.progress-fill');
        progressBar.style.width = '100%';
        losest('.password-input').querySelector('input');
        setTimeout(() => {assword').querySelector('i');
            progressElement.style.display = 'none';
            progressBar.style.width = '0%';') {
        }, 800);
    }   icon.className = 'fas fa-eye-slash';
   } else {
    showMessage(message, type = 'info') {            input.type = 'password';
        const messageDiv = document.createElement('div');eye';
        messageDiv.className = `message ${type}`;
        
        const icon = type === 'error' ? 'exclamation-triangle' : 
                    type === 'success' ? 'check-circle' : 
                    type === 'warning' ? 'exclamation-triangle' : 'info-circle';const strengthBar = document.querySelector('.strength-fill');
        Text = document.querySelector('.strength-text');
        messageDiv.innerHTML = `
            <i class="fas fa-${icon}"></i>if (!strengthBar || !strengthText) return;
            <span>${message}</span>
        `;
        
        // Insertion au début du contenu principal
        const mainContent = document.querySelector('.main-content');
        mainContent.insertBefore(messageDiv, mainContent.firstChild);if (password.length >= 8) score += 20;
        
        // Suppression automatique
        setTimeout(() => {else feedback.push('20+ caractères recommandés');
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }else feedback.push('Minuscules manquantes');
        }, type === 'error' ? 8000 : 5000);
        
        // Animation d'entréeelse feedback.push('Majuscules manquantes');
        messageDiv.classList.add('fade-in');
        
        console.log(`💬 Message ${type}: ${message}`);else feedback.push('Chiffres manquants');
    }

    clearMessages() {else feedback.push('Caractères spéciaux manquants');
        const messages = document.querySelectorAll('.message');
        messages.forEach(msg => {-= 10; // Répétitions
            if (msg.parentNode) {if (password.toLowerCase().includes('password')) score -= 20;
                msg.parentNode.removeChild(msg);
            }suelle
        });`${score}%`;
    }

    togglePasswordVisibility(e) {
        const input = e.target.closest('.password-input').querySelector('input');
        const icon = e.target.closest('.toggle-password').querySelector('i');-color)';
         {
        if (input.type === 'password') {
            input.type = 'text';r = 'var(--warning-color)';
            icon.className = 'fas fa-eye-slash';
        } else {
            input.type = 'password';   color = 'var(--accent-color)';
            icon.className = 'fas fa-eye';} else {
        }
    }';

    checkPasswordStrength(password) {   
        const strengthBar = document.querySelector('.strength-fill');        strengthBar.style.background = color;
        const strengthText = document.querySelector('.strength-text');
                strengthText.title = feedback.join(', ');
        if (!strengthBar || !strengthText) return;
        
        let score = 0;========= GESTION DES RÉINITIALISATIONS ==========
        const feedback = [];
        
        // Critères de notation de l\'encodage');
        if (password.length >= 8) score += 20;
        if (password.length >= 12) score += 15;
        if (password.length >= 20) score += 15;
        else feedback.push('20+ caractères recommandés');
        
        if (/[a-z]/.test(password)) score += 10;document.getElementById('carrier-file').value = '';
        else feedback.push('Minuscules manquantes');.value = '';
        
        if (/[A-Z]/.test(password)) score += 10;
        else feedback.push('Majuscules manquantes');
        ones d'upload
        if (/[0-9]/.test(password)) score += 10;ez-déposez ou cliquez pour sélectionner', 'fas fa-cloud-upload-alt');
        else feedback.push('Chiffres manquants');exte ou fichier à cacher', 'fas fa-eye-slash');
        
        if (/[^a-zA-Z0-9]/.test(password)) score += 15;
        else feedback.push('Caractères spéciaux manquants');none';
         'none';
        if (/(.)\1{2,}/.test(password)) score -= 10; // Répétitions
        if (password.toLowerCase().includes('password')) score -= 20;// Réinitialisation des options
        
        // Mise à jour visuelle   document.getElementById('crypto-level').selectedIndex = 0;
        strengthBar.style.width = `${score}%`;        document.querySelectorAll('#encode-panel input[type="checkbox"]').forEach(cb => cb.checked = false);
        
        let level, color;tialisée', 'info');
        if (score < 30) {
            level = 'Très faible';
            color = 'var(--error-color)';Class) {
        } else if (score < 50) {d);
            level = 'Faible';const icon = zone.querySelector('i');
            color = 'var(--warning-color)';uerySelector('h3');
        } else if (score < 75) {);
            level = 'Correct';'small');
            color = 'var(--accent-color)';
        } else {icon.className = iconClass;
            level = 'Excellent';olor = 'var(--primary-color)';
            color = 'var(--success-color)';
        }escElement.textContent = description;
        
        strengthBar.style.background = color;
        strengthText.textContent = level;= 'carrier-upload' ? 'Images, Audio, Vidéo, Documents' : '';
        strengthText.title = feedback.join(', ');   }
    }        
set.file;
    // ========== GESTION DES RÉINITIALISATIONS ==========

    resetEncode() {
        console.log('🔄 Réinitialisation de l\'encodage');
        Annulation des opérations en cours
        // Réinitialisation des fichiersconst progressElements = document.querySelectorAll('.progress-container[style*="block"]');
        this.currentFiles.carrier = null;
        this.currentFiles.secret = null;       this.hideProgress(progress.id);
                });
        document.getElementById('carrier-file').value = '';
        document.getElementById('secret-file').value = '';        this.showMessage('Opérations annulées', 'warning');
        document.getElementById('secret-text').value = '';
        document.getElementById('encode-password').value = '';
        
        // Réinitialisation des zones d'upload
        this.resetUploadZone('carrier-upload', 'Fichier Porteur', 'Glissez-déposez ou cliquez pour sélectionner', 'fas fa-cloud-upload-alt');
        this.resetUploadZone('secret-upload', 'Contenu Secret', 'Message texte ou fichier à cacher', 'fas fa-eye-slash');der = new TextEncoder();
        l = encoder.encode(password.padEnd(32, '0').slice(0, 32));
        // Masquage des résultats
        document.getElementById('encode-result').style.display = 'none';= await crypto.subtle.importKey(
        document.getElementById('encode-progress').style.display = 'none';
          keyMaterial,
        // Réinitialisation des options    'AES-GCM',
        document.getElementById('stego-method').selectedIndex = 0;
        document.getElementById('crypto-level').selectedIndex = 0;
        document.querySelectorAll('#encode-panel input[type="checkbox"]').forEach(cb => cb.checked = false);
        
        this.showMessage('Interface d\'encodage réinitialisée', 'info'); = crypto.getRandomValues(new Uint8Array(12));
    }nst encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: iv },
    resetUploadZone(zoneId, title, description, iconClass) {
        const zone = document.getElementById(zoneId);
        const icon = zone.querySelector('i');
        const titleElement = zone.querySelector('h3');
        const descElement = zone.querySelector('p'); new Uint8Array(iv.length + encrypted.byteLength);
        const small = zone.querySelector('small');   result.set(iv);
                result.set(new Uint8Array(encrypted), iv.length);
        icon.className = iconClass;
        icon.style.color = 'var(--primary-color)';
        titleElement.textContent = title;
        descElement.textContent = description;
        c basicDecrypt(encryptedData, password) {
        if (small) {
            small.textContent = zoneId === 'carrier-upload' ? 'Images, Audio, Vidéo, Documents' : '';
        }}
        
        delete zone.dataset.file;der = new TextEncoder();
        zone.classList.remove('fade-in');l = encoder.encode(password.padEnd(32, '0').slice(0, 32));
    }
= await crypto.subtle.importKey(
    cancelOperations() {
        // Annulation des opérations en cours  keyMaterial,
        const progressElements = document.querySelectorAll('.progress-container[style*="block"]');    'AES-GCM',
        progressElements.forEach(progress => {
            this.hideProgress(progress.id);
        }););
        
        this.showMessage('Opérations annulées', 'warning');, 12);
    }crypted = encryptedData.slice(12);

    // ========== CHIFFREMENT DE BASE ==========nst decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: iv },
    async basicEncrypt(data, password) {
        const encoder = new TextEncoder();       encrypted
        const keyMaterial = encoder.encode(password.padEnd(32, '0').slice(0, 32));        );
        
        const key = await crypto.subtle.importKey(        return new Uint8Array(decrypted);
            'raw',
            keyMaterial,
            'AES-GCM',
            false,
            ['encrypt']
        );
        his.currentFiles.carrier) {
        const iv = crypto.getRandomValues(new Uint8Array(12));   const capacity = this.steganography.getCapacity(this.currentFiles.carrier, method);
        const encrypted = await crypto.subtle.encrypt(       if (capacity > 0) {
            { name: 'AES-GCM', iv: iv },                this.showMessage(`💾 Capacité ${method.toUpperCase()}: ${this.formatFileSize(capacity)}`, 'info');
            key,
            data
        );
        
        const result = new Uint8Array(iv.length + encrypted.byteLength);
        result.set(iv);nst infoMessages = {
        result.set(new Uint8Array(encrypted), iv.length);    'none': 'Aucun chiffrement - Données en clair',
        S-256-GCM standard',
        return result;ue'
    };
   
    async basicDecrypt(encryptedData, password) {        if (infoMessages[level]) {
        if (encryptedData.length < 12) {age(`🔐 ${infoMessages[level]}`, 'info');
            throw new Error('Données insuffisantes pour déchiffrement');
        }
        
        const encoder = new TextEncoder();
        const keyMaterial = encoder.encode(password.padEnd(32, '0').slice(0, 32));
        const options = [];
        const key = await crypto.subtle.importKey(Id('compress-data')?.checked) options.push('Compression');
            'raw',ruit');
            keyMaterial,f (document.getElementById('multi-layer')?.checked) options.push('Multi-couches');
            'AES-GCM',   
            false,        if (options.length > 0) {
            ['decrypt']ssage(`⚙️ Options: ${options.join(', ')}`, 'info');
        );
        
        const iv = encryptedData.slice(0, 12);
        const encrypted = encryptedData.slice(12);
        elp-panel .help-content');
        const decrypted = await crypto.subtle.decrypt() {
            { name: 'AES-GCM', iv: iv },
            key,
            encrypted
        );
          <li>Fichiers traités: ${this.filesProcessed}</li>
        return new Uint8Array(decrypted);          <li>Session démarrée: ${new Date().toLocaleString()}</li>
    }is.steganography.methods).length}</li>

    // ========== UTILITAIRES ==========
;
    updateMethodInfo(method) {   // Ajout après le contenu existant si pas déjà présent
        // Mise à jour des informations contextuelles selon la méthode       if (!statsElement.querySelector('.stats-section')) {
        if (this.currentFiles.carrier) {                statsElement.insertAdjacentHTML('beforeend', currentStats);
            const capacity = this.steganography.getCapacity(this.currentFiles.carrier, method);
            if (capacity > 0) {
                this.showMessage(`💾 Capacité ${method.toUpperCase()}: ${this.formatFileSize(capacity)}`, 'info');
            }
        }
    }
,
    updateCryptoInfo(level) {
        const infoMessages = {rsion Audio',
            'none': 'Aucun chiffrement - Données en clair',  'video-frame': 'Frames Vidéo',
            'aes': 'Chiffrement AES-256-GCM standard',    'document-hidden': 'Document Caché',
            'ultra': 'UltraCrypte - Sécurité maximale post-quantique'
        };       'brute': 'Force Brute'
                };
        if (infoMessages[level]) {
            this.showMessage(`🔐 ${infoMessages[level]}`, 'info');method.slice(1);
        }
    }
enerateOutputFilename(originalFile, method) {
    updateOptionsInfo() {        const baseName = originalFile.name.replace(/\.[^.]+$/, '');
        // Informations sur les options avancéese.name.split('.').pop();
        const options = [];
        if (document.getElementById('compress-data')?.checked) options.push('Compression');
        if (document.getElementById('add-noise')?.checked) options.push('Bruit');
        if (document.getElementById('multi-layer')?.checked) options.push('Multi-couches');
        tion du type de fichier extrait
        if (options.length > 0) { Date().toISOString().slice(0, 19).replace(/[:-]/g, '');
            this.showMessage(`⚙️ Options: ${options.join(', ')}`, 'info');
        }rants
    }
ng',
    updateHelpStats() {  'GIF8': 'gif',
        const statsElement = document.querySelector('#help-panel .help-content');    '\xFF\xD8\xFF': 'jpg',
        if (statsElement) {
            const currentStats = `
                <div class="stats-section">
                    <h4>📊 Statistiques de session</h4>
                    <ul> dataStr = String.fromCharCode(...data.slice(0, 10));
                        <li>Fichiers traités: ${this.filesProcessed}</li>or (const [header, ext] of Object.entries(fileHeaders)) {
                        <li>Session démarrée: ${new Date().toLocaleString()}</li>    if (dataStr.startsWith(header)) {
                        <li>Méthodes disponibles: ${Object.keys(this.steganography.methods).length}</li>estamp}.${ext}`;
                    </ul>
                </div>
            `;
            // Ajout après le contenu existant si pas déjà présent
            if (!statsElement.querySelector('.stats-section')) {
                statsElement.insertAdjacentHTML('beforeend', currentStats);t = new TextDecoder('utf-8').decode(data.slice(0, 100));
            }8\x0B\x0C\x0E-\x1F\x7F-\x9F]/.test(text)) {
        }       return `extracted_${timestamp}.txt`;
    }    }

    getMethodName(method) {       // Pas du texte
        const methods = {        }
            'lsb': 'LSB (Least Significant Bit)',
            'metadata': 'Métadonnées',
            'audio-spread': 'Dispersion Audio',
            'video-frame': 'Frames Vidéo',
            'document-hidden': 'Document Caché',e) {
            'auto': 'Détection Automatique',RL(blob);
            'brute': 'Force Brute'document.createElement('a');
        };
        
        return methods[method] || method.charAt(0).toUpperCase() + method.slice(1);document.body.appendChild(a);
    }
   document.body.removeChild(a);
    generateOutputFilename(originalFile, method) {        URL.revokeObjectURL(url);
        const baseName = originalFile.name.replace(/\.[^.]+$/, '');
        const extension = originalFile.name.split('.').pop();filename} (${this.formatFileSize(blob.size)})`);
        return `${baseName}_obscura_${method}.${extension}`;
    }

    generateExtractedFilename(data) {
        // Tentative de détection du type de fichier extrait
        const timestamp = new Date().toISOString().slice(0, 19).replace(/[:-]/g, '');
           const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        // Headers de fichiers courants        const i = Math.floor(Math.log(bytes) / Math.log(k));
        const fileHeaders = {
            '\x89PNG': 'png',).toFixed(2)) + ' ' + sizes[i];
            'GIF8': 'gif',
            '\xFF\xD8\xFF': 'jpg',
            'PK\x03\x04': 'zip',
            '%PDF': 'pdf') => {
        }; const reader = new FileReader();
               reader.onload = (e) => resolve(e.target.result);
        const dataStr = String.fromCharCode(...data.slice(0, 10));            reader.onerror = reject;
        for (const [header, ext] of Object.entries(fileHeaders)) {readAsArrayBuffer(file);
            if (dataStr.startsWith(header)) {
                return `extracted_${timestamp}.${ext}`;
            }
        }eStats() {
           const statsElement = document.getElementById('files-processed');
        // Tentative de détection texte        if (statsElement) {
        try {nt.textContent = `${this.filesProcessed} fichiers traités`;
            const text = new TextDecoder('utf-8').decode(data.slice(0, 100));
            if (!/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/.test(text)) {
                return `extracted_${timestamp}.txt`;
            }scapeHtml(text) {
        } catch (e) {       const div = document.createElement('div');
            // Pas du texte        div.textContent = text;
        }
            }
        return `extracted_${timestamp}.bin`;
    }
==== INITIALISATION ==========
    downloadFile(blob, filename) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');ener('DOMContentLoaded', () => {
        a.href = url;
        a.download = filename;();
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        tyle="display: flex; justify-content: center; align-items: center; height: 100vh; flex-direction: column; color: #ef4444;">
        console.log(`💾 Téléchargement: ${filename} (${this.formatFileSize(blob.size)})`);      <h1>❌ Erreur d'initialisation</h1>
    }           <p>Impossible de démarrer Obscura: ${error.message}</p>
             <p><small>Vérifiez la console pour plus de détails</small></p>
    formatFileSize(bytes) {            </div>
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        w.addEventListener('error', (e) => {
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]; console.error('💥 Erreur globale:', e.error);
    }    if (window.app) {
.message}`, 'error');
    async fileToArrayBuffer(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);w.addEventListener('unhandledrejection', (e) => {
            reader.onerror = reject; console.error('💥 Promise rejetée:', e.reason);
            reader.readAsArrayBuffer(file);    if (window.app) {
        });`Erreur asynchrone: ${e.reason}`, 'error');
    }    }

    updateStats() {
        const statsElement = document.getElementById('files-processed');/ ========== EXPORT ==========



















































}    module.exports = ObscuraApp;if (typeof module !== 'undefined' && module.exports) {// ========== EXPORT ==========});    }        window.app.showMessage(`Erreur asynchrone: ${e.reason}`, 'error');    if (window.app) {    console.error('💥 Promise rejetée:', e.reason);window.addEventListener('unhandledrejection', (e) => {});    }        window.app.showMessage(`Erreur inattendue: ${e.message}`, 'error');    if (window.app) {    console.error('💥 Erreur globale:', e.error);window.addEventListener('error', (e) => {// Gestion des erreurs globales});    }        `;            </div>                <p><small>Vérifiez la console pour plus de détails</small></p>                <p>Impossible de démarrer Obscura: ${error.message}</p>                <h1>❌ Erreur d'initialisation</h1>            <div style="display: flex; justify-content: center; align-items: center; height: 100vh; flex-direction: column; color: #ef4444;">        document.body.innerHTML = `        console.error('💥 Erreur d\'initialisation:', error);    } catch (error) {        console.log('🎉 Obscura initialisé avec succès');        window.app = new ObscuraApp();    try {document.addEventListener('DOMContentLoaded', () => {// Initialisation de l'application au chargement du DOM// ========== INITIALISATION ==========}    }        return div.innerHTML;        div.textContent = text;        const div = document.createElement('div');    escapeHtml(text) {    }        }            statsElement.textContent = `${this.filesProcessed} fichiers traités`;        if (statsElement) {
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ObscuraApp;
}