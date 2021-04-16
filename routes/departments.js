import express from 'express';

import { getDepartments, createDepartment, updateDepartment, getDep, deleteDepartment } from '../controllers/stages/department.js'

const router = express.Router();

router.post('/', createDepartment);
router.get('/', getDepartments);
router.get('/:id', getDep);
router.patch('/:id', updateDepartment);
router.delete('/:id', deleteDepartment);


export default router;