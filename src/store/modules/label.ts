import { apiGetLabelList } from "@/api/label";
import { labelModel } from "@/models/index";

type State = {
  labelList: Array<labelModel>;
};
export default {
  namespaced: true,
  state: {
    labelList: null,
  },
  mutations: {
    setLabelList(state: State, data: Array<labelModel>) {
      state.labelList = data;
    },
  },
  actions: {
    getLabelList(context: { commit: (arg0: string, arg1: any) => void }) {
      let params = {
        pageindex: 1,
        pagesize: 50,
      };
      return apiGetLabelList(params)
        .then((res) => {
          context.commit("setLabelList", res?.data?.list);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  getters: {
    labelList(state: State) {
      return state.labelList;
    },
  },
};
