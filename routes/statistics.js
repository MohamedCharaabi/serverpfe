import express from 'express';

import { allStat } from '../controllers/statistics.js';

const router = express.Router();

router.get('/', allStat);


export default router;