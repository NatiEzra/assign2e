import express from 'express';
import authController from '../controller/authController';
const router = express.Router();

router.post('/register',authController.register);


export default router;