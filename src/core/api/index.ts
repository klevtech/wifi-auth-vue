import TemplateService from '../api/TemplateService';

class ApiClient {
  private templateService: TemplateService;

  constructor() {
    this.templateService = new TemplateService();
  }
}

const Api = new ApiClient();

export default Api;
