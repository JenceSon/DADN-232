import {
  addDoc,
  collection,
  setDoc,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import db from "../utils/firebase.js";
const Schedule = {
  add: async (id, From, building, classroom, NoStu, To, userID) => {
    //Example:
    // Schedule.add(
    //   "2",
    //   "2024-04-10T11:00:00",
    //   "H6",
    //   "H6-201",
    //   10,
    //   "2024-04-10T11:00:00",
    //   "2111401"
    // );
    try {
      const re = await setDoc(doc(db, "Schedule/" + id), {
        From: Timestamp.fromDate(new Date(From)),
        Location: doc(db, "Building/" + building + "/ClassRooms/", classroom),
        NoStu: NoStu,
        To: Timestamp.fromDate(new Date(To)),
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
  update: async (id, From, building, classroom, NoStu, To, userID) => {
    try {
      const docRef = doc(db, "Schedule", id);
      await setDoc(docRef, {
        From: Timestamp.fromDate(new Date(From)),
        Location: doc(db, "Building/" + building + "/ClassRooms/", classroom),
        NoStu: NoStu,
        To: Timestamp.fromDate(new Date(To)),
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
