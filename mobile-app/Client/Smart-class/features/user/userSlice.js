import { createSlice } from "@reduxjs/toolkit";
const initialState = { id: "1", name: "Nguyễn 'Ego' Khánh Hoà", role: "Sinh viên"  }
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
    }
})
export default userSlice.reducer