import { createSlice } from "@reduxjs/toolkit";

export const finalSlice=createSlice({
    name:"output",
    initialState:{
        output:null
    },
    reducers:{
        onConfirm:(state,action)=>{
            state.output=action.payload;
        }
    }
})

export const {onConfirm}=finalSlice.actions;

export const selectFinal=(state)=>state.output.output;

export default finalSlice.reducer;