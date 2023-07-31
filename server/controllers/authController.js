import userModel from "../models/userModel.js";
import { comparePassword, hashedpwd } from "../utils/authHelper.js";
import JWT from "jsonwebtoken";
import { RequireSignIn } from "../middleware/authMiddleware.js";
export const registerController = async (req,res)=>{
    try {
        const {name,id,email,password}=req.body;
        //validations
        if(name==""){
            res.send({message:"Name is required"});
        }
        if(id==""){
            res.send({message:"ID is required"});
        }
        if(email==""){
            res.send({message:"Email is required"});
        }
        if(password==""){
            res.send({message:"Password is required"});
        }

        //checking existing users
        const existinguser = await userModel.findOne({email});

        if(existinguser){
            return res.status(200).send({
                success:false,
                message:'Already registered email',
            })
        }
        
        //registering new user
        
        const hashedPassword= await hashedpwd(password);
        //save

        const user= await new userModel({name,id,email,password:hashedPassword}).save();

        res.status(201).send({
            success:true,
            message:"User registered successfully..",
            user
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in registration',
            error
        })
    }
}

//login controller -POST 

export const loginController = async (req,res)=>{
    try {
        const {id,password}=req.body;
        //validation
        if(!id || !password){
            res.status(404).send({
                success:false,
                message:'Invalid id or password',
                
            });
        }
        const user=await userModel.findOne({id});
        if(!user){
            return res.status(404).send({
                success:false,
                message:"User is not registered",
            })
        }
        const match =await comparePassword(password,user.password);
        if(!match){
            return res.status(404).send({
                success:false,
                message:"Invalid password",
            })
        }
        const token=await JWT.sign({_id:user._id},process.env.JWT_KEY,{expiresIn:"7d"});
        res.status(200).send({
            success:true,
            message:'Logged in successfully.',
            user:{
                id:user.id,
                name:user.name,
                email:user.email,
                role:user.role,
                

            },token

            
        })
    } catch (error) {
        res.status(404).send({
            success:false,
            message:'Error in login',
            error
        })
        console.log(error);
        
    }
}


//testController for JWT token verification

export const testController=async (req,res)=>{
    res.send("Protected Route")
    console.log("protected route");
}

