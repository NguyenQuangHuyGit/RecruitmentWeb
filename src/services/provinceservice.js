import axios from 'axios';

class ProvinceService {
    baseUrl = 'https://open.oapi.vn/location/provinces?page=0&size=1000';

    async getProvince() {
        var response = await axios.get(this.baseUrl);
        return response.data;
    }

    async getDistrictByProvinceId(provinceId) {
        var response = await axios.get(`https://open.oapi.vn/location/districts/${provinceId}?page=0&size=1000`);
        return response.data;
    }
}

export default new ProvinceService();