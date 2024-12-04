import BaseService from './baseservice.js'
import axios from 'axios';

class AuthService extends BaseService {
    async signIn(data) {
        var response = await axios.post(this.baseUrl + 'sign-in', data, { withCredentials: true });
        return response.data;
    }

    async signUp(data) {
        var response = await axios.post(this.baseUrl + 'sign-up', data, { withCredentials: true });
        return response.data;
    }

    async signUpRecruiter(data) {
        var response = await axios.post(this.baseUrl + 'recruiter/sign-up', data, { withCredentials: true });
        return response.data;
    }
}

export default new AuthService('Auth');