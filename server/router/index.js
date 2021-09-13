import koaRouter from "koa-router";
const router = koaRouter();

export default (app) => {
  /*----------------------admin-------------------------------*/
  // 用户请求
  router.post("/admin_api/user/login", app.admin.user.login);
  router.get("/admin_api/user/info", app.admin.user.info);
  router.get("/admin_api/user/list", app.admin.user.list);
  router.post("/admin_api/user/add", app.admin.user.add);
  router.post("/admin_api/user/update", app.admin.user.update);
  router.get("/admin_api/user/del", app.admin.user.del);

  // 文章请求
  router.get("/admin_api/blog/list", app.admin.blog.list);
  router.post("/admin_api/blog/add", app.admin.blog.add);
  router.post("/admin_api/blog/update", app.admin.blog.update);
  router.get("/admin_api/blog/del", app.admin.blog.del);
  router.get("/admin_api/blog/info", app.admin.blog.info);

  // 标签请求
  router.get("/admin_api/label/list", app.admin.label.list);
  router.post("/admin_api/label/add", app.admin.label.add);
  router.post("/admin_api/label/update", app.admin.label.update);
  router.get("/admin_api/label/del", app.admin.label.del);

  // 留言请求
  router.get("/admin_api/message/list", app.admin.message.list);
  router.get("/admin_api/message/del", app.admin.message.del);
  router.post("/admin_api/message/delReply", app.admin.message.delReply);

  // 图片请求
  router.post("/admin_api/uploadImage", app.admin.upload.uploadImage);
  router.post("/admin_api/delUploadImage", app.admin.upload.delUploadImage);

  /*----------------------client-------------------------------*/
  // 文章请求
  router.get("/client_api/blog/list", app.client.blog.list);
  router.get("/client_api/blog/info", app.client.blog.info);
  router.post("/client_api/blog/updateLikes", app.client.blog.updateLikes);
  router.post("/client_api/blog/updatePV", app.client.blog.updatePV);

  // 标签请求
  router.get("/client_api/label/list", app.client.label.list);

  // 留言请求
  router.post("/client_api/message/add", app.client.message.add);
  router.get("/client_api/message/list", app.client.message.list);
  router.get("/client_api/message/replyCount", app.client.message.replyCount);
  router.post(
    "/client_api/message/updateLikes",
    app.client.message.updateLikes
  );
  router.post(
    "/client_api/message/updateReplys",
    app.client.message.updateReplys
  );

  app.use(router.routes()).use(router.allowedMethods());
};
