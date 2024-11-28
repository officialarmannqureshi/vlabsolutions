import express from 'express';
import { registerController, loginController,testController} from '../controllers/authController.js';
import { RequireSignIn, isAdmin} from '../middleware/authMiddleware.js';
import {addFileController,getassignmentController } from '../controllers/assignmentController.js';

import { student_file_controller,student_file_get_controller } from '../controllers/student_file_controller.js';
import { quizController } from '../controllers/quizController.js';
//router object

const router=express.Router();
 
//routing
//registrating data and send it to controller to organize and respond acc. || method 'post'
router.post('/register',registerController);

//route for JWT Authentications -LOGIN

router.get('/login',loginController);

//route for create Assignments

router.post('/create-assignment',RequireSignIn,isAdmin,addFileController);

// test route for JWT

router.post('/test',RequireSignIn,testController);

//protected route

router.get('/user-auth',RequireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
})

router.get('/admin-auth',RequireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true});
})

// for admin/students -to upload students details to DB

router.post('/uploadall',RequireSignIn,isAdmin,student_file_controller);


//to getting all student's details

router.get('/getall',RequireSignIn,isAdmin,student_file_get_controller);

router.get('/getallassignments',RequireSignIn,getassignmentController);

// route for quizDetails

router.post('/quizData',RequireSignIn,quizController);

export default router;