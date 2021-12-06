import axios from "axios";
import qs from "qs";
import { Toast } from "vant";

interface responseStatus {
  readonly status: number;
  data: any;
  statusText: string;
}
interface responseCode {
  readonly code: number;
  data: any;
  msg: string;
}

axios.defaults.withCredentials = true;
// 发送时
axios.interceptors.request.use(
  (config) => config,
  (err) => Promise.reject(err)
);

// 响应时
axios.interceptors.response.use(
  (response) => response,
  (err) => Promise.resolve(err.response)
);

// 检查状态码
const checkStatus = (res: responseStatus) => {
  if (res.status === 200 || res.status === 304) {
    return res.data;
  }
  return {
    code: 0,
    msg: res.statusText,
    data: res.statusText,
  };
};

// 检查CODE值
const checkCode = (res: responseCode) => {
  if (res.code === 0) {
    Toast.fail({
      message: res.msg,
      duration: 2 * 1000,
    });
    throw new Error(res.msg);
  }
  return res;
};

const prefix = "/client_api";
export default {
  get(url: string, params?: object) {
    return axios({
      method: "get",
      url: prefix + url,
      params,
      timeout: 30000,
    })
      .then(checkStatus)
      .then(checkCode);
  },
  post(url: string, data: object) {
    return axios({
      method: "post",
      url: prefix + url,
      data: qs.stringify(data),
      timeout: 30000,
    })
      .then(checkStatus)
      .then(checkCode);
  },
};
