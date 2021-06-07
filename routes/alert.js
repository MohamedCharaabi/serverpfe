import express from 'express';

import { getAlerts, createAlert, deleteAlert, getAlert, updateAlert } from '../controllers/alert.js'

const router = express.Router();

router.post('/', createAlert);
router.get('/', getAlerts);
router.get('/:id', getAlert);
router.patch('/:id', updateAlert);
router.delete('/:id', deleteAlert);


export default router;