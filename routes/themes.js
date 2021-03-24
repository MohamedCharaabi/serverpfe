import express from 'express';

import { createTheme, getThemes, getTheme, updateTheme, deleteTheme } from '../controllers/theme.js'

const router = express.Router();

router.post('/', createTheme);
router.get('/', getThemes);
router.get('/:id', getTheme);
router.patch('/:id', updateTheme);
router.delete('/:id', deleteTheme);


export default router;