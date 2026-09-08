import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import { initSentry } from './lib/sentry';
import './app/styles.css';

initSentry();
createRoot(document.getElementById('root')!).render(<App />);
