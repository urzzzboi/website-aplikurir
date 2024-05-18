import express from 'express';
import valueStatus from '../../controllers/user.js';

const router = express.Router();

router.use('/', valueStatus);


export default router;