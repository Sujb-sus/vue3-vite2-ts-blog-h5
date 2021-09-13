import { ref, computed } from "vue";

function useClickLike(requestApi: Function) {
  let currentId = ref(""); // 当前id
  let isLike = ref(false); // 是否点赞
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

  const handleLikes = (id: string) => {
    if (likeList.value.includes(id)) {
      isLike.value = true;
      likeList.value.splice(likeList.value.indexOf(id), 1);
    } else {
      isLike.value = false;
      likeList.value.push(id);
    }
    currentId.value = id;
    return requestApi({ _id: id, isLike: isLike.value }).catch((err: any) => {
      console.log(err);
    });
  };

  return {
    getLikesNumber,
    getLikesColor,
    handleLikes,
  };
}

export default useClickLike;
