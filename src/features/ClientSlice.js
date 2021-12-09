import { createSlice } from "@reduxjs/toolkit";

export const clientSlice=createSlice({
    name:"client",
    initialState:{
        client:null
    },
    reducers:{
        onsend:(state,action)=>{
            state.client=action.payload;
        }
    }
})

export const {onsend}=clientSlice.actions;

export const selectClient=(state)=>state.client.client;

export default clientSlice.reducer;