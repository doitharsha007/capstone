import { createSlice } from "@reduxjs/toolkit";

export const instrumentSlice=createSlice({
    name:"instrument",
    initialState:{
        instrument:null
    },
    reducers:{
        onsend:(state,action)=>{
            state.instrument=action.payload;
        }
    }
})

export const {onsend}=instrumentSlice.actions;

export const selectinstrument=(state)=>state.instrument.instrument;

export default instrumentSlice.reducer;