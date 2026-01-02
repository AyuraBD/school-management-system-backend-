import { Request, Response } from "express";

const createSchool = async(req: Request, res: Response)=>{
  try{
    if(!req.user){
      console.log(req.user);
    }
  }catch(err:any){
    res.status(400).json({
      success: false,
      message: err.message
    })
  }
}

export const schoolController = {
  createSchool
}