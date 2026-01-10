import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { schoolRouter } from "./modules/schools/schools.router";
import { classesRouter } from "./modules/classes/classes.route";
import { studentRouter } from "./modules/students/students.route";
import { subjectRouter } from "./modules/subjects/subject.route";
import { userRouter } from "./modules/users/users.route";
import errorHandler from "./middleware/errorHandler";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cors({
  origin: process.env.APP_URL || "http://localhost:4000",
  credentials: true
}));

app.all('/api/auth/*splat', toNodeHandler(auth));

app.get('/', (req, res)=>{
  res.send(`Server is running on: ${PORT}`);
});

app.use('/users', userRouter);
app.use('/schools', schoolRouter);
app.use('/classes', classesRouter);
app.use('/students', studentRouter);
app.use('/subjects', subjectRouter);

// Error handler
app.use(errorHandler);

export default app;