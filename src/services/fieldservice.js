import BaseService from './baseservice.js'
import axios from 'axios';

class FieldService extends BaseService {
    async getAll() {
        var response = await axios.get(this.baseUrl, { withCredentials: true });
        return response.data;
    }
}

export default new FieldService('Field');