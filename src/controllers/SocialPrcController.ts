import { Context } from 'koa';
import { getManager } from 'typeorm';
import { Social_Prc } from '../entity/social_prc';
import { NotFoundException, ForbiddenException, UnauthorizedException } from '../exceptions'
import Auth from '../authMiddleware/auth';

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

    //学生端展示某个人社会实践信息
    public static async showSocialPrcDetail(ctx: Context) {
      await Auth.Verify(ctx);
      const socialPrcRepository = getManager().getRepository(Social_Prc);
      const socialPrc = await socialPrcRepository.findBy({ studentNo: +ctx.state.user.id });
  
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
      newPrc.studentNo = ctx.request.body.studentNo;
      newPrc.user = ctx.request.body.studentNo;
      newPrc.date = ctx.request.body.date;
      newPrc.title = ctx.request.body.title;
      newPrc.content = ctx.request.body.content;
      newPrc.result = ctx.request.body.result;

      const prc = await socialPrcRepository.save(newPrc);
      console.log('社会实践经历添加成功')

      ctx.status = 200;
      ctx.body = {
        code: 1,
      };
      

    }

    public static async deleteSocialPrc(ctx: Context) {
        
      const socialPrcRepository = getManager().getRepository(Social_Prc);
      await socialPrcRepository.delete({stuName: ctx.request.body.stuName, title: ctx.request.body.title});
  
      ctx.status = 200;
      ctx.body = {
        status: 200,
        code: 1,
      };
      console.log('社会实践信息删除成功');
    }

    public static async updateSocialPrc(ctx: Context) {
    
      const socialPrcRepository = getManager().getRepository(Social_Prc);
      //根据学生姓名跟社会实践名称唯一确定一条信息
        await socialPrcRepository.update({ stuName: ctx.request.body.stuName, title: ctx.request.body.title}, ctx.request.body);
        const socialPrc = await socialPrcRepository.findOneBy({ stuName: ctx.request.body.stuName, title: ctx.request.body.title});
    
        if (socialPrc) {
          ctx.status = 200;
          ctx.body = {
            code: 1,
            
          };
        } else {
          ctx.status = 200;
          ctx.body = {
            code: -1,
            msg: '更新失败'
          };
        }
        console.log('社会实践信息修改成功');

    }






    
  
   
}