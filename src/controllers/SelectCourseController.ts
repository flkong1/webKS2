import { Context } from 'koa';
import { getManager } from 'typeorm';
import { Social_Prc } from '../entity/social_prc';
import { User_Student } from '../entity/user_student';
import { NotFoundException, ForbiddenException, UnauthorizedException } from '../exceptions'
import Auth from '../authMiddleware/auth';
import { SelectRecord } from '../entity/selectRecord';

export default class SelectCourseController {

    //学生选课
    public static async selectCourse(ctx: Context) {
        await Auth.Verify(ctx);
        const studentRepository = getManager().getRepository(User_Student);
        const student = await studentRepository.findOneBy({ studentNo: ctx.state.user.id });
        if(student){
          const newRecord = new SelectRecord();
          newRecord.studentNo = ctx.state.user.id;
          newRecord.studentName = student.name;
          newRecord.teacherName = ctx.request.body.teacherName;
          
        }


    }
}
