// Wix Vibe Editor integration exports
export { default as WixVibeEditorBridge } from './editor-bridge';

type UIStateValue = Record<string, unknown>;

export class UIState {
  private state: UIStateValue;

  constructor() {
    this.state = {};
  }

  setState(newState: UIStateValue): void {
    this.state = { ...this.state, ...newState };
  }

  getState(): UIStateValue {
    return this.state;
  }
}

export const uiState = new UIState();
