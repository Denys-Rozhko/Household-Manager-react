import firebase from "firebase/app";
import { setError } from "@/store";
import { createSlice } from "@reduxjs/toolkit";
import { getUid } from "@/unstored-api/firebase-auth";

const infoSlice = createSlice({
  name: "info",
  initialState: {
    info: {}
  },
  reducers: {
    setInfo(state, action) {
      state.info = action.payload;
    },
    clearInfo(state) {
      state.info = {};
    }
  }
});

export const { setInfo, clearInfo } = infoSlice.actions;

export async function fetchInfo() {
  return async (dispatch) => {
    try {
      const uid = await getUid();
      const info = (
        await firebase
          .database()
          .ref(`users/${uid}/info`)
          .once("value")
      ).val();
      dispatch(setInfo(info));
    } catch (e) {
      console.log(e);
    }
  };
}

export async function updateInfo(toUpdate) {
  return async (dispatch, getState) => {
    try {
      const uid = await getUid();
      const updatedData = {
        ...getState.info,
        ...toUpdate
      };
      await firebase
        .database()
        .ref(`users/${uid}/info`)
        .update(toUpdate);
      dispatch(setInfo(updatedData));
    } catch (e) {
      dispatch(setError(e));
      throw e;
    }
  };
}

export default infoSlice;