import axios from "axios";
const CUSTODIAN_API_BASE_URL="http://localhost:8080/exchange_api/v1/"

class CustodianServices{

    findBuyercustodian(id){
        return axios.get(CUSTODIAN_API_BASE_URL+'buycustodian/'+id);
    }
    findSellCustodian(id){
        return axios.get(CUSTODIAN_API_BASE_URL+"sellcustodian/"+id);
    }
    findBuyClient(name){
        return axios.get(CUSTODIAN_API_BASE_URL+"buyclient/"+name);
    }
    findSellClient(name){
        return axios.get(CUSTODIAN_API_BASE_URL+"sellclient/"+name)
    }
}

export default new CustodianServices();