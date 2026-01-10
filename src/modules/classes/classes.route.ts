import express from 'express';
import { classesController } from './classes.controller';
import authMiddleware, { UserRole } from '../../middleware/auth';

const router = express.Router();

router.get('/:schoolId', authMiddleware(UserRole.USER), classesController.getClasses);
router.post('/create', authMiddleware(UserRole.USER), classesController.createClasses);
router.patch('/update/:id', authMiddleware(UserRole.USER), classesController.updatedClasses);
router.delete('/:id', authMiddleware(UserRole.USER), classesController.delateClasses);

export const classesRouter = router;