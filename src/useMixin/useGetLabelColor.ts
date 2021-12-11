import { useStore } from "vuex";
import { computed } from "vue";

/**
 * 封装获取标签背景色逻辑
 * @description 文章Item、文章详情Detail
 */
const useGetLabelColor = () => {
  const store = useStore();
  const labelList = store.getters["label/labelList"];

  const getLabelColor = computed(() => {
    return (labelName: string) => {
      if (labelList.length) {
        let labelIndex = labelList.findIndex(
          (item: { label: string }) => item.label === labelName
        );
        return labelList[labelIndex].bgColor;
      }
      return "rgba(70, 70, 70, 0.9)";
    };
  });

  return {
    getLabelColor,
  };
};

export default useGetLabelColor;
