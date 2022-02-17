import Http from '@Core/api';
import { requestErrorHandler } from '@Core/helpers';

interface ITemplate {
    getPattern(params: any): void;
}

export default new class Template implements ITemplate {
    public async getPattern(params: any) {
        try {
            return await Http.templateService.getPattern(params);
        } catch (e) {
            await requestErrorHandler(e);
        }
    }
};
