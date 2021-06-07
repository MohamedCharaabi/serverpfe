import mongoose from 'mongoose'
import express from 'express'

import Alert from '../models/AlertSchema.js';


const router = express.Router();



export const createAlert = async (req, res) => {

    const { by, content } = req.body;

    const newAlert = new Alert({ by, content })

    try {
        await newAlert.save();
        res.status(200).json(newAlert);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}



export const getAlerts = async (req, res) => {
    try {
        const alerts = await Alert.find();
        res.status(200).json(alerts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}




export const getAlert = async (req, res) => {
    const { id } = req.params;
    try {

        const alert = await Alert.findById(id);
        res.status(200).json(alert)


    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}



export const updateAlert = async (req, res) => {
    const { id } = req.params;


    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No alert with id: ${id}`);

    const alert = await Alert.findById(id);

    const newSeen = !alert.seen;

    const newAlertSeen = { seen: newSeen, _id: id };

    await Alert.findByIdAndUpdate(id, newAlertSeen, { new: true });

    res.json(newAlertSeen);


}

export const deleteAlert = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No alert with id: ${id}`);

    await Alert.findByIdAndRemove(id);

    res.json({ message: "alert deleted successfully." });
}













export default router;