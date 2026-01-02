import { NextFunction, Request, Response } from "express";
import { auth } from "../lib/auth";

export enum UserRole{
  USER = "USER",
  ADMIN = "ADMIN"
}

declare global {
  namespace Express{
    interface Request{
      user?:{
        id: string;
        email: string;
        role: string;
        emailVerified: boolean;
      }
    }
  }
}

const authMiddleware = (...roles: UserRole[])=>{
  return async(req: Request, res: Response, next: NextFunction )=>{
    try{
      const session = await auth.api.getSession({
        headers: req.headers as any
      });
      console.log(session);
    }catch(err:any){
      next(err.message);
    }
  }
}

export default authMiddleware;