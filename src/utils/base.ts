import { Toast } from "vant";

const showLoading = (message?: string) => {
  Toast.loading({
    duration: 0,
    forbidClick: true,
    loadingType: "spinner",
    message: message,
    transition: "",
  });
};

const hideLoading = () => {
  Toast.clear();
};

export default {
  showLoading,
  hideLoading,
};
