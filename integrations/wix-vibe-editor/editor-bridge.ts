// integrations/wix-vibe-editor/editor-bridge.ts

/**
 * WixVibeEditorBridge
 * Thin wrapper around the Wix editor instance injected by the @wix/astro
 * integration. Only methods that are verified to exist on the instance are
 * called; anything else is intentionally left as a no-op so the bridge never
 * throws at runtime.
 */
class WixVibeEditorBridge {
    private editorInstance: any;

    constructor(editorInstance: any) {
        this.editorInstance = editorInstance;
        this.initialize();
    }

    private initialize() {
        this.setupEventListeners();
    }

    private setupEventListeners() {
        if (typeof this.editorInstance?.on === 'function') {
            this.editorInstance.on('ready', this.handleReady.bind(this));
        }
    }

    private handleReady() {
        // Editor instance is ready – additional setup can be triggered here.
    }
}

// Export the editor bridge
export default WixVibeEditorBridge;
