import express from 'express';
import NewUser from '../models/NewUser.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'


const router = express.Router();

// ! These two secrets shall be in .env file and not in any other file
const jwtConfig = {
    secret: 'dd5f3089-40c3-403d-af14-d0c228b05cb4',
    refreshTokenSecret: '7c4c1c50-3230-45bf-9eae-c9b2e401c767',
    expireTime: '10m',
    refreshTokenExpireTime: '10m'
}


router.post('/register', async (req, res) => {

    if (req.body.length > 0) {
        const { email, password, username } = req.body
        // const isEmailAlreadyInUse = NewUser.find({ email })
        // const isUsernameAlreadyInUse = NewUser.find({ username })
        const error = {
            email: isEmailAlreadyInUse ? 'This email is already in use.' : null,
            username: isUsernameAlreadyInUse ? 'This username is already in use.' : null
        }
    }

    // if (!error.username && !error.email) {
    const userData = {
        fullName: 'Kalil mar3i',
        username: "kalilo",
        password: "12345",
        avatar: null,
        email: 'kalilo@yahoo.fr',
        role: 'client',
        ability: [
            {
                action: 'manage',
                subject: 'all'
            }
        ]
    }

    // Add user id
    // const length = data.users.length
    // let lastIndex = 0
    // if (length) {
    //     lastIndex = data.users[length - 1].id
    // }
    //   userData.id = lastIndex + 1

    //   data.users.push(userData)
    //save 
    const user = new NewUser(userData);
    await user.save();

    const accessToken = jwt.sign({ id: userData.username }, jwtConfig.secret, { expiresIn: jwtConfig.expireTime })

    const userNew = Object.assign({}, userData)
    delete userNew['password']
    const response = { userNew, accessToken }

    return res.json({ response })
    // } else {
    //     return res.json({ 'Error': 'yes' })
    // }

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
                user,
                accessToken,
                refreshToken
            }

            return res.json(response)
        } catch (e) {
            error = {
                error: 'manaarech'
            }
        }
    } else {
        error = {
            email: 'Email or Password is Invalid'
        }
    }

    return res.json(error)


});


export default router;