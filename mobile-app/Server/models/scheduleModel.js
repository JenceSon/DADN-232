import {
  addDoc,
  collection,
  setDoc,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import db from "../utils/firebase.js";
const Schedule = {
  add: async (id, Date, building, classroom, userID) => {
    try {
      const re = await setDoc(doc(db, "Schedule/" + id), {
        Date: Date,
        Location: doc(db, "Building/" + building + "/ClassRooms/", classroom),
        User: doc(db, "User", userID),
      });

      return true;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  },
    get: async (id) => {
        try {
        const docRef = doc(db, "Schedule", id);
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
    update: async (id, Date, building, classroom, userID) => {
        try {
        const docRef = doc(db, "Schedule", id);
        await setDoc(docRef, {
            Date: Date,
            Location: doc(db, "Building/" + building + "/ClassRooms/", classroom),
            User: doc(db, "User", userID),
        });
        return true;
        } catch (e) {
        console.error("Error updating document:", e);
        }
    },
    delete: async (id) => {
        try {
        await deleteDoc(doc(db, "Schedule", id));
        return true;
        } catch (e) {
        console.error("Error removing document: ", e);
        }
    },
};
export default Schedule;
