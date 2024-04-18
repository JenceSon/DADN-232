import {createSlice} from "@reduxjs/toolkit";

const initialState = {}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setName: ((state, action) => {
            return {...state, Name: action.payload}
        }),
        setPhone: ((state, action) => {
            return {...state, Phone: action.payload};
        }),
        setFaculty: ((state, action) => {
            return {...state, Faculty: action.payload};
        }),
        setStatus: ((state, action) => {
            return {...state, Status: action.payload};
        }),
        setType: ((state, action) => {
            return {...state, Type: action.payload};
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
export const {setName, setPhone, setFaculty, setStatus, setType, initUser} = userSlice.actions;
export default userSlice.reducer