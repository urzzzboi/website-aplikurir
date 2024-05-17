import express from 'express';
import forStatus from '../../controllers/auth.js';

const router = express.Router()

router.use('/login', forStatus)

export default router;