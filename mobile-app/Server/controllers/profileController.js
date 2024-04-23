import UserModel from "../models/userModel.js";
import User from "../models/userModel.js";

async function getInfoByUser(req, res) {
    try {
        const user = await User.get(req.query.id);
        if (!user) {
            res.send({message: "No such user doc"})
        } else {
            res.send({...user, message: "Get user success"})
        }
    } catch (e) {
        res.send({message: "Fail to get user doc"})
    }
}

async function updateInfo(req, res) {
    const body = req.body
    const user = await User.get(body.id)
    try {
        if (user == null) {
            await User.add(body)
            res.send({"message": "User do not exists"})
        } else {
            await User.update(body)
            let newUser = await User.get(body.id);
            delete newUser["HashCode"];
            res.send({newUser, message: "update user success"})
        }

    } catch (e) {
        res.send({message: "Get error:" + e.message})
    }
    // UserModel.add(2, req.email, req.data.name, req.data.phone, req.role)
}
async function addUser(req, res) {
    const body = req.body;
    const user = await User.get(body.id)
    let allUsers = await User.all()
    allUsers = (allUsers == undefined)? []:allUsers
    let emails = allUsers.map(item => String(item.Email))
    emails = (emails == undefined)? []:emails
    console.log(emails)
    if (user != null || emails.some(item => item == body.Email)) {
        res.send({"message": "User information already exists : "+ ((user != null)? user.id: body.Email)})
    }
    else {
        const id = await User.add(body)
        res.send({"id": id,  "message": "Add user success"})
    }
}
async function deleteUser(req, res) {
    try {
        const deleteState = await User.delete(req.body.id);
        res.send({message: "Delete user document success"})
    } catch (e) {
        res.send({message: "Fail to delete user doc"})
    }
}

async function allUsers(req, res) {
    try {
        const allUser = await User.all();
        res.send(allUser)
    } catch (e) {
        res.send({message: "Fail to get all users"})
    }
}

export {
    getInfoByUser,
    updateInfo,
    allUsers,
    deleteUser,
    addUser
}