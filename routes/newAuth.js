import express from 'express';
import NewUser from '../models/NewUser.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import nodemailer from 'nodemailer'
import mongoose from 'mongoose'
import { directorConfMail } from './constant.js'


const router = express.Router();

// ! These two secrets shall be in .env file and not in any other file
const jwtConfig = {
    secret: 'dd5f3089-40c3-403d-af14-d0c228b05cb4',
    refreshTokenSecret: '7c4c1c50-3230-45bf-9eae-c9b2e401c767',
    expireTime: '10m',
    refreshTokenExpireTime: '10m'
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'medfr333@gmail.com',
        pass: 'ml46284628'
    }
});


router.post('/register', async (req, res) => {

    const { fullName, email, rolePer, Dep, Dir, Div, Ser } = req.body
    const verifEmail = await NewUser.findOne({ email })
    if (verifEmail) {
        res.status(409).send({ message: 'email already exist', user: verifEmail })
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

    var mailOptions = {
        from: 'medfr333@gmail.com',
        to: email,
        subject: 'Confirmation of PFE-CIMS director',
        html: directorConfMail(fullName, randomstring, email)

    };

    //save 
    const user = new NewUser(userData);
    await user.save();
    transporter.sendMail(mailOptions)
    return res.json({ user })

});


router.post('/login', async (req, res) => {

    const { email, password } = req.body

    // const email = "kalilo@yahoo.fr";
    // const password = '12345';
    let error = {
        email: 'Something went wrong'
    }
    const user = await NewUser.findOne({ email, password })


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
    const { fullName, email, password, avatar } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No User with id: ${id}`);


    const updateduser = { fullName, email, password, avatar, _id: id };

    await NewUser.findByIdAndUpdate(id, updateduser, { new: true });

    res.json(updateduser);


})
router.patch('editavatar/:id', async (req, res) => {
    const { id } = req.params;
    const { avatar } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No User with id: ${id}`);


    const updateduser = { avatar, _id: id };

    await NewUser.findByIdAndUpdate(id, updateduser, { new: true });

    res.json(updateduser);


})



export default router;