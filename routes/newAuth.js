import express from 'express';
import NewUser from '../models/NewUser.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'
import mongoose from 'mongoose'
import { directorConfMail, forgotPassMail } from './constant.js'
import { google } from 'googleapis'
import dotenv from 'dotenv'


import Department from '../models/stages/Department.js';
import Direction from '../models/stages/Direction.js';
import Division from '../models/stages/Division.js';
import Service from '../models/stages/Service.js';

dotenv.config()


const router = express.Router();

// ! These two secrets shall be in .env file and not in any other file
const jwtConfig = {
    secret: 'dd5f3089-40c3-403d-af14-d0c228b05cb4',
    refreshTokenSecret: '7c4c1c50-3230-45bf-9eae-c9b2e401c767',
    expireTime: '10m',
    refreshTokenExpireTime: '10m'
}


// These id's and secrets should come from .env file.


const CLIENT_ID = '748723653612-0du6bb0s0rh74b6men3ric6uvbra1n6q.apps.googleusercontent.com'
const CLEINT_SECRET = '7wNLkv9diMdhPbWOThcOB_91'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04aYlyju-dN5uCgYIARAAGAQSNwF-L9IrwocOSHyXUN6vdyOkxkEbyQ5c3_AuYbUaVKsQPbiobLBZlpdwq-g1A8uE7gOJbepJqkw'





const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLEINT_SECRET,
    REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendMail = async (adress, subject, text, html) => {

    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'medch373@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLEINT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });

        const mailOptions = {
            from: 'medch373@gmail.com',
            to: adress,
            subject,
            text,
            html,
        };

        const result = await transport.sendMail(mailOptions);
        return result;
    } catch (error) {
        return error;
    }
}




router.post('/register', async (req, res) => {

    const { fullName, email, rolePer, Dep, Dir, Div, Ser } = req.body
    const verifEmail = await NewUser.findOne({ email })
    if (verifEmail) {
        return res.status(409).send({ message: 'email already exist', user: verifEmail })
    }
    var randomstring = Math.random().toString(36).slice(-8);

    const userData = {
        fullName,
        username: fullName,
        password: randomstring,
        avatar: null,
        email: email,
        role: 'client',
        rolePer,
        Dep,
        Dir,
        Div,
        Ser,
        ability: [
            {
                action: 'read',
                subject: 'auth'
            }
        ]
    }

    switch (rolePer) {
        case 'dep':
            await Department.findOneAndUpdate({ name: Dep }, { director: true })
            break;
        case 'dir':
            await Direction.findOneAndUpdate({ name: Dir }, { director: true })

            break;
        case 'div':
            await Division.findOneAndUpdate({ name: Div }, { director: true })

            break;
        case 'ser':
            await Service.findOneAndUpdate({ name: Ser }, { director: true })

            break;

        default:
            break;
    }
    //save 
    const user = new NewUser(userData);
    try {
        await user.save();
        switch (rolePer) {
            case 'dep':
                await Department.findOneAndUpdate({ name: Dep }, { director: true })
                break;
            case 'dir':
                await Direction.findOneAndUpdate({ name: Dir }, { director: true })

                break;
            case 'div':
                await Division.findOneAndUpdate({ name: Div }, { director: true })

                break;
            case 'ser':
                await Service.findOneAndUpdate({ name: Ser }, { director: true })

                break;

            default:
                break;
        }
        // transporter.sendMail(mailOptions)
        const result = await sendMail(email, 'Confirmation of PFE-CIMS director', 'Bonjour', directorConfMail(fullName, randomstring, email))
        return res.json({ user, result })
    } catch (error) {
        return res.statusCode(404).send({ error })

    }


});


router.post('/login', async (req, res) => {

    const { email, password } = req.body

    // const email = "kalilo@yahoo.fr";
    // const password = '12345';
    let error = {
        email: 'Something went wrong'
    }
    const user = await NewUser.findOne({ email })

    if (!user) {
        return res.status(404).send({
            message: 'Invalid Email'
        })
    }

    if (password !== user.password) {
        return res.status(400).send({
            message: 'invalid password'
        })
    }


    if (user) {
        try {
            const accessToken = jwt.sign({ id: user._id }, jwtConfig.secret, { expiresIn: jwtConfig.expireTime })
            const refreshToken = jwt.sign({ id: user._id }, jwtConfig.refreshTokenSecret, {
                expiresIn: jwtConfig.refreshTokenExpireTime
            })

            const userData = { ...user }

            // delete userData.password

            const response = {
                userData: user,
                accessToken,
                refreshToken
            }

            res.status(200).send(response)

        } catch (e) {

            res.status(404).send({ message: e.message })

        }
    } else {
        res.status(404).send({ message: 'user is undefined' })
    }




});


router.get('/users', async (req, res) => {
    await NewUser.find()
        .then(result => res.status(200).send(result))
        .catch(err => res.status(404).send(err));
})


router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { fullName, email, avatar } = req.body;

    const user = await NewUser.findById(id);
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No User with id: ${id}`);

    const name = fullName === '' ? user.fullName : fullName
    const mail = email === '' ? user.email : email
    const image = avatar === '' ? user.avatar : avatar


    const updateduser = { fullName: name, email: mail, avatar: image, _id: id };

    const newUser = await NewUser.findByIdAndUpdate(id, updateduser, { new: true });

    res.json(newUser);


})

router.patch('/editavatar/:id', async (req, res) => {
    const { id } = req.params;
    const { avatar } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No User with id: ${id}`);


    const updateduser = { avatar, _id: id };

    const user = await NewUser.findByIdAndUpdate(id, updateduser, { new: true });

    res.json(user);


})


router.patch('/changepassword/:id', async (req, res) => {
    const { id } = req.params;
    const { oldpass, newPass } = req.body;
    const user = await NewUser.findById(id);

    if (oldpass !== user.password) {
        return res.status(400).send({
            message: 'mot de passe incorrect'
        })
    }
    //  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No User with id: ${id}`);


    const updateduser = { password: newPass, _id: id };
    try {

        await NewUser.findByIdAndUpdate(id, updateduser, { new: true });

        return res.statusCode(200).send({ result: 'mot de passe modifier' })
    } catch (error) {
        return res.statusCode(400).send({ error })

    }


})

router.patch('/updateforgotpassword/:id', async (req, res) => {
    const { id } = req.params;
    const { newPass } = req.body;
    const user = await NewUser.findById(id);

    if (!user) {
        return res.status(404).send({
            message: 'no user with this id'
        })
    }
    //  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No User with id: ${id}`);


    const updateduser = { password: newPass, _id: id };
    try {

        await NewUser.findByIdAndUpdate(id, updateduser, { new: true });

        return res.status(200).send({ result: 'mot de passe modifier' })
    } catch (error) {
        return res.status(400).send({ error })

    }


})

router.post('/forgotpass', async (req, res) => {

    const { email } = req.body;
    const user = await NewUser.findOne({ email })
    if (!user) return res.status(404).send('pas de compte pour ce email')

    try {

        const result = await sendMail(email, 'PFE CIMS mot de passe oublier', 'Bonjour', forgotPassMail(user._id))
        return res.status(200).send({ result })
    } catch (error) {
        return res.status(404).send({ error: err })
    }




})






export default router;