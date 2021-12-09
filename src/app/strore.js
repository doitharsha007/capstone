import { configureStore } from "@reduxjs/toolkit";
import clientReducer from '../features/ClientSlice';
import instrumentReducer from '../features/InstrumentSlice';
import exchangeReducer from '../features/ExchangeSlice';
import finalReducer from '../features/FinalSlice'

export default configureStore({
    reducer:{
        client:clientReducer,
        instrument:instrumentReducer,
        exchange:exchangeReducer,
        output:finalReducer
    }
})