import express from 'express';
import Department from '../models/stages/Department.js';
import Direction from '../models/stages/Direction.js';
import Division from '../models/stages/Division.js';
import Service from '../models/stages/Service.js';


const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const departments = await Department.find();
        const directions = await Direction.find();
        const divisions = await Division.find();
        const services = await Service.find();
        res.status(200).json({departments,directions,  divisions, services});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});



export default router;
