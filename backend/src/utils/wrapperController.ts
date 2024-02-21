import { NextFunction, Request, Response } from "express";
import { logger } from "../core/logger";
import { ErrorHandler } from "./errorHandler";


const wrapperController = async(req: Request,res:Response, next: NextFunction, handler: Function) =>{
    try{
       await handler(req,res,next);
    }catch(e){
        logger.error(String(e));
        next(new ErrorHandler(String(e), 500));
    }
}

export default wrapperController;