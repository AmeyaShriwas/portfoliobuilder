import { configureStore, combineReducers } from "@reduxjs/toolkit";
import resumeReducer from './Slices/ResumeSlice';
import userReducer from './Slices/AuthSlice';
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage';

// Combine reducers
const rootReducer = combineReducers({
    resume: resumeReducer,
    user: userReducer,
});

// Persist config
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['resume', 'user'] // Specify which reducers to persist
};

// Wrap the **entire** rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer, // Use persistedReducer instead of rootReducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredPaths: ['register'],
      },
    }),
});

// Persistor for persisting store
export const persistor = persistStore(store);
