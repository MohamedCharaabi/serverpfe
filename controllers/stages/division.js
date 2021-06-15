import mongoose from 'mongoose'
import express from 'express'

import Department from '../../models/stages/Department.js';
import Direction from '../../models/stages/Direction.js';
import Division from '../../models/stages/Division.js';
import Service from '../../models/stages/Service.js';


const router = express.Router();



export const createDivision = async (req, res) => {

    const { name, dep_name, dir_name } = req.body;

    const newDiv = new Division({ name, dep_name, dir_name })

    try {
        await newDiv.save();
        res.status(200).json(newDiv);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


export const getDivsWithNoDirectors = async (req, res) => {
    try {
        const divs = await Division.find({ director: { $ne: true } });
        return res.status(200).json(divs);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const getDivisions = async (req, res) => {
    try {
        const divisions = await Division.find();
        res.status(200).json(divisions);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}




export const getDiv = async (req, res) => {
    const { id } = req.params;
    try {

        const division = await Division.findById(id);
        res.status(200).json(division)


    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}



export const updateDivision = async (req, res) => {
    const { id } = req.params;
    const { name, dep_name, dir_name } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Division with id: ${id}`);


    const updatedDiv = { name, dep_name, dir_name, _id: id };

    await Division.findByIdAndUpdate(id, updatedDiv, { new: true });

    res.json(updatedDiv);


}

export const deleteDivision = async (req, res) => {
    const { id } = req.params;

    const div = await Division.findById(id)

    if (!div) return res.status(404).send(`No Division with id: ${id}`);

    // if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Division with id: ${id}`);

    await Division.findByIdAndRemove(id);
    await Service.findOneAndRemove({ div_name: div.name });

    res.json({ message: "Division deleted successfully." });
}













export default router;