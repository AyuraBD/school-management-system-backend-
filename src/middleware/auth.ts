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
      if(!session){
        return res.status(401).json({
          success: false,
          message: "Unauthorized!"
        })
      }
      if(!session.user.emailVerified){
        return res.status(401).json({
          success: true,
          message: "Your email is not verified. You need to verify your email first."
        })
      }
      req.user = {
        id: session.user.id,
        email: session.user.email,
        role: session.user.role as string,
        emailVerified: session.user.emailVerified
      }
      if(roles.length && !roles.includes(req.user.role as UserRole)){
        return res.status(401).json({
          success: false,
          message: "Forbidden access. you dont have permission"
        });
      }
      console.log("Auth middleware:", session?.user.email);
      next();
    }catch(err:any){
      next(err.message);
    }
  }
}

export default authMiddleware;