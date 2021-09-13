import db from "../mongodb";
let labelSchema = db.Schema({
  label: String,
  bgColor: String,
  createTime: { type: Date, default: Date.now },
});
export default db.model("label", labelSchema);
