import { Context } from 'koa';
import { getManager } from 'typeorm';
import { SelectRecord } from '../entity/selectRecord';
import { User_Student } from '../entity/user_student';
import Auth from '../authMiddleware/auth';

export default class StuBasicInfoController {

    //查询个人成绩
    public static async checkScore(ctx: Context) {
        await Auth.Verify(ctx);
        const studentRepository = getManager().getRepository(User_Student);
        const stu = await studentRepository.findOne({
            where: {studentNo: ctx.state.user.id},
            relations: ['selectRecords']
        });
        console.log(stu)

        // const recordRepository = getManager().getRepository(SelectRecord);
        // const studentNo = ctx.state.user.id
        // // console.log(stu)
        // // console.log('11111111111111111111111')
        // const record = await recordRepository.find({
        //     relations: ['student','course'],
        //     order:{score: "DESC"}});

        // console.log(record);
        ctx.status = 200;
        ctx.body = {
          code: 1,
          datas: {
            stu
          }
        };

    }


}