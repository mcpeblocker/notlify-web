import * as express from "express"
import { IUser } from "../../src/models/User.model"

declare global {
    namespace Express {
        interface Request {
            user: IUser
        }
    }
}