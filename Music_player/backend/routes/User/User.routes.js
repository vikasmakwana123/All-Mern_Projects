import express from 'express';
import {loginController} from '../../controller/Login.controller.js';

const router = express.Router();
router.post('/login', loginController);
export default router;