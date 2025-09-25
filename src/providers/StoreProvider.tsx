"use client";
import { Provider } from "react-redux";
import store, { persistor } from "@/redux";
import { PersistGate } from "redux-persist/integration/react";

export function StoreProvider({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Provider store={store}>
      <PersistGate 
        loading={
          <div className="flex items-center justify-center min-h-screen bg-[#6AC8C4]">
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              <p className="text-white font-medium">Loading...</p>
            </div>
          </div>
        } 
        persistor={persistor}
        onBeforeLift={() => {
          // Clear any corrupted persist data on startup
          try {
            const persistData = localStorage.getItem('persist:root');
            if (persistData) {
              JSON.parse(persistData);
            }
          } catch (error) {
            console.error('Corrupted persist data detected, clearing...', error);
            localStorage.removeItem('persist:root');
          }
        }}
      >
        {children}
      </PersistGate>
    </Provider>
  );
}
