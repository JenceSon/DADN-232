import User from "../models/userModel.js";
import Building from "../models/buildingModel.js";
import ClassRoom from "../models/classModel.js";
import Light from "../models/lightModel.js";
async function getListClassByUser(req, res) {
  try {
    const id = "Light0001"
    const status = "on"
    const building = "H6"
    const room = "H6-201"
    const re = await Light.add(id, status, building, room)
    res.send("ok")

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
