import { useStore } from "vuex";
import { computed } from "vue";

function useGetLabelColor() {
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
}

export default useGetLabelColor;
