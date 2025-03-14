
declare module '@capacitor/app' {
  export interface AppState {
    isActive: boolean;
  }
  
  export interface BackButtonListenerEvent {
    canGoBack: boolean;
  }

  export interface AppPlugin {
    /**
     * Add a listener for the backButton event
     */
    addListener(
      eventName: 'backButton',
      listenerFunc: (event: BackButtonListenerEvent) => void
    ): Promise<{ remove: () => void }>;

    /**
     * Remove all listeners for this plugin
     */
    removeAllListeners(): Promise<void>;

    /**
     * Get the App status
     */
    getState(): Promise<AppState>;

    /**
     * Get info about the app
     */
    getInfo(): Promise<any>;

    /**
     * Exit the app
     */
    exitApp(): Promise<void>;

    /**
     * Get the URL the app was launched with
     */
    getLaunchUrl(): Promise<{ url: string }>;

    /**
     * Minimize the app
     */
    minimizeApp(): Promise<void>;
  }

  export const App: AppPlugin;
}

declare module '@capacitor/status-bar' {
  export enum Style {
    /**
     * Light text for dark backgrounds.
     */
    Dark = 'DARK',
    /**
     * Dark text for light backgrounds.
     */
    Light = 'LIGHT',
    /**
     * The style is based on the device appearance.
     * If the device is using Dark mode, the statusbar text will be light.
     * If the device is using Light mode, the statusbar text will be dark.
     * On Android the default will be Light.
     */
    Default = 'DEFAULT',
  }

  export interface StatusBarPlugin {
    /**
     * Set the current style of the status bar
     */
    setStyle(options: { style: Style }): Promise<void>;

    /**
     * Set the background color of the status bar
     */
    setBackgroundColor(options: { color: string }): Promise<void>;

    /**
     * Show the status bar
     */
    show(): Promise<void>;

    /**
     * Hide the status bar
     */
    hide(): Promise<void>;

    /**
     * Get info about the status bar
     */
    getInfo(): Promise<{ visible: boolean, style: Style, color?: string }>;

    /**
     * Set whether or not the status bar overlays the webview
     */
    setOverlaysWebView(options: { overlay: boolean }): Promise<void>;
  }

  export const StatusBar: StatusBarPlugin;
}
