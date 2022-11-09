import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import { protectedRouter, unprotectedRouter } from './routes';
import { JWT_SECRET } from './constants';
import logger from './logger';
import sessionConfig from './config/session';
import { createConnection } from 'typeorm';
import jwt from 'koa-jwt';
import koaSession from 'koa-session';
import 'reflect-metadata';

// 配合 signed 属性的签名key
const session_signed_key = ['appletSystem'];

createConnection()
  .then(() => {
    // 初始化 Koa 应用实例
    const app = new Koa();

    // session 实例化
    const session = koaSession(sessionConfig, app);
    app.keys = session_signed_key;
    app.use(session);

    // 注册中间件
    app.use(logger());
    app.use(cors());
    app.use(bodyParser());
    // 错误处理中间件
    app.use(async (ctx, next) => {
      try {
        await next();
      } catch (err) {
        // 只返回 JSON 格式的响应
        ctx.status = err.status || 500;
        ctx.body = { message: err.message };
      }
    });
    // 响应用户请求
    // 无需 JWT Token 即可访问
    app.use(unprotectedRouter.routes()).use(unprotectedRouter.allowedMethods());

    // 注册 JWT 中间件
    app.use(jwt({ secret: JWT_SECRET }).unless({ method: 'GET' }));

    // 需要 JWT Token 才可访问
    app.use(protectedRouter.routes()).use(protectedRouter.allowedMethods());

    // 运行服务器
    app.listen(3000);
  })
  .catch((err: string) => console.log('TypeORM connection error:', err));
