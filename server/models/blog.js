import db from "../mongodb";
let blogSchema = db.Schema({
  type: Array,
  title: String,
  desc: String,
  fileCoverImgUrl: String,
  html: String,
  markdown: String,
  level: Number,
  github: String,
  auth: String,
  source: Number,
  isVisible: Boolean,
  releaseTime: String,
  pv: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
});
export default db.model("blog", blogSchema);
