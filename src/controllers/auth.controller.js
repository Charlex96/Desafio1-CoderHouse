import userDTOResponse from "../dto/responses/user.response.dto.js";
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import MailingService from '../services/mailing.service.js';
import config from '../config/config.js';

const mailingService = new MailingService();

class AuthController {
  async viewLogin(req, res) {
    try {
      res.render("login");
    } catch (err) {
      res.status(err.status || 500).json({
        status: "error",
        payload: err.message,
      });
    }
  }

  async viewRegister(req, res) {
    try {
      res.render("register");
    } catch (err) {
      res.status(err.status || 500).json({
        status: "error",
        payload: err.message,
      });
    }
  }

  async getCurrentUser(req, res) {
    try {
      const user = await req.user;
      const userDTO = new userDTOResponse(user);
      res.json(userDTO);
    } catch (err) {
      res.status(err.status || 500).json({
        status: "error",
        payload: err.message,
      });
    }
  }

  async logout(req, res) {
    const user = req.user;
    if (user) {
      await User.findByIdAndUpdate(user._id, { last_connection: new Date() });
    }

    req.logout(function (err) {
      if (err) {
        console.error(err);
        return res.redirect("/error");
      }
      res.render("login");
    });
  }

  async redirectToHome(req, res) {
    res.redirect("/home");
  }

  async requestPasswordReset(req, res) {
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
  }

  async resetPassword(req, res) {
    const { token } = req.params;
    const { password } = req.body;
    try {
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });

      if (!user) {
        return res.status(400).send('Password reset token is invalid or has expired');
      }

      if (await user.comparePassword(password)) {
        return res.status(400).send('New password cannot be the same as the old password');
      }

      user.password = await bcrypt.hash(password, 10);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();

      res.send('Password has been reset');
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async updateLastConnection(req, res, next) {
    if (req.user) {
      await User.findByIdAndUpdate(req.user._id, { last_connection: new Date() });
    }
    next();
  }
}

const authController = new AuthController();
const { viewLogin, viewRegister, getCurrentUser, logout, redirectToHome, requestPasswordReset, resetPassword, updateLastConnection } = authController;

export { viewLogin, viewRegister, getCurrentUser, logout, redirectToHome, requestPasswordReset, resetPassword, updateLastConnection };
