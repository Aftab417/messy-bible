import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./authSlice";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";

// Encryption transform configuration
const encryptor = encryptTransform({
  secretKey: process.env.NEXT_PUBLIC_REDUX_KEY || "default-secret-key-for-development-only-32-chars",
  onError: function (error) {
    console.error("Encryption error:", error);
    // Clear storage on encryption error
    if (typeof window !== 'undefined') {
      try {
        storage.removeItem("persist:root");
      } catch (e) {
        console.error("Failed to clear storage:", e);
      }
    }
  }
});

// Redux-persist configuration
const persistConfig = {
  key: "root",
  storage,
  transforms: [encryptor],
  timeout: 2000,
  whitelist: ["user"]
};
const rootReducer = combineReducers({
  user: userReducer
});
// Ensure correct typing
type RootReducerType = ReturnType<typeof rootReducer>;

// Persisted reducer configuration
const persistedReducer = persistReducer<RootReducerType>(
  persistConfig,
  rootReducer
);

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(logger),
  devTools: process.env.NODE_ENV !== "production"
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export default store;
