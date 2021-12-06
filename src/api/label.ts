import axios from "@/utils/request";

/**
 * 获取标签列表
 * @param data
 * @returns {AxiosPromise}
 */
export const apiGetLabelList = (params?: object) => {
  return axios.get("/label/list", params);
};
