// Wix Vibe Editor Integration

// Exports for editor bridge components
export { default as EditorBridge } from './components/EditorBridge';

// UI state management
export class UIState {
    constructor() {
        this.state = {};
    }

    setState(newState) {
        this.state = {...this.state, ...newState};
    }

    getState() {
        return this.state;
    }
}

// Export an instance of UIState
export const uiState = new UIState();
