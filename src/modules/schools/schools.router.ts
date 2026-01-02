import express from 'express';
import authMiddleware, { UserRole } from '../../middleware/auth';
import { schoolController } from './schools.controller';

const router = express.Router();

router.post('/create', authMiddleware(UserRole.USER), schoolController.createSchool);


export const schoolRouter = router;