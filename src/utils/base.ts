import { Toast } from "vant";
/**
 * 显示菊花
 */
const showLoading = (message?: string) => {
  //保存滚动条位置
  Toast.loading({
    duration: 0, // 持续展示 toast
    forbidClick: true, // 禁用背景点击
    loadingType: "spinner",
    message: message,
    transition: "", // 去掉动画部分; 机型会看到闪烁，比如chily的12mini
  });
};
/**
 * 隐藏菊花
 */
const hideLoading = () => {
  Toast.clear();
};

export default {
  showLoading,
  hideLoading,
};
