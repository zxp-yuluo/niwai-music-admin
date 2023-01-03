import axios from "axios";
import { message } from "antd";
import Nprogress from 'nprogress'
import { BASE_URL } from "../config";
import 'nprogress/nprogress.css'

const instance = axios.create({
  baseURL: BASE_URL
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    Nprogress.start()
    return config;
  }, error => {
    return Promise.reject(error);
  });
// 响应拦截器
instance.interceptors.response.use(
  response => {
    Nprogress.done()
    return response.data;
  }, error => {
    Nprogress.done()
    message.error(error.message + '，请联系管理员')
    return new Promise(() => { })
  })

export default instance