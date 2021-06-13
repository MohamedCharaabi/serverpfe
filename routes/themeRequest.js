import express from 'express';

import { createThemeRequest, getRequestThemes, getThemeRequest, updateThemeRequest, deleteThemeRequest } from '../controllers/themeRequest.js'

const router = express.Router();

router.post('/', createThemeRequest);
router.get('/', getRequestThemes);
router.get('/:id', getThemeRequest);
router.patch('/:id', updateThemeRequest);
router.delete('/:id', deleteThemeRequest);


export default router;