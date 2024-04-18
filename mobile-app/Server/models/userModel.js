import {
  collection,
  setDoc,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import db from "../utils/firebase.js";
import { getDocs } from "@firebase/firestore";
import hashPassword from "../services/profileService.js";

const User = {
  add: async (
    data
  ) => {
    //Example:
    const hashCode = await hashPassword(data.Pw);
    try {
      const docRef = await setDoc(doc(db, "User", data.id), {
        id: data.id,
        Email: data.Email,
        HashCode: hashCode,
        Role: data.Role,
      });
      return data.id;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  },
  get: async (id) => {
    try {
      const docRef = doc(db, "User", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
      return docSnap.data();
    } catch (e) {
      console.error("Error getting document:", e);
      throw e;
    }
  },
  getRef: async (id) => {
    try {
      const docRef = doc(db, "User", id);
      return docRef;
    } catch (e) {
      console.error("Error getting document:", e);
      throw e;
    }
  },
  update: async (data) => {
    try {
      const docRef = doc(db, "User", data.id);
      const docData = await  getDoc(docRef);
      if (docData.exists()) {
        await setDoc(docRef, {
          ...docData.data(),
          ...data,
        });
        return true;
      }
    } catch (e) {
      console.error("Error updating document:", e);
      throw e;
    }
  },
  delete: async (id) => {
    try {
      await deleteDoc(doc(db, "User", id));
      return true;
    } catch (e) {
      console.error("Error removing document: ", e);
    }
  },
  all: async () => {
    try {
      const snapshot = await getDocs(collection(db, "User"));
      return snapshot.docs.map((doc) => doc.data());
    } catch (e) {
      console.error("Fail to get all user doc: " + e.message);
      throw e;
    }
  },
};
export default User;
