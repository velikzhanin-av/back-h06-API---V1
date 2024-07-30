import nodemailer from "nodemailer";

export const nodemailerAdapter = {

    async sendEmail(login: string, email: string, confirmationCode: string) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "backendincubator@gmail.com",
                pass: "",
            },
        })

        try {
            const result = await transporter.sendMail({
                from: '"backend incubator" <backendincubator@gmail.com>', // sender address
                to: email,
                subject: `Hi ${login}!`,
                text: `Hi ${login}!`,
                html: " <h1>Thank for your registration</h1>\n" +
                    " <p>To finish registration please follow the link below:\n" +
                    `     <a href='https://somesite.com/confirm-email?code=${confirmationCode}'>complete registration</a>\n` +
                    " </p>",
            })
            return(result)
        } catch (err) {
            console.error('Send email error', err)
            return
        }

    },

}