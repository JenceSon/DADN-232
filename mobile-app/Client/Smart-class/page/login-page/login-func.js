import api from "../../api/api";

export async function CheckLogin({bkid, password}) {
    //khuong duy note - should fetch user infor from backend api, then update user state from store.js

    const resp = await api.post("/api/login", {
        "schoolId": (bkid ? bkid : ""),
        "pw": (password ? password : ""),
    })

    return resp.data
}