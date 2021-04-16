import express from 'express';

import { getServices, createService, updateService, getSer, deleteService } from '../controllers/stages/service.js'

const router = express.Router();

router.post('/', createService);
router.get('/', getServices);
router.get('/:id', getSer);
router.patch('/:id', updateService);
router.delete('/:id', deleteService);


export default router;