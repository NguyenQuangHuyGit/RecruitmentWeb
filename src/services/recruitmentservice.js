import BaseService from './baseservice.js'
import axios from 'axios';

class RecruitmentService extends BaseService {
    async getAll() {
        var response = await axios.get(this.baseUrl, { withCredentials: true });
        return response.data;
    }

    async getById(id) {
        var response = await axios.get(this.baseUrl + `${id}`, { withCredentials: true });
        return response.data;
    }

    async createUserRecruitment(data) {
        var response = await axios.post(this.baseUrl + 'user-recruitment', data, { withCredentials: true });
        return response.data;
    }

    async create(data) {
        var response = await axios.post(this.baseUrl + 'recruiter', data, { withCredentials: true });
        return response.data;
    }

    async getByRecruiter(data) {
        var response = await axios.post(this.baseUrl + 'recruiter/get', data, { withCredentials: true });
        return response.data;
    }

    async update(id, data) {
        var response = await axios.put(this.baseUrl + `recruiter/${id}`, data, { withCredentials: true });
        return response.data;
    }

    async delete(id) {
        var response = await axios.delete(this.baseUrl + `recruiter/${id}`, { withCredentials: true });
        return response.data;
    }
}

export default new RecruitmentService('Recruitment');