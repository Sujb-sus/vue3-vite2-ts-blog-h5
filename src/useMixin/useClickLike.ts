import { ref, computed } from "vue";
import { Toast } from "vant";

/**
 * 封装点赞逻辑
 * @requestApi api请求的path
 * @description 点赞文章、留言
 */
const useClickLike = (requestApi: Function) => {
  let likeList = ref<string[]>([]); // 点过赞列表

  // 获取点赞数
  const getLikesNumber = computed(
    () => (id: string, likes: number) =>
      likeList.value.includes(id) ? likes + 1 : likes
  );
  // 点赞高亮
  const getLikesColor = computed(
    () => (id: string) => likeList.value.includes(id)
  );
  // 点赞事件
  const handleLikes = (id: string) => {
    return requestApi({ _id: id, isLike: likeList.value.includes(id) })
      .then(() => {
        likeList.value.includes(id)
          ? likeList.value.splice(likeList.value.indexOf(id), 1)
          : likeList.value.push(id);
      })
      .catch((err: any) => {
        Toast("点赞失败");
        console.log(err);
      });
  };

  return {
    getLikesNumber,
    getLikesColor,
    handleLikes,
    likeList,
  };
};

export default useClickLike;
