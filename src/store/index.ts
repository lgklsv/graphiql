import {
  AnyAction,
  combineReducers,
  configureStore,
  PreloadedState,
} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { graphql } from 'shared/api';
import { tabsResponseTransform } from 'shared/lib/localStorage/local-storage';
import userReducer from './reducers/UserSlice';
import tabsReducer from './reducers/TabSlice';
import settingsReducer from './reducers/SettingsSlice';
import apiUrlReducer from './reducers/ApiSlice';

const persistConfig = {
  key: 'graphiql',
  storage,
  throttle: 400,
  transforms: [tabsResponseTransform],
  blacklist: [graphql.sandboxQueries.reducerPath],
};

const appReducer = combineReducers({
  userReducer,
  tabsReducer,
  settingsReducer,
  apiUrlReducer,
  [graphql.sandboxQueries.reducerPath]: graphql.sandboxQueries.reducer,
});

const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: AnyAction
) => {
  if (action.type === 'user/removeUser') {
    storage.removeItem('persist:graphiql');
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: persistedReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(graphql.sandboxQueries.middleware),
  });
};

export const store = setupStore();
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppState = ReturnType<typeof setupStore>;
export type AppDispatch = AppState['dispatch'];
