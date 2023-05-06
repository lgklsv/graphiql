import {
  combineReducers,
  configureStore,
  PreloadedState,
} from '@reduxjs/toolkit';
import { graphql } from 'shared/api';
import userReducer from './reducers/UserSlice';
import docsReducer from './reducers/DocsSlice';
import tabsReducer from './reducers/TabSlice';

const rootReducer = combineReducers({
  userReducer,
  docsReducer,
  [graphql.schema.reducerPath]: graphql.schema.reducer,
  tabsReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(graphql.schema.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppState = ReturnType<typeof setupStore>;
export type AppDispatch = AppState['dispatch'];
