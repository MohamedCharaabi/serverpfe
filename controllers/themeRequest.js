import mongoose from 'mongoose'
import express from 'express'

import ThemeRequest from '../models/ThemeRequest.js';


const router = express.Router();



export const createThemeRequest = async (req, res) => {

    const { theme, creator, why } = req.body;

    const newThemeRequest = new ThemeRequest({ theme, creator, why })

    try {
        await newThemeRequest.save();
        res.status(200).json(newThemeRequest);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}



export const getRequestThemes = async (req, res) => {
    try {
        const themes = await ThemeRequest.find();
        res.status(200).json(themes);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}




export const getThemeRequest = async (req, res) => {
    const { id } = req.params;
    try {

        const theme = await ThemeRequest.findById(id);
        res.status(200).json(theme)


    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}



export const updateThemeRequest = async (req, res) => {
    const { id } = req.params;
    const { theme, creator, why } = req.body;


    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Theme with id: ${id}`);


    const updatedTheme = { theme, creator, why, _id: id };

    await ThemeRequest.findByIdAndUpdate(id, updatedTheme, { new: true });

    res.json(updatedTheme);


}

export const deleteThemeRequest = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Theme with id: ${id}`);

    await ThemeRequest.findByIdAndRemove(id);

    res.json({ message: "Theme deleted successfully." });
}













export default router;