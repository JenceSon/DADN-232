import User from "../models/userModel.js";
import Building from "../models/buildingModel.js";
import ClassRoom from "../models/classModel.js";
import Light from "../models/lightModel.js";
import Fan from "../models/fanModel.js";
import Schedule from "../models/scheduleModel.js";
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

async function getListClassByUser(req, res) {
  try {
    const  userId  =req.query.id? req.query.id: "2110101"
    const user = await User.getRef(userId);
    const listClass = await Schedule.getByUserRef(user);
    //for each schedule, get the class room, building, light, fan
    let listClassWithInfo = [];

    for await (const schedule of listClass) {
      const classRoom = await getDoc(schedule.Location);
      const from = schedule.From.toDate().toLocaleString();
      const to = schedule.To.toDate().toLocaleString();
      listClassWithInfo.push({
        classRoom: classRoom.id,
        from: from,
        to: to,
      
      });
      
    }
    
    const date= listClass[0].From.toDate()   
    console.log(date)  
    const localDate = date.toLocaleString();  
    console.log(localDate)

    console.log(listClassWithInfo);
    res.status(200).json(listClassWithInfo);
    
  } catch (e) {
    console.error("Error getting list class:", e);
    res.status(500).json({ message: "Error getting list class" });
  }
}

async function getInfoClass(req, res) {}

//used to  get notification when there are student being absent from class
async function getNoti(req, res) {}

//call AI api
async function getNumberStu(req, res) {}

//student only
async function postCallRoll(req, res) {}

export {
  getInfoClass,
  getListClassByUser,
  getNoti,
  getNumberStu,
  postCallRoll,
};
