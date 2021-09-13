const path = require("path");

module.exports = {
  async uploadImage(ctx, next) {
    console.log("----------------添加图片 uploadImage-----------------------");
    try {
      let opts = {
        path: path.resolve(__dirname, "../../../../public"),
      };
      let result = await ctx.uploadFile(ctx, opts);
      ctx.send(result);
    } catch (e) {
      ctx.sendError(e);
    }
  },
  async delUploadImage(ctx, next) {
    console.log(
      "----------------删除图片 delUploadImage-----------------------"
    );
    let fileName = ctx.request.body.fileName;
    let fileCoverImgUrl = `public/images/${fileName}`;
    try {
      ctx.removeFile(fileCoverImgUrl);
      ctx.send();
    } catch (e) {
      ctx.sendError(e);
    }
  },
};
