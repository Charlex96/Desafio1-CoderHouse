const nodemailer = require('nodemailer')
const config = require('../config/config')

class MailingService {
    constructor(){
        this.client = nodemailer.createTransport({
            service:config.mailing.SERVICE,
            port: config.mailing.PORT,
            auth:{
                user: config.mailing.USER,
                pass: config.mailing.PASSWORD
            }            
        })
    }

    async sendSimpleMail({from, to, subject, html, attachments=[]}){
        let result =  await this.client.sendMail({
            from,
            to,
            subject,
            html,
            attachments
        })
        return result
    }
}

module.exports = MailingService; 