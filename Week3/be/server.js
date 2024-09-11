require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const app = express();
app.use(express.json());

const users = []; 

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization');
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

const generateOTP = () => {
    return crypto.randomInt(100000, 999999).toString();
};

const sendOTPEmail = (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

app.post('/register', (req, res) => {
    const { email, password } = req.body;
    const user = { email, password };
    users.push(user);
    const otp = generateOTP();
    sendOTPEmail(email, otp);
    res.status(201).send('User registered. OTP sent to email.');
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        const accessToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
        res.json({ accessToken });
    } else {
        res.send('Email or password incorrect');
    }
});

app.post('/profile', authenticateJWT, (req, res) => {
    const { email } = req.user;
    const { newEmail, newPassword } = req.body;
    const user = users.find(u => u.email === email);
    if (user) {
        user.email = newEmail || user.email;
        user.password = newPassword || user.password;
        const otp = generateOTP();
        sendOTPEmail(user.email, otp);
        res.send('Profile updated. OTP sent to email.');
    } else {
        res.sendStatus(404);
    }
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});