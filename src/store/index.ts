import {
  combineReducers,
  configureStore,
  createListenerMiddleware,
  PreloadedState,
} from '@reduxjs/toolkit';
import { graphql } from 'shared/api';
import userReducer from './reducers/UserSlice';
import tabsReducer from './reducers/TabSlice';
import settingsReducer from './reducers/SettingsSlice';
import apiUrlReducer from './reducers/ApiSlice';
import firestoreReducer, {
  triggerFirestoreUpdate,
} from './reducers/FirestoreSlice';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: triggerFirestoreUpdate,
  effect: async (action, listenerApi) => {
    // Run whatever additional side-effect-y logic you want here
    console.log('update');

    const state = listenerApi.getOriginalState();
    console.log(state);

    // Can cancel other running instances
    listenerApi.cancelActiveListeners();

    // Run async logic
    // const data = await fetchData();
  },
});

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
      })
        .concat(graphql.sandboxQueries.middleware)
        .prepend(listenerMiddleware.middleware),
  });
};

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppState = ReturnType<typeof setupStore>;
export type AppDispatch = AppState['dispatch'];
