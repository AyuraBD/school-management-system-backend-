import express from 'express';
import authMiddleware, { UserRole } from '../../middleware/auth';
import { schoolController } from './schools.controller';

const router = express.Router();

router.get('/', authMiddleware(UserRole.USER, UserRole.ADMIN), schoolController.getSchool);

router.post('/create', authMiddleware(UserRole.USER, UserRole.ADMIN), schoolController.createSchool);

router.patch('/update/:id', authMiddleware(UserRole.USER), schoolController.updateSchool);

router.delete('/:id', authMiddleware(UserRole.ADMIN, UserRole.USER), schoolController.deleteSchool);

export const schoolRouter = router;