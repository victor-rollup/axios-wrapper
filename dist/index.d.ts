import { AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults } from 'axios';
interface ICustomAxiosInstance extends AxiosInstance {
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    options<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    request<T = any>(config: AxiosRequestConfig): Promise<T>;
}
export default function createAxiosClient(baseURL: string, token?: string, options?: CreateAxiosDefaults): ICustomAxiosInstance;
export {};
