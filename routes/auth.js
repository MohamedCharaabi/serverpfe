import express from 'express';
import Personnel from '../models/Personel.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'


const router = express.Router();

router.post('/register', async (req, res) => {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.passPer, salt);


    const personnel = new Personnel({
        nomPer: req.body.nomPer,
        emailPer: req.body.emailPer,
        passPer: hashedPassword,
        rolePer: req.body.rolePer,
        idDep: req.body.idDep,
        idDir: req.body.idDir,
        idDiv: req.body.idDiv,
        idSer: req.body.idSer,


    })
    const result = await personnel.save();
    const { password, ...data } = await result.toJSON();
    res.send(data);
}
);


router.post('/login', async (req, res) => {

    const personnel = await Personnel.findOne({ emailPer: req.body.emailPer });

    if (!personnel) {
        return res.status(404).send({
            message: 'Invalid Email'
        })
    }

    if (!await bcrypt.compare(req.body.passPer, personnel.passPer)) {
        return res.status(400).send({
            message: 'invalid password'
        })
    }



    // jwt token
    const token = jwt.sign({ _id: personnel._id }, 'secret')


    // res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
    res.header('Access-Control-Allow-Credentials', true);


    try {

        //store the token on cookies
        res.cookie('jwt', token, {
            // domain: '/',
            // signed: true,
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, //1 day
            // sameSite: 'lax',
            // secure: true
            sameSite: 'none',
            secure: true
        })
        res.cookie('cool', 'cool', {
            //   signed: true,
            // httpOnly: false,
            sameSite: 'none',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        })

        res.cookie('yes', 'yes', {
            //   signed: true,
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).send({ message: 'succcess', token: token });

    } catch (error) {
        res.status.send({ message: `${error}` });

    }



}
);



router.get('/user', async (req, res) => {
    const cookie = req.cookies['jwt'];

    if (!cookie) {
        return res.send({ message: 'Unauthenticated', auth: false })

    }

    try {
        // const cookie = req.cookies['jwt'];

        const claims = jwt.verify(cookie, 'secret');

        if (!claims) {
            return res.send({ message: 'Unauthenticated', auth: false })
        }

        const personnel = await Personnel.findOne({ _id: claims._id })
        const { password, ...data } = await personnel.toJSON();

        res.send({ data, auth: true })
    } catch (error) {
        return res.status(401).send({ message: 'error => ' + error.message, auth: false })

    }
}
)


router.get('/logout', async (req, res) => {
    try {
        res.cookie('jwt', '', { maxAge: 0 });
        // res.redirect('/signin');
        res.send({ message: 'logout seccess' })
    } catch (error) {
        res.send({ message: 'logout failed' })

    }
})



export default router;