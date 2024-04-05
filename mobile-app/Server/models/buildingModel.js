import { addDoc, collection, setDoc,doc, getDoc, deleteDoc, getDocs,} from "firebase/firestore";
import db from "../utils/firebase.js";
const Building = {
    add: async (id,  location ) => {
        try {
            const re = await setDoc(doc(db, "Building",id), {
                
                Location: location,
                
            })
;           
            
             const classRef= await setDoc(doc(db, "Building/"+ id + "/ClassRooms","Headquarter-room"), {
                size: 100,
             });


        } catch (e) {
            console.error("Error adding document: ", e);
        }


    },
    get: async (id) => {
        try {
            const docRef = doc(db, "Building",id);
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
    update: async (id, address, city) => {
        try {
            const docRef = doc(db, "Building",id);
            await setDoc(docRef, {
                Address: address,
                City: city,
            });
            return true;
        } catch (e) {
            console.error("Error updating document:", e);
        }
    },
    delete: async (id) => {
        try {
            await deleteDoc(doc(db, "Building",id));
            return true;
        } catch (e) {
            console.error("Error removing document: ", e);
        }
    },
    all: async ()=>{
        try{
            const docRef = collection(db,'Building');
            const docSnap = await getDocs(docRef);
            const res =  docSnap.docs.map(doc=> {
                let note = {
                    name : doc.id,
                    attribute : doc.data(),
                };
                return note
            });
            if (res == undefined) return []
            return res
        } catch(e){
            console.error("Error getting list buildings",e);
        }
    }

}
export default Building;