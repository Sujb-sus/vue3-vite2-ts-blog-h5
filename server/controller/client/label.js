import labelModel from "../../models/label";

module.exports = {
  async list(ctx, next) {
    console.log(
      "----------------获取标签列表 label/list-----------------------"
    );
    let { keyword, pageindex = 1, pagesize = 50 } = ctx.request.query;
    try {
      let reg = new RegExp(keyword, "i");
      let data = await ctx.findPage(
        labelModel,
        {
          $or: [{ label: { $regex: reg } }, { bgColor: { $regex: reg } }],
        },
        null,
        { limit: pagesize * 1, skip: (pageindex - 1) * pagesize }
      );
      ctx.send(data);
    } catch (e) {
      console.log(e);
      ctx.sendError(e);
    }
  },
};
