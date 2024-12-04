class BaseService {
    baseUrl = 'https://localhost:7014/api/v1/';

    constructor(controller) {
        this.baseUrl = this.baseUrl + `${controller}/`;
    }
}

export default BaseService;