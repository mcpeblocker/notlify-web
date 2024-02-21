import jwt from "jsonwebtoken";
import { config } from "../core/config";
import { IUser } from "../models/User.model";
import { logger } from "../core/logger";

class jwtTokenService{
    decode(token: string): IUser | false {
        try {
          const result = jwt.verify(token, config.jwtSecret);
          return result as IUser
        } catch (error) {
          return false;
        }
      }
      
     sign(user: IUser): string | false{
          try{
              const token = jwt.sign(
                  { ...user},
                  config.jwtSecret,
                  {
                      expiresIn: config.token_expire_date * 24 * 60 * 60 * 1000
                  }
                );
              return token
          }catch(e){    
            logger.error(e)                
              return false
          }
      }
}

export default new jwtTokenService();