import express from 'express';
import { classesController } from './classes.controller';

const router = express.Router();

router.post('/create', classesController.createClasses);

export const classesRouter = router;