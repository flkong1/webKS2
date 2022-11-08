import { Context } from 'koa';
import * as argon2 from 'argon2';
import { getManager } from 'typeorm';
import jwt from 'jsonwebtoken';
import { User } from '../entity/user';
import { JWT_SECRET } from '../constants';
import { UnauthorizedException } from '../exceptions';

export default class AuthController {
  public static async login(ctx: Context) {
    const userRepository = getManager().getRepository(User);

    // 根据用户名（请求体中的 name 字段）查询对应的用户
    const user = await userRepository
      .createQueryBuilder()
      .where({ name: ctx.request.body.name })
      .addSelect('User.password')
      .getOne();

    if (!user) {
      throw new UnauthorizedException('用户名不存在');
    } else if (await argon2.verify(user.password, ctx.request.body.password)) {
      // 用户名存在的话通过 argon2.verify 来验证请求体中的明文密码 password 和数据库中存储的加密密码是否一致
      ctx.status = 200;
      // 一致则通过 jwt.sign 签发 Token
      // Token 负载就是标识用户 ID 的对象, 这样后面鉴权成功后就可以通过 ctx.user.id 来获取用户 ID
      ctx.body = { token: jwt.sign({ id: user.id }, JWT_SECRET) };
    } else {
      throw new UnauthorizedException('密码错误');
    }
  }

  public static async register(ctx: Context) {
    const userRepository = getManager().getRepository(User);

    const newUser = new User();
    newUser.name = ctx.request.body.name;
    newUser.email = ctx.request.body.email;
    newUser.password = await argon2.hash(ctx.request.body.password);

    // 保存到数据库
    const user = await userRepository.save(newUser);

    ctx.status = 201;
    ctx.body = user;
  }
}
