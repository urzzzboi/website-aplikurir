import express from 'express';
import userController from '../controllers/user.js';

const router = express.Router();

router.get('/login', userController.login);
router.post('/login', userController.auth);
router.get('/logout', userController.logout);


export default router;
