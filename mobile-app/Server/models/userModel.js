import {addDoc, collection, setDoc, doc, getDoc, deleteDoc} from "firebase/firestore";
import db from "../utils/firebase.js";
import {getDocs} from "@firebase/firestore";
import hashPassword from "../services/profileService.js";

const User = {
    add: async (schoolId, email, pw, name, phone, role, faculty, status, type) => {
        const hashCode = await hashPassword(pw);
        try {
            const docRef = await setDoc(doc(db, "User", schoolId), {
                id: schoolId,
                Email: email,
                HashCode: hashCode,
                Name: name,
                Phone: phone,
                Role: role,
                Faculty: faculty,
                Status: status,
                Type: type
            });
            console.log(docRef)
            return true;
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
    update: async (id, email, name, phone, role) => {
        try {
            const docRef = doc(db, "User", id);
            await setDoc(docRef, {
                Email: email,
                Name: name,
                Phone: phone,
                Role: role,
            });
            return true;
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
            const snapshot = await getDocs(collection(db, 'User'));
            return snapshot.docs.map(doc => doc.data());
        } catch (e) {
            console.error("Fail to get all user doc: " + e.message)
            throw e;
        }
    }
};
export default User;
