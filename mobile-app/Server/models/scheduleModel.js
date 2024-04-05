import {
  addDoc,
  collection,
  setDoc,
  doc,
  getDoc,
  deleteDoc,
  getDocs,
  query,
  Timestamp,
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
  getAll: async () => {
    try {
      const docRef = collection(db, 'Schedule')
      const docSnap = await getDocs(docRef)
      let key = 0
      const res =  docSnap.docs.map((doc)=>{
        let From = new Timestamp(doc.data().From.seconds,doc.data().From.nanoseconds)
        const FromTime = From.toDate().toTimeString()
        const FromDate = From.toDate().toDateString()
        let To = new Timestamp(doc.data().To.seconds,doc.data().To.nanoseconds)
        const ToTime = To.toDate().toTimeString()
        let note = {
          FromTime : FromTime ,
          ToTime : ToTime,
          Date : FromDate,
          NoStu : parseInt(doc.data().NoStu),
          Location : doc.data().Location._key.path.segments[8],
          User : doc.data().User._key.path.segments[6]
        }
        return note
      })
      //const q = query(docRef,where())
      if (res == undefined) return []
      return res

    } catch (error) {
      console.error("Error get schedule: ", error);
    }
  }
};
export default Schedule;
