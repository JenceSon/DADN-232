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
    const user = await User.get(body.schoolId)
    try {
        if (user == null) {
            await User.add(body.schoolId, body.email, body.pw, body.name, body.phone, body.role, body.faculty, body.status, body.type)
            res.send({...body, message: "create user success"})
        } else {
            await User.update(body.schoolId, body.email, body.pw, body.name, body.phone, body.role, body.faculty, body.status, body.type)
            res.send({...body, message: "update user success"})
        }

    } catch (e) {
        res.send({message: "Get error:" + e.message})
    }
    // UserModel.add(2, req.email, req.data.name, req.data.phone, req.role)
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
    deleteUser
}