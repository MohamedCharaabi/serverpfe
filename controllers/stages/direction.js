import mongoose from 'mongoose'
import express from 'express'

import Department from '../../models/stages/Department.js';
import Direction from '../../models/stages/Direction.js';
import Division from '../../models/stages/Division.js';
import Service from '../../models/stages/Service.js';


const router = express.Router();



export const createDirection = async (req, res) => {

    const { name, dep_name } = req.body;

    const newDire = new Direction({ name, dep_name })

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
    const { name, dep_name } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Direction with id: ${id}`);


    const updatedDirec = { name, dep_name, _id: id };

    await Direction.findByIdAndUpdate(id, updatedDirec, { new: true });

    res.json(updatedDirec);


}

export const deleteDirection = async (req, res) => {
    const { id } = req.params;

    const dir = await Direction.findById(id)

    if (!dir) return res.status(404).send(`No Direction with id: ${id}`);

    // if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Direction with id: ${id}`);

    await Direction.findByIdAndRemove(id);

    await Division.findOneAndRemove({ dir_name: dir.name });
    await Service.findOneAndRemove({ dir_name: dir.name });

    res.json({ message: "Direction deleted successfully." });
}













export default router;