import db from "../mongodb";
let messageSchema = db.Schema({
  content: String,
  headerColor: { type: String, default: "#ff6c1a" },
  nickname: { type: String, default: "匿名网友" },
  createTime: String,
  likes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
  replyList: [
    {
      replyHeaderColor: { type: String, default: "#009688" },
      replyContent: String,
      replyUser: { type: String, default: "匿名网友" },
      byReplyUser: String,
      replyTime: String,
    },
  ],
});
export default db.model("message", messageSchema);
