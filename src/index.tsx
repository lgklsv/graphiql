import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from 'app';
import { store } from 'store';
import { Spinner } from 'shared/ui';
import { ErrorBoundary } from 'shared/hoc';
import './shared/lib/i18n/i18n';
import './firebase';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary type="app">
      <Suspense fallback={<Spinner size="large" />}>
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  </React.StrictMode>
);
