//
//
// export const postsServices = {
//     async createNewComment (body: any){
//         const user: any = await usersRepository.findByLoginOrEmail(body.loginOrEmail)
//         if (!user) {
//             return false
//         } else {
//             if (await bcryptService.checkPassword(body.password, user.password)) {
//                 return jwtServices.createJwt(user._id.toString())
//             } else {
//                 return false
//             }
//
//         }
//     }
// }
