import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, ".env")});

import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';

import { adjectives, nouns } from './words';

export const generateSecret = () => {
    const arrayLength = Math.min(adjectives.length, nouns.length)
    const randomNumber = Math.floor(Math.random() * arrayLength);

    return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

const sendMail = email => {
    const options = {
        auth: {
            api_key: process.env.MAILGUN_API,
            domain: process.env.MAILGUN_DOMAIN, 
        }
    }
    const client = nodemailer.createTransport(mg(options))

    return client.sendMail(email);
};


export const sendSecretMail = (adress, secret) => {
    const email = {
        from : "admin@instaclone.com",
        to: adress,
        subject: "🔒 secret key from instaclone",
        html: `Hello! your secret key is 🔒 <strong>${secret}</strong>.<br/>Copy & paste on the app to login.`
    }

    return sendMail(email);
};