import {Router,Request,Response, NextFunction} from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { IUser, UserModel } from "../models/user";
import { UserError } from "../errors";

const router = Router();

// User Registeration
router.post("/register", async(req: Request,res : Response)=>{
    const {username ,password} = req.body;
    
    try{
    const user = await UserModel.findOne({username})

    if(user){
        return res.status(400).json({type : UserError.USERNAME_ALREADY_EXISTS})
    }

    const hashedPassword = await bcrypt.hash(password,10);   
    const newUser = new UserModel({username,password : hashedPassword});
    await newUser.save();
    res.status(200).json({message : "User Register Successfully"})
}catch(err){
    return res.status(500).json({type : err})
}

})

//Users login
router.post("/login", async (req: Request , res : Response)=>{
    const {username , password} = req.body;

    try{
         const user : IUser = await UserModel.findOne({username});

         if(!user){
            return res.status(400).json({type : UserError.NO_USER_FOUND})
         }

         const isPasswordValid = await bcrypt.compare(password, user.password);
         if(!isPasswordValid){
            return res.status(400).json({type : UserError.WRONG_CREDENTIALS})
            
         }

         const token = jwt.sign({id: user._id},"secret");
         res.json({token,userID: user._id})

    }catch(err){
        return res.status(500).json({type : err})
    }
})
 
//middleware
export const verifyToken = (req : Request , res : Response, next : NextFunction)=>{
     const authHeader = req.headers.authorization
     if(authHeader){
        jwt.verify(authHeader, "secret",(err)=>{
            if(err){
                return res.sendStatus(403);
            }
            next();
        })

     }
    return res.sendStatus(401);
}



export {router as userRouter}
