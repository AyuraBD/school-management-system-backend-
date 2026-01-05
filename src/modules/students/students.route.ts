import express from 'express'
import { studentController } from './students.controller';

const router = express.Router();

router.post('/', studentController.createStudent);


export const studentRouter = router;