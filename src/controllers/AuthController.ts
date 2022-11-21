import { Context } from 'koa';
import * as argon2 from 'argon2';
import { getManager } from 'typeorm';
import jwt from 'jsonwebtoken';
import svgCaptcha from 'svg-captcha';
import { User } from '../entity/user';
import { JWT_SECRET } from '../constants';
import { UnauthorizedException } from '../exceptions';

export default class AuthController {
  public static async forgotPass(ctx: Context) {
    // reset密码（操作mysql via typeorm)
    const userRepository = getManager().getRepository(User);

    // success -> return 1
    ctx.status = 200;
    console.log(ctx);
  }
  public static async loginYzm(ctx: Context) {
    let captcha = svgCaptcha.create({
      inverse: false, //翻转颜色
      fontSize: 48, //字体大小
      noise: 2, //噪声线条数
      width: 100,
      height: 40,
      size: 4, //验证码长度
      ignoreChars: '0o1i', // 验证码字符中排除 0o1i
    });
    // 保存到 session, 忽略大小写
    ctx.session && (ctx.session.captcha = captcha.text.toLowerCase());
    ctx.set('Content-Type', 'image/svg+xml');
    ctx.body = captcha.data;
  }

  public static async loginUser(ctx: Context) {
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
      ctx.body = {
        code: 1,
        datas: {
          token: jwt.sign({ id: user.id }, JWT_SECRET),
        },
      };
    } else {
      ctx.body = {
        msg: '密码错误',
      };
      throw new UnauthorizedException('密码错误');
    }
  }

  public static async logout(ctx: Context) {
    ctx.status = 200;
    ctx.body = {
      code: 200,
    };
  }

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
