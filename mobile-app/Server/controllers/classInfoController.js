import {PythonShell} from 'python-shell';
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
async function getNumberStu(req, res) {
  const body = req.query;
  try {
    if (body.base64String){

      PythonShell.run("detectHuman.py",options = {args : [body.base64String]}).then((result)=>{
       
        if (result.length != 3 ) {
          res.send({message : result})
        }

        else {
          res.send({noStu : parseInt(result[2])})
        }
      })
    }
    else{
      PythonShell.run("detectHuman.py", null).then((result)=>{
        if (result.length != 3) {
          res.send({message : result})
        }

        else {
          res.send({message : "Null input data, get the default image", default: parseInt(result[2]) })
        }
      })
      
    }
    
  } catch (error) {
    console.error("Error detecting person in image : ", error)
    res.status(500).json({message: "Error detecting person in image : "+ error})
  }
}

//student only
async function postCallRoll(req, res) {}

export {
  getInfoClass,
  getListClassByUser,
  getNoti,
  getNumberStu,
  postCallRoll,
};
