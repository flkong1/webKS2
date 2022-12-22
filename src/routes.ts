// 路由实现
import Router from '@koa/router';

import AuthController from './controllers/AuthController';
import UserController from './controllers/User';
import StudentAdminController from './controllers/StudentAdmin';
import DeptController from './controllers/Dept';
import SocialPrcController from './controllers/SocialPrcController';
import StuBasicInfoController from './controllers/StuBasicInfo';
const unprotectedRouter = new Router();

unprotectedRouter.post('/auth/login/user', AuthController.loginUser);
unprotectedRouter.post('/auth/login/admin', AuthController.loginAdmin);
unprotectedRouter.post('/auth/login/logout', AuthController.logout);
unprotectedRouter.post('/auth/login', AuthController.login);
unprotectedRouter.get('/auth/login/yzm', AuthController.loginYzm);
unprotectedRouter.post('/auth/login/forgot', AuthController.forgotPass);
unprotectedRouter.post('/auth/register', AuthController.register);
unprotectedRouter.post('/stuAdmin/insertStudent', StudentAdminController.insertStudent);
unprotectedRouter.get('/dpt/getDptName', DeptController.getDeptName);
unprotectedRouter.get('stuAdmin/getStuData', StudentAdminController.getStuData);

const protectedRouter = new Router();

//跟账号相关
protectedRouter.get('/users', UserController.listUsers);
protectedRouter.get('/users/:name', UserController.showUserDetail);
protectedRouter.put('/users/:name', UserController.updateUser);
protectedRouter.delete('/users/:name', UserController.deleteUser);
// protectedRouter.post('/stuAdmin/insertStudent', StudentAdminController.insertStudent);
unprotectedRouter.patch('/pwd/changePwd/:name',UserController.changePwd);

//基本信息
protectedRouter.get('/stuBasicInfo/list', StuBasicInfoController.listStuBasicInfo);
protectedRouter.get('/stuBasicInfo/list/:studentNo',StuBasicInfoController.showStuBasicInfoDetail);
protectedRouter.post('/stuBasicInfo/add',StuBasicInfoController.addStuBasicInfo);
protectedRouter.put('/stuBasicInfo/update/:studentNo',StuBasicInfoController.updateStuBasicInfo);
protectedRouter.delete('/stuBasicInfo/delete/:studentNo',StuBasicInfoController.deleteStuBasicInfo);

//社会实践 
protectedRouter.get('/social_prc/list', SocialPrcController.listSocialPrc);
protectedRouter.post('/social_prc/list/:name',SocialPrcController.showSocialPrcDetail);
protectedRouter.post('/social_prc/add',SocialPrcController.addSocialPrc);
protectedRouter.delete('/social_prc/delete/:prcNo',SocialPrcController.deleteSocialPrc);

export { protectedRouter, unprotectedRouter };
