import {
  AnyAction,
  combineReducers,
  configureStore,
  PreloadedState,
} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { graphql } from 'shared/api';
import userReducer, { removeUser } from './reducers/UserSlice';
import tabsReducer from './reducers/TabSlice';

const persistConfig = {
  key: 'graphiql',
  storage,
  throttle: 400,
  blacklist: [graphql.sandboxQueries.reducerPath], // we exclude api-slices from saving in localStorage
};

const appReducer = combineReducers({
  userReducer,
  tabsReducer,
  [graphql.sandboxQueries.reducerPath]: graphql.sandboxQueries.reducer,
});

// When user logs out, the state is reset to the initial "fresh" state.
// If the action 'user/removeUser' is fired (clicking logout-button and deleting user data), we return undefined as state.
// That means for redux - load the fresh initial state/reset state.
// In this case we can reset state without reloading the page.
// It assures that if the user logs in on the welcome page with other login and without reloading, he/she will get a fresh sandbox.

const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: AnyAction
) => {
  if (action.type === removeUser) {
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
