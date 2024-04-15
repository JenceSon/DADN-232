import {
  addDoc,
  collection,
  setDoc,
  doc,
  getDoc,
  deleteDoc,
  getDocs,
  query,
} from "firebase/firestore";
import { Timestamp, where } from "firebase/firestore";
import db from "../utils/firebase.js";
const Schedule = {
  add: async (
    id,
    From,
    building,
    classroom,
    NoStu,
    To,
    userID,
    Course,
    Class
  ) => {
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
        Course: Course,
        Class: Class,
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

  update: async (
    id,
    From,
    building,
    classroom,
    NoStu,
    To,
    userID,
    Class,
    Course
  ) => {
    try {
      const docRef = doc(db, "Schedule", id);
      await setDoc(docRef, {
        From: Timestamp.fromDate(new Date(From)),
        Location: doc(db, "Building/" + building + "/ClassRooms/", classroom),
        NoStu: NoStu,
        To: Timestamp.fromDate(new Date(To)),
        User: doc(db, "User", userID),
        Course: Course,
        Class: Class,
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
  getAll: async () => {
    try {
      const docRef = collection(db, "Schedule");
      const docSnap = await getDocs(docRef);
      let key = 0;
      const res = docSnap.docs.map((doc) => {
        let From = new Timestamp(
          doc.data().From.seconds,
          doc.data().From.nanoseconds
        );
        const FromTime = From.toDate();
        const FromDate = From.toDate().toDateString();
        let To = new Timestamp(
          doc.data().To.seconds,
          doc.data().To.nanoseconds
        );
        const ToTime = To.toDate();
        let note = {
          FromTime: FromTime,
          ToTime: ToTime,
          Date: FromDate,
          NoStu: parseInt(doc.data().NoStu),
          Location: String(doc.data().Location._key.path.segments[8]),
          User: String(doc.data().User._key.path.segments[6]),
          Course: String(doc.data().Course),
          Class: String(doc.data().Class),
        };
        return note;
      });
      //const q = query(docRef,where())
      if (res == undefined) return [];
      return res;
    } catch (error) {
      console.error("Error get schedule: ", error);
    }
  },

  all: async () => {
    try {
      const snapshot = await getDocs(collection(db, "Schedule"));
      return snapshot.docs.map((doc) => doc.data());
    } catch (e) {
      console.error("Error getting documents: ", e);
    }
  },
  getByUserRef: async (userRef) => {
    try {
      const scheduleRef = collection(db, "Schedule");
      const q = query(scheduleRef, where("User", "==", userRef));
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => doc.data());
    } catch (e) {
      console.error("Error getting document:", e);
    }
  },
};
export default Schedule;
