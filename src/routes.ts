// 路由实现
import Router from '@koa/router';

import AuthController from './controllers/AuthController';
import UserController from './controllers/User';
import StudentAdminController from './controllers/StudentAdmin';
import DeptController from './controllers/Dept';
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

protectedRouter.get('/users', UserController.listUsers);
protectedRouter.get('/users/:id', UserController.showUserDetail);
protectedRouter.put('/users/:id', UserController.updateUser);
protectedRouter.delete('/users/:id', UserController.deleteUser);
// protectedRouter.post('/stuAdmin/insertStudent', StudentAdminController.insertStudent);

export { protectedRouter, unprotectedRouter };
