import jwt from 'jsonwebtoken';
import conf from '../../config';

export default () => {
  return async (ctx, next) => {
    // 白名单就不需要走 jwt 鉴权
    if (!conf.auth.whiteList.some((v) => ctx.path.includes(v))) {
      let token = ctx.cookies.get(conf.auth.tokenKey);
      try {
        jwt.verify(token, conf.auth.admin_secret);
      } catch (e) {
        if ('TokenExpiredError' === e.name) {
          ctx.sendError('token已过期, 请重新登录!');
          ctx.throw(401, 'token已过期, 请重新登录!');
        }
        ctx.sendError('token验证失败, 请重新登录!');
        ctx.throw(401, 'token验证失败, 请重新登录!');
      }
      console.log('鉴权成功');
    }
    await next();
  };
};
