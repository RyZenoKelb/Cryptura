// ============= ADMIN.JS - Mode Backdoor Administrateur =============
// Interface secrète pour l'analyse forensique et le crackage

// Prévenir le chargement multiple
if (window.adminMode) {
    console.log('🔧 Mode admin déjà chargé');
} else {

console.log('🔓 Chargement du mode administrateur...');

window.adminMode = {
    isActive: false,
    ui: null,
    version: '2.0',
    masterKey: null,
    crackingMethods: [
        'signature_scan',
        'entropy_analysis', 
        'pattern_detection',
        'brute_force_decrypt',
        'metadata_extraction',
        'forensic_analysis'
    ],

    // ========== ACTIVATION ET INTERFACE ==========

    activate() {
        if (this.isActive) {
            console.log('⚠️ Mode admin déjà actif');
            return;
        }
        
        this.isActive = true;
        this.generateMasterKey();
        this.createAdminUI();
        this.setupAdminEventListeners();
        
        console.log('🔓 Mode Admin Obscura activé');
        console.log('🔑 Clé maître générée');
        
        // Notification discrète
        this.showAdminNotification('Mode Administrateur Activé', 'success');
    },

    deactivate() {
        if (this.ui) {
            this.ui.remove();
            this.ui = null;
        }
        this.isActive = false;
        this.masterKey = null;
        
        console.log('🔒 Mode Admin désactivé');
    },

    createAdminUI() {
        // Création du panneau d'administration
        const adminPanel = document.createElement('div');
        adminPanel.className = 'admin-panel';
        adminPanel.innerHTML = `
            <div class="admin-header">
                <div class="admin-title">
                    <i class="fas fa-user-shield"></i>
                    <span>Admin Forensic</span>
                    <span class="admin-version">v${this.version}</span>
                </div>
                <div class="admin-controls">
                    <button class="admin-minimize" title="Réduire">
                        <i class="fas fa-minus"></i>
                    </button>
                    <button class="admin-close" title="Fermer">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
            
            <div class="admin-content">
                <!-- Onglets -->
                <div class="admin-tabs">
                    <button class="admin-tab active" data-tab="crack">
                        <i class="fas fa-unlock-alt"></i>
                        Cracker
                    </button>
                    <button class="admin-tab" data-tab="analyze">
                        <i class="fas fa-search"></i>
                        Analyser
                    </button>
                    <button class="admin-tab" data-tab="forensic">
                        <i class="fas fa-microscope"></i>
                        Forensic
                    </button>
                    <button class="admin-tab" data-tab="tools">
                        <i class="fas fa-tools"></i>
                        Outils
                    </button>
                </div>

                <!-- Panneau Cracker -->
                <div class="admin-tab-content active" id="admin-crack">
                    <div class="admin-section">
                        <h4><i class="fas fa-file-upload"></i> Fichier Cible</h4>
                        <div class="admin-file-drop" id="admin-file-drop">
                            <i class="fas fa-cloud-upload-alt"></i>
                            <p>Glissez un fichier Obscura ici</p>
                            <small>Ou cliquez pour sélectionner</small>
                            <input type="file" id="admin-file-input" accept="*/*" hidden>
                        </div>
                        <div class="admin-file-info" id="admin-file-info" style="display: none;">
                            <div class="file-details">
                                <span class="file-name"></span>
                                <span class="file-size"></span>
                                <span class="file-type"></span>
                            </div>
                        </div>
                    </div>

                    <div class="admin-section">
                        <h4><i class="fas fa-cogs"></i> Méthodes de Crackage</h4>
                        <div class="crack-methods">
                            <label><input type="checkbox" value="signature_scan" checked> Scan signatures</label>
                            <label><input type="checkbox" value="entropy_analysis" checked> Analyse entropie</label>
                            <label><input type="checkbox" value="pattern_detection"> Détection patterns</label>
                            <label><input type="checkbox" value="brute_force_decrypt"> Force brute decrypt</label>
                            <label><input type="checkbox" value="metadata_extraction" checked> Extraction métadonnées</label>
                            <label><input type="checkbox" value="forensic_analysis"> Analyse forensique</label>
                        </div>
                    </div>

                    <div class="admin-section">
                        <div class="admin-actions">
                            <button id="admin-crack-btn" class="btn-admin btn-primary">
                                <i class="fas fa-unlock-alt"></i>
                                Lancer le Crackage
                            </button>
                            <button id="admin-auto-crack" class="btn-admin btn-warning">
                                <i class="fas fa-magic"></i>
                                Auto-Crack
                            </button>
                            <button id="admin-clear" class="btn-admin btn-secondary">
                                <i class="fas fa-broom"></i>
                                Effacer
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Panneau Analyser -->
                <div class="admin-tab-content" id="admin-analyze">
                    <div class="admin-section">
                        <h4><i class="fas fa-chart-line"></i> Analyse Rapide</h4>
                        <div class="analysis-stats">
                            <div class="stat-item">
                                <span class="stat-label">Entropie:</span>
                                <span class="stat-value" id="entropy-value">-</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Signatures:</span>
                                <span class="stat-value" id="signatures-count">-</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Probabilité:</span>
                                <span class="stat-value" id="stego-probability">-</span>
                            </div>
                        </div>
                    </div>

                    <div class="admin-section">
                        <h4><i class="fas fa-fingerprint"></i> Empreintes Détectées</h4>
                        <div class="fingerprints-list" id="fingerprints-list">
                            <div class="no-data">Aucun fichier analysé</div>
                        </div>
                    </div>
                </div>

                <!-- Panneau Forensic -->
                <div class="admin-tab-content" id="admin-forensic">
                    <div class="admin-section">
                        <h4><i class="fas fa-dna"></i> Analyse Forensique Avancée</h4>
                        <div class="forensic-options">
                            <label><input type="checkbox" id="deep-scan"> Scan approfondi</label>
                            <label><input type="checkbox" id="memory-analysis"> Analyse mémoire</label>
                            <label><input type="checkbox" id="timeline-reconstruction"> Reconstruction timeline</label>
                        </div>
                        <button id="forensic-analyze" class="btn-admin btn-warning">
                            <i class="fas fa-microscope"></i>
                            Analyse Forensique
                        </button>
                    </div>

                    <div class="admin-section">
                        <h4><i class="fas fa-clock"></i> Timeline</h4>
                        <div class="timeline-container" id="timeline-container">
                            <div class="no-data">Aucune analyse forensique effectuée</div>
                        </div>
                    </div>
                </div>

                <!-- Panneau Outils -->
                <div class="admin-tab-content" id="admin-tools">
                    <div class="admin-section">
                        <h4><i class="fas fa-key"></i> Générateur de Clés</h4>
                        <div class="key-generator">
                            <button id="generate-master-key" class="btn-admin btn-secondary">
                                <i class="fas fa-magic"></i>
                                Nouvelle Clé Maître
                            </button>
                            <div class="key-display" id="key-display">
                                <code id="master-key-display">Clé: ••••••••••••••••</code>
                            </div>
                        </div>
                    </div>

                    <div class="admin-section">
                        <h4><i class="fas fa-database"></i> Base de Signatures</h4>
                        <div class="signature-database">
                            <div class="signature-stats">
                                <span>Signatures connues: <strong id="known-signatures">12</strong></span>
                                <span>Dernière MAJ: <strong id="last-update">Aujourd'hui</strong></span>
                            </div>
                            <button id="update-signatures" class="btn-admin btn-primary">
                                <i class="fas fa-sync"></i>
                                Mettre à jour
                            </button>
                        </div>
                    </div>

                    <div class="admin-section">
                        <h4><i class="fas fa-cog"></i> Configuration</h4>
                        <div class="admin-config">
                            <label>
                                Niveau de log:
                                <select id="log-level">
                                    <option value="info">Info</option>
                                    <option value="debug" selected>Debug</option>
                                    <option value="verbose">Verbose</option>
                                </select>
                            </label>
                            <label>
                                <input type="checkbox" id="auto-detect" checked>
                                Détection automatique
                            </label>
                            <label>
                                <input type="checkbox" id="stealth-mode">
                                Mode furtif
                            </label>
                        </div>
                    </div>
                </div>

                <!-- Zone de résultats -->
                <div class="admin-results-container">
                    <div class="admin-results-header">
                        <h4><i class="fas fa-terminal"></i> Console Admin</h4>
                        <div class="results-controls">
                            <button id="clear-console" title="Effacer console">
                                <i class="fas fa-trash"></i>
                            </button>
                            <button id="export-results" title="Exporter résultats">
                                <i class="fas fa-download"></i>
                            </button>
                        </div>
                    </div>
                    <div class="admin-results" id="admin-results">
                        <div class="console-welcome">
                            <pre>🔧 Console Admin Obscura v${this.version}
════════════════════════════════════
Prêt pour l'analyse forensique.
Glissez un fichier ou utilisez les outils.</pre>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Ajout des styles admin
        this.injectAdminStyles();
        
        // Ajout à la page
        document.body.appendChild(adminPanel);
        this.ui = adminPanel;
        
        // Configuration du drag & drop
        this.setupAdminDragDrop();
        
        console.log('🎛️ Interface admin créée');
    },

    injectAdminStyles() {
        if (document.getElementById('admin-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'admin-styles';
        styles.textContent = `
            .admin-panel {
                position: fixed;
                top: 50px;
                right: 20px;
                width: 420px;
                max-height: 80vh;
                background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                border: 2px solid #f39c12;
                border-radius: 12px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3), 0 0 20px rgba(243,156,18,0.2);
                z-index: 10000;
                font-family: 'Courier New', monospace;
                color: #ecf0f1;
                animation: adminSlideIn 0.4s ease-out;
                resize: both;
                overflow: hidden;
                backdrop-filter: blur(10px);
            }

            @keyframes adminSlideIn {
                from { 
                    transform: translateX(100%) scale(0.8);
                    opacity: 0;
                }
                to { 
                    transform: translateX(0) scale(1);
                    opacity: 1;
                }
            }

            .admin-header {
                background: linear-gradient(90deg, #f39c12, #e67e22);
                padding: 12px 16px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-radius: 10px 10px 0 0;
                cursor: move;
                user-select: none;
            }

            .admin-title {
                display: flex;
                align-items: center;
                gap: 8px;
                font-weight: bold;
                color: white;
            }

            .admin-version {
                background: rgba(255,255,255,0.2);
                padding: 2px 6px;
                border-radius: 4px;
                font-size: 0.7em;
            }

            .admin-controls {
                display: flex;
                gap: 4px;
            }

            .admin-minimize, .admin-close {
                background: rgba(255,255,255,0.2);
                border: none;
                color: white;
                width: 24px;
                height: 24px;
                border-radius: 4px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.8em;
                transition: all 0.2s;
            }

            .admin-minimize:hover, .admin-close:hover {
                background: rgba(255,255,255,0.3);
                transform: scale(1.1);
            }

            .admin-content {
                padding: 16px;
                max-height: calc(80vh - 60px);
                overflow-y: auto;
                scrollbar-width: thin;
                scrollbar-color: #f39c12 #2c3e50;
            }

            .admin-content::-webkit-scrollbar {
                width: 6px;
            }

            .admin-content::-webkit-scrollbar-track {
                background: #2c3e50;
            }

            .admin-content::-webkit-scrollbar-thumb {
                background: #f39c12;
                border-radius: 3px;
            }

            .admin-tabs {
                display: flex;
                gap: 4px;
                margin-bottom: 16px;
                border-bottom: 1px solid #34495e;
                padding-bottom: 8px;
            }

            .admin-tab {
                background: #34495e;
                border: none;
                color: #bdc3c7;
                padding: 8px 12px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 0.8em;
                transition: all 0.2s;
                display: flex;
                align-items: center;
                gap: 4px;
            }

            .admin-tab:hover {
                background: #4a6741;
                color: #ecf0f1;
            }

            .admin-tab.active {
                background: #f39c12;
                color: white;
            }

            .admin-tab-content {
                display: none;
            }

            .admin-tab-content.active {
                display: block;
            }

            .admin-section {
                margin-bottom: 20px;
                background: rgba(52,73,94,0.3);
                padding: 12px;
                border-radius: 8px;
                border-left: 3px solid #f39c12;
            }

            .admin-section h4 {
                margin: 0 0 12px 0;
                color: #f39c12;
                font-size: 0.9em;
                display: flex;
                align-items: center;
                gap: 6px;
            }

            .admin-file-drop {
                border: 2px dashed #7f8c8d;
                border-radius: 8px;
                padding: 20px;
                text-align: center;
                cursor: pointer;
                transition: all 0.3s;
                background: rgba(44,62,80,0.5);
            }

            .admin-file-drop:hover, .admin-file-drop.dragover {
                border-color: #f39c12;
                background: rgba(243,156,18,0.1);
                transform: scale(1.02);
            }

            .admin-file-drop i {
                font-size: 2em;
                color: #f39c12;
                margin-bottom: 8px;
                display: block;
            }

            .admin-file-info {
                background: rgba(46,204,113,0.1);
                border: 1px solid #2ecc71;
                border-radius: 6px;
                padding: 10px;
                margin-top: 10px;
            }

            .file-details {
                display: flex;
                flex-direction: column;
                gap: 4px;
                font-size: 0.85em;
            }

            .crack-methods {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 8px;
            }

            .crack-methods label {
                display: flex;
                align-items: center;
                gap: 6px;
                font-size: 0.8em;
                cursor: pointer;
                padding: 4px;
                border-radius: 4px;
                transition: background 0.2s;
            }

            .crack-methods label:hover {
                background: rgba(52,73,94,0.5);
            }

            .crack-methods input[type="checkbox"] {
                accent-color: #f39c12;
            }

            .admin-actions {
                display: flex;
                gap: 8px;
                flex-wrap: wrap;
            }

            .btn-admin {
                border: none;
                padding: 8px 12px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 0.8em;
                display: flex;
                align-items: center;
                gap: 4px;
                transition: all 0.2s;
                font-family: inherit;
            }

            .btn-admin.btn-primary {
                background: #e74c3c;
                color: white;
            }

            .btn-admin.btn-warning {
                background: #f39c12;
                color: white;
            }

            .btn-admin.btn-secondary {
                background: #95a5a6;
                color: white;
            }

            .btn-admin:hover {
                transform: translateY(-1px);
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            }

            .analysis-stats {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 12px;
            }

            .stat-item {
                background: rgba(44,62,80,0.7);
                padding: 8px;
                border-radius: 6px;
                text-align: center;
            }

            .stat-label {
                display: block;
                font-size: 0.7em;
                color: #bdc3c7;
                margin-bottom: 4px;
            }

            .stat-value {
                display: block;
                font-size: 1.1em;
                font-weight: bold;
                color: #f39c12;
            }

            .fingerprints-list {
                max-height: 120px;
                overflow-y: auto;
                background: rgba(44,62,80,0.5);
                border-radius: 6px;
                padding: 8px;
            }

            .fingerprint-item {
                background: rgba(46,204,113,0.2);
                border-left: 3px solid #2ecc71;
                padding: 6px;
                margin-bottom: 4px;
                border-radius: 4px;
                font-size: 0.8em;
            }

            .forensic-options {
                display: flex;
                flex-direction: column;
                gap: 8px;
                margin-bottom: 12px;
            }

            .forensic-options label {
                display: flex;
                align-items: center;
                gap: 6px;
                font-size: 0.8em;
                cursor: pointer;
            }

            .timeline-container {
                max-height: 150px;
                overflow-y: auto;
                background: rgba(44,62,80,0.5);
                border-radius: 6px;
                padding: 8px;
            }

            .timeline-item {
                border-left: 2px solid #f39c12;
                padding-left: 8px;
                margin-bottom: 8px;
                font-size: 0.8em;
            }

            .key-generator {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }

            .key-display {
                background: rgba(44,62,80,0.7);
                padding: 8px;
                border-radius: 6px;
                border: 1px solid #7f8c8d;
            }

            .key-display code {
                color: #2ecc71;
                font-family: 'Courier New', monospace;
                font-size: 0.8em;
            }

            .signature-database {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }

            .signature-stats {
                display: flex;
                justify-content: space-between;
                font-size: 0.8em;
                color: #bdc3c7;
            }

            .admin-config {
                display: flex;
                flex-direction: column;
                gap: 8px;
            }

            .admin-config label {
                display: flex;
                align-items: center;
                gap: 6px;
                font-size: 0.8em;
            }

            .admin-config select {
                background: #34495e;
                border: 1px solid #7f8c8d;
                color: #ecf0f1;
                padding: 4px 8px;
                border-radius: 4px;
            }

            .admin-results-container {
                margin-top: 16px;
                border-top: 1px solid #34495e;
                padding-top: 16px;
            }

            .admin-results-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 8px;
            }

            .admin-results-header h4 {
                margin: 0;
                color: #f39c12;
                font-size: 0.9em;
                display: flex;
                align-items: center;
                gap: 6px;
            }

            .results-controls {
                display: flex;
                gap: 4px;
            }

            .results-controls button {
                background: rgba(52,73,94,0.5);
                border: none;
                color: #bdc3c7;
                padding: 4px 8px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 0.8em;
                transition: all 0.2s;
            }

            .results-controls button:hover {
                background: #f39c12;
                color: white;
            }

            .admin-results {
                background: #0c1021;
                border: 1px solid #34495e;
                border-radius: 6px;
                padding: 12px;
                max-height: 200px;
                overflow-y: auto;
                font-family: 'Courier New', monospace;
                font-size: 0.75em;
                line-height: 1.4;
                color: #2ecc71;
            }

            .console-welcome {
                color: #f39c12;
                opacity: 0.8;
            }

            .admin-log-entry {
                margin-bottom: 4px;
                padding: 2px 0;
            }

            .admin-log-entry.success {
                color: #2ecc71;
            }

            .admin-log-entry.warning {
                color: #f39c12;
            }

            .admin-log-entry.error {
                color: #e74c3c;
            }

            .admin-log-entry.info {
                color: #3498db;
            }

            .no-data {
                color: #7f8c8d;
                font-style: italic;
                text-align: center;
                padding: 20px;
                font-size: 0.8em;
            }

            /* Responsive */
            @media (max-width: 768px) {
                .admin-panel {
                    width: calc(100vw - 40px);
                    right: 20px;
                    left: 20px;
                }
                
                .crack-methods {
                    grid-template-columns: 1fr;
                }
                
                .analysis-stats {
                    grid-template-columns: 1fr;
                }
            }
        `;
        
        document.head.appendChild(styles);
    },

    setupAdminEventListeners() {
        if (!this.ui) return;

        // Onglets
        this.ui.querySelectorAll('.admin-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchAdminTab(e.target.dataset.tab);
            });
        });

        // Contrôles header
        this.ui.querySelector('.admin-close').addEventListener('click', () => {
            this.deactivate();
        });

        this.ui.querySelector('.admin-minimize').addEventListener('click', () => {
            this.toggleMinimize();
        });

        // Upload de fichier
        this.ui.querySelector('#admin-file-input').addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                this.handleAdminFile(e.target.files[0]);
            }
        });

        this.ui.querySelector('#admin-file-drop').addEventListener('click', () => {
            this.ui.querySelector('#admin-file-input').click();
        });

        // Boutons d'action
        this.ui.querySelector('#admin-crack-btn').addEventListener('click', () => {
            this.performCrack();
        });

        this.ui.querySelector('#admin-auto-crack').addEventListener('click', () => {
            this.performAutoCrack();
        });

        this.ui.querySelector('#admin-clear').addEventListener('click', () => {
            this.clearAdminConsole();
        });

        this.ui.querySelector('#forensic-analyze').addEventListener('click', () => {
            this.performForensicAnalysis();
        });

        this.ui.querySelector('#generate-master-key').addEventListener('click', () => {
            this.generateMasterKey();
            this.updateMasterKeyDisplay();
        });

        this.ui.querySelector('#update-signatures').addEventListener('click', () => {
            this.updateSignatureDatabase();
        });

        this.ui.querySelector('#clear-console').addEventListener('click', () => {
            this.clearAdminConsole();
        });

        this.ui.querySelector('#export-results').addEventListener('click', () => {
            this.exportResults();
        });

        // Drag du panneau
        this.makeAdminDraggable();
    },

    setupAdminDragDrop() {
        const dropZone = this.ui.querySelector('#admin-file-drop');
        
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

        dropZone.addEventListener('drop', (e) => {
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.handleAdminFile(files[0]);
            }
        });
    },

    makeAdminDraggable() {
        const header = this.ui.querySelector('.admin-header');
        let isDragging = false;
        let startX, startY, startLeft, startTop;

        header.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            const rect = this.ui.getBoundingClientRect();
            startLeft = rect.left;
            startTop = rect.top;
            
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });

        const onMouseMove = (e) => {
            if (!isDragging) return;
            
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            this.ui.style.left = (startLeft + deltaX) + 'px';
            this.ui.style.top = (startTop + deltaY) + 'px';
            this.ui.style.right = 'auto';
        };

        const onMouseUp = () => {
            isDragging = false;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };
    },

    // ========== GESTION DES FICHIERS ==========

    handleAdminFile(file) {
        this.currentFile = file;
        
        // Mise à jour de l'interface
        const fileInfo = this.ui.querySelector('#admin-file-info');
        const fileName = fileInfo.querySelector('.file-name');
        const fileSize = fileInfo.querySelector('.file-size');
        const fileType = fileInfo.querySelector('.file-type');
        
        fileName.textContent = `📄 ${file.name}`;
        fileSize.textContent = `📊 ${this.formatFileSize(file.size)}`;
        fileType.textContent = `🏷️ ${file.type || 'Type inconnu'}`;
        
        fileInfo.style.display = 'block';
        
        // Analyse automatique
        this.quickAnalyze(file);
        
        this.adminLog(`Fichier chargé: ${file.name} (${this.formatFileSize(file.size)})`, 'info');
    },

    async quickAnalyze(file) {
        try {
            const arrayBuffer = await this.fileToArrayBuffer(file);
            const uint8Array = new Uint8Array(arrayBuffer);
            
            // Calcul de l'entropie
            const entropy = this.calculateEntropy(uint8Array);
            
            // Recherche de signatures
            const signatures = await this.findSignatures(uint8Array);
            
            // Probabilité de stéganographie
            let probability = 'Faible';
            if (signatures.length > 0) probability = 'Très élevée';
            else if (entropy > 7.5) probability = 'Élevée';
            else if (entropy > 6.0) probability = 'Modérée';
            
            // Mise à jour de l'interface
            this.ui.querySelector('#entropy-value').textContent = entropy.toFixed(3);
            this.ui.querySelector('#signatures-count').textContent = signatures.length;
            this.ui.querySelector('#stego-probability').textContent = probability;
            
            // Affichage des empreintes
            this.displayFingerprints(signatures);
            
        } catch (error) {
            this.adminLog(`Erreur d'analyse rapide: ${error.message}`, 'error');
        }
    },

    async findSignatures(data) {
        const signatures = [
            { name: 'OBSCURA_ULTRA_2024', pattern: 'OBSCURA_ULTRA_2024' },
            { name: 'OBSCURA_META_START', pattern: 'OBSCURA_META_START' },
            { name: 'OBSCURA_STEGO_2024', pattern: 'OBSCURA_STEGO_2024' },
            { name: 'ADM_', pattern: 'ADM_' },
            { name: 'PNG_HEADER', pattern: '\x89PNG' },
            { name: 'JPEG_HEADER', pattern: '\xFF\xD8\xFF' },
            { name: 'ZIP_HEADER', pattern: 'PK\x03\x04' },
            { name: 'PDF_HEADER', pattern: '%PDF' }
        ];
        
        const found = [];
        
        for (const sig of signatures) {
            const pattern = new TextEncoder().encode(sig.pattern);
            const indices = this.findPatternIndices(data, pattern);
            
            if (indices.length > 0) {
                found.push({
                    name: sig.name,
                    count: indices.length,
                    positions: indices
                });
            }
        }
        
        return found;
    },

    findPatternIndices(data, pattern) {
        const indices = [];
        
        for (let i = 0; i <= data.length - pattern.length; i++) {
            let match = true;
            for (let j = 0; j < pattern.length; j++) {
                if (data[i + j] !== pattern[j]) {
                    match = false;
                    break;
                }
            }
            if (match) {
                indices.push(i);
            }
        }
        
        return indices;
    },

    displayFingerprints(signatures) {
        const container = this.ui.querySelector('#fingerprints-list');
        
        if (signatures.length === 0) {
            container.innerHTML = '<div class="no-data">Aucune signature détectée</div>';
            return;
        }
        
        container.innerHTML = '';
        signatures.forEach(sig => {
            const item = document.createElement('div');
            item.className = 'fingerprint-item';
            item.innerHTML = `
                <strong>${sig.name}</strong><br>
                Occurrences: ${sig.count} | Positions: ${sig.positions.slice(0, 3).join(', ')}${sig.positions.length > 3 ? '...' : ''}
            `;
            container.appendChild(item);
        });
    },

    // ========== CRACKAGE ==========

    async performCrack() {
        if (!this.currentFile) {
            this.adminLog('❌ Aucun fichier sélectionné', 'error');
            return;
        }
        
        this.adminLog('🔓 Démarrage du crackage...', 'info');
        
        const selectedMethods = Array.from(this.ui.querySelectorAll('.crack-methods input:checked'))
            .map(cb => cb.value);
        
        if (selectedMethods.length === 0) {
            this.adminLog('❌ Aucune méthode sélectionnée', 'error');
            return;
        }
        
        try {
            const results = await this.executeCrackingMethods(this.currentFile, selectedMethods);
            this.displayCrackingResults(results);
            
        } catch (error) {
            this.adminLog(`❌ Erreur de crackage: ${error.message}`, 'error');
        }
    },

    async performAutoCrack() {
        if (!this.currentFile) {
            this.adminLog('❌ Aucun fichier sélectionné', 'error');
            return;
        }
        
        this.adminLog('🎯 Auto-crack en cours...', 'info');
        
        try {
            // Toutes les méthodes en séquence
            const results = await this.executeCrackingMethods(this.currentFile, this.crackingMethods);
            
            // Analyse des résultats pour trouver le meilleur
            const bestResult = this.selectBestResult(results);
            
            if (bestResult) {
                this.adminLog(`✅ Auto-crack réussi: ${bestResult.method}`, 'success');
                this.displayExtractedData(bestResult.data, bestResult.method);
            } else {
                this.adminLog('❌ Auto-crack échoué - aucune donnée trouvée', 'error');
            }
            
        } catch (error) {
            this.adminLog(`❌ Erreur auto-crack: ${error.message}`, 'error');
        }
    },

    async executeCrackingMethods(file, methods) {
        const results = {};
        
        for (const method of methods) {
            try {
                this.adminLog(`⏳ Test: ${method}`, 'info');
                
                switch (method) {
                    case 'signature_scan':
                        results[method] = await this.crackSignatureScan(file);
                        break;
                    case 'entropy_analysis':
                        results[method] = await this.crackEntropyAnalysis(file);
                        break;
                    case 'pattern_detection':
                        results[method] = await this.crackPatternDetection(file);
                        break;
                    case 'brute_force_decrypt':
                        results[method] = await this.crackBruteForceDecrypt(file);
                        break;
                    case 'metadata_extraction':
                        results[method] = await this.crackMetadataExtraction(file);
                        break;
                    case 'forensic_analysis':
                        results[method] = await this.crackForensicAnalysis(file);
                        break;
                }
                
                if (results[method] && results[method].success) {
                    this.adminLog(`✅ ${method}: ${results[method].data.length} octets extraits`, 'success');
                } else {
                    this.adminLog(`❌ ${method}: Échec`, 'warning');
                }
                
            } catch (error) {
                this.adminLog(`💥 ${method}: ${error.message}`, 'error');
                results[method] = { success: false, error: error.message };
            }
        }
        
        return results;
    },

    // ========== MÉTHODES DE CRACKAGE ==========

    async crackSignatureScan(file) {
        const arrayBuffer = await this.fileToArrayBuffer(file);
        const uint8Array = new Uint8Array(arrayBuffer);
        
        // Recherche des signatures admin
        const adminSig = 'ADM_';
        const sigBytes = new TextEncoder().encode(adminSig);
        
        for (let i = 0; i <= uint8Array.length - sigBytes.length; i++) {
            let match = true;
            for (let j = 0; j < sigBytes.length; j++) {
                if (uint8Array[i + j] !== sigBytes[j]) {
                    match = false;
                    break;
                }
            }
            
            if (match) {
                // Extraction des données après la signature
                const extractedData = uint8Array.slice(i + sigBytes.length, i + sigBytes.length + 1000);
                return {
                    success: true,
                    data: extractedData,
                    method: 'signature_scan',
                    position: i
                };
            }
        }
        
        return { success: false };
    },

    async crackEntropyAnalysis(file) {
        const arrayBuffer = await this.fileToArrayBuffer(file);
        const uint8Array = new Uint8Array(arrayBuffer);
        
        // Analyse par blocs pour trouver les zones suspectes
        const blockSize = 1024;
        let suspiciousBlocks = [];
        
        for (let i = 0; i < uint8Array.length; i += blockSize) {
            const block = uint8Array.slice(i, i + blockSize);
            const entropy = this.calculateEntropy(block);
            
            if (entropy > 7.5) { // Entropie très élevée
                suspiciousBlocks.push({
                    start: i,
                    end: i + blockSize,
                    entropy: entropy,
                    data: block
                });
            }
        }
        
        if (suspiciousBlocks.length > 0) {
            // Retour du bloc le plus suspect
            const bestBlock = suspiciousBlocks.sort((a, b) => b.entropy - a.entropy)[0];
            return {
                success: true,
                data: bestBlock.data,
                method: 'entropy_analysis',
                entropy: bestBlock.entropy
            };
        }
        
        return { success: false };
    },

    async crackPatternDetection(file) {
        const arrayBuffer = await this.fileToArrayBuffer(file);
        const uint8Array = new Uint8Array(arrayBuffer);
        
        // Recherche de patterns répétitifs suspects
        const patterns = this.detectSuspiciousPatterns(uint8Array);
        
        if (patterns.length > 0) {
            // Extraction autour du pattern le plus fréquent
            const mainPattern = patterns[0];
            const extractStart = Math.max(0, mainPattern.position - 100);
            const extractEnd = Math.min(uint8Array.length, mainPattern.position + 500);
            
            return {
                success: true,
                data: uint8Array.slice(extractStart, extractEnd),
                method: 'pattern_detection',
                pattern: mainPattern
            };
        }
        
        return { success: false };
    },

    async crackBruteForceDecrypt(file) {
        // Simulation de force brute avec mots de passe courants
        const commonPasswords = ['password', '123456', 'admin', 'secret', 'obscura', ''];
        
        if (!window.app || !window.app.steganography) {
            return { success: false, error: 'App non disponible' };
        }
        
        try {
            // Tentative d'extraction avec différentes méthodes
            const methods = ['metadata', 'lsb'];
            
            for (const method of methods) {
                try {
                    const extracted = await window.app.steganography.extractData(file, method);
                    
                    if (extracted && extracted.length > 0) {
                        // Tentative de déchiffrement avec mots de passe courants
                        for (const pwd of commonPasswords) {
                            try {
                                if (window.app.ultraCrypte) {
                                    const decrypted = await window.app.ultraCrypte.decrypt(extracted, pwd);
                                    return {
                                        success: true,
                                        data: decrypted,
                                        method: 'brute_force_decrypt',
                                        password: pwd,
                                        stegoMethod: method
                                    };
                                }
                            } catch (e) {
                                continue;
                            }
                        }
                        
                        // Si pas de déchiffrement, retour des données brutes
                        return {
                            success: true,
                            data: extracted,
                            method: 'brute_force_decrypt',
                            stegoMethod: method
                        };
                    }
                } catch (e) {
                    continue;
                }
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
        
        return { success: false };
    },

    async crackMetadataExtraction(file) {
        if (!window.app || !window.app.steganography) {
            return { success: false, error: 'App non disponible' };
        }
        
        try {
            const extracted = await window.app.steganography.metadataExtract(file, 'unknown');
            
            if (extracted && extracted.length > 0) {
                return {
                    success: true,
                    data: extracted,
                    method: 'metadata_extraction'
                };
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
        
        return { success: false };
    },

    async crackForensicAnalysis(file) {
        const arrayBuffer = await this.fileToArrayBuffer(file);
        const uint8Array = new Uint8Array(arrayBuffer);
        
        // Analyse forensique simplifiée
        const analysis = {
            fileStructure: this.analyzeFileStructure(uint8Array),
            hiddenSections: this.findHiddenSections(uint8Array),
            anomalies: this.detectAnomalies(uint8Array)
        };
        
        // Si des sections cachées sont trouvées
        if (analysis.hiddenSections.length > 0) {
            const section = analysis.hiddenSections[0];
            return {
                success: true,
                data: uint8Array.slice(section.start, section.end),
                method: 'forensic_analysis',
                analysis: analysis
            };
        }
        
        return { success: false, analysis: analysis };
    },

    // ========== ANALYSE FORENSIQUE ==========

    async performForensicAnalysis() {
        if (!this.currentFile) {
            this.adminLog('❌ Aucun fichier sélectionné', 'error');
            return;
        }
        
        this.adminLog('🔬 Analyse forensique en cours...', 'info');
        
        try {
            const arrayBuffer = await this.fileToArrayBuffer(this.currentFile);
            const uint8Array = new Uint8Array(arrayBuffer);
            
            const analysis = {
                timestamp: new Date().toISOString(),
                fileInfo: {
                    name: this.currentFile.name,
                    size: this.currentFile.size,
                    type: this.currentFile.type,
                    lastModified: new Date(this.currentFile.lastModified).toISOString()
                },
                entropy: this.calculateEntropy(uint8Array),
                signatures: await this.findSignatures(uint8Array),
                structure: this.analyzeFileStructure(uint8Array),
                anomalies: this.detectAnomalies(uint8Array)
            };
            
            this.displayForensicResults(analysis);
            
        } catch (error) {
            this.adminLog(`❌ Erreur analyse forensique: ${error.message}`, 'error');
        }
    },

    analyzeFileStructure(data) {
        const structure = {
            segments: [],
            headers: [],
            footers: []
        };
        
        // Détection des headers de fichiers
        const headers = [
            { name: 'PNG', pattern: [0x89, 0x50, 0x4E, 0x47] },
            { name: 'JPEG', pattern: [0xFF, 0xD8, 0xFF] },
            { name: 'ZIP', pattern: [0x50, 0x4B, 0x03, 0x04] },
            { name: 'PDF', pattern: [0x25, 0x50, 0x44, 0x46] }
        ];
        
        headers.forEach(header => {
            const positions = this.findPatternIndices(data, new Uint8Array(header.pattern));
            positions.forEach(pos => {
                structure.headers.push({
                    type: header.name,
                    position: pos
                });
            });
        });
        
        return structure;
    },

    findHiddenSections(data) {
        const sections = [];
        const threshold = 0.1; // 10% de différence d'entropie
        
        // Analyse par fenêtres glissantes
        const windowSize = 1024;
        let baseEntropy = this.calculateEntropy(data.slice(0, windowSize));
        
        for (let i = windowSize; i < data.length - windowSize; i += windowSize) {
            const window = data.slice(i, i + windowSize);
            const entropy = this.calculateEntropy(window);
            
            if (Math.abs(entropy - baseEntropy) > threshold) {
                sections.push({
                    start: i,
                    end: i + windowSize,
                    entropy: entropy,
                    deviation: Math.abs(entropy - baseEntropy)
                });
            }
        }
        
        return sections;
    },

    detectAnomalies(data) {
        const anomalies = [];
        
        // Détection de répétitions inhabituelles
        const repetitions = this.findRepetitions(data);
        if (repetitions.length > 10) {
            anomalies.push({
                type: 'excessive_repetitions',
                count: repetitions.length
            });
        }
        
        // Détection de null bytes suspects
        let nullCount = 0;
        for (let i = 0; i < data.length; i++) {
            if (data[i] === 0) nullCount++;
        }
        
        if (nullCount > data.length * 0.1) {
            anomalies.push({
                type: 'excessive_null_bytes',
                percentage: (nullCount / data.length * 100).toFixed(2)
            });
        }
        
        return anomalies;
    },

    findRepetitions(data) {
        const repetitions = [];
        const seen = new Map();
        
        // Recherche de séquences de 4 octets répétées
        for (let i = 0; i <= data.length - 4; i++) {
            const sequence = Array.from(data.slice(i, i + 4)).join(',');
            
            if (seen.has(sequence)) {
                repetitions.push({
                    sequence: sequence,
                    positions: [seen.get(sequence), i]
                });
            } else {
                seen.set(sequence, i);
            }
        }
        
        return repetitions;
    },

    detectSuspiciousPatterns(data) {
        const patterns = [];
        
        // Recherche de patterns de 8 octets qui se répètent
        const patternMap = new Map();
        
        for (let i = 0; i <= data.length - 8; i += 8) {
            const pattern = Array.from(data.slice(i, i + 8)).join(',');
            
            if (patternMap.has(pattern)) {
                patternMap.set(pattern, patternMap.get(pattern) + 1);
            } else {
                patternMap.set(pattern, 1);
            }
        }
        
        // Tri par fréquence
        for (let [pattern, count] of patternMap.entries()) {
            if (count > 2) { // Pattern répété plus de 2 fois
                patterns.push({
                    pattern: pattern,
                    count: count,
                    position: data.indexOf(pattern.split(',').map(x => parseInt(x)))
                });
            }
        }
        
        return patterns.sort((a, b) => b.count - a.count);
    },

    // ========== AFFICHAGE DES RÉSULTATS ==========

    displayCrackingResults(results) {
        this.adminLog('═══ RÉSULTATS DU CRACKAGE ═══', 'info');
        
        for (const [method, result] of Object.entries(results)) {
            if (result.success) {
                this.adminLog(`✅ ${method}: ${result.data.length} octets`, 'success');
                
                // Aperçu des données
                const preview = this.getDataPreview(result.data);
                this.adminLog(`   Aperçu: ${preview}`, 'info');
                
                if (result.method) {
                    this.adminLog(`   Méthode: ${result.method}`, 'info');
                }
            } else {
                this.adminLog(`❌ ${method}: Échec`, 'error');
            }
        }
    },

    displayExtractedData(data, method) {
        this.adminLog(`🎯 DONNÉES EXTRAITES (${method})`, 'success');
        this.adminLog(`Taille: ${data.length} octets`, 'info');
        
        // Tentative de décodage texte
        try {
            const text = new TextDecoder('utf-8').decode(data);
            if (!/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/.test(text.slice(0, 100))) {
                this.adminLog('Type détecté: Texte UTF-8', 'info');
                this.adminLog(`Contenu: ${text.slice(0, 200)}${text.length > 200 ? '...' : ''}`, 'info');
            } else {
                this.displayBinaryData(data);
            }
        } catch (e) {
            this.displayBinaryData(data);
        }
        
        // Proposition de sauvegarde
        this.offerDataDownload(data, method);
    },

    displayBinaryData(data) {
        this.adminLog('Type détecté: Données binaires', 'info');
        
        // Affichage hexadécimal des premiers octets
        const hex = Array.from(data.slice(0, 32))
            .map(b => b.toString(16).padStart(2, '0'))
            .join(' ');
        
        this.adminLog(`Hex (32 premiers octets): ${hex}`, 'info');
        
        // Détection du type de fichier possible
        const fileType = this.detectFileType(data);
        if (fileType) {
            this.adminLog(`Type de fichier possible: ${fileType}`, 'info');
        }
    },

    displayForensicResults(analysis) {
        const timeline = this.ui.querySelector('#timeline-container');
        timeline.innerHTML = '';
        
        // Ajout des événements à la timeline
        const events = [
            { time: 'T+0s', event: 'Début analyse forensique', type: 'info' },
            { time: 'T+0.1s', event: `Fichier: ${analysis.fileInfo.name} (${this.formatFileSize(analysis.fileInfo.size)})`, type: 'info' },
            { time: 'T+0.2s', event: `Entropie globale: ${analysis.entropy.toFixed(3)}`, type: 'info' },
            { time: 'T+0.5s', event: `Signatures trouvées: ${analysis.signatures.length}`, type: analysis.signatures.length > 0 ? 'success' : 'warning' },
            { time: 'T+1.0s', event: `Headers détectés: ${analysis.structure.headers.length}`, type: 'info' },
            { time: 'T+1.5s', event: `Anomalies détectées: ${analysis.anomalies.length}`, type: analysis.anomalies.length > 0 ? 'warning' : 'success' },
            { time: 'T+2.0s', event: 'Analyse terminée', type: 'success' }
        ];
        
        events.forEach(event => {
            const item = document.createElement('div');
            item.className = `timeline-item ${event.type}`;
            item.innerHTML = `<strong>${event.time}</strong> - ${event.event}`;
            timeline.appendChild(item);
        });
        
        // Log détaillé
        this.adminLog('═══ ANALYSE FORENSIQUE TERMINÉE ═══', 'success');
        this.adminLog(`Entropie: ${analysis.entropy.toFixed(3)}`, 'info');
        this.adminLog(`Signatures: ${analysis.signatures.length}`, 'info');
        this.adminLog(`Anomalies: ${analysis.anomalies.length}`, 'info');
        
        analysis.signatures.forEach(sig => {
            this.adminLog(`  • ${sig.name}: ${sig.count} occurrence(s)`, 'info');
        });
    },

    offerDataDownload(data, method) {
        // Création d'un bouton de téléchargement temporaire
        const downloadBtn = document.createElement('button');
        downloadBtn.className = 'btn-admin btn-success';
        downloadBtn.innerHTML = '<i class="fas fa-download"></i> Télécharger les données';
        downloadBtn.style.margin = '8px 0';
        
        downloadBtn.onclick = () => {
            const timestamp = new Date().toISOString().slice(0, 19).replace(/[:-]/g, '');
            const filename = `admin_extracted_${method}_${timestamp}.bin`;
            
            const blob = new Blob([data], { type: 'application/octet-stream' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(url);
            
            this.adminLog(`💾 Données sauvegardées: ${filename}`, 'success');
        };
        
        // Ajout temporaire à la console
        const results = this.ui.querySelector('.admin-results');
        results.appendChild(downloadBtn);
        
        // Suppression automatique après 30 secondes
        setTimeout(() => {
            if (downloadBtn.parentNode) {
                downloadBtn.parentNode.removeChild(downloadBtn);
            }
        }, 30000);
    },

    // ========== UTILITAIRES ==========

    switchAdminTab(tabName) {
        // Désactivation de tous les onglets
        this.ui.querySelectorAll('.admin-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        this.ui.querySelectorAll('.admin-tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Activation de l'onglet sélectionné
        this.ui.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        this.ui.querySelector(`#admin-${tabName}`).classList.add('active');
    },

    toggleMinimize() {
        const content = this.ui.querySelector('.admin-content');
        const icon = this.ui.querySelector('.admin-minimize i');
        
        if (content.style.display === 'none') {
            content.style.display = 'block';
            icon.className = 'fas fa-minus';
        } else {
            content.style.display = 'none';
            icon.className = 'fas fa-plus';
        }
    },

    adminLog(message, type = 'info') {
        const results = this.ui.querySelector('.admin-results');
        const timestamp = new Date().toLocaleTimeString();
        
        const logEntry = document.createElement('div');
        logEntry.className = `admin-log-entry ${type}`;
        logEntry.textContent = `[${timestamp}] ${message}`;
        
        results.appendChild(logEntry);
        results.scrollTop = results.scrollHeight;
        
        // Console standard aussi
        console.log(`[ADMIN] ${message}`);
    },

    clearAdminConsole() {
        const results = this.ui.querySelector('.admin-results');
        results.innerHTML = '<div class="console-welcome"><pre>Console effacée.\nPrête pour de nouvelles analyses.</pre></div>';
    },

    exportResults() {
        const results = this.ui.querySelector('.admin-results');
        const content = results.textContent;
        
        const timestamp = new Date().toISOString().slice(0, 19).replace(/[:-]/g, '');
        const filename = `obscura_admin_log_${timestamp}.txt`;
        
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
        
        this.adminLog(`📋 Log exporté: ${filename}`, 'success');
    },

    updateSignatureDatabase() {
        this.adminLog('🔄 Mise à jour de la base de signatures...', 'info');
        
        // Simulation de mise à jour
        setTimeout(() => {
            const count = Math.floor(Math.random() * 5) + 12;
            this.ui.querySelector('#known-signatures').textContent = count;
            this.ui.querySelector('#last-update').textContent = 'Maintenant';
            this.adminLog(`✅ Base mise à jour: ${count} signatures`, 'success');
        }, 1500);
    },

    generateMasterKey() {
        const array = new Uint8Array(32);
        crypto.getRandomValues(array);
        this.masterKey = Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
        
        this.adminLog('🔑 Nouvelle clé maître générée', 'success');
    },

    updateMasterKeyDisplay() {
        if (this.masterKey) {
            const display = this.ui.querySelector('#master-key-display');
            display.textContent = `Clé: ${this.masterKey.slice(0, 16)}...`;
            display.title = this.masterKey;
        }
    },

    showAdminNotification(message, type) {
        // Notification discrète en bas à droite
        const notification = document.createElement('div');
        notification.className = 'admin-notification';
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: ${type === 'success' ? '#2ecc71' : '#f39c12'};
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            font-size: 0.9em;
            z-index: 10001;
            animation: slideInUp 0.3s ease-out;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutDown 0.3s ease-in';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    },

    selectBestResult(results) {
        // Sélection du meilleur résultat basé sur différents critères
        const validResults = Object.values(results).filter(r => r.success);
        
        if (validResults.length === 0) return null;
        
        // Priorité aux méthodes les plus fiables
        const priority = {
            'signature_scan': 10,
            'metadata_extraction': 8,
            'forensic_analysis': 6,
            'brute_force_decrypt': 4,
            'entropy_analysis': 2,
            'pattern_detection': 1
        };
        
        return validResults.sort((a, b) => {
            const priorityA = priority[a.method] || 0;
            const priorityB = priority[b.method] || 0;
            
            if (priorityA !== priorityB) {
                return priorityB - priorityA;
            }
            
            // En cas d'égalité, privilégier la plus grande quantité de données
            return b.data.length - a.data.length;
        })[0];
    },

    getDataPreview(data) {
        try {
            const text = new TextDecoder('utf-8').decode(data.slice(0, 50));
            if (!/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/.test(text)) {
                return `"${text}${data.length > 50 ? '...' : ''}"`;
            }
        } catch (e) {
            // Pas du texte
        }
        
        // Affichage hexadécimal
        return Array.from(data.slice(0, 16))
            .map(b => b.toString(16).padStart(2, '0'))
            .join(' ') + (data.length > 16 ? '...' : '');
    },

    detectFileType(data) {
        const signatures = [
            { type: 'PNG', signature: [0x89, 0x50, 0x4E, 0x47] },
            { type: 'JPEG', signature: [0xFF, 0xD8, 0xFF] },
            { type: 'GIF', signature: [0x47, 0x49, 0x46] },
            { type: 'ZIP', signature: [0x50, 0x4B, 0x03, 0x04] },
            { type: 'PDF', signature: [0x25, 0x50, 0x44, 0x46] },
            { type: 'MP3', signature: [0x49, 0x44, 0x33] }
        ];
        
        for (const sig of signatures) {
            if (data.length >= sig.signature.length) {
                let match = true;
                for (let i = 0; i < sig.signature.length; i++) {
                    if (data[i] !== sig.signature[i]) {
                        match = false;
                        break;
                    }
                }
                if (match) return sig.type;
            }
        }
        
        return null;
    },

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
    },

    formatFileSize(bytes) {
        if (bytes === 0) return '0 B';
        
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },

    async fileToArrayBuffer(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsArrayBuffer(file);
        });
    }
};

console.log('🔧 Mode admin prêt - Utilisez Ctrl+Shift+A (x3) pour activer');

}

// Auto-activation si déjà en mode debug
if (window.location.hash === '#admin' || localStorage.getItem('obscura_debug') === 'true') {
    setTimeout(() => {
        if (window.adminMode && !window.adminMode.isActive) {
            window.adminMode.activate();
        }
    }, 1000);
}