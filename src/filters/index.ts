/**
 * 时间日期格式化
 * 用法 formatTime(new Date(), 'yyyy-MM-dd hh:mm:ss')
 * @param  time
 * @param  fmt
 */
export const formatTime = (time: any, fmt: string) => {
  time = parseInt(time);
  if (!time) {
    return "";
  }
  const date = new Date(time);
  let o: object = {
    "M+": date.getMonth() + 1, // 月份
    "d+": date.getDate(), // 日
    "h+": date.getHours(), // 小时
    "m+": date.getMinutes(), // 分
    "s+": date.getSeconds(), // 秒
    "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
};

/**
 * 数字转成 k、w 方式
 * @param  num
 */
export const formatNumber = (num: number) => {
  return num >= 1e3 && num < 1e4
    ? (num / 1e3).toFixed(1) + "k"
    : num >= 1e4
    ? (num / 1e4).toFixed(1) + "w"
    : num;
};
