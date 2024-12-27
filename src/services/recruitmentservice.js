import BaseService from "./baseservice.js";
import axios from "axios";

class RecruitmentService extends BaseService {
    async getAll() {
        var response = await axios.get(this.baseUrl, { withCredentials: true });
        return response.data;
    }

    async getAllWithFilter(data) {
        const query = `?Name=${data.name}&FieldId=${data.fieldId !== null ? data.fieldId : ''}&ProvinceId=${data.provinceId !== null ? data.provinceId : ''}&Experience=${data.experience !== null ? data.experience : ''}&StartSalary=${data.startSalary ? data.startSalary : ''}&EndSalary=${data.endSalary ? data.endSalary : ''}&Money=${data.money !== null ? data.money : ''}&IsAgree=${data.isAgree}&Level=${data.level !== null ? data.level : ''}&TypeWorking=${data.typeWorking !== null ? data.typeWorking : ''}`;
        var response = await axios.get(this.baseUrl + query, { withCredentials: true });
        return response.data;
    }

    async getById(id) {
        var response = await axios.get(this.baseUrl + `${id}`, {
            withCredentials: true,
        });
        return response.data;
    }

    async createUserRecruitment(data) {
        var response = await axios.post(
            this.baseUrl + "user-recruitment",
            data,
            { withCredentials: true }
        );
        return response.data;
    }

    async create(data) {
        var response = await axios.post(this.baseUrl + "recruiter", data, {
            withCredentials: true,
        });
        return response.data;
    }

    async getByRecruiter(data) {
        var response = await axios.post(this.baseUrl + "recruiter/get", data, {
            withCredentials: true,
        });
        return response.data;
    }

    async update(id, data) {
        var response = await axios.put(this.baseUrl + `recruiter/${id}`, data, {
            withCredentials: true,
        });
        return response.data;
    }

    async delete(id) {
        var response = await axios.delete(this.baseUrl + `recruiter/${id}`, {
            withCredentials: true,
        });
        return response.data;
    }

    async updateStatusUserRecruitment(id, status) {
        var response = await axios.put(
            this.baseUrl + `recruiter/user-recruitment/${id}?Status=${status}`,
            "",
            { withCredentials: true }
        );
        return response.data;
    }

    async getUserRecruitment() {
        var response = await axios.get(this.baseUrl + "apply", {
            withCredentials: true,
        });
        return response.data;
    }

    async getSaveRecruitment() {
        var response = await axios.get(this.baseUrl + "save", {
            withCredentials: true,
        });
        return response.data;
    }

    async saveRecruitment(id) {
        var response = await axios.put(
            this.baseUrl + `save-recruitment/${id}`,
            "",
            { withCredentials: true }
        );
        return response.data;
    }
}

export default new RecruitmentService("Recruitment");
