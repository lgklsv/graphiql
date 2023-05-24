import {
  combineReducers,
  configureStore,
  createListenerMiddleware,
  PreloadedState,
} from '@reduxjs/toolkit';

import { graphql } from 'shared/api';
import { stringifyArray } from 'shared/lib/firestore/utils';
import { updateFirestoreData } from 'shared/lib/firestore/rest-firestore';
import userReducer from './reducers/UserSlice';
import tabsReducer from './reducers/TabSlice';
import settingsReducer from './reducers/SettingsSlice';
import apiUrlReducer from './reducers/ApiSlice';
import firestoreReducer, {
  setFirestoreState,
  triggerFirestoreUpdate,
} from './reducers/FirestoreSlice';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: triggerFirestoreUpdate,
  effect: async (_, listenerApi) => {
    // Get the latest state from redux
    const state = listenerApi.getOriginalState() as RootState;
    const { tabs, activeKey } = state.tabsReducer;
    const { id } = state.userReducer;
    const { url } = state.apiUrlReducer;
    const { isCache, isStats } = state.settingsReducer;

    // Cancel running instances and debounce 500ms
    listenerApi.cancelActiveListeners();
    await listenerApi.delay(500);

    // Prepare data to send on firestore
    const stringifiedTabsArr = stringifyArray(tabs);
    const dataToSend = {
      url,
      isCache,
      isStats,
      activeKey,
      tabs: stringifiedTabsArr,
    };

    // Update firestore and dispatch some actions to handle loading state
    try {
      listenerApi.dispatch(
        setFirestoreState({ isUpdating: true, error: null })
      );
      await updateFirestoreData(id as string, dataToSend);
      listenerApi.dispatch(
        setFirestoreState({ isUpdating: false, error: null })
      );
    } catch (err) {
      if (err instanceof Error) {
        listenerApi.dispatch(
          setFirestoreState({ isUpdating: false, error: err.message })
        );
      }
    }
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
