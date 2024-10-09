import nodemailer from 'nodemailer';
import {nodemailerAdapter} from "../adapters/nodemailerAdapter";

export const nodemailerService = {

    async sendEmail (login: string, email: string, confirmationCode: string){
        const result = await nodemailerAdapter.sendEmail(login, email, confirmationCode)
        if (!result) {
            return
        } else {
            return result.accepted
        }


        },

        async sendEmailRecoveryPassword (login: string, email: string, recoveryCode: string){
            const result = await nodemailerAdapter.sendEmailRecoveryPassword(login, email, recoveryCode)
            if (!result) {
                return
            } else {
                return result.accepted
            }


        },

    }
