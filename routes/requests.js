import express from 'express';

import { getRequests, createRequest, requestStatus, updateRequest, deleteRequest, getFiltretRequests, acceptRequest } from '../controllers/request.js'

const router = express.Router();

router.post('/', createRequest);
router.get('/', getRequests);
router.get('/filter/:rolePer/:Dep/:Dir/:Div/:Ser', getFiltretRequests);
router.get('/:id', requestStatus);
router.patch('/:id', updateRequest);
router.patch('/accept/:id', acceptRequest);
router.delete('/:id', deleteRequest);


export default router;