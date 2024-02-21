import { NextFunction, Request, Response } from "express";
import succesResponse from "../utils/successResponse";
import { ErrorHandler } from "../utils/errorHandler";
import wrapperController from "../utils/wrapperController";
import cryptoHashService from "../services/crypto-hash.service";
import { AccessModel } from "../models/Access.model";

const add = async (req: Request, res: Response, next: NextFunction) => {
  const value = req.body;
  const oldData = await AccessModel.findOne({
    bot: value.botId,
    user: req.user._id,
    domain: value.domain,
  });
  if (oldData)
    return next(
      new ErrorHandler("Ushbu kirish ruxsati allaqachon qo'shilgan!", 400)
    );

  const accessData = `${req.user._id}|${value.botId}|${value.domain}|${value.chatId}`;
  const accessToken = cryptoHashService.create(accessData);
  if (!accessToken)
    return next(new ErrorHandler("Xatolik, birozdan so'ng urinib ko'ring"));
  let data = {
    accessToken,
    bot: value.botId,
    user: req.user._id,
    domain: value.domain,
    chatId: value.chatId,
  };

  const newDoc = new AccessModel(data);
  await newDoc.save();

  succesResponse(res, data, next);
};

const get = async (req: Request, res: Response, next: NextFunction) => {
  const data = await AccessModel.findById(req.params.id);
  if (!data) {
    return next(new ErrorHandler("Kirish ruxsati topilmadi", 400));
  }
  succesResponse(res, data, next);
};

const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const data = await AccessModel.findByIdAndDelete(req.params.id);
  if (!data) return next(new ErrorHandler("Kirish ruxsati topilmadi", 404));
  succesResponse(res, data, next);
};

class AccessController {
  add(req: Request, res: Response, next: NextFunction) {
    wrapperController(req, res, next, add);
  }
  get(req: Request, res: Response, next: NextFunction) {
    wrapperController(req, res, next, get);
  }
  destroy(req: Request, res: Response, next: NextFunction) {
    wrapperController(req, res, next, destroy);
  }
}

export default new AccessController();
