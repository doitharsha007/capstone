import axios from "axios";
const CLIENT_API_BASE_URL="http://localhost:8080/exchange_api/v1/client"

class ClientServices{

    findClient(id){
        return axios.get(CLIENT_API_BASE_URL+'/'+id);
    }
}

export default new ClientServices();