// ============= ADMIN.JS - Mode Backdoor Administrateur Avancé =============
// Interface secrète pour l'analyse forensique et le crackage

// Prévenir le chargement multiple
if (window.adminMode) {
    // Suppression du console.log
    // console.log('🔧 Mode admin déjà chargé');
} else {

// Suppression du console.log
// console.log('🔓 Chargement du mode administrateur...');

class AdminPanel {
    constructor() {
        this.isVisible = false;
        this.results = [];
        this.currentTab = 'crack';
        this.currentFile = null;
        this.init();
    }

    init() {
        // Suppression du console.log
        // console.log('🔧 Initialisation AdminPanel...');
        this.createAdminInterface();
        this.bindEvents();
        // Suppression du console.log
        // console.log('✅ Mode administrateur activé');
        window.adminMode = this;
        
        // Auto-show si demandé
        if (window.location.hash === '#admin' || localStorage.getItem('obscura_debug') === 'true') {
            setTimeout(() => {
                this.toggleVisibility();
            }, 500);
        }
    }

    // ========== INTERFACE ADMIN ==========

    createAdminInterface() {
        // Créer le panneau admin flottant
        const panel = document.createElement('div');
        panel.className = 'admin-panel';
        panel.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            width: 450px;
            max-height: 85vh;
            background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%);
            border: 2px solid #3b82f6;
            border-radius: 15px;
            padding: 20px;
            z-index: 10000;
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.3), inset 0 0 50px rgba(59, 130, 246, 0.1);
            font-family: 'Inter', sans-serif;
            color: #f1f5f9;
            overflow-y: auto;
            display: none;
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease;
            backdrop-filter: blur(20px);
        `;

        panel.innerHTML = `
            <div class="admin-header">
                <h2 style="margin: 0 0 10px 0; color: #3b82f6; text-shadow: 0 0 10px rgba(59, 130, 246, 0.5); display: flex; align-items: center; gap: 8px; font-size: 18px;">
                    🛡️ ADMIN PANEL
                </h2>
                <div class="admin-controls">
                    <button class="admin-btn minimize" title="Minimiser">−</button>
                    <button class="admin-btn close" title="Fermer">×</button>
                </div>
            </div>
            
            <div class="admin-tabs">
                <button class="admin-tab active" data-tab="crack">
                    🔓 Crack Files
                </button>
                <button class="admin-tab" data-tab="analysis">
                    🔍 Analysis
                </button>
                <button class="admin-tab" data-tab="tools">
                    🛠️ Tools
                </button>
            </div>
            
            <div class="admin-content">
                <div class="tab-content active" id="crack-tab">
                    <h3 style="display: flex; align-items: center; gap: 8px; color: #f59e0b; margin-bottom: 15px;">
                        ⚡ FILE CRACKER
                    </h3>
                    <div class="file-drop-zone" id="admin-file-drop">
                        <div style="margin-bottom: 10px; font-size: 32px;">📁</div>
                        <p>Drop encoded file here or click to select</p>
                        <small>Supports all files encoded with Obscura</small>
                        <input type="file" id="admin-file" style="position: absolute; opacity: 0; width: 100%; height: 100%; cursor: pointer; left: 0; top: 0;">
                    </div>
                    
                    <div class="crack-options">
                        <label>
                            <input type="checkbox" checked> 
                            Advanced Decryption
                        </label>
                        <label>
                            <input type="checkbox" checked> 
                            Entropy Analysis
                        </label>
                        <label>
                            <input type="checkbox" checked> 
                            Signature Detection
                        </label>
                        <label>
                            <input type="checkbox"> 
                            Dictionary Attack
                        </label>
                    </div>
                    
                    <div class="password-section" style="margin: 15px 0;">
                        <label style="display: block; margin-bottom: 5px; font-size: 12px;">Password (if encrypted):</label>
                        <input type="password" id="admin-password" placeholder="Enter password..." style="width: 100%; padding: 8px; border: 1px solid #475569; border-radius: 6px; background: #1e293b; color: #f1f5f9; font-size: 12px;">
                    </div>
                    
                    <button class="admin-action-btn" id="start-crack">
                        🚀 START CRACKING
                    </button>
                </div>
                
                <div class="tab-content" id="analysis-tab">
                    <h3 style="display: flex; align-items: center; gap: 8px; color: #10b981; margin-bottom: 15px;">
                        🔬 FILE ANALYSIS
                    </h3>
                    <div class="analysis-info" id="analysis-info">
                        <div class="info-row">
                            <span>File Type:</span>
                            <span id="file-type">Not loaded</span>
                        </div>
                        <div class="info-row">
                            <span>File Size:</span>
                            <span id="file-size">-</span>
                        </div>
                        <div class="info-row">
                            <span>Entropy:</span>
                            <span id="file-entropy">-</span>
                        </div>
                        <div class="info-row">
                            <span>Steganography:</span>
                            <span id="stego-likelihood">Unknown</span>
                        </div>
                    </div>
                    <button class="admin-action-btn" id="deep-analysis">
                        🔍 Deep Scan
                    </button>
                </div>
                
                <div class="tab-content" id="tools-tab">
                    <h3 style="display: flex; align-items: center; gap: 8px; color: #f97316; margin-bottom: 15px;">
                        🔧 ADMIN TOOLS
                    </h3>
                    <button class="admin-action-btn" id="generate-key">
                        🔑 Generate Master Key
                    </button>
                    <button class="admin-action-btn" id="export-results">
                        💾 Export Results
                    </button>
                    <button class="admin-action-btn" id="clear-logs">
                        🗑️ Clear Logs
                    </button>
                </div>
            </div>
            
            <div class="admin-results">
                <div class="results-header" style="display: flex; align-items: center; gap: 8px; font-weight: bold; margin-bottom: 10px; color: #3b82f6; font-size: 12px;">
                    📊 RESULTS
                </div>
                <div class="results-content" id="admin-results-content">
                    No results yet...
                </div>
            </div>
        `;

        // Styles CSS pour le panel admin
        const style = document.createElement('style');
        style.textContent = `
            .admin-panel * {
                box-sizing: border-box;
            }
            
            .admin-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 15px;
                border-bottom: 1px solid #475569;
                padding-bottom: 10px;
            }
            
            .admin-controls {
                display: flex;
                gap: 5px;
            }
            
            .admin-btn {
                width: 28px;
                height: 28px;
                background: #3b82f6;
                color: #fff;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-weight: bold;
                font-size: 14px;
                transition: all 0.2s;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .admin-btn:hover {
                background: #2563eb;
                transform: scale(1.1);
            }
            
            .admin-tabs {
                display: flex;
                margin-bottom: 15px;
                border-bottom: 1px solid #334155;
                gap: 2px;
            }
            
            .admin-tab {
                flex: 1;
                background: transparent;
                border: none;
                color: #94a3b8;
                padding: 8px 5px;
                cursor: pointer;
                transition: all 0.2s;
                font-size: 11px;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 4px;
                border-radius: 4px 4px 0 0;
            }
            
            .admin-tab.active {
                color: #3b82f6;
                background: rgba(59, 130, 246, 0.1);
                border-bottom: 2px solid #3b82f6;
            }
            
            .admin-tab:hover:not(.active) {
                color: #cbd5e1;
                background: rgba(255, 255, 255, 0.05);
            }
            
            .tab-content {
                display: none;
                margin-bottom: 15px;
            }
            
            .tab-content.active {
                display: block;
            }
            
            .tab-content h3 {
                margin: 0 0 15px 0;
                font-size: 14px;
                text-shadow: 0 0 5px currentColor;
            }
            
            .file-drop-zone {
                border: 2px dashed #3b82f6;
                padding: 25px;
                text-align: center;
                margin-bottom: 15px;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.2s;
                position: relative;
                min-height: 80px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background: rgba(59, 130, 246, 0.05);
            }
            
            .file-drop-zone:hover {
                background: rgba(59, 130, 246, 0.1);
                border-color: #2563eb;
                transform: translateY(-1px);
            }
            
            .file-drop-zone.dragover {
                background: rgba(59, 130, 246, 0.2);
                border-color: #1d4ed8;
                transform: scale(1.02);
            }
            
            .crack-options {
                margin-bottom: 15px;
            }
            
            .crack-options label {
                display: flex;
                align-items: center;
                margin-bottom: 8px;
                font-size: 12px;
                cursor: pointer;
                gap: 8px;
                padding: 4px 8px;
                border-radius: 4px;
                transition: all 0.2s;
            }
            
            .crack-options label:hover {
                background: rgba(59, 130, 246, 0.1);
            }
            
            .crack-options input[type="checkbox"] {
                margin: 0;
                accent-color: #3b82f6;
                width: 14px;
                height: 14px;
            }
            
            .admin-action-btn {
                width: 100%;
                background: linear-gradient(45deg, #3b82f6, #2563eb);
                color: #fff;
                border: none;
                padding: 12px;
                border-radius: 8px;
                font-weight: bold;
                cursor: pointer;
                margin-bottom: 8px;
                transition: all 0.2s;
                font-size: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
            }
            
            .admin-action-btn:hover {
                background: linear-gradient(45deg, #2563eb, #1d4ed8);
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);
            }
            
            .admin-results {
                border-top: 1px solid #334155;
                padding-top: 15px;
                max-height: 200px;
                overflow-y: auto;
            }
            
            .results-content {
                background: #0f172a;
                border: 1px solid #334155;
                padding: 10px;
                border-radius: 5px;
                font-size: 11px;
                line-height: 1.4;
                min-height: 60px;
                color: #cbd5e1;
            }
            
            .admin-panel.minimized {
                height: 70px;
                overflow: hidden;
                padding: 15px 20px;
            }
            
            .admin-panel.minimized .admin-content,
            .admin-panel.minimized .admin-results,
            .admin-panel.minimized .admin-tabs {
                display: none;
            }
            
            .admin-panel.minimized .admin-header h2 {
                font-size: 16px;
                margin: 0;
            }
            
            .file-loaded {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 8px;
                background: rgba(59, 130, 246, 0.1);
                border-radius: 6px;
                border-left: 3px solid #3b82f6;
            }
            
            .analysis-info {
                background: #0f172a;
                border: 1px solid #334155;
                border-radius: 6px;
                padding: 10px;
                margin-bottom: 15px;
            }
            
            .info-row {
                display: flex;
                justify-content: space-between;
                padding: 4px 0;
                border-bottom: 1px solid #1e293b;
                font-size: 11px;
            }
            
            .info-row:last-child {
                border-bottom: none;
            }
            
            .info-row span:first-child {
                color: #94a3b8;
            }
            
            .info-row span:last-child {
                color: #f1f5f9;
                font-weight: 500;
            }
            
            .crack-result {
                background: rgba(16, 185, 129, 0.1);
                border: 1px solid #10b981;
                border-radius: 6px;
                padding: 10px;
                margin: 8px 0;
            }
            
            .crack-result h4 {
                margin: 0 0 8px 0;
                color: #10b981;
                font-size: 12px;
            }
            
            .download-link {
                display: inline-block;
                background: #10b981;
                color: white;
                padding: 4px 8px;
                border-radius: 4px;
                text-decoration: none;
                font-size: 10px;
                margin-top: 5px;
                transition: all 0.2s;
            }
            
            .download-link:hover {
                background: #059669;
                transform: translateY(-1px);
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(panel);
        this.panel = panel;
    }

    bindEvents() {
        // Boutons header
        const closeBtn = this.panel.querySelector('.admin-btn.close');
        const minimizeBtn = this.panel.querySelector('.admin-btn.minimize');
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.toggleVisibility();
            });
        }

        if (minimizeBtn) {
            minimizeBtn.addEventListener('click', () => {
                this.minimizePanel();
            });
        }

        // Onglets
        this.panel.querySelectorAll('.admin-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchTab(e.target.closest('.admin-tab').dataset.tab);
            });
        });

        // Upload fichier - Zone de drop
        const dropZone = this.panel.querySelector('#admin-file-drop');
        const fileInput = this.panel.querySelector('#admin-file');

        if (dropZone && fileInput) {
            // Événements de drag & drop
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                dropZone.addEventListener(eventName, (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                });
            });

            ['dragenter', 'dragover'].forEach(eventName => {
                dropZone.addEventListener(eventName, () => {
                    dropZone.classList.add('dragover');
                });
            });

            ['dragleave', 'drop'].forEach(eventName => {
                dropZone.addEventListener(eventName, () => {
                    dropZone.classList.remove('dragover');
                });
            });

            // Drop du fichier
            dropZone.addEventListener('drop', (e) => {
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    this.handleFile(files[0]);
                }
            });

            // Clic sur la zone pour ouvrir le sélecteur
            dropZone.addEventListener('click', () => {
                fileInput.click();
            });

            // Changement de fichier via input
            fileInput.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    this.handleFile(e.target.files[0]);
                }
            });
        }

        // Boutons actions
        const startCrackBtn = this.panel.querySelector('#start-crack');
        if (startCrackBtn) {
            startCrackBtn.addEventListener('click', () => {
                this.performAdvancedCrack();
            });
        }

        const deepAnalysisBtn = this.panel.querySelector('#deep-analysis');
        if (deepAnalysisBtn) {
            deepAnalysisBtn.addEventListener('click', () => {
                this.performForensicAnalysis();
            });
        }

        // Outils
        const generateKeyBtn = this.panel.querySelector('#generate-key');
        if (generateKeyBtn) {
            generateKeyBtn.addEventListener('click', () => {
                this.generateMasterKey();
            });
        }

        const exportResultsBtn = this.panel.querySelector('#export-results');
        if (exportResultsBtn) {
            exportResultsBtn.addEventListener('click', () => {
                this.exportResults();
            });
        }

        const clearLogsBtn = this.panel.querySelector('#clear-logs');
        if (clearLogsBtn) {
            clearLogsBtn.addEventListener('click', () => {
                this.clearLogs();
            });
        }

        // Suppression du console.log
        // console.log('🔗 Événements admin liés');
    }

    // ========== FONCTIONNALITÉS ADMIN ==========

    switchTab(tabName) {
        if (!tabName) return;
        
        // Mise à jour des onglets
        this.panel.querySelectorAll('.admin-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        this.panel.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Mise à jour des sections
        this.panel.querySelectorAll('.tab-content').forEach(section => {
            section.classList.remove('active');
        });
        this.panel.querySelector(`#${tabName}-tab`).classList.add('active');

        this.currentTab = tabName;
    }

    toggleVisibility() {
        console.log(`👁️ Toggle visibility - Current state: ${this.isVisible}`);
        
        this.isVisible = !this.isVisible;
        
        if (this.isVisible) {
            this.panel.style.display = 'block';
            this.panel.classList.remove('minimized');
            console.log('✅ Panel admin affiché');
            
            // Petite animation d'entrée
            setTimeout(() => {
                this.panel.style.opacity = '1';
                this.panel.style.transform = 'translateY(0)';
            }, 10);
        } else {
            this.panel.style.display = 'none';
            console.log('❌ Panel admin masqué');
        }
    }

    minimizePanel() {
        const isMinimized = this.panel.classList.contains('minimized');
        
        if (isMinimized) {
            this.panel.classList.remove('minimized');
            console.log('📋 Panel restauré');
        } else {
            this.panel.classList.add('minimized');
            console.log('📦 Panel minimisé');
        }
        
        // Update minimize button text
        const minimizeBtn = this.panel.querySelector('.admin-btn.minimize');
        minimizeBtn.textContent = isMinimized ? '−' : '+';
    }

    handleFile(file) {
        this.currentFile = file;
        console.log(`📁 Admin file loaded: ${file.name} (${file.size} bytes)`);
        
        // Update interface
        const resultsDiv = this.panel.querySelector('#admin-results-content');
        resultsDiv.innerHTML = `
            <div class="file-loaded">
                <div>
                    <strong>${file.name}</strong><br>
                    <small>${this.formatFileSize(file.size)} • ${file.type || 'Unknown type'}</small>
                </div>
            </div>
        `;

        // Update drop zone
        const dropZone = this.panel.querySelector('#admin-file-drop');
        dropZone.innerHTML = `
            <div style="margin-bottom: 8px; font-size: 24px;">✅</div>
            <p><strong>File loaded:</strong> ${file.name}</p>
            <small>Click to change file</small>
        `;

        // Update analysis tab
        this.updateFileAnalysis(file);
    }

    async updateFileAnalysis(file) {
        try {
            const fileType = this.panel.querySelector('#file-type');
            const fileSize = this.panel.querySelector('#file-size');
            const fileEntropy = this.panel.querySelector('#file-entropy');
            const stegoLikelihood = this.panel.querySelector('#stego-likelihood');

            fileType.textContent = file.type || 'Unknown';
            fileSize.textContent = this.formatFileSize(file.size);

            // Calculate entropy
            try {
                const buffer = await this.fileToArrayBuffer(file);
                const entropy = this.calculateEntropy(new Uint8Array(buffer));
                fileEntropy.textContent = entropy.toFixed(3);
                
                const likelihood = entropy > 7.0 ? 'High' : entropy > 6.0 ? 'Medium' : 'Low';
                stegoLikelihood.textContent = likelihood;
            } catch (e) {
                fileEntropy.textContent = 'Error';
                stegoLikelihood.textContent = 'Unknown';
            }
        } catch (error) {
            console.error('Analysis update error:', error);
        }
    }

    async performAdvancedCrack() {
        if (!this.currentFile) {
            this.showResult('❌ No file selected', 'error');
            return;
        }

        console.log('🚀 Starting advanced crack...');
        this.showResult('🔍 Cracking in progress...', 'info');

        const password = this.panel.querySelector('#admin-password').value;
        let extractedData = null;
        let method = 'Unknown';
        let decrypted = false;

        try {
            // 1. Try to detect and extract using all available methods
            const methods = ['lsb', 'metadata', 'audio-spread', 'video-frame', 'document-hidden'];
            
            for (const currentMethod of methods) {
                try {
                    console.log(`🔍 Trying method: ${currentMethod}`);
                    
                    // Use the steganography engine to extract data
                    const result = await window.app.steganographyEngine.extractData(this.currentFile, currentMethod);
                    
                    if (result && result.data) {
                        extractedData = result.data;
                        method = currentMethod;
                        console.log(`✅ Data found with method: ${method}`);
                        break;
                    }
                } catch (e) {
                    console.log(`❌ Method ${currentMethod} failed:`, e.message);
                    continue;
                }
            }

            if (!extractedData) {
                // Try auto detection
                try {
                    const autoResult = await window.app.steganographyEngine.extractData(this.currentFile, 'auto');
                    if (autoResult && autoResult.data) {
                        extractedData = autoResult.data;
                        method = 'auto-detection';
                    }
                } catch (e) {
                    console.log('Auto-detection failed:', e.message);
                }
            }

            if (!extractedData) {
                this.showResult('❌ No hidden data found in this file', 'error');
                return;
            }

            // 2. Try to decrypt if password provided or if data seems encrypted
            let finalData = extractedData;
            
            if (password) {
                try {
                    // Try UltraCrypte first
                    const ultraDecrypted = await window.app.ultraCrypte.decrypt(extractedData, password);
                    finalData = ultraDecrypted;
                    decrypted = true;
                    console.log('✅ Decrypted with UltraCrypte');
                } catch (e) {
                    try {
                        // Try basic AES decryption
                        const aesDecrypted = await window.app.basicDecrypt(extractedData, password);
                        finalData = aesDecrypted;
                        decrypted = true;
                        console.log('✅ Decrypted with AES');
                    } catch (e2) {
                        console.log('❌ Decryption failed, using raw data');
                    }
                }
            } else if (this.isOptionChecked('Dictionary Attack')) {
                // Try common passwords
                const commonPasswords = ['password', '123456', 'admin', 'secret', 'obscura', 'hidden', ''];
                
                for (const pwd of commonPasswords) {
                    try {
                        const ultraDecrypted = await window.app.ultraCrypte.decrypt(extractedData, pwd);
                        finalData = ultraDecrypted;
                        decrypted = true;
                        password = pwd || '(empty)';
                        console.log(`✅ Cracked password: "${pwd}"`);
                        break;
                    } catch (e) {
                        continue;
                    }
                }
            }

            // 3. Prepare data for download
            let textContent = '';
            let isText = false;

            try {
                // Try to convert to text
                if (typeof finalData === 'string') {
                    textContent = finalData;
                    isText = true;
                } else if (finalData instanceof ArrayBuffer) {
                    textContent = new TextDecoder('utf-8').decode(finalData);
                    isText = true;
                } else if (finalData instanceof Uint8Array) {
                    textContent = new TextDecoder('utf-8').decode(finalData);
                    isText = true;
                } else {
                    textContent = String(finalData);
                    isText = true;
                }
                
                // Validate that it's readable text
                if (textContent.length === 0 || /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/.test(textContent.substring(0, 100))) {
                    isText = false;
                }
            } catch (e) {
                isText = false;
            }

            if (!isText) {
                // Binary data - create hex dump
                let bytes;
                if (finalData instanceof ArrayBuffer) {
                    bytes = new Uint8Array(finalData);
                } else if (finalData instanceof Uint8Array) {
                    bytes = finalData;
                } else {
                    bytes = new TextEncoder().encode(String(finalData));
                }
                
                textContent = `Binary data extracted (${bytes.length} bytes)\n\nHex dump:\n`;
                for (let i = 0; i < Math.min(bytes.length, 1024); i += 16) {
                    const chunk = bytes.slice(i, i + 16);
                    const hex = Array.from(chunk).map(b => b.toString(16).padStart(2, '0')).join(' ');
                    const ascii = Array.from(chunk).map(b => (b >= 32 && b <= 126) ? String.fromCharCode(b) : '.').join('');
                    textContent += `${i.toString(16).padStart(8, '0')}: ${hex.padEnd(48)} |${ascii}|\n`;
                }
                if (bytes.length > 1024) {
                    textContent += `\n... (${bytes.length - 1024} more bytes)\n`;
                }
            }

            // 4. Create download file
            const filename = `extracted_${Date.now()}.txt`;
            const blob = new Blob([textContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);

            // 5. Show results
            this.showCrackResult({
                method,
                decrypted,
                password: decrypted ? password : null,
                dataSize: finalData.length || finalData.byteLength || String(finalData).length,
                filename,
                downloadUrl: url,
                preview: textContent.substring(0, 200) + (textContent.length > 200 ? '...': '')
            });

        } catch (error) {
            console.error('Crack error:', error);
            this.showResult(`❌ Error: ${error.message}`, 'error');
        }
    }

    showCrackResult(result) {
        const html = `
            <div class="crack-result">
                <h4>✅ Extraction Successful!</h4>
                <div style="font-size: 11px; margin-bottom: 8px;">
                    <strong>Method:</strong> ${result.method}<br>
                    <strong>Decrypted:</strong> ${result.decrypted ? 'Yes' : 'No'}<br>
                    ${result.password ? `<strong>Password:</strong> ${result.password}<br>` : ''}
                    <strong>Data Size:</strong> ${result.dataSize} bytes
                </div>
                <div style="background: #0f172a; padding: 8px; border-radius: 4px; font-family: monospace; font-size: 10px; margin-bottom: 8px; max-height: 80px; overflow-y: auto;">
                    ${result.preview.replace(/\n/g, '<br>')}
                </div>
                <a href="${result.downloadUrl}" download="${result.filename}" class="download-link">
                    💾 Download ${result.filename}
                </a>
            </div>
        `;
        
        this.showResult(html, 'success');
    }

    async performQuickAnalysis() {
        if (!this.currentFile) return;

        try {
            const analysis = await window.app.steganography.analyzeFile(this.currentFile);
            
            this.panel.querySelector('#quick-entropy').textContent = analysis.entropy.toFixed(3);
            this.panel.querySelector('#quick-signatures').textContent = analysis.suspiciousPatterns.length;
            this.panel.querySelector('#quick-probability').textContent = analysis.steganographyLikelihood;

        } catch (error) {
            console.error('Erreur analyse rapide:', error);
        }
    }

    async scanObscuraSignatures() {
        const data = await this.fileToArrayBuffer(this.currentFile);
        const uint8Array = new Uint8Array(data);
        const signatures = [];

        const knownSignatures = [
            'OBSCURA_ULTRA_2025',
            'OBSCURA_STEGO_2025',
            'OBSCURA_META_START',
            'ADM_'
        ];

        for (const sig of knownSignatures) {
            const sigBytes = new TextEncoder().encode(sig);
            for (let i = 0; i <= uint8Array.length - sigBytes.length; i++) {
                if (this.arrayEqual(uint8Array.slice(i, i + sigBytes.length), sigBytes)) {
                    signatures.push({
                        signature: sig,
                        offset: i,
                        hex: `0x${i.toString(16).toUpperCase()}`
                    });
                }
            }
        }

        return signatures;
    }

    async analyzeEntropy() {
        const data = await this.fileToArrayBuffer(this.currentFile);
        const uint8Array = new Uint8Array(data);
        
        const blockSize = 1024;
        const entropies = [];
        
        for (let i = 0; i < uint8Array.length; i += blockSize) {
            const block = uint8Array.slice(i, i + blockSize);
            entropies.push(this.calculateEntropy(block));
        }
        
        const avg = entropies.reduce((a, b) => a + b, 0) / entropies.length;
        const max = Math.max(...entropies);
        
        return {
            avg: avg.toFixed(3),
            max: max.toFixed(3),
            suspicious: avg > 7.0 || max > 7.8,
            confidence: Math.min(90, Math.floor((avg / 8.0) * 100))
        };
    }

    async performDictionaryAttack() {
        const passwords = ['password', '123456', 'admin', 'secret', 'obscura', 'hidden'];
        
        for (const pwd of passwords) {
            try {
                // Test avec stéganographie standard
                const decoded = await window.app.steganographyEngine.extractData(this.currentFile, 'auto');
                if (decoded.data) {
                    const decrypted = await window.app.ultraCrypte.decrypt(decoded.data, pwd);
                    return {
                        method: `Dictionary Attack`,
                        success: true,
                        data: `Mot de passe trouvé: "${pwd}"`,
                        confidence: 85
                    };
                }
            } catch (e) {
                continue;
            }
        }
        
        return { success: false };
    }

    displayAdvancedResults(results) {
        if (results.length === 0) {
            this.showResult('📊 Aucune donnée suspecte détectée', 'warning');
            return;
        }

        let html = `<div class="advanced-results">`;
        html += `<h6>🎯 ${results.length} résultat(s) d'analyse :</h6>`;
        
        results.forEach(result => {
            const statusIcon = result.success ? '✅' : '❌';
            const confidenceClass = result.confidence > 80 ? 'high-conf' : 
                                  result.confidence > 50 ? 'med-conf' : 'low-conf';
            
            html += `
                <div class="result-item ${confidenceClass}">
                    <div class="result-header">
                        ${statusIcon} <strong>${result.method}</strong>
                        <span class="confidence">${result.confidence}%</span>
                    </div>
                    <div class="result-data">${result.data}</div>
                </div>
            `;
        });
        
        html += `</div>`;
        this.showResult(html, 'success');
    }

    async performForensicAnalysis() {
        if (!this.currentFile) {
            this.showResult('❌ No file selected for analysis', 'error');
            return;
        }

        // Suppression du console.log
        // console.log('🔬 Starting forensic analysis...');
        this.showResult('🔍 Deep analysis in progress...', 'info');

        try {
            const results = [];

            // 1. Entropy analysis
            if (this.isOptionChecked('Entropy Analysis')) {
                const entropyResult = await this.analyzeEntropy();
                results.push({
                    method: 'Entropy Analysis',
                    success: true,
                    data: `Avg: ${entropyResult.avg}, Max: ${entropyResult.max}, Suspicious: ${entropyResult.suspicious}`,
                    confidence: entropyResult.confidence
                });
            }

            // 2. Signature detection
            if (this.isOptionChecked('Signature Detection')) {
                const signatures = await this.scanObscuraSignatures();
                results.push({
                    method: 'Signature Detection',
                    success: signatures.length > 0,
                    data: signatures.length > 0 ? `Found ${signatures.length} signatures` : 'No signatures detected',
                    confidence: signatures.length > 0 ? 90 : 10
                });
            }

            // 3. Dictionary attack
            if (this.isOptionChecked('Dictionary Attack')) {
                const dictResult = await this.performDictionaryAttack();
                results.push({
                    method: 'Dictionary Attack',
                    success: dictResult.success,
                    data: dictResult.data || 'No weak passwords found',
                    confidence: dictResult.confidence || 0
                });
            }

            this.displayAdvancedResults(results);

        } catch (error) {
            console.error('Forensic analysis error:', error);
            this.showResult(`❌ Analysis error: ${error.message}`, 'error');
        }
    }

    clearLogs() {
        this.results = [];
        this.showResult('🗑️ Logs cleared', 'info');
        // Suppression du console.log
        // console.log('🗑️ Admin logs cleared');
    }

    // ========== UTILITAIRES ==========

    isOptionChecked(optionText) {
        const checkboxes = this.panel.querySelectorAll('.crack-options input[type="checkbox"]');
        for (const cb of checkboxes) {
            if (cb.nextSibling.textContent.trim() === optionText) {
                return cb.checked;
            }
        }
        return false;
    }

    showResult(content, type = 'info') {
        const resultsDiv = this.panel.querySelector('#admin-results-content');
        const className = type === 'error' ? 'error-result' : 
                         type === 'success' ? 'success-result' : 'info-result';
        
        resultsDiv.innerHTML = `
            <div class="${className}">
                ${content}
            </div>
        `;
    }

    generateMasterKey() {
        const key = Array.from(crypto.getRandomValues(new Uint8Array(32)))
                        .map(b => b.toString(16).padStart(2, '0'))
                        .join('');
        
        this.showResult(`🔑 Clé générée: ${key.substring(0, 16)}...`, 'success');
        console.log('🔑 Clé maître générée:', key);
    }

    exportResults() {
        const data = {
            timestamp: new Date().toISOString(),
            results: this.results,
            file: this.currentFile ? this.currentFile.name : null
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `obscura_admin_${Date.now()}.json`;
        a.click();
        
        this.showResult('📥 Résultats exportés', 'success');
    }

    // Utilitaires partagés
    async fileToArrayBuffer(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });
    }

    arrayEqual(a, b) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }

    calculateEntropy(data) {
        if (data.length === 0) return 0;
        
        const frequencies = new Array(256).fill(0);
        for (const byte of data) frequencies[byte]++;
        
        let entropy = 0;
        for (const freq of frequencies) {
            if (freq > 0) {
                const p = freq / data.length;
                entropy -= p * Math.log2(p);
            }
        }
        
        return entropy;
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}

new AdminPanel();

}

// Auto-activation si en mode debug
if (window.location.hash === '#admin' || localStorage.getItem('obscura_debug') === 'true') {
    setTimeout(() => {
        if (window.adminMode && !window.adminMode.isVisible) {
            window.adminMode.toggleVisibility();
        }
    }, 1000);
}