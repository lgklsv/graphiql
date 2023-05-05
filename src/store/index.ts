import {
  combineReducers,
  configureStore,
  PreloadedState,
} from '@reduxjs/toolkit';
import { schema } from 'shared/api';
import userReducer from './reducers/UserSlice';
import docsReducer from './reducers/DocsSlice';

const rootReducer = combineReducers({
  userReducer,
  docsReducer,
  [schema.schema.reducerPath]: schema.schema.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(schema.schema.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppState = ReturnType<typeof setupStore>;
export type AppDispatch = AppState['dispatch'];
