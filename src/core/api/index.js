import TemplateService from '../api/TemplateService';

class ApiClient {
  constructor() {
    this.templateService = new TemplateService(); // почему не подтянулся this...
  }
}

const Api = new ApiClient();

export default Api;
