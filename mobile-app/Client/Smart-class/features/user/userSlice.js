import { createSlice } from "@reduxjs/toolkit";
const initialState = { id: "1", name: "Nguyễn 'Ego' Khánh Hoà", role: "Student" }
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setName: ((state, action) => { return {...state, name: action.payload } }),
    }
})
export const {setName} = userSlice.actions;
export default userSlice.reducer