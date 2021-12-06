import { ref, computed } from "vue";
import { Toast } from "vant";

/**
 * 封装点赞逻辑
 * @requestApi api请求的path
 * @description 点赞文章、留言
 */
const useClickLike = (requestApi: Function) => {
  let currentId = ref(""); // 当前id
  let isLike = ref(false); // 是否点赞
  let isLikeSuccess = ref(true); // 是否点赞成功
  let likeList = ref<string[]>([]); // 点过赞列表

  // 获取点赞数
  const getLikesNumber = computed(
    () => (id: string, likes: number) =>
      isLikeSuccess.value && likeList.value.includes(id) ? likes + 1 : likes
  );
  // 点赞高亮
  const getLikesColor = computed(
    () => (id: string) => isLikeSuccess.value && likeList.value.includes(id)
  );
  // 点赞事件
  const handleLikes = (id: string) => {
    if (likeList.value.includes(id)) {
      isLike.value = true;
      likeList.value.splice(likeList.value.indexOf(id), 1);
    } else {
      isLike.value = false;
      likeList.value.push(id);
    }
    currentId.value = id;
    return requestApi({ _id: id, isLike: isLike.value })
      .then(() => {
        isLikeSuccess.value = true;
      })
      .catch((err: any) => {
        isLikeSuccess.value = false;
        Toast("点赞失败");
        console.log(err);
      });
  };

  return {
    getLikesNumber,
    getLikesColor,
    handleLikes,
  };
};

export default useClickLike;
