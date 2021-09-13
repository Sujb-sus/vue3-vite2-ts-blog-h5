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

  async add(ctx, next) {
    console.log("----------------添加标签 label/add-----------------------");
    let paramsData = ctx.request.body;
    try {
      let data = await ctx.findOne(labelModel, { label: paramsData.label });
      if (data) {
        ctx.sendError("数据已经存在, 请重新添加!");
      } else {
        let result = await ctx.add(labelModel, paramsData);
        ctx.send(result);
      }
    } catch (e) {
      ctx.sendError(e);
    }
  },

  async update(ctx, next) {
    console.log("----------------更新标签 label/update-----------------------");
    let paramsData = ctx.request.body;
    try {
      let data = await ctx.update(
        labelModel,
        { _id: paramsData._id },
        paramsData
      );
      ctx.send(data);
    } catch (e) {
      if (e === "暂无数据") {
        ctx.sendError(e);
      }
    }
  },

  async del(ctx, next) {
    console.log("----------------删除标签 label/del-----------------------");
    let id = ctx.request.query.id;
    try {
      let data = await ctx.remove(labelModel, { _id: id });
      ctx.send(data);
    } catch (e) {
      ctx.sendError(e);
    }
  },
};
