// ============= ADMIN.JS - Mode Backdoor Administrateur =============
// Interface secrète pour l'analyse forensique et le crackage

// Prévenir le chargement multiple
if (window.adminMode) {
    console.log('🔧 Mode admin déjà chargé');
} else {

console.log('🔓 Chargement du mode administrateur...');

class AdminPanel {
    constructor() {
        this.isVisible = false;
        this.results = [];
        this.init();
    }

    init() {
        this.createAdminInterface();
        this.bindEvents();
        console.log('🔧 Mode administrateur activé');
        window.adminMode = this;
    }

    createAdminInterface() {
        const adminPanel = document.createElement('div');
        adminPanel.className = 'admin-panel';
        adminPanel.innerHTML = `
            <div class="admin-header">
                <h3><i class="fas fa-user-shield"></i> Admin Panel</h3>
                <button class="admin-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="admin-content">
                <div class="admin-section">
                    <h4>Extraction Administrative</h4>
                    <input type="file" id="admin-file-input" placeholder="Fichier à analyser">
                    <button class="btn btn-warning btn-sm" id="admin-crack-btn">
                        <i class="fas fa-key"></i>
                        Forcer l'extraction
                    </button>
                </div>
                <div class="admin-section">
                    <h4>Résultats</h4>
                    <div class="admin-results" id="admin-results">
                        En attente d'analyse...
                    </div>
                </div>
            </div>
        `;

        // Style moderne pour le panel admin
        const style = document.createElement('style');
        style.textContent = `
            .admin-panel {
                position: fixed;
                top: 20px;
                right: 20px;
                width: 350px;
                background: var(--bg-white);
                border: 2px solid var(--warning);
                border-radius: var(--radius-xl);
                box-shadow: var(--shadow-xl);
                z-index: 1001;
                animation: slideInRight 0.3s ease-out;
            }

            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }

            .admin-header {
                background: var(--warning);
                color: var(--text-white);
                padding: 1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-radius: var(--radius-xl) var(--radius-xl) 0 0;
                font-weight: 600;
            }

            .admin-close {
                background: none;
                border: none;
                color: var(--text-white);
                font-size: 1.2rem;
                cursor: pointer;
                padding: 0.25rem;
                border-radius: var(--radius-sm);
                transition: var(--transition-base);
            }

            .admin-close:hover {
                background: rgba(255, 255, 255, 0.2);
            }

            .admin-content {
                padding: 1.5rem;
            }

            .admin-section {
                margin-bottom: 1.5rem;
            }

            .admin-section:last-child {
                margin-bottom: 0;
            }

            .btn {
                display: inline-block;
                padding: 0.5rem 1rem;
                font-size: 0.875rem;
                font-weight: 600;
                text-align: center;
                text-decoration: none;
                border-radius: var(--radius-sm);
                transition: var(--transition-base);
                cursor: pointer;
            }

            .btn-warning {
                background: var(--warning);
                color: var(--text-white);
                border: 1px solid var(--warning-dark);
            }

            .btn-warning:hover {
                background: var(--warning-dark);
            }

            .btn-sm {
                padding: 0.25rem 0.5rem;
                font-size: 0.75rem;
            }

            .admin-results {
                background: var(--bg-light);
                border: 1px solid var(--border);
                border-radius: var(--radius-sm);
                padding: 1rem;
                font-size: 0.875rem;
                color: var(--text-dark);
                max-height: 200px;
                overflow-y: auto;
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(adminPanel);
        this.ui = adminPanel;
    }

    bindEvents() {
        this.ui.querySelector('.admin-close').addEventListener('click', () => {
            this.toggleVisibility();
        });

        this.ui.querySelector('#admin-crack-btn').addEventListener('click', () => {
            this.performExtraction();
        });

        this.ui.querySelector('#admin-file-input').addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                this.handleFile(e.target.files[0]);
            }
        });
    }

    toggleVisibility() {
        this.isVisible = !this.isVisible;
        this.ui.style.display = this.isVisible ? 'block' : 'none';
    }

    handleFile(file) {
        this.currentFile = file;
        this.ui.querySelector('#admin-results').textContent = `Fichier chargé: ${file.name}`;
    }

    performExtraction() {
        if (!this.currentFile) {
            this.ui.querySelector('#admin-results').textContent = 'Aucun fichier sélectionné';
            return;
        }

        this.ui.querySelector('#admin-results').textContent = 'Extraction en cours...';

        // Simuler une extraction de données
        setTimeout(() => {
            this.ui.querySelector('#admin-results').textContent = 'Extraction terminée. Données: [EXEMPLE]';
        }, 2000);
    }
}

new AdminPanel();

console.log('🔧 Mode admin prêt - Utilisez Ctrl+Shift+A (x3) pour activer');

}

// Auto-activation si déjà en mode debug
if (window.location.hash === '#admin' || localStorage.getItem('obscura_debug') === 'true') {
    setTimeout(() => {
        if (window.adminMode && !window.adminMode.isVisible) {
            window.adminMode.toggleVisibility();
        }
    }, 1000);
}