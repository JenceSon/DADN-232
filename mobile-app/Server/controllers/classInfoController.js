import User from "../models/userModel.js";
async function getListClassByUser(req, res) {
  const id = "2111401";
  const email = "luuchanhung@gmail.com";
  const name = "Hung";
  const phone = "0987654321";
  const role = "Teacher";
  const userid = await User.get(id);
  res.send("ok");
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
