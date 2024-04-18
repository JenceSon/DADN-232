import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import fetchDataGlobalReducer from "./features/fetchData/fetchDataSlice"

export default configureStore({
    reducer: {
        user: userReducer,
        fetchDataGlobal: fetchDataGlobalReducer,
    }
}) 