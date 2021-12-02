import blogModel from "../../models/blog";

module.exports = {
  async list(ctx, next) {
    console.log(
      "----------------获取博客列表 client_api/blog/list-----------------------"
    );
    let {
      keyword = null,
      isQuery = null,
      pageindex = 1,
      pagesize = 9,
      sortBy = null,
      isMobile = false,
      type = null,
    } = ctx.request.query;
    // 条件参数
    let conditions = { isVisible: true };
    // 用isMobile来区分移动端和pc端
    let reg = new RegExp(keyword, "i");
    if (isMobile) {
      if (type) {
        conditions.type = type;
      }
      if (keyword) {
        let searchObj = [{ title: { $regex: reg } }, { desc: { $regex: reg } }];
        conditions["$or"] = [...searchObj];
      }
    } else {
      if (keyword) {
        // 区分搜索框、标签场景
        let searchObj = isQuery
          ? [{ title: { $regex: reg } }, { desc: { $regex: reg } }]
          : [{ type: { $regex: reg } }];
        conditions["$or"] = [...searchObj];
      }
    }
    // 排序参数
    let sortParams = {};
    if (sortBy) {
      sortParams[sortBy] = -1;
    } else {
      sortParams["releaseTime"] = -1;
    }

    let options = {
      limit: pagesize * 1,
      skip: (pageindex - 1) * pagesize,
      sort: sortParams,
    };

    try {
      let data = await ctx.find(blogModel, conditions, null, options);
      return ctx.send(data);
    } catch (e) {
      console.log(e);
      return ctx.sendError(e);
    }
  },

  async info(ctx, next) {
    console.log(
      "----------------获取博客信息 client_api/blog/info-----------------------"
    );
    let _id = ctx.request.query._id;
    try {
      let data = await ctx.findOne(blogModel, { _id });
      return ctx.send(data);
    } catch (e) {
      return ctx.sendError(e);
    }
  },

  async updateLikes(ctx, next) {
    console.log(
      "----------------点赞文章 client_api/blog/updateLikes------------------"
    );
    let paramsData = ctx.request.body;
    let num = JSON.parse(paramsData.isLike) ? -1 : 1;
    let options = { $inc: { likes: num } };
    try {
      let data = await ctx.update(blogModel, { _id: paramsData._id }, options);
      ctx.send();
    } catch (e) {
      ctx.sendError(e);
    }
  },

  async updatePV(ctx, next) {
    console.log(
      "----------------文章浏览量 client_api/blog/updatePV------------------"
    );
    let paramsData = ctx.request.body;
    let options = { $inc: { pv: 1 } };
    try {
      let data = await ctx.update(blogModel, { _id: paramsData._id }, options);
      ctx.send();
    } catch (e) {
      ctx.sendError(e);
    }
  },
};
