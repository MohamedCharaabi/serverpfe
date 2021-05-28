import mongoose from 'mongoose'
import express from 'express'

import Theme from '../models/Theme.js';


const router = express.Router();



export const createTheme = async (req, res) => {

    const { theme, creator, createdAt } = req.body;

    const newTheme = new Theme({ theme, creator, createdAt })

    try {
        await newTheme.save();
        res.status(200).json(newTheme);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}



export const getThemes = async (req, res) => {
    try {
        const themes = await Theme.find();
        res.status(200).json(themes);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}




export const getTheme = async (req, res) => {
    const { id } = req.params;
    try {

        const theme = await Theme.findById(id);
        res.status(200).json(theme)


    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}



export const updateTheme = async (req, res) => {
    const { id } = req.params;
    const { theme, creator, createdAt } = req.body;


    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Theme with id: ${id}`);


    const updatedTheme = { theme, creator, createdAt: Date.now(), _id: id };

    await Theme.findByIdAndUpdate(id, updatedTheme, { new: true });

    res.json(updatedTheme);


}

export const deleteTheme = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Theme with id: ${id}`);

    await Theme.findByIdAndRemove(id);

    res.json({ message: "Theme deleted successfully." });
}













export default router;