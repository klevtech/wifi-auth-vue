import HTTP from '../api/HTTP.js';
import Config from '../Config';
import { AxiosPromise } from 'axios';

interface ITemplateService {
    auth(params: any): Promise<any>;
}

export default class TemplateService implements ITemplateService {
    auth(params: any): AxiosPromise {
        return HTTP.post(Config.url.baseurl('/api/auth'), params);
    }
}
