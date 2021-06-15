import express from 'express';

import { getServices, createService, updateService, getSer, deleteService, getSersWithNoDirectors } from '../controllers/stages/service.js'

const router = express.Router();

router.post('/', createService);
router.get('/', getServices);
router.get('/checkdirector/', getSersWithNoDirectors);

router.get('/:id', getSer);
router.patch('/:id', updateService);
router.delete('/:id', deleteService);


export default router;