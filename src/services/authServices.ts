import {bcryptService} from "./bcriptServices";
import {findByLoginOrEmail} from "../repositories/users/usersRepository";

export const authServices = {
     async login (body: any){
        const user: any = await findByLoginOrEmail(body.loginOrEmail)
        if (!user) {
            return false
        } else {
            return await bcryptService.checkPassword(body.password, user.password)
        }
    }
}
