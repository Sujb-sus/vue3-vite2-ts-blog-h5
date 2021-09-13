import messageModel from '../../models/message';

module.exports = {
  async list(ctx, next) {
    console.log(
      '----------------获取留言列表 admin_api/message/list-----------------------'
    );
    let { keyword, pageindex = 1, pagesize = 10 } = ctx.request.query;

    let reg = new RegExp(keyword, 'i');

    let conditions = {
      $or: [{ nickname: { $regex: reg } }, { content: { $regex: reg } }],
    };

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
      let data = await ctx.find(messageModel, conditions, null, options);
      return ctx.send(data);
    } catch (e) {
      console.log(e);
      return ctx.sendError(e);
    }
  },

  async del(ctx, next) {
    console.log(
      '----------------删除留言 admin_api/message/del-----------------------'
    );
    let id = ctx.request.query.id;
    try {
      ctx.remove(messageModel, { _id: id });
      ctx.send();
    } catch (e) {
      ctx.sendError(e);
    }
  },

  async delReply(ctx, next) {
    console.log(
      '----------------删除回复 admin_api/message/delReply-----------------------'
    );
    let { _id } = ctx.request.body;
    let options = {
      $pull: { replyList: { _id } },
    };
    try {
      let data = await ctx.update(messageModel, { _id }, options);
      ctx.send();
    } catch (e) {
      ctx.sendError(e);
    }
  },
};
