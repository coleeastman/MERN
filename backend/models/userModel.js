const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationCode: {
        type: String
    },
    verificationCodeExpires: {
        type: Date
    }
});

// Static sign up method
userSchema.statics.signup = async function (email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled');
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid');
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
    const verificationCodeExpires = Date.now() + 3600000; // 1 hour

    const user = await this.create({
        email,
        password: hash,
        verificationCode,
        verificationCodeExpires
    });

    // Send verification email
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'coleeastman91@gmail.com',
            pass: process.env.APP_PASSWORD,
        },
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: user.email,
        subject: 'Verify your email',
        text: `Your verification code is: ${verificationCode}`
    };

    await transporter.sendMail(mailOptions);

    return user;

};

// Send email
userSchema.statics.sendemail = async function (email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled');
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid');
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
    const verificationCodeExpires = Date.now() + 3600000; // 1 hour

    const user = await this.create({
        email,
        password: hash,
        verificationCode,
        verificationCodeExpires
    });

    // Send verification email
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'coleeastman91@gmail.com',
            pass: process.env.APP_PASSWORD,
        },
    });

    const mailOptions = {
        from: 'coleeastman91@gmail.com',
        to: user.email,
        subject: 'Verify your email',
        text: `Your verification code is: ${verificationCode}`
    };

    await transporter.sendMail(mailOptions);
};


// Static login method
userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error('All fields must be filled');
    }

    const user = await this.findOne({ email });
    if (!user) {
        throw Error('Incorrect email');
    }

    if (!user.isVerified) {
        throw Error('Email not verified');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw Error('Incorrect password');
    }

    return user;
};

module.exports = mongoose.model('User', userSchema);
