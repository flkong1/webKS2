import { Context } from 'koa';
import { getManager } from 'typeorm';
import { Social_Prc } from '../entity/social_prc';
import { Achievement } from '../entity/achievement';
import { User_Student } from '../entity/user_student';
import { Evaluate } from '../entity/evaluate';
import { Extracurricular } from '../entity/extracurricular';
import { SelectRecord } from '../entity/selectRecord';
import { User } from '../entity/user';
import { NotFoundException, ForbiddenException, UnauthorizedException } from '../exceptions'
import Auth from '../authMiddleware/auth';

export default class PortraitController {
    //返回画像所用数据
    public static async listCharacter(ctx: Context) {
        await Auth.Verify(ctx);
        const socialPrcRepository = getManager().getRepository(Social_Prc);
        const socialPrc = await socialPrcRepository.findBy({ studentNo: +ctx.state.user.id });
        const exCurricularRepository = getManager().getRepository(Extracurricular);
        const exCurricular = await exCurricularRepository.findBy({ studentNo: +ctx.state.user.id });
        const achieveRepository = getManager().getRepository(Achievement);
        const achieve = await achieveRepository.findBy({ studentNo: +ctx.state.user.id });
        const stuBasicInfoRepository = getManager().getRepository(User_Student);
        const stuBasicInfo = await stuBasicInfoRepository.findOneBy({studentNo: ctx.state.user.id});
        if(stuBasicInfo){
          const selectRepository = getManager().getRepository(SelectRecord);
          const course = await selectRepository.findBy({student: stuBasicInfo});
          var gpa = 0;
          if(course[0].score) gpa = course[0].score/10-5;
          const evaluateRepository = getManager().getRepository(Evaluate);
          const evaluateMe = await evaluateRepository.findBy({ evaluatedName: stuBasicInfo.name });
          console.log(evaluateMe)
          ctx.status = 200;
          ctx.body = {
            code: 1,
            datas:{
              socialPrc,
              exCurricular,
              achieve,
              course,
              gpa,
              evaluateMe,
            }
          };
    }
  }



}