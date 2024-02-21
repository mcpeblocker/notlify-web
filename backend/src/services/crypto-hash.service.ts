import crypto from "crypto-js"
import { config } from "../core/config";
import { logger } from "../core/logger";

class cryptoHashService{
    create(value: string): string | undefined{
        try{
            const hash = crypto.HmacMD5(value, String(config.cryptoSecret)).toString();
            if(hash){
                return hash
            }
        }catch(e){
            logger.error(e)
        }    
    }
    decode(hashValue: string): string | undefined{
        try{
            const cipher = crypto.AES.encrypt(hashValue, String(config.cryptoSecret));
            const ciphertext = cipher.toString();
            const decipher = crypto.AES.decrypt(ciphertext, String(config.cryptoSecret));
            const decryptedValue = decipher.toString(crypto.enc.Utf8);
            if(decryptedValue){
                return decryptedValue
            }
        }catch(e){
            logger.error(e)
        }
    }
}

export default new cryptoHashService()