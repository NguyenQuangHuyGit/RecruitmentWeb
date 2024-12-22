import BaseService from "./baseservice.js";
import axios from "axios";

class AccountService extends BaseService {
    async update(data) {
        var response = await axios.put(this.baseUrl, data, {
            withCredentials: true,
        });
        return response.data;
    }
}

export default new AccountService("Account");
