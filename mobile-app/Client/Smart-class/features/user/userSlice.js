import {createSlice} from "@reduxjs/toolkit";

const initialState = {}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setName: ((state, action) => {
            return {...state, Name: action.payload}
        }),
        initUser: ((state, action) => {
            console.log(action.payload)
            return {
                ...state,
                id: action.payload.id,
                Name: action.payload.Name,
                Phone: action.payload.Phone,
                Role: action.payload.Role,
                Email: action.payload.Email,
                Faculty: action.payload.Faculty,
                Status: action.payload.Status,
                Type: action.payload.Type,
            }
        })
    }
})
export const {setName, initUser} = userSlice.actions;
export default userSlice.reducer