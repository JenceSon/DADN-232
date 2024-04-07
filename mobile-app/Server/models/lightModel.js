import {
  addDoc,
  collection,
  setDoc,
  doc,
  getDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import db from "../utils/firebase.js";
const Light = {
  add: async (id, status, building, classroom) => {
    //Example:
    // Light.add("Fan0001", "ON", "H6", "H6-201");
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
  getAll: async () =>{
    try {
      const docRef = collection(db,"Light")
      const docSnap = await getDocs(docRef)
      const res = docSnap.docs.map((doc) =>{
        let note = {
          id : doc.id,
          Type : "LIGHT",
          Status : doc.data().Status,
          Location : doc.data().Location._key.path.segments[8]
        }
        return note
      })
      if (res == undefined) return []
      else return res 
      
    } catch (error) {
      console.error("Error get light list : ", error)
    }
  }
};
export default Light;
