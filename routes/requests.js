import express from 'express';

import { getRequests, createRequest, requestStatus, updateRequest, deleteRequest } from '../controllers/request.js'

const router = express.Router();

router.post('/', createRequest);
router.get('/', getRequests);
router.get('/:id', requestStatus);
router.patch('/:id', updateRequest);
router.delete('/:id', deleteRequest);


export default router;