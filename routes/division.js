import express from 'express';

import { getDivisions, createDivision, updateDivision, getDiv, deleteDivision } from '../controllers/stages/division.js'

const router = express.Router();

router.post('/', createDivision);
router.get('/', getDivisions);
router.get('/:id', getDiv);
router.patch('/:id', updateDivision);
router.delete('/:id', deleteDivision);


export default router;