import { createSlice } from "@reduxjs/toolkit"

const initialState = {isChange : false}
const fetchDataGlobalSlice = createSlice({
    name : "fetchDataGlobal",
    initialState,
    reducers:{
        setIsChange:((state,action)=>{
            return {...state,isChange : action.payload}
        })
    }
})

export const {setIsChange} = fetchDataGlobalSlice.actions
export default fetchDataGlobalSlice.reducer