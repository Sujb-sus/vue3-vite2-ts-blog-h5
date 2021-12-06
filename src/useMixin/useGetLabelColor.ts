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
      if (labelList && labelList.length) {
        let labelIndex = 0;
        labelList.forEach((item: { label: string }, index: number) => {
          if (labelName === item.label) {
            labelIndex = index;
          }
        });
        return labelList[labelIndex].bgColor;
      }
      return "";
    };
  });

  return {
    getLabelColor,
  };
};

export default useGetLabelColor;
