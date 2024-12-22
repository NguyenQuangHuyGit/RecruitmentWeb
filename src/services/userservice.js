import BaseService from './baseservice.js'
import axios from 'axios';

class UserService extends BaseService {
    async getByRecruitmentId(id) {
        var response = await axios.get(this.baseUrl + `recruiter?RecruitmentId=${id}`, { withCredentials: true });
        return response.data;
    }

    async getByUser(){
        var response = await axios.get(this.baseUrl, { withCredentials: true });
        return response.data;
    }
}

export default new UserService('User');