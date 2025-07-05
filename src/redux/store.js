import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authslice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import jobSlice from "./jobSlice";
import companySlice from "./companySlice"
import applicantSlice from "./applicantSlice"

const rootReducer = combineReducers({
  auth: authSlice,
  job: jobSlice,
  company:companySlice,
  applicants:applicantSlice,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
