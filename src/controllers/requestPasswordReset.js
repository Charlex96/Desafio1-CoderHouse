import crypto from 'crypto';
import User from '../models/user.js';
import MailingService from '../services/MailingService.js';
import config from '../config/config.js';

const mailingService = new MailingService();

export const requestPasswordReset = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('No user with that email');
        }

        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
        await user.save();

        const resetLink = `http://${config.FRONTEND_URL}/reset/${token}`;
        const mailOptions = {
            from: config.mailing.USER,
            to: user.email,
            subject: 'Password Reset',
            html: `<p>You requested a password reset. Click <a href="${resetLink}">here</a> to reset your password. This link will expire in 1 hour.</p>`,
        };

        await mailingService.sendSimpleMail(mailOptions);
        res.send('Password reset email sent');
    } catch (error) {
        res.status(500).send(error.message);
    }
};
