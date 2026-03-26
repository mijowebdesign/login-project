import express from 'express';
const router = express.Router();
import * as userController from '../controllers/userController.js';
import { verifyToken, authorizeRoles } from '../middleware/authMiddleware.js';

router.get('/', verifyToken, authorizeRoles('admin'), userController.getUsersNameEmailRole);

export default router;
