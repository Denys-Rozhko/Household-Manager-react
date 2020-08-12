import firebase from "firebase/app";
import store, { setError } from "@/store";
import { getUid } from "./firebase-auth";

export default {
  async addRecord(record) {
    try {
      const uid = getUid();
      return firebase
        .database()
        .ref(`users/${uid}/records/`)
        .push(record);
    } catch (e) {
      store.dispath(setError(e));
      throw e;
    }
  },
  async fetchRecords() {
    try {
      const uid = getUid();
      const records =
        (
          await firebase
            .database()
            .ref(`users/${uid}/records/`)
            .once("value")
        ).val() || {};
      return Object.keys(records).map(key => ({
        ...records[key],
        id: key
      }));
    } catch (e) {
      store.dispath(setError(e));
      console.log(e);
      throw e;
    }
  },
  async fetchRecordById(id) {
    try {
      const uid = getUid();
      const record =
        (
          await firebase
            .database()
            .ref(`users/${uid}/records/`)
            .child(id)
            .once("value")
        ).val() || {};
      return {
        ...record,
        id
      };
    } catch (e) {
      store.dispath(setError(e));
      throw e;
    }
  }
};