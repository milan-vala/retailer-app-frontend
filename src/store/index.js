import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { FLUSH, PURGE, PAUSE, PERSIST, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "./slices/user-slice";
import productSlice from "./slices/product-slice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [],
}

const userConfig = {
  key: "user",
  storage,
  whitelist: ["isLoggedIn", "user"]
}

const rootReducer = combineReducers({
  users: persistReducer(userConfig, userSlice.reducer),
  products: productSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoreActions: [FLUSH, PURGE, PAUSE, PERSIST, REGISTER, REHYDRATE]
    }
  })
})

const persister = persistStore(store);

export default store;
export { persister };
export { userSlice };