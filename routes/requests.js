import express from 'express';

import { getRequests, createRequest, requestStatus, updateRequest, activateRequest, deleteRequest, getFiltretRequests, acceptRequest, refuseRequest, confirmEmail } from '../controllers/request.js'

const router = express.Router();

router.post('/', createRequest);
router.get('/', getRequests);
router.get('/filter/:rolePer/:Dep/:Dir/:Div/:Ser', getFiltretRequests);
router.get('/:id', requestStatus);
router.patch('/:id', updateRequest);
router.patch('/accept/:id', acceptRequest);
router.patch('/refuse/:id', refuseRequest);
router.patch('/confirmemail/:id', confirmEmail);
router.patch('/activate/:id', activateRequest);

router.delete('/:id', deleteRequest);


export default router;