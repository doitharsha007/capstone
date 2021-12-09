import { createSlice } from "@reduxjs/toolkit";

export const exchangeSlice=createSlice({
    name:"exchange",
    initialState:{
        exchange:null
    },
    reducers:{
        onsend:(state,action)=>{
            state.exchange=action.payload;
        }
    }
})

export const {onsend}=exchangeSlice.actions;

export const selectexchange=(state)=>state.exchange.exchange;

export default exchangeSlice.reducer;