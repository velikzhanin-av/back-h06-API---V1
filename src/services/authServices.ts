import {bcryptService} from "../utils/bcriptServices";
import {usersRepository} from "../repositories/users/usersRepository";
import {jwtServices} from "../utils/jwtServices";

export const authServices = {
     async login (body: any){
        const user: any = await usersRepository.findByLoginOrEmail(body.loginOrEmail)
        if (!user) {
            return false
        } else {
            if (await bcryptService.checkPassword(body.password, user.password)) {
                return jwtServices.createJwt(user._id.toString())
            } else {
                return false
            }

        }
    }
}
