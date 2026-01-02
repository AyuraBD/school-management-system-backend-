import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { schoolRouter } from "./modules/schools/schools.router";

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

app.use('/schools', schoolRouter);

export default app;