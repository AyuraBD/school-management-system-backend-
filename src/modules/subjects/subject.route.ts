import  express  from 'express';
import { subjectController } from './subject.controller';
import authMiddleware, { UserRole } from '../../middleware/auth';
const router = express.Router();

router.post('/create', authMiddleware(UserRole.USER), subjectController.createSubject);

export const subjectRouter = router;