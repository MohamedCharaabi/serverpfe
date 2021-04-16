import mongoose from 'mongoose'
import express from 'express'

import Department from '../../models/stages/Department.js';


const router = express.Router();



export const createDepartment = async (req, res) => {

    const { name } = req.body;

    const newDep = new Department({ name })

    try {
        await newDep.save();
        res.status(200).json(newDep);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}



export const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        res.status(200).json(departments);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}




export const getDep = async (req, res) => {
    const { id } = req.params;
    try {

        const department = await Department.findById(id);
        res.status(200).json(department)


    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}



export const updateDepartment = async (req, res) => {
    const { id } = req.params;
    const { name, } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Department with id: ${id}`);


    const updatedDep = { name, _id: id };

    await Department.findByIdAndUpdate(id, updatedDep, { new: true });

    res.json(updatedDep);


}

export const deleteDepartment = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Department with id: ${id}`);

    await Department.findByIdAndRemove(id);

    res.json({ message: "Department deleted successfully." });
}













export default router;