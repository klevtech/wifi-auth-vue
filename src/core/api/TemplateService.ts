import HTTP from '@Core/api/HTTP.js';
import Config from '@Core/Config';
import { AxiosPromise } from 'axios';

interface ITemplateService {
    getPattern(params: any): Promise<any>;
}

export default class TemplateService implements ITemplateService {
    getPattern(params: any): AxiosPromise {
        return HTTP.post(Config.url.baseurl('/get-pattern-location'), params);
    }
}
