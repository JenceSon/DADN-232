import {
  addDoc,
  collection,
  setDoc,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import db from "../utils/firebase.js";
const Light = {
  add: async (id, status, building, classroom) => {
    try {
      const re = await setDoc(doc(db, "Light/" + id), {
        Status: status,
        Location: doc(db, "Building/" + building + "/ClassRooms/", classroom),
      });

      return true;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  },
  get: async (id) => {
    try {
      const docRef = doc(db, "Light", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        console.log("No such document!");
      }
      return docSnap.data();
    } catch (e) {
      console.error("Error getting document:", e);
    }
  },
  update: async (id, status, building, classroom) => {
    try {
      const docRef = doc(db, "Light", id);
      await setDoc(docRef, {
        Status: status,
        Location: doc(db, "Building/" + building + "/ClassRooms/", classroom),
      });
      return true;
    } catch (e) {
      console.error("Error updating document:", e);
    }
  },
  delete: async (id) => {
    try {
      await deleteDoc(doc(db, "Light", id));
      return true;
    } catch (e) {
      console.error("Error removing document: ", e);
    }
  },
};
export default Light;
