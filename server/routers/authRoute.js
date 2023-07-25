import express from 'express';
import {registerController,loginController,testController} from '../controllers/authController.js';
import { RequireSignIn } from '../middleware/authMiddleware.js';


//router object

const router=express.Router();
 
//routing
//registrating data and send it to controller to organize and respond acc. || method 'post'
router.post('/register',registerController);

//route for JWT Authentications -LOGIN

router.post('/login',loginController);

// test route for JWT

router.post('/test',RequireSignIn,testController);

//protected route

router.get('/user-auth',RequireSignIn,(req,res)=>{
    res.status(200).send({ok:true});
})

export default router;