import User from "../models/userModel.js";
import {checkPassword} from "../services/profileService.js";


async function login(req,res){
    const body = req.body;
    try {
        let user = await User.get(body.schoolId);
        if (user == null) {
            res.send({message: "No user found!"})
            return;
        }
        const checkPass = await checkPassword(body.pw, user.HashCode);
        delete user["HashCode"]
        res.send({...user ,message: checkPass ? "Login success" : "Login fail"})
    }
    catch (e) {
        res.send({message: "Login fail:" + e.message})
    }
}

async function checkRole(req,res){

}

export {
    login,
    checkRole,
}