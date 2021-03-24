import mongoose from 'mongoose'
import express from 'express'

import Personel from '../models/Personel.js';


const router = express.Router();



export const createPersonnel = async (req, res) => {

    const { nomPer, emailPer, passPer, rolePer, idDep, idDir, idDiv, idSer } = req.body;

    const newPersonnel = new Personel({ nomPer, emailPer, passPer, rolePer, idDep, idDir, idDiv, idSer })

    try {
        await newPersonnel.save();
        res.status(200).json(newPersonnel);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}



export const getPersonnels = async (req, res) => {
    try {
        const personnels = await Personel.find();
        res.status(200).json(personnels);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}




export const getPersonnel = async (req, res) => {
    const { id } = req.params;
    try {

        const personnel = await Personel.findById(id);
        res.status(200).json(personnel)


    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}



export const updatePersonnel = async (req, res) => {
    const { id } = req.params;
    const { nomPer, emailPer, passPer, rolePer, idDep, idDir, idDiv, idSer } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Personnel with id: ${id}`);


    const updatedPersonnel = { nomPer, emailPer, passPer, rolePer, idDep, idDir, idDiv, idSer, _id: id };

    await Personel.findByIdAndUpdate(id, updatedPersonnel, { new: true });

    res.json(updatedPersonnel);


}

export const deletePersonnel = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Personnel with id: ${id}`);

    await Personel.findByIdAndRemove(id);

    res.json({ message: "Personnel deleted successfully." });
}













export default router;