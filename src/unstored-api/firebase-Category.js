import firebase from "firebase/app";
import store, { setError } from "@/store";
import { getUid } from "./firebase-auth";

export default {
  async createCategory({ title, limit }) {
    try {
      const uid = getUid();
      const category = firebase
        .database()
        .ref(`users/${uid}/categories`)
        .push({
          title,
          limit
        });
      return {
        title,
        limit,
        id: category.key
      };
    } catch (e) {
      store.dispath(setError(e));
      throw e;
    }
  },
  async fetchCategories() {
    try {
      const uid = getUid();
      const categories = (
        await firebase
          .database()
          .ref(`users/${uid}/categories`)
          .once("value")
      ).val() || {};
      console.log(categories);
      return Object.keys(categories).map(key => ({
        id: key,
        ...categories[key]
      }));
    } catch (e) {
      store.dispath(setError(e));
      throw e;
    }
  },
  async fetchCategoryById(id) {
    try {
      const uid = getUid();
      const category = (
        await firebase
          .database()
          .ref(`users/${uid}/categories`)
          .child(id)
          .once("value")
      ).val();

      return {
        id,
        ...category
      };
    } catch (e) {
      store.dispath(setError(e));
      throw e;
    }
  },
  async editCategory({ id, title, limit }) {
    try {
      const uid = getUid();
      await firebase
        .database()
        .ref(`users/${uid}/categories`)
        .child(id)
        .update({
          title,
          limit
        });
    } catch (e) {
      store.dispath(setError(e));
      throw e;
    }
  }
};