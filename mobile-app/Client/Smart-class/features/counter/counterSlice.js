import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice(
    {
        name: 'counter',
        initialState: { //inital value for counter
            value: 0
        },
        reducers: {
            increment: state => { //action: counter/increment
                state.value += 1;
            },
            descrement: state => {
                state.value -= 1;
            },
            incrementByAmount: (state, action) =>{
                state.value += action.payload
            }
            
        }
    }
)
export const {increment, descrement, incrementByAmount} = counterSlice.actions
export default counterSlice.reducer