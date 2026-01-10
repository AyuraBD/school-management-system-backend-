import express from 'express'
import { studentController } from './students.controller';
import authMiddleware, { UserRole } from '../../middleware/auth';

const router = express.Router();

router.post('/', authMiddleware(UserRole.USER), studentController.createStudent);

router.get('/:schoolId', authMiddleware(UserRole.USER), studentController.getStudent);


export const studentRouter = router;