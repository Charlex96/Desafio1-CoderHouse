import bcrypt from 'bcrypt';
import User from '../models/user.js';

export const resetPassword = async (req, res) => {
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
};
