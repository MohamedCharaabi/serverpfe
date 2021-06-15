import mongoose from 'mongoose'
import express from 'express'

import Department from '../../models/stages/Department.js';
import Direction from '../../models/stages/Direction.js';
import Division from '../../models/stages/Division.js';
import Service from '../../models/stages/Service.js';


const router = express.Router();



export const createService = async (req, res) => {

    const { name, dep_name, dir_name, div_name } = req.body;

    const newSer = new Service({ name, dep_name, dir_name, div_name })

    try {
        await newSer.save();
        res.status(200).json(newSer);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}



export const getServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const getSersWithNoDirectors = async (req, res) => {
    try {
        const sers = await Service.find({ director: { $ne: true } });
        return res.status(200).json(sers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}



export const getSer = async (req, res) => {
    const { id } = req.params;
    try {

        const service = await Service.findById(id);
        res.status(200).json(service)


    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}



export const updateService = async (req, res) => {
    const { id } = req.params;
    const { name, dep_name, dir_name, div_name } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Service with id: ${id}`);


    const updatedSer = { name, dep_name, dir_name, div_name, _id: id };

    await Service.findByIdAndUpdate(id, updatedSer, { new: true });

    res.json(updatedSer);


}

export const deleteService = async (req, res) => {
    const { id } = req.params;

    const ser = await Service.findById(id)

    if (!ser) return res.status(404).send(`No Service with id: ${id}`);

    // if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Service with id: ${id}`);

    await Service.findByIdAndRemove(id);

    res.json({ message: "Service deleted successfully." });
}













export default router;