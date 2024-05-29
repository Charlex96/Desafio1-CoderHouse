import nodemailer from 'nodemailer';
import config from '../config/config.js'; // Asegúrate de que la extensión del archivo sea .js si estás usando ESM

class MailingService {
    constructor(){
        this.client = nodemailer.createTransport({
            service: config.mailing.SERVICE,
            port: config.mailing.PORT,
            auth:{
                user: config.mailing.USER,
                pass: config.mailing.PASSWORD
            }            
        });
    }

    async sendSimpleMail({from, to, subject, html, attachments=[]}){
        let result =  await this.client.sendMail({
            from,
            to,
            subject,
            html,
            attachments
        });
        return result;
    }
}

export default MailingService;
