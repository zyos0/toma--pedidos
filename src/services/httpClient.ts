import axios from 'axios';
import { axiosConfig } from '../constants/config';
import { getToken } from '../utils/tokenManagement';
import { loginRoute } from '../constants/routes';

const http = axios.create(axiosConfig);

const configRequestSuccess = (config: any) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
};

const configRequestError = (error: any) => {
    return Promise.reject(error);
};

const validateError = (error: any) => {
    const token = getToken();
    if (token) return Promise.reject(error);
    window.location.href = loginRoute;
};

const enforceSecurity = (
    request: Promise<any>,
    strict: boolean
): Promise<any> => {
    return strict ? request.catch(validateError) : request;
};

http.interceptors.request.use(configRequestSuccess, configRequestError);

const get = (path: string, strict = true) =>
    enforceSecurity(http.get(path), strict);
const post = (path: string, request: any, strict = true) =>
    enforceSecurity(http.post(path, request), strict);
const put = (path: string, request: any, strict = true) =>
    enforceSecurity(http.put(path, request), strict);
const del = (path: string, strict = true) =>
    enforceSecurity(http.delete(path), strict);

const httpClient = {
    get,
    post,
    put,
    delete: del,
};

export default httpClient;
