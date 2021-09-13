import messageModel from '../../models/message';

module.exports = {
  async add(ctx, next) {
    console.log('----------------添加留言 message/add-----------------------');
    let paramsData = ctx.request.body;
    if (!paramsData.nickname) {
      paramsData.nickname = '匿名网友';
    }
    try {
      await ctx.add(messageModel, paramsData);
      ctx.send(paramsData);
    } catch (e) {
      ctx.sendError(e);
    }
  },

  async list(ctx, next) {
    console.log(
      '----------------获取评论列表 client_api/message/list-----------------------'
    );
    let { pageindex = 1, pagesize = 10 } = ctx.request.query;

    // 排序参数
    let sortParams = {
      createTime: -1,
    };

    let options = {
      limit: pagesize * 1,
      skip: (pageindex - 1) * pagesize,
      sort: sortParams,
    };

    try {
      let data = await ctx.find(messageModel, null, null, options);
      return ctx.send(data);
    } catch (e) {
      console.log(e);
      return ctx.sendError(e);
    }
  },

  async replyCount(ctx, next) {
    console.log(
      '----------------获取回复列表 client_api/message/replyCount-----------------------'
    );
    let conditions = [
      { $project: { replyCount: { $size: '$replyList' } } },
      { $group: { _id: null, replyCount: { $sum: '$replyCount' } } },
    ];
    try {
      let data = await ctx.aggregate(messageModel, conditions);
      return ctx.send(data);
    } catch (e) {
      console.log(e);
      return ctx.sendError(e);
    }
  },

  async updateLikes(ctx, next) {
    console.log(
      '----------------点赞留言 client_api/message/updateLikes------------------'
    );
    let paramsData = ctx.request.body;
    let num = JSON.parse(paramsData.isLike) ? -1 : 1;
    let options = { $inc: { likes: num } };
    try {
      let data = await ctx.update(
        messageModel,
        { _id: paramsData._id },
        options
      );
      ctx.send();
    } catch (e) {
      ctx.sendError(e);
    }
  },

  async updateReplys(ctx, next) {
    console.log(
      '----------------回复留言 client_api/message/updateReplys------------------'
    );
    let paramsData = ctx.request.body;
    if (!paramsData.replyUser) {
      paramsData.replyUser = '匿名网友';
    }
    let options = {
      $push: { replyList: { $each: [paramsData], $position: 0 } },
    };
    try {
      let data = await ctx.update(
        messageModel,
        { _id: paramsData._id },
        options
      );
      ctx.send();
    } catch (e) {
      ctx.sendError(e);
    }
  },
};
