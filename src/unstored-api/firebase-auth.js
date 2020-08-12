import firebase from "firebase/app";
import store, { setError } from "@/store";

export async function login({ email, password }) {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (e) {
    store.dispath(setError(e));
    throw e;
  }
}

export async function logout({ commit }) {
  await firebase.auth().signOut();
  commit("clearInfo");
}

export async function register({ email, password, name }) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const uid = getUid();
    await firebase
      .database()
      .ref(`/users/${uid}/info`)
      .set({
        bill: 10000,
        name: name
      });
  } catch (e) {
    store.dispath(setError(e));
    throw e;
  }
}

export function getUid() {
  const user = firebase.auth().currentUser;
  return user ? user.uid : null;
}
