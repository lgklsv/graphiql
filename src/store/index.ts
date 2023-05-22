import {
  combineReducers,
  configureStore,
  PreloadedState,
} from '@reduxjs/toolkit';
import { graphql } from 'shared/api';
import userReducer from './reducers/UserSlice';
import tabsReducer from './reducers/TabSlice';
import settingsReducer from './reducers/SettingsSlice';
import apiUrlReducer from './reducers/ApiSlice';
import firestoreReducer from './reducers/FirestoreSlice';

const rootReducer = combineReducers({
  userReducer,
  tabsReducer,
  settingsReducer,
  apiUrlReducer,
  firestoreReducer,
  [graphql.sandboxQueries.reducerPath]: graphql.sandboxQueries.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(graphql.sandboxQueries.middleware),
  });
};

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppState = ReturnType<typeof setupStore>;
export type AppDispatch = AppState['dispatch'];
