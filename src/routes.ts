// 路由实现
import Router from '@koa/router';

import AuthController from './controllers/AuthController';
import UserController from './controllers/User';
import StudentAdminController from './controllers/StudentAdmin';
import DeptController from './controllers/Dept';
import SocialPrcController from './controllers/SocialPrcController';
import StuBasicInfoController from './controllers/StuBasicInfo';
import ExtraCurricularController from './controllers/ExtraCurricularController';
import AchievementController from './controllers/AchievementController';
import  EvaluateController  from './controllers/EvaluateController';
import  CourseController  from './controllers/CourseController';
import  TeaBasicInfoController  from './controllers/TeaBasicInfoController';
import EmailController from './controllers/EmailController';
import PortraitController from './controllers/potraitController';

const unprotectedRouter = new Router();

unprotectedRouter.post('/auth/login/user', AuthController.loginUser);
unprotectedRouter.post('/auth/login/logout', AuthController.logout);
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
unprotectedRouter.post('/pwd/changePwd',UserController.changePwd);

//邮箱验证码
unprotectedRouter.post('/sendEmail',EmailController.getEmailCode );

//选课
unprotectedRouter.post('/course/listCourse',CourseController.listCourse);
unprotectedRouter.post('/course/loadButton',CourseController.loadState);
unprotectedRouter.post('/course/openOrCloseCourse',CourseController.openOrCloseCourse);
unprotectedRouter.post('/course/addCourse',CourseController.addCourse);
unprotectedRouter.post('/course/updateCourse',CourseController.updateCourse);
unprotectedRouter.post('/course/deleteCourse',CourseController.deleteCourse);

//学生基本信息
unprotectedRouter.post('/stuBasicInfo/getInfoTable', StuBasicInfoController.listStuBasicInfo);
unprotectedRouter.post('/stuBasicInfo/getInfo',StuBasicInfoController.showStuBasicInfoDetail);
unprotectedRouter.post('/stuBasicInfo/add',StuBasicInfoController.addStuBasicInfo);
unprotectedRouter.post('/stuBasicInfo/update',StuBasicInfoController.updateStuBasicInfo);
unprotectedRouter.post('/stuBasicInfo/delete',StuBasicInfoController.deleteStuBasicInfo);

//教师基本信息
unprotectedRouter.post('/teaBasicInfo/getInfoTable', TeaBasicInfoController.listTeaBasicInfo);
unprotectedRouter.post('/teaBasicInfo/getInfo',TeaBasicInfoController.showTeaBasicInfoDetail);
unprotectedRouter.post('/teaBasicInfo/add',TeaBasicInfoController.addTeaBasicInfo);
unprotectedRouter.post('/teaBasicInfo/update',TeaBasicInfoController.updateTeaBasicInfo);
unprotectedRouter.post('/teaBasicInfo/delete',TeaBasicInfoController.deleteTeaBasicInfo);

//社会实践 
unprotectedRouter.post('/social_prc/list/getInfoTable', SocialPrcController.listSocialPrc);
unprotectedRouter.post('/social_prc/list/getInfo',SocialPrcController.showSocialPrcDetail);
unprotectedRouter.post('/social_prc/add',SocialPrcController.addSocialPrc);
unprotectedRouter.post('/social_prc/update',SocialPrcController.updateSocialPrc);
unprotectedRouter.post('/social_prc/delete',SocialPrcController.deleteSocialPrc);

//课外活动
unprotectedRouter.post('/extraCurricular/list/getInfoTable', ExtraCurricularController.listExCurricular);
unprotectedRouter.post('/extraCurricular/list/getInfo',ExtraCurricularController.showExCurricularDetail);
unprotectedRouter.post('/extraCurricular/add',ExtraCurricularController.addExCurricular);
unprotectedRouter.post('/extraCurricular/update',ExtraCurricularController.updateExCurricular);
unprotectedRouter.post('/extraCurricular/delete',ExtraCurricularController.deleteExCurricular);

//成果奖励
unprotectedRouter.post('/achievement/list/getInfoTable', AchievementController.listAchieve);
unprotectedRouter.post('/achievement/list/getInfo',AchievementController.showAchieveDetail);
unprotectedRouter.post('/achievement/add',AchievementController.addAchieve);
unprotectedRouter.post('/achievement/update',AchievementController.updateAchieve);
unprotectedRouter.post('/achievement/delete',AchievementController.deleteAchieve);

//学生互评
unprotectedRouter.post('/evaluate/listEvaluation',EvaluateController.listEvaluation);
unprotectedRouter.post('/evaluate/listClass',EvaluateController.listClass);
unprotectedRouter.post('/evaluate/doEvaluate',EvaluateController.evaluate);
unprotectedRouter.post('/evaluate/meEvaluated',EvaluateController.meEvaluated);
unprotectedRouter.post('/evaluate/evaluateMe',EvaluateController.evaluateMe);

//用户画像
unprotectedRouter.post('/portrait/listCharacter',PortraitController.listCharacter);

export { protectedRouter, unprotectedRouter };
