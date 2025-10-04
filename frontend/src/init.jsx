import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { setupListeners } from '@reduxjs/toolkit/query';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import filter from 'leo-profanity';
import resources from './locales/ru.js';
import App from './App';
import store from './store/store';
import setupWebSocketListeners from './api/webSocketHandler.js';

const init = async () => {
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));

  const i18n = i18next.createInstance();
  const options = {
    resources,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  };

  await i18n.use(initReactI18next).init(options);

  setupWebSocketListeners(store);
  setupListeners(store.dispatch);

  const rollbarConfig = {
    accessToken: import.meta.env.VITE_ROLLBAR_TOKEN,
    environment: 'production',
  };

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
