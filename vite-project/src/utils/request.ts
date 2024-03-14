// 引入axios，引入请求拦截器类型约束，响应拦截器类型约束
import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";

// 创建axios  实例

const service = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
});
// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在发送请求之前做些什么
    return config;
  },
  (error: any) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 对响应数据做点什么
    return response;
  },
  (error: any) => {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
// 导出axios 实例
export default service;
