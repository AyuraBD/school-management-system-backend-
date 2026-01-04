import { Request, Response } from "express";
import { schoolsService } from "./schools.service";

const createSchool = async(req: Request, res: Response)=>{
  try{
    if(!req.user){
      return res.status(400).json({
        success: false,
        message: "Unauthorized!"
      })
    }
    const result = await schoolsService.createSchool(req.body, req.user.id);
    res.status(200).json({
      success: true,
      data: result
    })
    console.log("Controller:",result)
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