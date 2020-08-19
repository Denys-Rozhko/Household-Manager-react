import { configureStore, combineReducers, createSlice } from "@reduxjs/toolkit";

import infoReducer from "./info";

const mainSlice = createSlice({
  name: "main",
  initialState: {
    error: null
  },
  reducers: {
    setError(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    }
  }
});

export const { setError, clearError } = mainSlice.actions;

const store = configureStore({
  reducer: combineReducers({
    main: mainSlice.reducer,
    info: infoReducer,
  })
});

export default store;