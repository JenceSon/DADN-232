import api from "../../api/api";


export async function registerRoom({
    FormTime,
    ToTime,
    NoStu,
    Course,
    Class,
    Building,
    Classroom,
    User
}){
    console.log(new Date(FormTime))
    console.log(new Date(ToTime))
    const res = await api.post("/api/registerClass/registerRoom",{
        FromTime : new Date(FormTime),
        ToTime : new Date(ToTime),
        NoStu : NoStu,
        Course : Course,
        Class : Class,
        Building : Building,
        Classroom : Classroom,
        User : User,
    })
    return res.data
}