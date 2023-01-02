import { Context } from 'koa';
import { sendEmail} from '../authMiddleware/emailCode';
export default class emailController {
    // const getEmailCode = async ctx => 
public static async getEmailCode(ctx: Context){
    let codeStr = "";  //验证码
    let codeLen = 6;   //验证码长度
    for(let i=0;i<codeLen;i++){
        codeStr += Math.floor(Math.random()*10);
    }
    var mail = {
        from: "2979115538@qq.com",       //发件邮箱
        subject: "验证码",
        to: ctx.request.body.email,   //收件邮箱
        text: "验证码为：" + codeStr, //发送内容
    };
    const res = await sendEmail(mail);
    ctx.emailCode = codeStr;
    ctx.emailCodeTime = new Date().getTime();
    ctx.body = {
        code: 200,
        data: res,
        msg: 'success'
    } 
}


}
