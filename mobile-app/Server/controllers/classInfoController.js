import User from "../models/userModel.js";
import Building from "../models/buildingModel.js";
import ClassRoom from "../models/classModel.js";
import Light from "../models/lightModel.js";
import Fan from "../models/fanModel.js";
import Schedule from "../models/scheduleModel.js";
async function getListClassByUser(req, res) {
  try {
    const re = Schedule.add("1", "12:00:00 PM 2022-12-12", "H6", "H6-201", "2111401");
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
