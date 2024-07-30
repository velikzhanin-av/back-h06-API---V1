import nodemailer from 'nodemailer';

export const nodemailerService = {

    async sendEmail (login: string, password: string, email: string){
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "@gmail.com",
                pass: "",
            },
        })

        const result = transporter.sendMail({
            from: '"backend incubator" <backendincubator@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: " <h1>Thank for your registration</h1>\n" +
                " <p>To finish registration please follow the link below:\n" +
                "     <a href='https://somesite.com/confirm-email?code=your_confirmation_code'>complete registration</a>\n" +
                " </p>", // html body
        })
        console.log(result)
        },

    }
