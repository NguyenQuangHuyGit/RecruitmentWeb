import BaseService from './baseservice.js'
import axios from 'axios';

class UserService extends BaseService {
    async getByRecruitmentId(id, data) {
        var response = await axios.get(this.baseUrl + `recruiter?RecruitmentId=${id}&Name=${data.name}&Status=${data.status ? data.status : ''}`, { withCredentials: true });
        return response.data;
    }

    async getByUser(){
        var response = await axios.get(this.baseUrl, { withCredentials: true });
        return response.data;
    }

    async getUserById(id) {
        var response = await axios.get(this.baseUrl +  `recruiter/${id}`, { withCredentials: true });
        return response.data;
    }
}

export default new UserService('User');