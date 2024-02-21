import { CookieOptions, NextFunction, Request, Response } from "express";
import succesResponse from "../utils/successResponse";
import { IUser, UserModel } from "../models/User.model";
import { ErrorHandler } from "../utils/errorHandler";
import bcrypt from "bcryptjs";
import wrapperController from "../utils/wrapperController";
import { config } from "../core/config";
import jwtTokenService from "../services/jwt-token.service";

const cookieOptions: CookieOptions = {
    maxAge: config.token_expire_date * 24 * 60 * 60 * 1000
}

const register = async(req: Request, res: Response, next: NextFunction) => {
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
   const token = jwtTokenService.sign(data.toObject());      
   if(token){
       res.cookie("token", token, cookieOptions);
   }
   succesResponse(res, data, next)
}; 

const login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const value = req.body;
    const user = await UserModel.findOne({ email: value.email });
    if(!user){
      return next(new ErrorHandler("Login yoki password xato", 400))
    }
    const isValid = bcrypt.compareSync(value.password, user.password);
    if (!isValid) {    
      return next(new ErrorHandler("Login yoki password xato", 400))
    } 
    const token = jwtTokenService.sign(user.toObject());
    if(!token){
      return next(new ErrorHandler("Birozdan so'ng urinib ko'ring", 400))
    }    
    res.cookie("token", token, cookieOptions);
    succesResponse(res, {token}, next);
};

const logout = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    console.log(req.user);
    
    res.clearCookie("token");
    succesResponse(res, {message:"Tokeningiz muvaffaqiyatli tozalandi"}, next);
};

const getMe = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {    
    const user = await UserModel.findById(req.user._id);
    if(!user){
        res.clearCookie("token");
        return next(new ErrorHandler("Bazamizda topilmadingiz", 404))
    }
    succesResponse(res,user, next);
};


class authController{
    register(req: Request, res: Response, next: NextFunction){
        wrapperController(req,res,next, register)
    }
    login(req: Request, res: Response, next: NextFunction){
        wrapperController(req,res,next, login)
    }
    logout(req: Request, res: Response, next: NextFunction){
        wrapperController(req,res,next, logout)
    }
    getMe(req: Request, res: Response, next: NextFunction){
        wrapperController(req,res,next, getMe)
    }
}

export default new authController()