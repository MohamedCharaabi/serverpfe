import express from 'express';

import { getPersonnels, getPersonnel, createPersonnel, updatePersonnel, deletePersonnel } from '../controllers/personnel.js'

const router = express.Router();

router.post('/', createPersonnel);
router.get('/', getPersonnels);
router.get('/:id', getPersonnel);
router.patch('/:id', updatePersonnel);
router.delete('/:id', deletePersonnel);


export default router;