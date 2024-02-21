import { CookieOptions, NextFunction, Request, Response } from "express";
import succesResponse from "../utils/successResponse";
import { IUser, UserModel } from "../models/User.model";
import { ErrorHandler } from "../utils/errorHandler";
import bcrypt from "bcryptjs";
import wrapperController from "../utils/wrapperController";
import { config } from "../core/config";
import jwtTokenService from "../services/jwt-token.service";
import { BotModel } from "../models/Bot.model";
import crypto from "crypto-js"
import cryptoHashService from "../services/crypto-hash.service";
const cookieOptions: CookieOptions = {
    maxAge: config.token_expire_date * 24 * 60 * 60 * 1000
}

const add = async(req: Request, res: Response, next: NextFunction) => {
    const value = req.body;
   const oldData  = await BotModel.findOne({name: value.name});
   if(oldData) return next(new ErrorHandler("Ushbu botni qo'shib bo'lgansiz, hohishga ko'ra uni qiymatlarini yangilashiz mumkin", 400));
   
   const hashedToken = cryptoHashService.create(value.token);
   if(!hashedToken)return next(new ErrorHandler("Xatolik, birozdan so'ng urinib ko'ring"));
   value.token = hashedToken;
   value.ucode  = cryptoHashService.create(value.name) ?? Date.now()
   value.user = req.user._id;

   const newData = new BotModel(value);
   const data = await newData.save();

   succesResponse(res, data, next)
}; 

const get = async (req: Request,res: Response,next: NextFunction) => {
    const data = await BotModel.findById(req.params.id);
    if(!data){
      return next(new ErrorHandler("bot topilmadi", 400))
    }
    succesResponse(res, data, next);
};

const destroy = async (req: Request,res: Response,next: NextFunction) => {
     const data = await BotModel.findByIdAndDelete(req.params.id);
     if(!data) return next(new ErrorHandler("bot topilmadi", 404));
    succesResponse(res, data, next);
};

class botController{
    add(req: Request, res: Response, next: NextFunction){
        wrapperController(req,res,next, add)
    }
    get(req: Request, res: Response, next: NextFunction){
        wrapperController(req,res,next, get)
    }
    destroy(req: Request, res: Response, next: NextFunction){
        wrapperController(req,res,next, destroy)
    }
}

export default new botController()