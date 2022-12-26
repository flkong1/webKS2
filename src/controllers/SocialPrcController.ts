import { Context } from 'koa';
import { getManager } from 'typeorm';
import { UnauthorizedException } from '../exceptions';
import jwt from 'jsonwebtoken';
import svgCaptcha from 'svg-captcha';
import { Social_Prc } from '../entity/social_prc';
import { JWT_SECRET } from '../constants';
import { NotFoundException, ForbiddenException } from '../exceptions'

export default class SocialPrcController {

  //展示表中所有信息
    public static async listSocialPrc(ctx: Context) {
      const socialPrcRepository = getManager().getRepository(Social_Prc);
      //加载带有user_student的socia_prc
      const social_prcs = await socialPrcRepository.find();
  
      ctx.status = 200;
      ctx.body = {
          status: 20,
          code: 1,
          datas: {
            social_prcs,
          }
        };
    }

    //展示某某个人社会实践信息
    public static async showSocialPrcDetail(ctx: Context) {
      const socialPrcRepository = getManager().getRepository(Social_Prc);
      const socialPrc = await socialPrcRepository.findBy({ user: ctx.request.body.studentNo });
  
      if (socialPrc) {
        ctx.status = 200;
        ctx.body = {
          code: 1,
          datas: socialPrc,
        };
        // ctx.body = socialPrc;
      } else {
        ctx.status = 200;
          ctx.body = {
            code: -1,
            msg:'用户不存在',
          }
        throw new NotFoundException();
      }
    }

    public static async addSocialPrc(ctx: Context) {
      const socialPrcRepository = getManager().getRepository(Social_Prc);

      const newPrc = new Social_Prc();
      newPrc.stuName = ctx.request.body.stuName;
      newPrc.user = ctx.request.body.user;
      newPrc.date = ctx.request.body.date;
      newPrc.title = ctx.request.body.title;
      newPrc.content = ctx.request.body.content;
      newPrc.result = ctx.request.body.result;

      console.log('社会实践经历添加成功')

      const prc = await socialPrcRepository.save(newPrc);

      ctx.status = 201;
      ctx.body = {
        code: 1,
        // datas: nstu,
      };
      

    }

    public static async deleteSocialPrc(ctx: Context) {
        
      const socialPrcRepository = getManager().getRepository(Social_Prc);
      await socialPrcRepository.delete(ctx.request.body.prcNo);
  
      ctx.status = 204;
      ctx.body = {
        status: 204,
        code: 1,
      };
      console.log('社会实践信息删除成功');
    }


    //用studentNo外键查找？
    // public static async updateSocialPrc(ctx: Context) {
    //   const userId = +ctx.params.id;
    //   // 鉴权逻辑
    //   if (userId !== +ctx.state.user.id) {
    //     throw new ForbiddenException();
    //   }
  
    //   const userRepository = getManager().getRepository(User);
    //   await userRepository.update(+ctx.params.id, ctx.request.body);
    //   const updatedUser = await userRepository.findOneBy({ id: +ctx.params.id });
  
    //   if (updatedUser) {
    //     ctx.status = 200;
    //     ctx.body = updatedUser;
    //   } else {
    //     ctx.status = 404;
    //   }
    // }

    
  
   
}