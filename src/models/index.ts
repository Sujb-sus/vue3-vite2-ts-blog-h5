interface articleModel {
  _id: string;
  title: string;
  releaseTime: string;
  pv: number;
  auth?: string;
  type: string[];
  desc?: string;
  fileCoverImgUrl: string;
  html: string;
  markdown?: string;
  level?: number;
  github?: string;
  source?: number;
  isVisible: boolean;
  likes: number;
  comments?: number;
}

interface labelModel {
  _id: string;
  label: string;
  bgColor: string;
  createTime?: string;
}

type replyItem = {
  _id: string;
  replyHeaderColor?: string;
  replyContent?: string;
  replyUser: string;
  byReplyUser: string;
  replyTime: string;
};
interface commentModel {
  _id: string;
  content: string;
  headerColor: string;
  nickname: string;
  createTime: string;
  likes: number;
  comments: number;
  replyList?: Array<replyItem>;
}

export type { articleModel, labelModel, commentModel, replyItem };
