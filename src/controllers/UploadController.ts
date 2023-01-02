import { Context } from "koa";
import { getManager } from 'typeorm';

export default class UploadController {
    public static async addPhoto(ctx: Context) {
        // const file = ctx.request.body;
        console.log(ctx.request)
        ctx.body = {
            code: 1,
            msg: '头像上传成功',
        }
    }

}