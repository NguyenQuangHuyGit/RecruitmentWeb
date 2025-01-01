import BaseService from "./baseservice.js";
import axios from "axios";

class CompanyService extends BaseService {
    async getAll(name) {
        var response = await axios.get(this.baseUrl + `?Name=${name ? name : ''}`, {
            withCredentials: true,
        });
        return response.data;
    }

    async getById(id) {
        var response = await axios.get(this.baseUrl + `${id}`, {
            withCredentials: true,
        });
        return response.data;
    }
}

export default new CompanyService("Company");
