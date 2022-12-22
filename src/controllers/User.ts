import { Context } from 'koa';
import { getConnection, getManager } from 'typeorm';
import * as argon2 from 'argon2';
import { UnauthorizedException } from '../exceptions';
import jwt from 'jsonwebtoken';
import svgCaptcha from 'svg-captcha';
import { User } from '../entity/user';
import { JWT_SECRET } from '../constants';
import { NotFoundException, ForbiddenException } from '../exceptions';
import Auth from "../authMiddleware/auth";

export default class UserController {
  public static async listUsers(ctx: Context) {
    const userRepository = getManager().getRepository(User);
    const users = await userRepository.find();

    ctx.status = 200;
    ctx.body = users;
  }

  public static async showUserDetail(ctx: Context) {
    const userRepository = getManager().getRepository(User);
    const user = await userRepository.findOneBy({ name: +ctx.params.name });

    if (user) {
      ctx.status = 200;
      ctx.body = user;
    } else {
      throw new NotFoundException();
    }
  }

  public static async updateUser(ctx: Context) {
    const userId = +ctx.params.name;
    await Auth.Verify(ctx)

    // 鉴权逻辑
    if (userId !== +ctx.state.user.id) {
      throw new ForbiddenException();
    }

    const userRepository = getManager().getRepository(User);
    await userRepository.update(+ctx.params.name, ctx.request.body);
    const updatedUser = await userRepository.findOneBy({ name: +ctx.params.name });

    if (updatedUser) {
      ctx.status = 200;
      ctx.body = updatedUser;
    } else {
      ctx.status = 404;
    }
  }

  public static async deleteUser(ctx: Context) {
    const userId = +ctx.params.name;
    await Auth.Verify(ctx)
    console.log(ctx.state.user);

    if (userId !== +ctx.state.user.id) {
      throw new ForbiddenException();
    }

    const userRepository = getManager().getRepository(User);
    await userRepository.delete(+ctx.params.name);

    ctx.status = 204;
  }

    /*lxy*/
    public static async changePwd(ctx: Context) {
      const userId = +ctx.params.name;
      await Auth.Verify(ctx)
      console.log(userId)
      console.log(ctx.state.user.id)
       if (userId !== +ctx.state.user.id) {

         throw new ForbiddenException();

       }
       
       ctx.request.body.password = await argon2.hash(ctx.request.body.password);
       const userRepository = getManager().getRepository(User);
       await userRepository.update(+ctx.params.name, ctx.request.body);
       const updatedUser = await userRepository.findOneBy({ name: +ctx.params.name });

      if (updatedUser) {
        ctx.status = 200;
        ctx.body = updatedUser;
      } else {
       ctx.status = 404;
     }
  }

      
  }

