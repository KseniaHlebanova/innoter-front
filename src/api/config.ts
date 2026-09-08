interface AppConfig {
  apiUrl: string;
  sentryDSN: string | undefined;
  appMode: string;
}

declare global {
  interface Window {
    __APP_CONFIG__?: AppConfig;
  }
}

const config: AppConfig = {
  apiUrl: window.__APP_CONFIG__?.apiUrl ?? 'http://localhost:3000',
  sentryDSN: window.__APP_CONFIG__?.sentryDSN,
  appMode: window.__APP_CONFIG__?.appMode ?? 'dev',
};

export const API_BASE_URL = config.apiUrl;
export const APP_MODE = config.appMode;
export const SENTRY_DSN = config.sentryDSN;

export default config;
