import express from 'express';
import { startVM, stopVM } from '../controllers/vmController.js';

const router = express.Router();

router.get('/start', startVM);
router.get('/stop', stopVM);

export default router;