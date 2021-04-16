import express from 'express';

import { getDirections, createDirection, updateDirection, getDirection, deleteDirection } from '../controllers/stages/direction.js'

const router = express.Router();

router.post('/', createDirection);
router.get('/', getDirections);
router.get('/:id', getDirection);
router.patch('/:id', updateDirection);
router.delete('/:id', deleteDirection);


export default router;