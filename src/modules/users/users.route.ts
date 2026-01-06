import express from 'express';
import { userController } from './users.controller';
import authMiddleware, { UserRole } from '../../middleware/auth';

const router = express.Router();
// Admin can update user to admin.
// Admin can see all users, update and delete
// User can see own user's data, update and delete.

// authMiddleware(UserRole.ADMIN),
router.get('/', authMiddleware(UserRole.ADMIN), userController.getAllUsers);

router.get('/:id', authMiddleware(UserRole.ADMIN, UserRole.USER), userController.getSingleUser);

// Change role by admin
router.patch('/role/:id', authMiddleware(UserRole.ADMIN), userController.changeRoleByAdmin);

router.patch('/:id', authMiddleware(UserRole.USER, UserRole.ADMIN), userController.updateUser);

export const userRouter = router;