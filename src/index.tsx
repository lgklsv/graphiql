import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from 'app';
import { persistor, store } from 'store';
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
            <PersistGate
              loading={<Spinner size="large" />}
              persistor={persistor}
            >
              <App />
            </PersistGate>
          </Provider>
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  </React.StrictMode>
);
