import {bcryptService} from "./bcriptServices";
import {findByLoginOrEmail} from "../repositories/users/usersRepository";

export const login = async (body: any) => {
    const user: any = await findByLoginOrEmail(body.loginOrEmail)
    if (!user) {
        return false
    } else {
        const hash: string = await bcryptService.generateHash(body.password)
        return user.password === hash

    }
}