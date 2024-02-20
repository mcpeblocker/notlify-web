import { NextFunction, Request, Response } from "express";
import succesResponse from "../utils/successResponse";
import { UserModel } from "../models/User.model";
import { ErrorHandler } from "../utils/errorHandler";
import bcrypt from "bcryptjs";

class authController{
    async register(req: Request, res: Response, next: NextFunction) {
        const value = req.body;
       const user  = await UserModel.findOne({email: value.email});
       if(user){
        //email mavjud bo'lsa xato message qaytaramiz
        return next(new ErrorHandler("email yoki password xato", 400));
       }
    
       const salt = bcrypt.genSaltSync(10);
       value.password = bcrypt.hashSync(value.password, salt);
       
       const newUser = new UserModel(value);
       const data = await newUser.save();
       succesResponse(res, data, next)
    }; 
}

export default new authController()