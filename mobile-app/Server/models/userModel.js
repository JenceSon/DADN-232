import { addDoc, collection, setDoc,doc, getDoc, deleteDoc} from "firebase/firestore";
import db from "../utils/firebase.js";
const User = {
  add: async (id, email, name, phone, role) => {
    try {
      const docRef = await setDoc(doc(db, "User",id), {
        
        Email: email,
        Name: name,
        Phone: phone,
        Role: role,
      
      });
      console.log(docRef)
      return true;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  },
    get: async (id) => {
        try {
        const docRef = doc(db, "User",id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
        return docSnap.data() ;
        } catch (e) {
        console.error("Error getting document:", e);
        }
    },
    update: async (id, email, name, phone, role) => {
        try {
        const docRef = doc(db, "User",id);
        await setDoc(docRef, {
            Email: email,
            Name: name,
            Phone: phone,
            Role: role,
        });
        return true;
        } catch (e) {
        console.error("Error updating document:", e);
        }
    },
    delete: async (id) => {
        try {
        await deleteDoc(doc(db, "User",id));
        return true;
        } catch (e) {
        console.error("Error removing document: ", e);
        }
    },
};
export default User;
