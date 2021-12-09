import axios from "axios";

const USER_API_BASE_URL="http://localhost:8080/exchange_api/v1/user/"

class LoginServices{

    getCustodianById(id){
        return axios.get(USER_API_BASE_URL+id);
    }
    
}

export default new LoginServices();