import { Context } from 'koa';
import { getManager } from 'typeorm';
import { UnauthorizedException } from '../exceptions';
import jwt from 'jsonwebtoken';
import svgCaptcha from 'svg-captcha';
import { JWT_SECRET } from '../constants';
import { NotFoundException, ForbiddenException,AlreadyExistsException } from '../exceptions'
import { User_Student } from '../entity/user_student';

export default class StuBasicInfoController {
  //管理员端展示所有人的信息
    public static async listStuBasicInfo(ctx: Context) {
        const stuBasicInfoRepository = getManager().getRepository(User_Student);
        const stuBasicInfo = await stuBasicInfoRepository.find();
    
        ctx.status = 200;
        ctx.body = stuBasicInfo;
      }
  //用户端展示自己的信息(需要在url中传入studentNo或user)
      public static async showStuBasicInfoDetail(ctx: Context) {
        const stuBasicInfoRepository = getManager().getRepository(User_Student);
        console.log(ctx.params.studentNo)

       const stu = await stuBasicInfoRepository.findOneBy({ studentNo: +ctx.params.studentNo });

    
        if (stu) {
          ctx.status = 200;
          ctx.body = stu;
        } else {
          throw new NotFoundException();
        }
      }

      //管理员端增加用户基本信息
      public static async addStuBasicInfo(ctx: Context) {
        const stuBasicInfoRepository = getManager().getRepository(User_Student);
        const stu = await stuBasicInfoRepository.findOneBy({ studentNo: ctx.request.body.studentNo });
        if(stu){
          throw new AlreadyExistsException();

        }else{
          const newStu = new User_Student();
          newStu.user = ctx.request.body.user;
          newStu.studentNo = ctx.request.body.studentNo;

          newStu.name = ctx.request.body.name;
          newStu.gender = ctx.request.body.gender;
          newStu.graduateSchool = ctx.request.body.graduateSchool;
          newStu.birthDate = ctx.request.body.birthDate;
          newStu.identityNum = ctx.request.body.identityNum;
          newStu.politicalAppearence = ctx.request.body.politicalAppearence;
          newStu.phoneNum = ctx.request.body.phoneNum;
          newStu.department = ctx.request.body.department;
          newStu.status = ctx.request.body.status;
          newStu.class = ctx.request.body.class;
        
  
          console.log('基本信息添加成功')
  
          const nstu = await stuBasicInfoRepository.save(newStu);
  
          ctx.status = 201;
          ctx.body = nstu;

        }
  
        //检验数据库中是否有这个人

        
        
  
      }

      //管理员段修改学生基本信息
      public static async updateStuBasicInfo(ctx: Context) {
    
        const stuBasicInfoRepository = getManager().getRepository(User_Student);
        const stu = await stuBasicInfoRepository.findOneBy({ studentNo: +ctx.params.studentNo });
        if (stu) {
          await stuBasicInfoRepository.update(+ctx.params.studentNo, ctx.request.body);
          const updatedStu = await stuBasicInfoRepository.findOneBy({ studentNo: +ctx.params.studentNo });
      
          if (updatedStu) {
            ctx.status = 200;
            ctx.body = updatedStu;
          } else {
            ctx.status = 404;
          }
          console.log('基本信息修改成功');
            
        } else {
          throw new NotFoundException();
        }

      }

      // 管理员端删除学生基本信息
      public static async deleteStuBasicInfo(ctx: Context) {
        
        const stuBasicInfoRepository = getManager().getRepository(User_Student);
        const stu = await stuBasicInfoRepository.findOneBy({ studentNo: +ctx.params.studentNo });
        if (stu) {
          await stuBasicInfoRepository.delete(+ctx.params.studentNo);
    
          ctx.status = 204;
          console.log('基本信息删除成功');
        } else {
          throw new NotFoundException();
        }
      
      }

}