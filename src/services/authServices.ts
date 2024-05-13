import {bcryptService} from "../../utils/bcriptServices";
import {usersRepository} from "../repositories/users/usersRepository";

export const authServices = {
     async login (body: any){
        const user: any = await usersRepository.findByLoginOrEmail(body.loginOrEmail)
        if (!user) {
            return false
        } else {
            return await bcryptService.checkPassword(body.password, user.password)
        }
    }
}
