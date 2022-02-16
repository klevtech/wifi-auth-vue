import Axios from 'axios';
import {RequestError} from '../Errors';

const axiosInstanceOptions = {
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
    },
};

const requestInterceptors = {
    onFulfill: (config) => {
        // if (User.getToken()) {
        //     config.headers.authorization = `Bearer ${User.getToken()}`;
        // }

        return config;
    },

    onReject: async (error) => {
        return Promise.reject(error.response.data)
    }
};
const responseInterceptors = {
    onFulfill: (response) => {
        if (response.config.responseType === 'blob') {
            const name = decodeURIComponent(response.headers['content-disposition'].split('filename=')[1]);

            return Promise.resolve({
                file: response.data,
                name,
            });
        }

        return Promise.resolve(response.data);

    },
    onReject: async (error) => {

        const {status} = error.response;

        if (![400, 401, 403].includes(status)) {
            return Promise.reject(new RequestError({
                message: 'Сервис недоступен',
                code: 'service_not_available',
                data: {},
            }));
        }

        if (status === 401) {
            return Promise.reject(new RequestError({
                message: 'Не авторизован',
                code: 'need_authorization',
                data: {},
            }));
        }

        if (status === 403) {
            return Promise.reject(new RequestError({
                message: 'Недостаточно прав',
                code: 'permission_denied_error',
                data: {},
            }));
        }
        if (status === 400) {
            return Promise.reject(new RequestError({
                message: 'Невалидный запрос',
                code: 'bad_request',
                data: {},
            }));
        }

        return Promise.reject(new RequestError({
            message: 'Недостаточно прав',
            code: 'permission_denied_error',
            data: {},
        }));
    },
};
const HTTP = Axios.create(axiosInstanceOptions);

HTTP.interceptors.request.use(requestInterceptors.onFulfill, requestInterceptors.onReject);
HTTP.interceptors.response.use(responseInterceptors.onFulfill, responseInterceptors.onReject);

export default HTTP;
