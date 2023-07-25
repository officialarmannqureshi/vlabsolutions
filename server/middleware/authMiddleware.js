import JWT from 'jsonwebtoken';

export const RequireSignIn= async (req,res,next)=>{
    try {
        const decode=JWT.verify(req.headers.authorization,process.env.JWT_KEY);
        next();
    } catch (error) {
        console.log(error);
    }
}