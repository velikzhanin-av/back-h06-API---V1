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
                const token = await jwtServices.createJwt(user._id.toString())
                const result = await usersRepository.addJwtToken(user._id, token)
                if (!result) {
                    return false
                }
                return token
            } else {
                return false
            }

        }
    }
}
