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
      ctx.body = social_prcs;
    }

    //展示某条信息
    public static async showSocialPrcDetail(ctx: Context) {
      const socialPrcRepository = getManager().getRepository(Social_Prc);
      const socialPrc = await socialPrcRepository.findOneBy({ prcNo: +ctx.params.name });
  
      if (socialPrc) {
        ctx.status = 200;
        ctx.body = socialPrc;
      } else {
        throw new NotFoundException();
      }
    }

    public static async addSocialPrc(ctx: Context) {
      const socialPrcRepository = getManager().getRepository(Social_Prc);

      //检验数据库中是否有这个人

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
      ctx.body = prc;
      

    }

    public static async deleteSocialPrc(ctx: Context) {
        
      const socialPrcRepository = getManager().getRepository(Social_Prc);
      await socialPrcRepository.delete(+ctx.params.prcNo);
  
      ctx.status = 204;
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