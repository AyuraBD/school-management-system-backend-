import express from 'express';
import { classesController } from './classes.controller';
import authMiddleware, { UserRole } from '../../middleware/auth';

const router = express.Router();

router.get('/:schoolId', authMiddleware(UserRole.USER), classesController.getClasses);
router.post('/create', authMiddleware(UserRole.USER), classesController.createClasses);
export const classesRouter = router;