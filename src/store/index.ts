import {
  combineReducers,
  configureStore,
  PreloadedState,
} from '@reduxjs/toolkit';
import { graphql } from 'shared/api';
import userReducer from './reducers/UserSlice';
import tabsReducer from './reducers/TabSlice';

const rootReducer = combineReducers({
  userReducer,
  tabsReducer,
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

export type RootState = ReturnType<typeof rootReducer>;
export type AppState = ReturnType<typeof setupStore>;
export type AppDispatch = AppState['dispatch'];
