const express = require('express');
const router = express.Router();
const User = require('../models/User');
const nodemailer = require('nodemailer');
require('dotenv').config(); 

router.post('/register', async (req, res) => {
    try {
        console.log('Request body:', req.body); 

        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).send({ message: 'Name, email, and password are required' });
        }

        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        console.error('Error registering user:', error); 
        res.status(400).send({ message: 'Error registering user', error });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('User not found');
        }

        if (password !== user.password) {
            throw new Error('Invalid credentials');
        }

        res.send({ user });
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
            Please click on the following link, or paste this into your browser to complete the process:\n\n
            http://localhost:3000/reset-password/${user.email}\n\n
            If you did not request this, please ignore this email and your password will remain unchanged.\n`
        };

        transporter.sendMail(mailOptions, (err, response) => {
            if (err) {
                console.error('Error sending email:', err);
                return res.status(500).send('Error sending email');
            }
            res.status(200).send('Recovery email sent');
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

router.post('/reset-password', async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }

        user.password = newPassword;
        await user.save();

        res.status(200).send('Password has been reset');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
