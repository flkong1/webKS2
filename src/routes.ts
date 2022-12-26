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
// unprotectedRouter.post('/stuAdmin/insertStudent', StudentAdminController.insertStudent);
unprotectedRouter.get('/dpt/getDptName', DeptController.getDeptName);
// unprotectedRouter.get('stuAdmin/getStuData', StudentAdminController.getStuData);

const protectedRouter = new Router();

//跟账号相关
unprotectedRouter.get('/users', UserController.listUsers);
unprotectedRouter.get('/users/:name', UserController.showUserDetail);
unprotectedRouter.post('/users/add',AuthController.register)
unprotectedRouter.put('/users/:name', UserController.updateUser);
unprotectedRouter.delete('/users/:name', UserController.deleteUser);
// protectedRouter.post('/stuAdmin/insertStudent', StudentAdminController.insertStudent);
unprotectedRouter.patch('/pwd/changePwd/:name',UserController.changePwd);

//基本信息
unprotectedRouter.post('/stuBasicInfo/getInfoTable', StuBasicInfoController.listStuBasicInfo);
unprotectedRouter.get('/stuBasicInfo/getInfo',StuBasicInfoController.showStuBasicInfoDetail);
unprotectedRouter.post('/stuBasicInfo/add',StuBasicInfoController.addStuBasicInfo);
unprotectedRouter.post('/stuBasicInfo/update',StuBasicInfoController.updateStuBasicInfo);
unprotectedRouter.post('/stuBasicInfo/delete',StuBasicInfoController.deleteStuBasicInfo);

//社会实践 
unprotectedRouter.get('/social_prc/list', SocialPrcController.listSocialPrc);
unprotectedRouter.post('/social_prc/list',SocialPrcController.showSocialPrcDetail);
unprotectedRouter.post('/social_prc/add',SocialPrcController.addSocialPrc);
unprotectedRouter.delete('/social_prc/delete/:prcNo',SocialPrcController.deleteSocialPrc);

export { protectedRouter, unprotectedRouter };
