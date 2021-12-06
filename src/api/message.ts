import axios from "@/utils/request";

/**
 * 获取留言列表
 * @param data
 * @returns {AxiosPromise}
 */
export const apiGetMessageList = (params?: object) => {
  return axios.get("/message/list", params);
};

/**
 * 获取回复数量
 * @param data
 * @returns {AxiosPromise}
 */
export const apiGetReplyCount = (params?: object) => {
  return axios.get("/message/replyCount", params);
};

/**
 * 添加留言
 * @param data
 * @returns {AxiosPromise}
 */
export const apiAddMessage = (params: object) => {
  return axios.post("/message/add", params);
};

/**
 * 点赞
 * @param data
 * @returns {AxiosPromise}
 */
export const apiUpdateLikes = (params: object) => {
  return axios.post("/message/updateLikes", params);
};

/**
 * 回复
 * @param data
 * @returns {AxiosPromise}
 */
export const apiUpdateReplys = (params: object) => {
  return axios.post("/message/updateReplys", params);
};
