import mongoose from 'mongoose'
import express from 'express'

import Direction from '../../models/stages/Direction.js';


const router = express.Router();



export const createDirection = async (req, res) => {

    const { name, dep_id } = req.body;

    const newDire = new Direction({ name, dep_id })

    try {
        await newDire.save();
        res.status(200).json(newDire);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}



export const getDirections = async (req, res) => {
    try {
        const directions = await Direction.find();
        res.status(200).json(directions);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}




export const getDirection = async (req, res) => {
    const { id } = req.params;
    try {

        const direction = await Direction.findById(id);
        res.status(200).json(direction)


    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}



export const updateDirection = async (req, res) => {
    const { id } = req.params;
    const { name, dep_id } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Direction with id: ${id}`);


    const updatedDirec = { name, dep_id, _id: id };

    await Direction.findByIdAndUpdate(id, updatedD, { new: true });

    res.json(updatedD);


}

export const deleteDirection = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Direction with id: ${id}`);

    await Direction.findByIdAndRemove(id);

    res.json({ message: "Direction deleted successfully." });
}













export default router;