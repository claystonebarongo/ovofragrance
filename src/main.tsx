import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { CartProvider } from './cart';
import { ErrorBoundary } from './ui';
import { loadPool } from './photos';
import './styles.css';

loadPool().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ErrorBoundary>
        <HashRouter>
          <CartProvider>
            <App />
          </CartProvider>
        </HashRouter>
      </ErrorBoundary>
    </StrictMode>
  );
});
