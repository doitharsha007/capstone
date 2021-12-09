import axios from "axios";
const EXCHANGE_API_BASE_URL="http://localhost:8080/exchange_api/v1/"

class ExchangeServices{

    findSeller(buyer){
        return axios.put(EXCHANGE_API_BASE_URL+"seller/",buyer);
    }
    addCustodian(custodian){
        return axios.put(EXCHANGE_API_BASE_URL+"custodian",custodian);
    }
    getCustodians(){
        return axios.get(EXCHANGE_API_BASE_URL+"custodian");
    }
    addBuyer(buyer){
        return axios.put(EXCHANGE_API_BASE_URL+"buyer",buyer);
    }
    deleteSeller(id){
        return axios.put(EXCHANGE_API_BASE_URL+"seller/"+id);
    }
    findBuyer(seller){
        return axios.put(EXCHANGE_API_BASE_URL+"buyer/",seller);
    }
    addSeller(seller){
        return axios.put(EXCHANGE_API_BASE_URL+"seller",seller);
    }
    deleteBuyer(id){
        return axios.put(EXCHANGE_API_BASE_URL+"buyer/"+id);
    }
    findPartialSeller(buyer){
        return axios.put(EXCHANGE_API_BASE_URL+"partialbuyer",buyer);
    }
    updateSeller(quantity){
        return axios.post(EXCHANGE_API_BASE_URL+"seller",quantity);
    }
    findPartialBuyer(seller){
        return axios.put(EXCHANGE_API_BASE_URL+"partialseller",seller);
    }
    updateBuyer(quantity){
        return axios.post(EXCHANGE_API_BASE_URL+"buyer",quantity);
    }
}

export default new ExchangeServices();