import axios from "axios";
const INSTRUMENT_API_BASE_URL="http://localhost:8080/exchange_api/v1/instrument"

class InstrumentServices{

    findInstrument(id){
        return axios.get(INSTRUMENT_API_BASE_URL+'/'+id);
    }
}

export default new InstrumentServices();