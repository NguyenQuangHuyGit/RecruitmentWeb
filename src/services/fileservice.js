import BaseService from "./baseservice.js";
import axios from "axios";

class FileService extends BaseService {
    async upload(type, data) {
        var response = await axios.post(this.baseUrl + `upload?type=${type}`, data, {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    }
}

export default new FileService("File");
