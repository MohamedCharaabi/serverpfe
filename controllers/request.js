import mongoose from 'mongoose'
import express from 'express'
import { google } from 'googleapis'
import nodemailer from 'nodemailer'

import Request from '../models/Request.js'

import { requestConfMail } from './requestConfEmail.js'

const router = express.Router();




// These id's and secrets should come from .env file.


const CLIENT_ID = '748723653612-0du6bb0s0rh74b6men3ric6uvbra1n6q.apps.googleusercontent.com'
const CLEINT_SECRET = '7wNLkv9diMdhPbWOThcOB_91'
const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04pWQ4_p-dN2sCgYIARAAGAQSNwF-L9IroeaXB9ODWX808RDC9VJUu5XRLLBRE3tPimb5-yUMccnxLCCTDiSbVxQvtrkv39BHq1Q'


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





export const createRequest = async (req, res) => {

    const { nomDem, prenomDem, emailDem, themeDem, etatDem, rmsqDem, dateDem, name, dep_name, dir_name, div_name, ser_name } = req.body;

    const createHistory = { message: 'request creation' }
    var randomstring = Math.random().toString(36).slice(-8);

    let checkCode = await Request.findOne({ code: randomstring })

    while (checkCode) {
        randomstring = Math.random().toString(36).slice(-8);

        checkCode = await Request.findOne({ code: randomstring })

    }


    const newRequest = new Request({ code: randomstring, nomDem, prenomDem, emailDem, themeDem, confDem: null, etatDem, rmsqDem, dateDem, name, dep_name, dir_name, div_name, ser_name, history: createHistory })

    try {
        const request = await newRequest.save();
        const result = await sendMail(emailDem, 'Confirmation of Demmande ', 'Bonjour', requestConfMail(`${nomDem} ${prenomDem}`, themeDem, request._id))
        return res.json({ newRequest, result })
        // res.status(200).json();
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


export const getRequests = async (req, res) => {
    try {
        const requests = await Request.find();
        res.status(200).json(requests);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const getFiltretRequests = async (req, res) => {

    const { rolePer, Dep, Dir, Div, Ser } = req.params;



    await Request.find({ name: rolePer, dep_name: Dep, dir_name: (Dir == 0 ? '' : Dir), div_name: (Div == 0 ? '' : Div), ser_name: (Ser == 0 ? '' : Ser) })
        .then(results => res.status(200).json(results))
        .catch(error => res.status(404).json({ message: error.message }));


}


export const requestStatus = async (req, res) => {
    const { id } = req.params;
    try {

        const request = await Request.findById(id);
        res.status(200).json(request)


    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}

export const getRequestWithCode = async (req, res) => {
    const { code } = req.params;


    try {
        const request = await Request.findOne({ code });
        if (!request) return res.status(404).json({ message: 'wrong code ' })

        return res.status(200).json(request)


    } catch (error) {
        return res.status(404).json({ message: error.message });
    }

}



export const acceptRequest = async (req, res) => {
    const { id } = req.params;
    const { etatDem, name, demmande, message } = req.body;


    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No request with id: ${id}`);

    let newName = '';
    const newState = etatDem - 1;

    switch (newState) {
        case 3:
            newName = 'div'

            break;
        case 2:
            newName = 'dir'
            break;
        case 1:
            newName = 'dep'
            break;
        default:
            break;
    }



    let service = newState < 4 ? '' : demmande.ser_name;
    let division = newState < 3 ? '' : demmande.div_name;
    let direction = newState < 2 ? '' : demmande.dir_name;



    const updatedRequest = { etatDem: newState, name: newName, ser_name: service, div_name: division, dir_name: direction, $push: { history: { message } }, _id: id };

    await Request.findByIdAndUpdate(id, updatedRequest, { new: true })
        .then(results => res.status(200).json(results))
        .catch(error => res.status(404).json({ message: error.message }));;;

    // res.json(updatedRequest);


}
export const refuseRequest = async (req, res) => {
    const { id } = req.params;
    const { rmsqDem, message } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No request with id: ${id}`);


    const updatedRequest = { rmsqDem, confDem: 'no', $push: { history: { message } }, _id: id };

    await Request.findByIdAndUpdate(id, updatedRequest, { new: true })
        .then(results => res.status(200).json(results))
        .catch(error => res.status(404).json({ message: error.message }));;

    // res.json(updatedRequest);


}


export const updateRequest = async (req, res) => {
    const { id } = req.params;
    const { nomDem, prenomDem, emailDem, themeDem, confDem, etatDem, rmsqDem, dateDem } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No request with id: ${id}`);


    const updatedRequest = { nomDem, prenomDem, emailDem, themeDem, confDem, etatDem, rmsqDem, dateDem, name, dep_name, dir_name, div_name, ser_name, _id: id };

    await Request.findByIdAndUpdate(id, updatedRequest, { new: true })
        .then(results => res.status(200).json(results))
        .catch(error => res.status(404).json({ message: error.message }));;

    // res.json(updatedRequest);


}

export const activateRequest = async (req, res) => {
    const { id } = req.params;


    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No request with id: ${id}`);




    await Request.findByIdAndUpdate(id, { etat: "active" }, { new: true })
        .then(results => res.status(200).json(results))
        .catch(error => res.status(404).json({ message: error.message }));;

    // res.json(updatedRequest);


}

export const confirmEmail = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No request with id: ${id}`);


    const confirmededRequest = { confDem: 'yes', _id: id };

    await Request.findByIdAndUpdate(id, confirmededRequest, { new: true })
        .then(results => res.status(200).json(results))
        .catch(error => res.status(404).json({ message: error.message }));;

    // res.json(updatedRequest);


}

export const deleteRequest = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Request with id: ${id}`);

    await Request.findByIdAndRemove(id);

    res.json({ message: "Request deleted successfully." });
}



export default router;